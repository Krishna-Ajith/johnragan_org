require 'test/unit'

class Object
  def eigenclass
    class << self
      self
    end
  end
end

class MyClass
  def non_overridden_method
    "non_overridden_method"
  end
end  

class EigenclassTest < Test::Unit::TestCase
  def test_get_eigenclass
    s = "abc"
    def s.howdy
      "howdy!"
    end
      
    result = class << s
      self
    end
    
    assert_not_nil result.to_s =~ /String/
    
    # The class of an Eigenclass is Class
    assert_equal "Class", result.class.to_s
  end 
  
  def test_universal_eigenclass
    s = "abc"
    def s.foo
      "bar"
    end
    
    assert_not_nil s.eigenclass.to_s =~ /String/
    assert s.eigenclass.instance_methods(false).include? "foo"
    assert !"def".eigenclass.instance_methods(false).include?("foo")
  end
  
  def test_eigenclass_methods_called_first
    overridden = MyClass.new
    def overridden.non_overridden_method
      "this method is now overridden"
    end
    assert_equal "this method is now overridden", overridden.non_overridden_method
    
    regular = MyClass.new
    assert_equal "non_overridden_method", regular.non_overridden_method
  end   
  
  def test_singleton_methods
    s = "abc"
    def s.foo
      "bar"
    end
    
    assert s.singleton_methods.include? "foo"
  end  
end