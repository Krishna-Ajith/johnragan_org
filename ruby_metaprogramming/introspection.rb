require 'test/unit'

class A
  def a_method
    "a_method"
  end
end

class B < A
  def b_method
    "b_method"
  end
  
private

  def a_private_method
    "a_private_method"
  end
end

module MyModule     
  MyConstant = 'Outer constant'

  class MyClass
    MyConstant = 'Inner constant'
  end
  
  def marco
    "polo"
  end
end

class C < B
  include MyModule
end

class IntrospectionTest < Test::Unit::TestCase
  
  
  def setup
    @a = A.new
    @b = B.new
    @c = C.new
  end
  
  def test_class_introspection
    assert_equal A, @a.class
    assert_equal B, @b.class
  end
  
  def test_methods_not_inherited_introspection
    assert_equal 1, @a.class.instance_methods(false).size
  end
  
  def test_methods_inherited_introspection
    assert @a.class.instance_methods(true).size > 1
  end
  
  def test_public_methods
    assert_equal "b_method", B.public_instance_methods(false)[0]
  end
  
  def test_methods_equals_class_instance_methods
    assert_equal @a.class.instance_methods(true), @a.methods
  end
  
  def test_class_and_instance_get_methods
    assert_equal String.methods(false), "abc".class.methods(false)
  end
  
  def test_instance_variables
    assert instance_variables.include? "@a"
    assert instance_variables.include? "@b"
    assert !instance_variables.include?("@z")
  end
  
  def test_class_hierarchy
    assert_equal B, @b.class
    assert_equal A, @b.class.superclass
    chain = @b.class.ancestors
    assert_equal B, chain[0]
    assert_equal A, chain[1]
    assert_equal Object, chain[2]
    assert_equal Kernel, chain[3]
  end
  
  def test_class_hierarchy_with_module
    assert_equal C, @c.class
    chain = @c.class.ancestors
    assert_equal C, chain[0]
    assert_equal MyModule, chain[1]
    assert_equal B, chain[2]
    assert_equal A, chain[3]
    assert_equal Object, chain[4]
    assert_equal Kernel, chain[5]
  end
  
  def test_find_string_methods_starting_with_r
    matches = String.instance_methods(false).grep /^re/
    assert matches.include? "replace"
    assert matches.include? "reverse"
    assert matches.include? "reverse!"
    assert !matches.include?("size")
  end
  
  def test_classes_are_objects
    assert_equal String, "abc".class
    assert_equal Class, String.class
    assert_equal Module, Class.superclass
    assert_equal Object, Module.superclass
  end 
  
  def test_methods_specific_to_class
    the_methods = Class.instance_methods(false)
    assert the_methods.include? "superclass"
    assert the_methods.include? "allocate"
    assert the_methods.include? "new"
  end 
end