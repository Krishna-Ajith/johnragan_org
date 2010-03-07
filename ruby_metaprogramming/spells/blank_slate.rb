require 'test/unit'

class C
  def method_missing(name, *args)
    "a Ghost Method"
  end
end

class C
  instance_methods.each do |m|
    undef_method m unless m.to_s =~ /method_missing|respond_to?|^__/
  end
end

class BlankSlateSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "a Ghost Method", C.new.to_s
  end
end