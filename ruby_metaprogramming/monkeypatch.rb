require 'test/unit'

class String     
  def howdy
    "howdy"
  end
end

class MonkeyPatchTest < Test::Unit::TestCase
  def setup
    @obj = "abc"
    @obj2 = "def"
  end
  
  def test_class_monkey_patch  
    assert_equal "howdy", "abc".howdy
    assert_equal "howdy", @obj.howdy 
  end
  
  def test_obj_monkey_patch  
    assert_equal "howdy", @obj.howdy
    
    class << @obj
      def marco
        "polo"
      end
    end
    
    assert_equal "polo", @obj.marco
    assert @obj.methods.include?("marco") 
    assert !"abc".methods.include?("marco") 
  end
  
  def test_obj_singleton
    assert_equal "howdy", @obj2.howdy
    
    def @obj2.marco
      "polo"
    end
    
    assert_equal "polo", @obj2.marco
    assert @obj2.methods.include?("marco") 
    assert !"def".methods.include?("marco") 
  end
  
  def test_dynamic_instance_variable_set_and_get
    obj3 = "abc"
    obj3.instance_variable_set("@x", 10)
    
    assert_equal 10, obj3.instance_variable_get("@x")
  end
end