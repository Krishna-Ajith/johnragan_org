require 'test/unit'

class DetectSubclassing
  def self.inherited(subclass)
    class << subclass
      def dynamic_class_method
        "dynamic_class_method added dynamically via subclassing"
      end  
    end
  end  
end

class TheSubclass < DetectSubclassing
end  

module ModuleA
  def self.included(base)
    class << base
      def module_include_method
        "module_include_method added dynamically to including class"
      end
    end
  end
end

class IncludingClass
  include ModuleA
end

module Picky
  def Picky.extend_object(o)
    if String === o
      puts "Can't add Picky to a String"
    else
      puts "Picky added to #{o.class}"
      super
    end
  end
  
  def module_method
    "module_method"
  end
end

class HookingTest < Test::Unit::TestCase
  def test_hooking_into_subclass
    assert_equal "dynamic_class_method added dynamically via subclassing", TheSubclass.dynamic_class_method
  end
  
  def test_hooking_into_module_include
    #return
    assert_equal "module_include_method added dynamically to including class", IncludingClass.module_include_method
  end
  
  def test_obj_include_module
    return
    (s = Array.new).extend Picky  # Call Object.extend
    (s2 = "quick brown fox").extend Picky
    assert_raise MethodMissing do
      s.module_method
    end
    assert_equal "module_method", s2.module_method
  end
end