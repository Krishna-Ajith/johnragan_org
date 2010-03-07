require 'test/unit'

class C
  def attribute
    @attribute = @attribute || "some value"
  end
end

class LazyInstanceSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "some value", C.new.attribute
  end
end