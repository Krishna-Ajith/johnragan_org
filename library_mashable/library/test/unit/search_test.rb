require File.dirname(__FILE__) + '/../test_helper'

class SearchTest < ActiveSupport::TestCase
  def test_basics_while_constructing
    search_library = SearchLibrary.new
    book_records = search_library.find_book_in_library("moscow rules")
    assert_equal 5, book_records.size
    
    assert_equal 1, book_records[0].ranking
    assert_equal 2, book_records[1].ranking
    assert_equal 3, book_records[2].ranking
    assert_equal 4, book_records[3].ranking
    assert_equal 5, book_records[4].ranking
    
    assert_equal "Moscow rules", book_records[0].title
    assert_equal "Moscow rules [electronic resource]", book_records[1].title
    assert_equal "Moscow rules [sound recording]", book_records[2].title
    assert_equal "Moscow rules", book_records[3].title
    assert_equal "Moscow rules", book_records[4].title
    
    assert_equal "[Large print ed.]", book_records[0].edition
    assert_equal "", book_records[1].edition
    assert_equal "Unabridged.", book_records[2].edition
    assert_equal "", book_records[3].edition
    assert_equal "", book_records[4].edition
    
    assert_equal "Silva, Daniel 1960", book_records[0].author
    assert_equal "Silva, Daniel 1960", book_records[1].author
    assert_equal "Silva, Daniel 1960", book_records[2].author
    assert_equal "Silva, Daniel 1960", book_records[3].author
    assert_equal "Silva, Daniel 1960", book_records[4].author
  end

  def test_get_library_valid_title
    search_library = SearchLibrary.new
    # data = search_library.books_in_library("moscow rules")
    #     assert data =~ /moscow rules/
  end
  
  def test_get_library_invalid_title
    return
    search_library = SearchLibrary.new
    # data = search_library.books_in_library("asersdfa asfdknewrl")
    #     assert data =~ /asersdfa asfdknewrl/
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