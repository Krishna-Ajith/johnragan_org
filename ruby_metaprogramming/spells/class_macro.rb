require 'test/unit'

class C
end

class << C
  def my_macro(arg)
    define_method "my_macro_#{arg.to_s}" do
      return "#{arg.to_s}"
    end  
  end
end

class C
  my_macro :x # => "my_macro(x) called"
end

class ClassMacroSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "x", C.new.my_macro_x
  end
end