class TermController < ApplicationController
  def term
      the_term = params["term"]
      logger.info("JPR - the term is: #{the_term} in term")
      render :text => "The term is have a nice day"
  end
  
  def uppercase
      the_term = params["term"]
      logger.info("JPR - the term is: #{the_term} in uppercase")
      render :text => params["term"].upcase
  end
end
