class DataFetcher
  def self.fetch_data(title)
    foo = File.readlines("test.html").join
    
    foo
  end  
end