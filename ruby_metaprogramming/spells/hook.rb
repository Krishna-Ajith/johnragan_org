require 'test/unit'

$INHERITORS = []

class C
  def self.inherited(subclass)
    $INHERITORS << subclass
  end
end

class D < C
end

class E < C
end

class F < E
end

class HookSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal D, $INHERITORS[0]
    assert_equal E, $INHERITORS[1]
    assert_equal F, $INHERITORS[2]
  end
end