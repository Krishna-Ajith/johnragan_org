require 'test/unit'
require 'santa_candidates'

class SantaCandidatesTest < Test::Unit::TestCase
  def setup
    @man_family_1 = "Mr Ragan"
    @woman_family_1 = "Mrs Ragan"
    @man_family_2 = "Mr Foechterle"
    @woman_family_2 = "Mrs Foechterle"
    
    @santa_candidates = SantaCandidates.new
    @santa_candidates.add(@man_family_1)
    @santa_candidates.add(@woman_family_1)
    @santa_candidates.add(@man_family_2)
    @santa_candidates.add(@woman_family_2)
  end
  
  def test_get_santa_candidates_nominal
    assert_equal @man_family_1, @santa_candidates.next
    assert_equal @woman_family_1, @santa_candidates.next
    assert_equal @man_family_2, @santa_candidates.next
    assert_equal @woman_family_2, @santa_candidates.next
  end
  
  def test_get_santa_candidates_with_reset
    assert_equal @man_family_1, @santa_candidates.next
    assert_equal @woman_family_1, @santa_candidates.next
    
    @santa_candidates.reset_for_next_matching_try!
    
    assert_equal @man_family_1, @santa_candidates.next
    assert_equal @woman_family_1, @santa_candidates.next
    assert_equal @man_family_2, @santa_candidates.next
    assert_equal @woman_family_2, @santa_candidates.next
  end
  
  def test_more_candidates?
    assert @santa_candidates.more_candidates?
    @santa_candidates.next
    assert @santa_candidates.more_candidates?
    @santa_candidates.next
    assert @santa_candidates.more_candidates?
    
    @santa_candidates.reset_for_next_matching_try!
    assert @santa_candidates.more_candidates?
    
    @santa_candidates.next
    assert @santa_candidates.more_candidates?
    @santa_candidates.next
    assert @santa_candidates.more_candidates?
    @santa_candidates.next
    assert @santa_candidates.more_candidates?
    @santa_candidates.next
    assert !@santa_candidates.more_candidates?
  end
end