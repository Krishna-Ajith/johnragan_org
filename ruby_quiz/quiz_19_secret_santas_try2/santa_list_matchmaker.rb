require 'santa_candidates'
require 'receiver_candidates'
require 'santa_list_reporter'
require 'name_parser'

class SantaListMatchmaker
  include NameParser
  
  def match_santas_and_receivers(candidates_newline_separated_str)
    @candidates_newline_separated_str = candidates_newline_separated_str
    create_matches
    SantaListReporter.new.matches_as_newline_str(@matches)
  end   
  
private

  class IllegalCandidateMatchingException < Exception
    def initialize
      super("Illegal match detected")
    end
  end

  def create_matches
    prepare_for_matching
    match_until_no_illegal_combinations
  end
  
  def prepare_for_matching
    @santa_candidates = SantaCandidates.new
    @receiver_candidates = ReceiverCandidates.new
    
    @candidates_newline_separated_str.split("\n").each do |candidate_str|
      @santa_candidates.add(candidate_str)
      @receiver_candidates.add(candidate_str)
    end
    
    @receiver_candidates.reset_for_next_matching_try!
  end
  
  def match_until_no_illegal_combinations
    begin 
    end until create_match_then_return_result
  end
  
  def create_match_then_return_result
    begin
      while @santa_candidates.more_candidates? do
        match_santa_then_receiver(@santa_candidates.next, @receiver_candidates.next_random)
      end
      return true
    rescue IllegalCandidateMatchingException
      @santa_candidates.reset_for_next_matching_try!
      @receiver_candidates.reset_for_next_matching_try!
      return false
    end
  end
  
  def match_santa_then_receiver(santa, receiver)
    if (last_name(santa) != last_name(receiver))
      raise IllegalCandidateMatchingException.new
    end
    
    @matches ||= {}
    @matches[santa] = receiver
  end 
end