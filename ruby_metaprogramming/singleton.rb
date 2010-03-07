require 'test/unit'

class TestSingleton < Test::Unit::TestCase
  def test_singleton
    str = "just a regular string"
    def str.title?
         self.upcase == self
    end

    def str.title? self.upcase == self; end

    
  end
end