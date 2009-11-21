require "net/http"
require "cgi"

class Search
  def library_data(title)
    begin
      #h = Net::HTTP.new("johnragan.org", 80)
      #resp, data = h.get("2009/11/20/dont-make-me-think-the-rest-of-the-book/", nil)
      encoded_title = CGI::escape(title)
      data = Net::HTTP.get(URI.parse("http://fcplcat.fairfaxcounty.gov/uhtbin/cgisirsi/x/0/0/5?searchdata1=#{encoded_title}%7B245%7D&library=ALL&user_id=GUEST&password=1111"))
    rescue => err
      puts "Error2: #{err}"
      exit
    end
    RAILS_DEFAULT_LOGGER.info("JPR_response - " + data)
    data
  end
end