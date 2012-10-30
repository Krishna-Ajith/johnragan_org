require 'test_helper'

class ResortTest < ActiveSupport::TestCase

  def setup
    @default = Resort.new()
    @default.name = "Animal Kingdom Lodge"
    @default.cost = 4
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

  test "test duplicate name" do
    duplicate_default.save
    @default.name = "Dup Animal Kingdom Lodge"
    assert_bad_save
  end

  private

  def duplicate_default
    dup = Resort.new()
    dup.name = "Dup Animal Kingdom Lodge"
    dup.cost = 4

    dup
  end
end
