require File.dirname(__FILE__) + '/../test_helper'

class OrderTest < ActiveSupport::TestCase
  
  def test_named_scope
    Order.create(:pay_type => "check", :total => 1053)
    Order.create(:pay_type => "credit", :total => 55)
    Order.create(:pay_type => "check", :total => 704)
    Order.create(:pay_type => "cod", :total => 1542)
    
    # order_result = Order.find :first, :conditions => ['pay_type = ?', "check"]
    # assert_equal 1, order_result.id
    
    assert_equal 2, Order.checks.size
    
    assert_equal 2, Order.big_order(800).size
    assert_equal 3, Order.big_order(500).size
    
    assert_equal 2, Order.big_order(500).checks.size
    assert_equal 1, Order.big_order(500).pay_type("real-cod").size # callback converts "cod" to "real-cod"
  end
  
  def test_observer
    order = Order.create(:pay_type => "check", :total => 1053)
    order.reload
    assert_equal "an order was created", order.status
  end
  
  def test_order_transactionality_positive
    order1 = Order.create(:pay_type => "check", :total => 1053)
    order2 = Order.create(:pay_type => "credit", :total => 55)
    
    ActiveRecord::Base.transaction do  # change to negative example below and get to work
      order1.update_attributes(:total => 1000)     
      order2.update_attributes(:total => 2000) 
    end
    
    assert_equal 1000, order1.total
    assert_equal 2000, order2.total
  end
  
  def test_order_transactionality_negative
    order1 = Order.create(:pay_type => "check", :total => 1053)
    order2 = Order.create(:pay_type => "credit", :total => 55)
    
    begin
      Order.transaction(order1,order2) do
        order1.update_attributes(:total => 1000)     
        order2.update_attributes(:total => 2000)
        raise 'boom' 
      end
    rescue
    end
    
    order1.reload
    order2.reload
    
    assert_equal 1053, order1.total
    assert_equal 55, order2.total
  end
  
  def test_order_callback
    order = Order.new(:pay_type => "cod", :total => 2000)
    order.save
    
    assert_equal "real-cod", order.pay_type
  end
  
  def test_do_select_one_count
    Order.create(:pay_type => "check", :total => 1053)
    Order.create(:pay_type => "credit", :total => 55)
    
    assert_equal 2, Order.do_select_one_count
  end
  
  def test_do_select_many_totals
    Order.create(:pay_type => "check", :total => 300)
    Order.create(:pay_type => "credit", :total => 55)
    Order.create(:pay_type => "check", :total => 100)
    Order.create(:pay_type => "check", :total => 500)
    
    result = Order.do_select_many_totals
    assert_equal 300, result[0]
    assert_equal 100, result[1]
    assert_equal 500, result[2]
  end
    
  def test_do_insert
    Order.do_insert
    order = Order.find_by_total 545
    
    assert_not_nil order
    assert_equal 'check', order.pay_type
    assert_equal 1, order.id
  end  
    
  def test_do_update
    Order.create(:pay_type => "check", :total => 300)
    Order.do_update
    order = Order.find_by_total 300
    
    assert_not_nil order
    assert_equal "credit", order.pay_type
  end
  
  def test_do_delete
    Order.create(:pay_type => "check", :total => 300)
    Order.do_delete
    
    assert_equal 0, Order.count
  end
  
  def test_factory_girl
    order = Factory.create(:order)
    assert_equal 'check', order.pay_type
    assert_equal 500, order.total
    
    order2 = Factory(:order)
    assert_equal 'check', order2.pay_type
    assert_equal 501, order2.total
  end
end