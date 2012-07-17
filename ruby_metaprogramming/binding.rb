require 'test/unit'

class MyClass
  def initialize
    @y = "init"
  end
       
  def get_binding
    @x = 1
    binding
  end
end

class BindingTest < Test::Unit::TestCase
  def test_binding
    b = MyClass.new.get_binding
    assert_equal 1, (eval "@x", b)
    assert_equal "init", (eval "@y", b)
  end  
end