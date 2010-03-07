require 'test/unit'

a = 1
puts defined? a # => "local-variable"

module MyModule
  b = 1
  puts defined? a # => nil
  puts defined? b # => "local-variable"
end

puts defined? a # => "local-variable"
puts defined? b # => nil

class ScopeGateSpellTest < Test::Unit::TestCase
  def test_it
    
  end
end