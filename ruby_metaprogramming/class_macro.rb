require 'test/unit'

def add_checked_attribute_eval(clazz, attribute)
  eval "
    class #{clazz}
      def #{attribute}=(val)
        raise 'Invalid attribute' unless val
        @#{attribute} = val
      end
     
      def #{attribute}()
        @#{attribute}
        end
    end
  "
end

class MyClassEval2
end

def add_checked_attribute_class_eval(clazz, attribute)
  clazz.class_eval do
    define_method "#{attribute}=" do |val|
      raise 'Invalid attribute' unless val
      instance_variable_set("@#{attribute}" , val)
    end
      define_method attribute do
      instance_variable_get "@#{attribute}"
    end
  end
end

class Class
   def attr_checked(variable, &block)
     define_method "#{variable.to_s}=" do |val|
       raise 'Invalid attribute' unless val
       raise "invalid attribute" unless block.call(val)
       instance_variable_set "@#{variable}", val
     end
    
     define_method "#{variable.to_s}" do 
       instance_variable_get "@#{variable}"
     end
   end
end

class MyClass3
  attr_checked :foo do |x| 
    x > 18
  end  
end

class ClassMacroTest < Test::Unit::TestCase
  def test_add_via_eval
    add_checked_attribute_eval("MyClassEval", "movie")
    m = MyClassEval.new
    m.movie = "American Beauty"
    assert_equal "American Beauty", m.movie
  end
  
  def test_add_via_class_eval
    add_checked_attribute_class_eval(MyClassEval2, "movie")
    m = MyClassEval2.new
    m.movie = "American Beauty"
    assert_equal "American Beauty", m.movie
  end
  
  def test_attr_checked
    m = MyClass3.new
    m.foo = 20
    assert_equal 20, m.foo
    assert_raise RuntimeError do
      m.foo = 17
    end
  end  
end