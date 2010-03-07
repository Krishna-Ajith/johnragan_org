require 'test/unit'

class String
  alias :old_reverse :reverse
  def reverse
    "x#{old_reverse}x"
  end
end

class C
  def greet
    "howdy!"
  end  
end

class C
  def greet_with_log
    "Calling method...#{greet_without_log}...Method called"
  end

  alias_method :greet_without_log, :greet
  alias_method :greet, :greet_with_log
end

# Just like the one in Rails
module AliasChain
  def alias_method_chain(target, feature)
    # Strip out punctuation on predicates or bang methods since
    # e.g. target?_without_feature is not a valid method name.
    aliased_target, punctuation = target.to_s.sub(/([?!=])$/, '' ), $1
    yield(aliased_target, punctuation) if block_given?
    with_method, without_method =
      "#{aliased_target}_with_#{feature}#{punctuation}" ,
      "#{aliased_target}_without_#{feature}#{punctuation}"
    alias_method without_method, target
    alias_method target, with_method
    case
      when public_method_defined?(without_method)
        public target
      when protected_method_defined?(without_method)
        protected target
      when private_method_defined?(without_method)
        private target
    end
  end
end

class D
  extend AliasChain
  
  def saveIt
    "saving D instance"
  end
end

class D
  def saveIt_with_validation
    "first validation then #{saveIt_without_validation}"
  end
  
  alias_method_chain :saveIt, :validation
end  

class AroundAliasSpellTest < Test::Unit::TestCase
  def test_it
    assert_equal "xcbax", "abc".reverse
  end
  
  def test_two_alias_methods
    assert_equal "Calling method...howdy!...Method called", C.new.greet
  end
  
  def test_alias_method_chain
    assert_equal "first validation then saving D instance", D.new.saveIt
  end
end