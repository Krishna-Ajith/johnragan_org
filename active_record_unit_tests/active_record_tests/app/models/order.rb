class Order < ActiveRecord::Base
  before_save OrderCallbacks.new
  
  scope :checks, :conditions => { :pay_type => "check" }
  scope :big_order, lambda { |cost| { :conditions => ['total > ?', cost]  } }
  scope :pay_type, lambda { |the_type| { :conditions => ['pay_type = ?', the_type]  } }
  
  def self.do_select_one_count
    query = 'SELECT COUNT(*) FROM orders'
    result = ActiveRecord::Base.connection.select_one(query)
    result["COUNT(*)"].to_i
  end
  
  def self.do_select_many_totals
    query = "select total from orders where pay_type = 'check'"
    result = ActiveRecord::Base.connection.select_all(query)
    
    result.map { |value| value["total"].to_i }
  end
  
  def self.do_insert
    query = "INSERT INTO orders (ID, PAY_TYPE, TOTAL) VALUES (1,'check', 545)"
    ActiveRecord::Base.connection.insert(query)
  end
  
  def self.do_update
    query = "UPDATE orders SET pay_type = 'credit' WHERE total = 300"
    ActiveRecord::Base.connection.update_sql(query)
  end
  
  def self.do_delete
    query = "DELETE FROM orders WHERE total = 300"
    ActiveRecord::Base.connection.execute(query)
  end
end