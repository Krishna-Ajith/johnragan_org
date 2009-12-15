require "net/http"
require "cgi"
require "hpricot"
require "ruby-debug"

class SearchLibrary
  def find_book_in_library(title)
    all_book_records_by_rank(HtmlPageFetcher.get_page(title))
  end 
  
private

  ITEM_LISTING2_CSS_CLASS = "itemlisting2"
  ITEM_LISTING_CSS_CLASS = "itemlisting"
  HTML_NODES_PER_BOOK_RECORD = 3

  def all_book_records_by_rank(page)
    full_hpricot_doc = Hpricot(page)
    
    # records were split into CSS classes itemlisting2 and itemlisting by fcpl site solely for display
    book_records2 = process_book_nodes(full_hpricot_doc, ITEM_LISTING2_CSS_CLASS)
    book_records = process_book_nodes(full_hpricot_doc, ITEM_LISTING_CSS_CLASS)
    all_records = book_records2.concat(book_records)
    
    return all_records.sort_by{|r| r.ranking}
    
    
    
    
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
  
  def process_book_nodes(full_hpricot_doc, css_class)
    # For each book found on the site, there will be 3 html nodes matching.
    # The first one has the rank number and html link.  The second has the
    # title, author, and the optional edition information.  The third
    # can be ignored.
    html_parts_by_css_class = html_parts(full_hpricot_doc, css_class)
    return [] if html_parts_by_css_class.size == 0
    
    book_records = []
    for i in 0..record_count(html_parts_by_css_class)-1 do
      book_record = BookData.new
      
      book_record.ranking = ranking(html_parts_by_css_class, i)
      book_record.title = title(html_parts_by_css_class, i)
      book_record.author = author(html_parts_by_css_class, i)
      book_record.edition = edition(html_parts_by_css_class, i)
      
      book_records << book_record
    end    
    book_records
  end
  
  def html_parts(full_hpricot_doc, css_class)
    html_parts_by_css_class = []
    (full_hpricot_doc/".#{css_class}").each do |e|
      html_parts_by_css_class << e.innerHTML
    end
  end
  
  def record_count(html_parts_by_css_class)
    html_parts_by_css_class.size / HTML_NODES_PER_BOOK_RECORD
  end
  
  def ranking(html_parts_by_css_class, i)
    # There is just one despite use of "each"
    (Hpricot(subpart_of_part(1, html_parts_by_css_class, i))/".hit_list_number").each do |e|
      return e.innerHTML[1..-1].to_i
    end
  end
  
  def title(html_parts_by_css_class, i)
    # There is just one despite use of "each"
    (Hpricot(subpart_of_part(2, html_parts_by_css_class, i))/"strong").each do |e|
      return e.innerHTML
    end
  end
  
  def author(html_parts_by_css_class, i)
    # There is just one despite use of "each"
    (Hpricot(subpart_of_part(2, html_parts_by_css_class, i))/"label").each do |e|
      #return /(<br />\&nbsp;\&nbsp;)(.*)(-\\n)/.match(e.innerHTML)[2]
      return /(<br \/>&nbsp;&nbsp;)(.*)(-\n)/.match(e.innerHTML)[2]
    end
  end
  
  def edition(html_parts_by_css_class, i)
    # There is just one despite use of "each"
    (Hpricot(subpart_of_part(2, html_parts_by_css_class, i))/"em").each do |e|
      # Typical - "&nbsp;[Large print ed.]", and we want "[Large print ed.]"
      return e.innerHTML[6..-1]
    end
    ""
  end  
  
  def subpart_of_part(subpart, parts, i)
    return parts[i*3].to_s if subpart == 1
    return parts[(i*3)+1].to_s if subpart == 2
  end
end