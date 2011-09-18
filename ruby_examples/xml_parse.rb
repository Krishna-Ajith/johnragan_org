require "rexml/document"
require "rexml/xpath"

class XmlParse
  def self.parse_data(data)     
    doc = REXML::Document.new(data)
    puts 'we are seeking the value for latitude, which should be 10'
    puts 'we are seeking the value for longtitude, which should be 20'     
    lat = REXML::XPath.first(doc, "//latitude").text     
    lon = REXML::XPath.first(doc, "//longtitude").text     
    [lat, lon]
  end
end

the_xml = "<data><latitude>10</latitude><longtitude>20</longtitude></data>"
puts XmlParse.parse_data(the_xml)