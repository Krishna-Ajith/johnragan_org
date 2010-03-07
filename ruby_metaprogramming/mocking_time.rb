require 'test/unit'

class Loan     
  def initialize(book)
    @book = book
    @time = Loan.time_class.now
  end

  def self.time_class
    @time_class || Time
  end
  
  def info
    "#{@book} loaned on #{@time}"
  end
end

class FakeTime     
  def self.now
    'Mon Apr 06 12:15:50'
  end
end

class MockTimeTest < Test::Unit::TestCase
  def test_conversion_to_string
    # insert class instance variable below:
    Loan.instance_eval { @time_class = FakeTime }
    loan = Loan.new('War and Peace' )
    assert_equal 'War and Peace loaned on Mon Apr 06 12:15:50' , loan.info
  end 
end

