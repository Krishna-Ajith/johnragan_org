require 'test/unit'
require 'candidate'
require 'receiver_candidates'

class ReceiverCandidatesTest < Test::Unit::TestCase
  def setup
    @man_family_1 = Candidate.new("Mr Ragan")
    @woman_family_1 = Candidate.new("Mrs Ragan")
    @man_family_2 = Candidate.new("Mr Foechterle")
    @woman_family_2 = Candidate.new("Mrs Foechterle")
    
    @receiver_candidates = ReceiverCandidates.new
    @receiver_candidates.add(@man_family_1)
    @receiver_candidates.add(@woman_family_1)
    @receiver_candidates.add(@man_family_2)
    @receiver_candidates.add(@woman_family_2)
    
    @receiver_candidates.ready_for_matching!
  end
  
  def test_get_receiver_candidates_nominal
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert !@receiver_candidates.more_candidates?
  end  
  
  def test_get_receiver_candidates_with_reset
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.reset_for_next_matching_try!
    
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert @receiver_candidates.more_candidates?
    @receiver_candidates.next_random
    assert !@receiver_candidates.more_candidates?
  end
end