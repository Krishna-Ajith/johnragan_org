require 'test_helper'

class ParkTest < ActiveSupport::TestCase

  def setup
    @default = Park.new()
    @default.name = "Magic Kingdom"
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
    @default.name = "Dup Magic Kingdom"
    assert_bad_save
  end

  private

  def duplicate_default
    dup = Park.new()
    dup.name = "Dup Magic Kingdom"

    dup
  end
end
