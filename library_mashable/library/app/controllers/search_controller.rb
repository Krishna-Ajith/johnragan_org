class SearchController < ApplicationController
  def index
    
  end
  
  def find
    @name = params[:search][:name]
    # TODO - Handle situations where the library service portion is down.
    search_library = SearchLibrary.new
  end
end
