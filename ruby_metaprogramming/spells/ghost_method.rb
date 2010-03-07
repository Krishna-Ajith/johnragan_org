require 'test/unit'

class C
  def method_missing(name, *args)
    name.to_s.reverse
  end
end

class GhostMethodSpellTest < Test::Unit::TestCase
  def test_it
    obj = C.new
    assert_equal "dohtem_tsohg_ym", C.new.my_ghost_method
  end
end