require 'test/unit'

class C
end

module M
  def my_method
    'a class method'
  end
end

class << C
  include M
end

class ClassExtensionSpellTest > Test::Unit::TestCase
  def test_it
    assert_equal "a class method", C.my_method
  end  
end