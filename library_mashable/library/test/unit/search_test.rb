require File.dirname(__FILE__) + '/../test_helper'

class SearchTest < ActiveSupport::TestCase
  def test_get_library_valid_title
    search = Search.new
    data = search.library_data("moscow rules")
    assert data =~ /moscow rules/
  end
  
  def test_get_library_invalid_title
    return
    search = Search.new
    data = search.library_data("asersdfa asfdknewrl")
    assert data =~ /asersdfa asfdknewrl/
  end
  
  def test_get_library_out_of_stock_title
    true
  end
  
  def test_get_library_down_for_maintenance
    true
  end
  
  def test_get_library_only_in_zoperations
    true
  end
  
  def test_session_expired
    # Your session has timed out.

    #Please click OK to start a new session.
  end
  
  def test_multiple_books_same_title
  end
  
  def test_same_book_different_versions
  end  
  
  def test_book_pagination
  end
  
  def test_unable_to_access_server
  end
end