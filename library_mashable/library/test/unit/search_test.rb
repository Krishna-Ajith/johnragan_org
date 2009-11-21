require File.dirname(__FILE__) + '/../test_helper'

class SearchTest < ActiveSupport::TestCase
  def test_get_library
    search = Search.new
    data = search.library_data("moscow rules")
    assert data =~ /moscow rules/
  end
end