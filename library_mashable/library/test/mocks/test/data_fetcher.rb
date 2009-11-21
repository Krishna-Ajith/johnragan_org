class DataFetcher
  def self.fetch_data(title)
    File.readlines("test.html").join
  end  
end