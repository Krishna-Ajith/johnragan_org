require 'test/unit'

module Kernel
  def a_method
    "a kernel method"
  end
end

class KernelSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "a kernel method", a_method
  end
end