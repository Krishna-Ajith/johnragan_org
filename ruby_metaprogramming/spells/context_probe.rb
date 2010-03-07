require 'test/unit'

class C
  def initialize
    @x = "a private instance variable"
  end
end

class ContextProbeSpellTest < Test::Unit::TestCase
  def test_it
    obj = C.new
    assert_equal "a private instance variable", obj.instance_eval { @x }
  end
end