require 'delegate'

class Settings < DelegateClass(Hash)
  def initialize(options = {})
    super({:initialized_at => Time.now - 5}.merge(options))
  end
 
  def age
    Time.now - self[:initialized_at]
  end
end

settings = Settings.new :use_foo_bar => true, :that => "this"
p settings[:use_foo_bar]  #true
p settings.age # 5.00301
