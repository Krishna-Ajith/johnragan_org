require 'test/unit'
require 'candidate'

class CandidateTest < Test::Unit::TestCase
  def setup
    @candidate = Candidate.new("Mr Ragan")
    @candidate_same_family = Candidate.new("Mrs Ragan")
    @candidate_different_family = Candidate.new("Mrs Foechterle")
  end
  
  def test_instantiate_new_candidate
    assert @candidate
    assert_equal "Mr", @candidate.first_name
    assert_equal "Ragan", @candidate.last_name
  end
  
  def test_same_family?
    assert @candidate.same_family?(@candidate_same_family)
  end
  
  def test_different_family
    assert !(@candidate.same_family?(@candidate_different_family))
  end
end  