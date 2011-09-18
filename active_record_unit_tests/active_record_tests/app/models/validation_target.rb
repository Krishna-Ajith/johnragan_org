class ValidationTarget < ActiveRecord::Base
  validates_acceptance_of :acceptance,   # checkbox thing     
    :allow_nil => false, 
    :accept => true,  
    :message => "Please accept the terms to proceed"
  
  validates_inclusion_of :genre_in,     
    :in => %w{ polka twostep foxtrot },     
    :message => "no wild music allowed"
    
  validates_exclusion_of :genre_out,     
    :in => %w{ disney pixar universal },     
    :message => "only crappy animation allowed"
    
  validates_format_of :regex_string, 
    :with => /cm/,
    :message => "only metric allowed"
    
  validates_length_of :length, 
    :minimum => 5, 
    :message => "too short"
    
  validates_presence_of :exist_foo,
    :message => "must be defined"
    
  validate :special_length_check
  
  def special_length_check
    if length == "house"
      errors.add(:base, "We don't allow house music")
    end
  end
end