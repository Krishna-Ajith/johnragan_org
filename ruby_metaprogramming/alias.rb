require 'test/unit'

class MyClass     
  def my_method
    'my_method()'
  end
     
  alias :m :my_method
end

class MyClass
  def my_method
    'my_method_updated()'
  end
end    

class AliasTest < Test::Unit::TestCase
  def test_alias
    m = MyClass.new
    assert_equal "my_method()", m.m
    assert_equal "my_method_updated()", m.my_method
  end  
end