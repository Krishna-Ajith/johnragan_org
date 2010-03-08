require 'test/unit'
require 'santa_list_matchmaker'
require 'candidate'

class SantaListMatchmakerTest < Test::Unit::TestCase
  def setup
    @santa_list_matchmaker = SantaListMatchmaker.new
    @santa = Candidate.new("Mr Ragan")
    @receiver_different_family = Candidate.new("Mr Foechterle")
    @receiver_same_family = Candidate.new("Mrs Ragan")
  end
  
  def test_santa_list_matches
    matches = @santa_list_matchmaker.match_santas_and_receivers(
      "Mr Ragan\nMrs Ragan\nMr Foechterle\nMrs Foechterle\nMr Giffin\nMrs Giffin\nMr Obama")
    
    assert_not_nil (matches =~ /Mr Ragan ->/)
    assert_not_nil (matches =~ /-> Mr Ragan/)
    assert_not_nil (matches =~ /Mrs Ragan ->/)
    assert_not_nil (matches =~ /-> Mrs Ragan/)
    assert_not_nil (matches =~ /Mr Foechterle ->/)
    assert_not_nil (matches =~ /-> Mr Foechterle/)
    assert_not_nil (matches =~ /Mrs Foechterle ->/)
    assert_not_nil (matches =~ /-> Mrs Foechterle/)
    assert_not_nil (matches =~ /Mr Giffin ->/)
    assert_not_nil (matches =~ /-> Mr Giffin/)
    assert_not_nil (matches =~ /Mrs Giffin ->/)
    assert_not_nil (matches =~ /-> Mrs Giffin/)
    assert_not_nil (matches =~ /Mr Obama ->/)
    assert_not_nil (matches =~ /-> Mr Obama/)
  end
  
  def test_match_legal_santa_then_receiver_valid
    santa_not_instance_var = @santa
    receiver_not_instance_var = @receiver_different_family
    
    assert_nothing_raised do
      @santa_list_matchmaker.instance_eval { match_santa_then_receiver(santa_not_instance_var, receiver_not_instance_var) }
    end  
  end  
  
  def test_match_legal_santa_then_receiver_invalid_because_same_family
    santa_not_instance_var = @santa
    receiver_not_instance_var = @receiver_same_family
    
    assert_raise IllegalCandidateMatchingException do
      @santa_list_matchmaker.instance_eval { match_santa_then_receiver(santa_not_instance_var, receiver_not_instance_var) }
    end 
  end
  
  def test_match_legal_santa_then_receiver_invalid_because_same_family_message
    santa_not_instance_var = @santa
    receiver_not_instance_var = @receiver_same_family
    
    begin
      @santa_list_matchmaker.instance_eval { match_santa_then_receiver(santa_not_instance_var, receiver_not_instance_var) }
    rescue IllegalCandidateMatchingException => mismatch
      assert_equal illegal_santa_assignment_error_msg(@santa, @receiver_same_family), mismatch.message
    end 
  end
  
  def test_match_legal_santa_then_receiver_invalid_because_same_person
    santa_not_instance_var = @santa
    
    assert_raise IllegalCandidateMatchingException do
      @santa_list_matchmaker.instance_eval { match_santa_then_receiver(santa_not_instance_var, santa_not_instance_var) }
    end  
  end
  
  def test_match_legal_santa_then_receiver_invalid_because_same_person_message
    begin
      santa_not_instance_var = @santa
      
      @santa_list_matchmaker.instance_eval { match_santa_then_receiver(santa_not_instance_var, santa_not_instance_var) }
    rescue IllegalCandidateMatchingException => mismatch
      assert_equal illegal_santa_assignment_error_msg(@santa, @santa), mismatch.message
    end 
  end
  
  def illegal_santa_assignment_error_msg(santa, receiver)
    "#{santa.first_name} #{santa.last_name} cannot be the santa for #{receiver.first_name} #{receiver.last_name}"
  end
end