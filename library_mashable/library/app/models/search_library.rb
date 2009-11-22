require "net/http"
require "cgi"
require "hpricot"
require "ruby-debug"

class SearchLibrary
  def books_in_library(title)
    all_book_records(HtmlPageFetcher.get_page(title))
  end 
  
private

  def all_book_records(data)
    full_doc = Hpricot(data)
    
    book_records2 = process_book_nodes(full_doc, "itemlisting2")
    book_records = process_book_nodes(full_doc, "itemlisting")
    
    return book_records2.concat(book_records).sort_by{|p| [p.ranking]}
    
    
    
    
    (full_doc/".#{next_listing}").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end
    
    return data
    
    # Popularity ranking
    (full_doc/".number_and_buttons_container .hit_list_number").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end
    
    # hold URL (not always there)
    (full_doc/".number_and_buttons_container .hold_button").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end
    
    # title for those under itemlisting2
    (full_doc/".#{next_listing} strong").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end  
    
    # title for those under itemlisting
    (full_doc/".#{next_listing} strong").each do |e|
      RAILS_DEFAULT_LOGGER.info e  
    end
    
    # version info for those under itemlisting2 (not always there)
    (full_doc/".#{next_listing} em").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end  
    
    # version info for those under itemlisting (not always there)
    (full_doc/".#{next_listing} em").each do |e|
      RAILS_DEFAULT_LOGGER.info e  
    end
    data
  end
  
  def process_book_nodes(full_doc, node_name)
    parts = []
    (full_doc/".#{node_name}").each do |one_of_3_part|
      parts << one_of_3_part
    end
    
    return [] if parts.size == 0
    
    book_records = []
    
    k = parts.size / 3
    for i in 1..k do
      book_record = BookData.new
      book_record.ranking = "foo"
      book_records << book_record
    end
    
    book_records
  end
  
  # TODO - Remove this if not needed
  # The listings for each book record cycle starting with "itemlisting2" then "itemlisting"
  def next_listing
    @listing = (@listing.nil? || @listing == "itemlisting") ? "itemlisting2" : "itemlisting"   
  end
end