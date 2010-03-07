require 'test/unit'

class C
  def an_attribute
    @attr
  end
end

class FlatScopeSpellTest < Test::Unit::TestCase
  def test_it
    obj = C.new
    a_variable = 100
    
    # flat scope:
    obj.instance_eval do
      @attr = a_variable
    end
    
    assert_equal 100, obj.an_attribute # => 100
  end
end