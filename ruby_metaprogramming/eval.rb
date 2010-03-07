require 'test/unit'

class SandBoxAndCleanRoom     
  def initialize(src, safe_level)
    @src = src
    @safe_level = safe_level
  end
  
  def result(b=TOPLEVEL_BINDING)
     if @safe_level
          proc {
               $SAFE = @safe_level
               eval(@src, b)
          }.call
     else
          eval(@src, b)
     end
  end
end

def get_binding
  x = 3
  binding
end

class EvalTest < Test::Unit::TestCase
  def setup
    $SAFE=0
  end
  
  def test_sandbox_altering_safe_levels
    sandbox = SandBoxAndCleanRoom.new("x*4", nil)
    assert_equal 12, sandbox.result(get_binding)
    
    # safe_level of 4 is as high as you can go
    sandbox = SandBoxAndCleanRoom.new("x*4", 3)
    assert_equal 12, sandbox.result(get_binding)
    
    puts "Enter the following:  x*4"
    tainted_input = gets
    sandbox = SandBoxAndCleanRoom.new(tainted_input, 0)
    assert_equal 12, sandbox.result(get_binding)
    
    sandbox = SandBoxAndCleanRoom.new(tainted_input, 3)
    assert_raise SecurityError do
      sandbox.result(get_binding)
    end
    
    assert_not_equal 3, $SAFE 
  end
  
  def test_basic_eval
    assert_equal 9, eval("3*3")
  end
  
  def test_tainted
    puts "enter anything"
    line = gets
    line2 = "abc"
    assert line.tainted?
    assert !line2.tainted?
    line.untaint
    assert !line.tainted?
  end
  
  def test_using_eval_with_safe
    puts "enter the following:   @x=3"
    line = gets
    eval line
    assert_equal 3, @x
    
    $SAFE=1
    assert_raise SecurityError do
      eval line
    end   
  end
end  