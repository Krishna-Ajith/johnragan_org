require 'test/unit'

$x = 0
class C
  def my_first_method
    $x += 1
  end
  
  def my_second_method
    $x += 2
  end
end

class PatternDispatchSpellTest < Test::Unit::TestCase
  def test_it
    obj = C.new
    obj.methods.each do |m|
      obj.send(m) if m.to_s =~ /^my_/
    end
    assert_equal 3, $x
  end
end