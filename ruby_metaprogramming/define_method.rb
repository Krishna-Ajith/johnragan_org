require 'test/unit'

class MyClass  
  define_method :my_method do |my_arg|
    my_arg * 3
  end
end

class DefineMethodTest < Test::Unit::TestCase
  def test_dynamically_defined_method
    m = MyClass.new
    assert_equal 12, m.my_method(4)
  end  
end