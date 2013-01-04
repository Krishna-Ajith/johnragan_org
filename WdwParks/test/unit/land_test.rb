require 'test_helper'

class LandTest < ActiveSupport::TestCase

  def setup
    @default = Land.new()
    @default.name = "Future World"
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
    @default.name = "Dup Future World"
    assert_bad_save
  end

  private

  def duplicate_default
    dup = Land.new()
    dup.name = "Dup Future World"

    dup
  end
end
