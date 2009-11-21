require "net/http"
require "cgi"
require "hpricot"

class Search
  def library_data(title)
    data = DataFetcher.fetch_data(title)
    book_data_array(data)
  end 

  def book_data_array(data)
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
  
  def next_listing()
    @listing = (@listing.nil? || @listing == "itemlisting") ? "itemlisting2" : "itemlisting"   
  end
end