require 'test/unit'

class CleanRoom
  def a_useful_method(x)
    x * 2
  end
end

class CleanRoomSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal 6, CleanRoom.new.instance_eval { a_useful_method(3) }
  end
end