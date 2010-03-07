require 'test/unit'

class Person
  attr_accessor :name, :surname
  
  def initialize
    yield self
  end
end

class SelfYieldSpellTest < Test::Unit::TestCase
  def test_it
    joe = Person.new do |p|
      p.name = 'Joe'
      p.surname = 'Smith'
    end
    
    assert_equal 'Joe', joe.name
    assert_equal 'Smith', joe.surname
  end
end