require 'test/unit'

module MyNamespace
  class Array
    def to_s
      "my class"
    end
  end
end

class NamespaceSpell < Test::Unit::TestCase
  def test_it
    assert_equal "my class", MyNamespace::Array.new.to_s
  end
end