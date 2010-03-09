module NameParser
  EXPR = /(\w*)\s(\w*)/
  
  def first_name(full_name)
    EXPR.match(full_name)[1]
  end
  
  def last_name(full_name)
    EXPR.match(full_name)[2]
  end  
end