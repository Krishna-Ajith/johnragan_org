require 'test/unit'

class BlockGiven
  def given_block(a, b)
    return true if block_given?
    false
  end
  
  def yield_method(a, b)     
    a + yield(a, b)
  end
  
  def my_closure_method
    x = "Goodbye"
    yield("cruel")
  end
end

class BlockTest < Test::Unit::TestCase
  def setup
    @block_given = BlockGiven.new
  end
  
  def test_block_given?
    assert @block_given.given_block(1, 2) {|x| x * 3 }
    assert !@block_given.given_block(1, 2)
  end
  
  def test_block_yield
    assert_equal 10, @block_given.yield_method(1, 2) {|x, y| (x + y) * 3 }
  end
  
  def test_closure
    x = "Hello"
    assert_equal "Hello, cruel world", @block_given.my_closure_method {|y| "#{x}, #{y} world" }
  end
end