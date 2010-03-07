require 'test/unit'

class DynamicDispatchSpellTest < Test::Unit::TestCase
  def test_it
    method_to_call = :reverse
    assert_equal "cba", "abc".send(method_to_call)
  end
end