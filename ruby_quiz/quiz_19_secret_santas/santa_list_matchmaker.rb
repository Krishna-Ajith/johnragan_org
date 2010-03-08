require 'santa_candidates'
require 'receiver_candidates'
require 'santa_list_reporter'
require 'matches_validator'

class SantaListMatchmaker
  def match_santas_and_receivers(candidates_newline_separated_str)
    create_matches(candidates_newline_separated_str)
    matches_as_newline_str
  end   
  
private     

  def create_matches(candidates_newline_separated_str)
    @candidates_newline_separated_str = candidates_newline_separated_str
    prepare_for_matching
    match_until_no_illegal_combinations
  end
  
  def prepare_for_matching
    @santa_candidates = SantaCandidates.new
    @receiver_candidates = ReceiverCandidates.new
    
    candidates_str_to_array.each do |candidate_str|
      @santa_candidates.add(Candidate.new(candidate_str))
      @receiver_candidates.add(Candidate.new(candidate_str))
    end
    
    @receiver_candidates.ready_for_matching!  
  end
  
  def candidates_str_to_array
    @candidates_newline_separated_str.split("\n")
  end
  
  def match_until_no_illegal_combinations
    begin 
    end until create_match_then_return_result
  end
  
  def create_match_then_return_result
    begin
      randomly_match_candidates
      return true
    rescue IllegalCandidateMatchingException
      reset_for_next_matching_try!
      return false
    end
  end
  
  def randomly_match_candidates
    while @santa_candidates.more_candidates? do
      match_santa_then_receiver(@santa_candidates.next, @receiver_candidates.next_random)
    end
  end
  
  def reset_for_next_matching_try!
    @santa_candidates.reset_for_next_matching_try!
    @receiver_candidates.reset_for_next_matching_try!
  end
  
  def match_santa_then_receiver(santa, receiver)
    validate_matches(santa, receiver)
    
    @matches ||= {}
    @matches[santa] = receiver
  end
  
  def matches_as_newline_str
    SantaListReporter.new.matches_as_newline_str(@matches)
  end  

  def validate_matches(santa, receiver)
    MatchesValidator.new.validate_matches(santa, receiver)
  end  
end