require 'test/unit'

lambda {
  shared = 10
  
  self.class.class_eval do
    define_method :counter do
      shared
    end

    define_method :down do
      shared -= 1
    end
  end
}.call

$value1 = counter
3.times { down }
$value2 = counter

class SharedScopeSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal 10, $value1
    assert_equal 7, $value2
  end
end