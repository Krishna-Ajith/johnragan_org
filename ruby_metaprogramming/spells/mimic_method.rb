require 'test/unit'

def BaseClass(name)
  name == "string" ? String : Object
end

class C < BaseClass "string" # a method that looks like a class
  attr_accessor :an_attribute # a method that looks like a keyword
end

class MimicMethodSpellTest < Test::Unit::TestCase
  def test_it
    obj = C.new
    obj.an_attribute = 1 # a method that looks like an attribute
    assert_equal 1, obj.an_attribute
  end
end