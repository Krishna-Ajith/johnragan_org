require "net/http"
require "cgi"
require "hpricot"

class Search
  def books_in_library(title)
    all_book_records(HtmlPageFetcher.get_page(title))
  end 
  
private

  def all_book_records(data)
    doc = Hpricot(data)
    (doc/".number_and_buttons_container .hit_list_number").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end
    (doc/".number_and_buttons_container .hold_button").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end
    (doc/".#{next_listing} strong").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end  
    (doc/".#{next_listing} strong").each do |e|
      RAILS_DEFAULT_LOGGER.info e  
    end
    (doc/".#{next_listing} em").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end  
    (doc/".#{next_listing} em").each do |e|
      RAILS_DEFAULT_LOGGER.info e  
    end
    data
  end
  
  # The listings for each book record cycle starting with "itemlisting2" then "itemlisting"
  def next_listing
    @listing = (@listing.nil? || @listing == "itemlisting") ? "itemlisting2" : "itemlisting"   
  end
end