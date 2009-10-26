class OrderObserver < ActiveRecord::Observer
  def after_create(an_order) 
    an_order.update_attributes(:status => "an order was created")
    an_order.save
  end
  
  # DON'T FORGET THAT OBSERVERS NEED TO BE ADDED TO THE ENVIRONMENT.RB FILE (COMMENTED OUT BY DEFAULT)
end