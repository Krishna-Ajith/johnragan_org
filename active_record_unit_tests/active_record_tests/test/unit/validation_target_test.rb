require File.dirname(__FILE__) + '/../test_helper'

class ValidationTargetTest < ActiveSupport::TestCase
  
  #   t.integer :an_int
  # t.string :exist_foo

  def test_validation_target_acceptance_positive
    v_target = ValidationTarget.new(:acceptance => true, :regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_nil v_target.errors.full_messages[0]
  end  
    
  def test_validation_target_acceptance_negative  
    v_target = ValidationTarget.new(:acceptance => false, :regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_equal "Acceptance Please accept the terms to proceed", v_target.errors.full_messages[0]
  end
  
  def test_validation_target_inclusion_of_positive
    v_target = ValidationTarget.new(:genre_in => "polka", :genre_out => "shrek", :acceptance => true, :regex_string => "12cm", :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_nil v_target.errors.full_messages[0]
  end  
  
  def test_validation_target_inclusion_of_negative
    v_target = ValidationTarget.new(:genre_in => "hip hop", :genre_out => "shrek", :acceptance => true, :regex_string => "12cm", :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_equal "Genre in no wild music allowed", v_target.errors.full_messages[0]
  end
  
  def test_validation_target_exclusion_of_positive
    v_target = ValidationTarget.new(:genre_out => "shrek", :genre_in => "polka", :acceptance => true, :regex_string => "12cm", :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_nil v_target.errors.full_messages[0]
  end  
  
  def test_validation_target_exclusion_of_negative
    v_target = ValidationTarget.new(:genre_out => "disney", :genre_in => "polka", :acceptance => true, :regex_string => "12cm", :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_equal "Genre out only crappy animation allowed", v_target.errors.full_messages[0]
  end
  
  def test_validation_target_format_of_positive
    v_target = ValidationTarget.new(:regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :acceptance => true, :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_nil v_target.errors.full_messages[0]
  end
  
  def test_validation_target_format_of_negative
    v_target = ValidationTarget.new(:regex_string => "12 inches", :genre_out => "shrek", :genre_in => "polka", :acceptance => true, :length => "12345678", :exist_foo => "bar")
    v_target.save
    assert_equal "Regex string only metric allowed", v_target.errors.full_messages[0]
  end
  
  def test_validation_target_length_positive
    v_target = ValidationTarget.new(:length => "12345678", :regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :acceptance => true, :exist_foo => "bar")
    v_target.save
    assert_nil v_target.errors.full_messages[0]
  end
  
  def test_validation_target_length_negative
    v_target = ValidationTarget.new(:length => "123", :regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :acceptance => true, :exist_foo => "bar")
    v_target.save
    assert_equal "Length too short", v_target.errors.full_messages[0]
  end
  
  def test_validation_target_presence_of_positive
    v_target = ValidationTarget.new(:exist_foo => "bar", :length => "12345678", :regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :acceptance => true)
    v_target.save
    assert_nil v_target.errors.full_messages[0]
    assert_equal true, v_target.valid?
  end
  
  def test_validation_target_presence_of_negative
    v_target = ValidationTarget.new(:length => "12345678", :regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :acceptance => true)
    v_target.save
    assert_equal "Exist foo must be defined", v_target.errors.full_messages[0]
  end
  
  def test_validation_method_negative
    v_target = ValidationTarget.new(:length => "house", :exist_foo => "bar", :regex_string => "12cm", :genre_out => "shrek", :genre_in => "polka", :acceptance => true)
    v_target.save
    assert_equal "We don't allow house music", v_target.errors.full_messages[0]
    assert_equal false, v_target.valid?
  end
end