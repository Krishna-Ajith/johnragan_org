require File.dirname(__FILE__) + '/../test_helper'

class OrderShouldaTest < ActiveSupport::TestCase

  context "playing with a test with shoulda that is true" do
    should "have a happy result" do
      assert_equal(1,1)
    end
  end

  context "playing with a test with shoulda that is false" do
    should "show that 1 does not equal 2" do
      assert_equal(1,1)  # change to show it failing
    end
  end
end