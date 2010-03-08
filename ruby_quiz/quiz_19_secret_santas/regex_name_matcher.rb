class RegexNameMatcher
  NAME_MATCHING = /(\w*)\s(\w*)/
  FIRST_NAME_PAREN_GROUP = 1
  LAST_NAME_PAREN_GROUP = 2
  
  def self.first_name(full_name)
    NAME_MATCHING.match(full_name)[FIRST_NAME_PAREN_GROUP]
  end
  
  def self.last_name(full_name)
    NAME_MATCHING.match(full_name)[LAST_NAME_PAREN_GROUP]
  end
end