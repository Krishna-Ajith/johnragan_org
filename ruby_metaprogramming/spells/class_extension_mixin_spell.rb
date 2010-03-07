require 'test/unit'

module M
  def self.included(base)
    base.extend(ClassMethods)
  end
  
  module ClassMethods
    def my_method
      'a class method'
    end
  end
end

class C
  include M
end

class ClassExtensionMixinSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "a class method", C.my_method
  end
end