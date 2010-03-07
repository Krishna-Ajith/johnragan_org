require 'test/unit'

class MyDynamicProxy
  def initialize(target)
    @target = target
  end
  
  def method_missing(name, *args, &block)
    "result: #{@target.send(name, *args, &block)}"
  end
end

class DynamicProxySpellTest < Test::Unit::TestCase
  def test_it
    obj = MyDynamicProxy.new("a string" )
    assert_equal "result: gnirts a", obj.reverse
  end
end