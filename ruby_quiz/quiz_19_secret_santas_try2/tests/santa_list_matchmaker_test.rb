require 'test/unit'
require 'santa_list_matchmaker'

class SantaListMatchmakerTest < Test::Unit::TestCase
  def setup
    @santa_list_matchmaker = SantaListMatchmaker.new
    @santa = "Mr Ragan"
    @receiver_different_family = "Mr Foechterle"
    @receiver_same_family = "Mrs Ragan"
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
  
  def test_multiple_santa_matches
    20.times do
      test_santa_list_matches
    end
  end
end