class SearchController < ApplicationController
  def index
    
  end
  
  def find
    @name = params[:search][:name]
    search = Search.new
    
    # http://fcplcat.fairfaxcounty.gov/uhtbin/cgisirsi/x/0/0/5?searchdata1=moscow%20rules{245}&library=ALL&user_id=GUEST&password=1111
  end
end
