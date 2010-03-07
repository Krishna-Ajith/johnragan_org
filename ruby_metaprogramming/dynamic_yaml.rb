require "yaml"

class DynamicYaml
  def admin=(name)
    @admin = name
    puts @admin
  end
 
  def title=(name)
    @title = name
    puts @title
  end
 
  def topic=(name)
    @topic = name
    puts @topic
  end
 
  def rc
    "config.yml"
  end 
end

conf = DynamicYaml.new

if conf.rc and File.exists? conf.rc
  YAML.load_file(conf.rc).each do |k,v|
    conf.send("#{k}=" , v)
  end
end
