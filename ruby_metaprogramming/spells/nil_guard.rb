require 'test/unit'

class NilGuardSpellTest < Test::Unit::TestCase
  def test_it
    x = nil
    y = x || "a value"
    assert_equal "a value", y
  end
end