require 'test/unit'

class C
  def store(&block)
    @my_code_capsule = block
  end
  
  def execute
    @my_code_capsule.call
  end
end

class DeferredEvaluationSpellTest < Test::Unit::TestCase
  def test_it
    obj = C.new
    obj.store { $X = 1 }
    $X = 0
    assert_equal 1, obj.execute
    assert_equal 1, $X
  end
end