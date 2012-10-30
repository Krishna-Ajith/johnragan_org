ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all

  # Add more helper methods to be used by all tests here...

  def fixed_length_str(size)
    'X' * size
  end

  def assert_good_save
    assert_nothing_raised do
      @default.save!
    end
    #assert_valid(@default)
  end

  def assert_bad_save
    assert_raises(ActiveRecord::RecordInvalid, ActiveRecord::RecordNotUnique) do
      @default.save!
    end
  end
end
