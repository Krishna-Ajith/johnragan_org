require 'test/unit'

class C
end

C.class_eval do
  define_method :my_method do
    "a dynamic method"
  end
end

class DynamicMethodSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "a dynamic method", C.new.my_method
  end
end