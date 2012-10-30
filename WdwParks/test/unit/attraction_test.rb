require 'test_helper'

class AttractionTest < ActiveSupport::TestCase

  def setup
    @default = Attraction.new()
    @default.name = "Spaceship Earth"
    @default.description = "Indoor rollercoaster"
    @default.image_url = "spaceship_earth.jpg"
    @default.height = 48
    @default.intensity = 8
    @default.rating = 9
    @default.wait_type = 3
    @default.fast_pass = true
    @default.pal_mickey = false
    @default.rider_swap = true
    @default.wheelchair = true
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

  test "empty description" do
    @default.description = nil
    assert_bad_save
  end

  test "description just long enough" do
    @default.description = fixed_length_str(512)
    assert_good_save
  end

  test "description too long" do
    @default.description = fixed_length_str(513)
    assert_bad_save
  end

  test "empty image_url" do
    @default.image_url = nil
    assert_bad_save
  end

  test "image_url just long enough" do
    @default.image_url = fixed_length_str(196) + ".gif"
    assert_good_save
  end

  test "image_url too long" do
    @default.image_url = fixed_length_str(197) + ".gif"
    assert_bad_save
  end

  test "valid jpg image" do
    @default.image_url = "spaceship_earth.jpg"
    assert_good_save
  end

  test "valid gif image" do
    @default.image_url = "spaceship_earth.gif"
    assert_good_save
  end

  test "valid png image" do
    @default.image_url = "spaceship_earth.png"
    assert_good_save
  end

  test "invalid jpeg image" do
    @default.image_url = "spaceship_earth.jpeg"
    assert_bad_save
  end

  test "legal height" do
    @default.height = 48
    assert_good_save
  end

  test "illegal height negative" do
    @default.height = -1
    assert_bad_save
  end

  test "illegal height" do
    @default.height = 49
    assert_bad_save
  end

  test "legal intensity" do
    @default.intensity = 10
    assert_good_save
  end

  test "illegal intensity negative" do
    @default.intensity = 0
    assert_bad_save
  end

  test "illegal intensity" do
    @default.intensity = 11
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
    @default.name = "Dup Spaceship Earth"
    assert_bad_save
  end

  test "test duplicate image url" do
    duplicate_default.save
    @default.image_url = "dup_spaceship_earth.jpg"
    assert_bad_save
  end

  private

  def duplicate_default
    dup = Attraction.new()
    dup.name = "Dup Spaceship Earth"
    dup.description = "Dup Indoor rollercoaster"
    dup.image_url = "dup_spaceship_earth.jpg"
    dup.height = 48
    dup.intensity = 8
    dup.rating = 9
    dup.wait_type = 3
    dup.fast_pass = true
    dup.pal_mickey = false
    dup.rider_swap = true
    dup.wheelchair = true

    dup
  end
end
