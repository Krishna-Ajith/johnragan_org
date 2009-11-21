require "net/http"
require "cgi"
require "hpricot"

class Search
  def library_data(title)
    begin
      data = Net::HTTP.get(URI.parse(library_url(title)))
    rescue => err
      puts "Error2: #{err}"
      exit
    end
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
  
private

  def library_url(title)
    encoded_title = CGI::escape(title)
    "http://fcplcat.fairfaxcounty.gov/uhtbin/cgisirsi/x/0/0/5?searchdata1=#{encoded_title}%7B245%7D&library=ALL&user_id=GUEST&password=1111"
  end  
end