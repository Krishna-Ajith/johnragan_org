require 'test/unit'

module M
  def instance_method
    "M instance_method"
  end
  
  def self.class_method
    "M class_method"
  end
  
  module Class_Methods
    def module_m_class_method
      "this is a class method from module m"
    end
  end    
end

class C
  include M
end

class D
  extend M
end  

class E
  class << self
    include M
  end
end

class F
  include M
  extend M::Class_Methods
end

module N
  module ClassMethods
    def the_class_method
      "the_class_method"
    end
  end
  
  def self.included(base)
    base.extend N::ClassMethods
  end
end

class G
  @@hooked = false
  
  def self.hooked
    @@hooked
  end
  
  def self.include(*modules)
    super
    puts "hooked into include from including class"
    @@hooked = true
  end
  
  include N
end

class TestModules < Test::Unit::TestCase
  def test_include_module_instance_methods
    assert_equal "M instance_method", C.new.instance_method
  end
  
  def test_include_module_cannot_access_class_method
    assert_raise NoMethodError do
      C.class_method
    end  
  end
  
  def test_instance_extend_module
    s = "abc"
    s.extend M
    assert_equal "M instance_method", s.instance_method
    
    t = "def"
    class << t
      include M
    end
    
    assert_equal "M instance_method", t.instance_method
  end
  
  def test_class_extend_module
    assert_equal "M instance_method", D.instance_method
    assert_equal "M instance_method", E.instance_method
  end
  
  def test_include_module_class_methods
    assert_equal "M instance_method", F.new.instance_method
    assert_equal "this is a class method from module m", F.module_m_class_method
  end  
  
  def test_auto_include_module_class_methods
    assert_equal "the_class_method", G.the_class_method
  end  
  
  def test_base_side_hooked_method
    assert G.hooked
  end
end