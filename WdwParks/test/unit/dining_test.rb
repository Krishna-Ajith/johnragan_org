require 'test_helper'

class DiningTest < ActiveSupport::TestCase

  def setup
    @default = Dining.new()
    @default.name = "Chefs de France"
    @default.cost = 5
    @default.rating = 3
  end

  test "basic valid save" do
    assert_good_save
  end

  test "empty name" do
    @default.name = nil
    assert_bad_save
  end

  test "name just long enough" do
    @default.name = fixed_length_str(60)
    assert_good_save
  end

  test "name too long" do
    @default.name = fixed_length_str(61)
    assert_bad_save
  end

  test "legal rating" do
    @default.rating = 10
    assert_good_save
  end

  test "illegal rating negative" do
    @default.rating = 0
    assert_bad_save
  end

  test "illegal rating" do
    @default.rating = 11
    assert_bad_save
  end

  test "test duplicate name" do
    duplicate_default.save
    @default.name = "Dup Chefs de France"
    assert_bad_save
  end

  private

  def duplicate_default
    dup = Dining.new()
    dup.name = "Dup Chefs de France"
    dup.rating = 9
    dup.cost = 3

    dup
  end
end
