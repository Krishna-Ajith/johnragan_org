class AuditObserver < ActiveRecord::Observer
  observe Order
  def after_create(an_order) 
    an_order.update_attributes(:audit_info => "adding a status message")
    an_order.save
  end
  
  # DON'T FORGET THAT OBSERVERS NEED TO BE ADDED TO THE ENVIRONMENT.RB FILE (COMMENTED OUT BY DEFAULT)
end