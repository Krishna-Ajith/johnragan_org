require 'test/unit'

def my_method(*args)
  args.map {|arg| arg.reverse }
end

class ArgumentArraySpellTest < Test::Unit::TestCase
  def test_it
    result = my_method('abc' , 'xyz' , '123' ) # => ["cba", "zyx", "321"]
    assert_equal "cba", result[0]
    assert_equal "zyx", result[1]
    assert_equal "321", result[2]
  end
end  