class DataFetcher
  def self.get_page(title)
    begin
      data = Net::HTTP.get(URI.parse(library_url(title)))
    rescue => err
      puts "Error2: #{err}"
      exit
    end
  end  
  
  private

    def self.library_url(title)
      encoded_title = CGI::escape(title)
      "http://fcplcat.fairfaxcounty.gov/uhtbin/cgisirsi/x/0/0/5?searchdata1=#{encoded_title}%7B245%7D&library=ALL&user_id=GUEST&password=1111"
    end
end