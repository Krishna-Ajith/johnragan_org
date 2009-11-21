class HtmlPageFetcher
  def self.get_page(title)
    File.readlines("test.html").join
  end  
end