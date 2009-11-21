require "net/http"
require "cgi"
require "hpricot"

class Search
  def library_data(title)
    data = DataFetcher.fetch_data(title)
    book_data_array(data)
  end 
  
private

  def book_data_array(data)
    doc = Hpricot(data)
    (doc/".number_and_buttons_container .hit_list_number").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end
    (doc/".number_and_buttons_container .hold_button").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end
    (doc/".itemlisting2 strong").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end  
    (doc/".itemlisting strong").each do |e|
      RAILS_DEFAULT_LOGGER.info e  
    end
    (doc/".itemlisting2 em").each do |e|
      RAILS_DEFAULT_LOGGER.info e
    end  
    (doc/".itemlisting em").each do |e|
      RAILS_DEFAULT_LOGGER.info e  
    end
    data
  end
end