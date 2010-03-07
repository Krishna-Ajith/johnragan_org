require 'test/unit'
require 'ostruct'

class DynamicInvocationTest < Test::Unit::TestCase
  def test_open_struct
    o2 = OpenStruct.new
    o2.flavor = "strawberry"
    puts o2.flavor
    o2.price = 2.53
    
    assert_equal "strawberry", o2.flavor
    assert_equal 2.53, o2.price
  end
end