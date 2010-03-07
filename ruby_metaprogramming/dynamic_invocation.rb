require 'test/unit'

class DynamicInvocationTest < Test::Unit::TestCase
  def test_send
    assert_equal 3, "abc".send(:size)
  end
end