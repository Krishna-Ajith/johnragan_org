require 'test/unit'

module MyModule     
  MyConstant = 'Outer constant'

  class MyClass
    MyConstant = 'Inner constant'
  end
end


class NamespaceTest < Test::Unit::TestCase
  def test_constants
    assert_equal 'Outer constant', MyModule::MyConstant
    assert_equal 'Inner constant', MyModule::MyClass::MyConstant
  end
end