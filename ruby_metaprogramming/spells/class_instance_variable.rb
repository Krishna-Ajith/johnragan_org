require 'test/unit'

class C
  @my_class_instance_variable = "some value"
  def self.class_attribute
    @my_class_instance_variable
  end
end

class ClassInstanceVariableSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "some value", C.class_attribute
  end
end