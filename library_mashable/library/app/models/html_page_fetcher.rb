class HtmlPageFetcher
  def self.get_page(title)
    # TODO - Capture any exceptions here and bubble up appropriately.  There are two scenarios:
    #           1.  The service itself is simply down
    #           2.  The service itself is simply unavailable (how do we determine this?)
    # TODO - Use timeout and handle accordingly
    data = Net::HTTP.get(URI.parse(library_url(title)))
  end  
  
private

    def self.library_url(title)
      encoded_title = CGI::escape(title)
      # TODO - clean up how we invoke this.
      "http://fcplcat.fairfaxcounty.gov/uhtbin/cgisirsi/x/0/0/5?searchdata1=#{encoded_title}%7B245%7D&library=ALL&user_id=GUEST&password=1111"
    end
end