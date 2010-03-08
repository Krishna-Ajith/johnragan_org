require 'regex_name_matcher'

class Candidate
  def initialize(full_name)
    @first_name = RegexNameMatcher.first_name(full_name)
    @last_name = RegexNameMatcher.last_name(full_name)
  end
  
  def first_name
    @first_name
  end
  
  def last_name
    @last_name
  end
  
  def same_family?(someone_else)
    last_name == someone_else.last_name
  end
end