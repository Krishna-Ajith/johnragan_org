class User < ActiveRecord::Base
  has_many :readings, 
    :before_add => :log_before_add,
    :after_add => :log_after_add,
    :before_remove => :log_before_remove,
    :after_remove => :log_after_remove
    
  def log_before_add
    update_attributes(:before_add_status => "added before")
    save
  end
  
  def log_after_add
    update_attributes(:after_add_status => "added after")
    save
  end
  
  def log_before_remove
    update_attributes(:before_remove_status => "remove before")
    save
  end
  
  def log_after_remove
    update_attributes(:after_remove_status => "remove after")
    save
  end
end
