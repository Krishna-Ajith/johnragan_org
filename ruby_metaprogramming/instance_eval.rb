require 'test/unit'

class MyClass
  def initialize
    @v = 1
  end
end

class InstanceEvalTest < Test::Unit::TestCase
  def test_instance_eval
    obj = MyClass.new
    
    the_self = obj.instance_eval { self }        # => #<MyClass:0x3340dc @v=1>
    assert_not_nil the_self =~ /MyClass/
    
    assert_equal 1, obj.instance_eval { @v }

    v = 2
    obj.instance_eval { @v = v }
    assert_equal 2, obj.instance_eval { @v }      # => 2
  end
end
