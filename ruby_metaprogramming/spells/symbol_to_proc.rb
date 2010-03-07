require 'test/unit'

class SymbolToProcSpellTest
  def test_it
    result = [1, 2, 3, 4].map(&:even?) # => [false, true, false, true]
    assert !result[0]
    assert result[1]
    assert !result[2]
    assert result[3]
  end
  
  def test_foo
    names = ['bob', 'bill', 'heather']
    names.map(&:capitalize)   # => ["Bob", "Bill", "Heather"]
  end
end