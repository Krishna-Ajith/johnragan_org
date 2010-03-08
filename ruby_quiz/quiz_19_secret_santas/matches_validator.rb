require 'illegal_candidate_matching_exception'

class MatchesValidator
  def validate_matches(santa, receiver)
    if santa.same_family?(receiver)
      raise IllegalCandidateMatchingException.new(santa, receiver) 
    end
  end
end