require 'test/unit'

#doing class MyClass returns scope within the class
result = class MyClass     
  self
end

def add_method_to(a_class)    
  a_class.class_eval do
    def m; 
      'Hello!'; 
    end
  end
end

class MyClass     
  @my_var = 1
end


#In the following, there are two separate instance variables
class MyClass     
  @my_var = 1
  
  def self.read
    @my_var
  end
  
  def write
    @my_var = 2
  end
  
  def read
    @my_var
  end
end

class C     
  @@v = 1
  
  def self.get_v
    @@v
  end
end

class D < C
  def self.get_v_from_sub
    @@v
  end
  
  def get_v_obj
    @@v
  end
end

# Declare sub-class of Array without using the class keyword
c = Class.new(Array) do     
  def my_method
    'Hello!'
  end
end
MyArray = c


# In the following, we declare class methods a new way
class MyClass
  class << self
    def class_method1
      "class_method1"
    end
    
    def class_method2
      "class_method2"
    end
    
    # and class attributes a new way
    attr_accessor :foo
  end
end

ClassesTest = Class.new(Test::Unit::TestCase) do
  define_method :test_get_class do
    assert_not_nil result.to_s.grep /MyClass/
  end
  
  define_method :test_class_eval_add_method do
    add_method_to(result)
    myClass = MyClass.new
    assert_equal 'Hello!', myClass.m
  end
  
  def test_class_and_obj_instance_vars
    obj = MyClass.new
    obj.write
    assert_equal 2, obj.read # => 2
    assert_equal 1, MyClass.read # => 1
  end
  
  def test_class_var_access
    assert_equal 1, C.get_v
    assert_equal 1, D.get_v
    d = D.new
    assert_equal 1, d.get_v_obj
  end
  
  def test_subclassing_without_class_keyword
    m = MyArray.new
    m << "foo"
    assert_equal 1, m.size
    assert_equal "Hello!", m.my_method
  end
  
  def test_other_way_to_declare_class_methods
    assert_equal "class_method1", MyClass.class_method1
    assert_equal "class_method2", MyClass.class_method2
  end
  
  def test_other_way_to_declare_class_attributes
    MyClass.foo = "bar"
    assert_equal "bar", MyClass.foo
  end  
end