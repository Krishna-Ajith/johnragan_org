require 'test/unit'

module M
  def my_method
    'a singleton method'
  end
end

class ObjectExtension < Test::Unit::TestCase
  def test_it
    obj = Object.new
    class << obj
      include M
    end
    assert_equal "a singleton method", obj.my_method
  end
end