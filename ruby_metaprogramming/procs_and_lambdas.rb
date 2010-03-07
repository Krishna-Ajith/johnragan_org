require 'test/unit'

class MyClass     
  def initialize(val)
    @x = val
  end

  def my_method
    @x
  end
end

class ProcLambdaTest < Test::Unit::TestCase
  def test_proc_to_invoke_later
    inc = Proc.new {|x| x + 1 }
    # more code...
    assert_equal 3, inc.call(2) # => 3
    assert_equal 5, inc.call(4)
  end
  
  def test_lamdba_to_invoke_later
    dec = lambda {|x| x - 1 }
    assert_equal 2, dec.call(3)
  end
  
  def test_call_method_later
    object = MyClass.new(1)
    m = object.method :my_method
    assert_equal 1, m.call # => 1
  end
end