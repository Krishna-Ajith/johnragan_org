require File.dirname(__FILE__) + '/../test_helper'

class PersonTest < ActiveSupport::TestCase

  def test_person_sti
    Customer.create(:name => 'John Doe' , :email => "john@doe.com" ,:region => "South")
    wilma = Manager.create(:name => 'Wilma Flint' , :email => "wilma@here.com" ,:dept => 23)
    Customer.create(:name => 'Bert Public' , :email => "b@public.net" ,:region => "Midwest")
    barney = Employee.new(:name => 'Barney Rub' , :email => "barney@here.com" ,:dept => 23)
    barney.reports_to = wilma
    barney.save!
    manager = Person.find_by_name("Wilma Flint" )
    
    assert_equal("Manager", manager.class.to_s)
    assert_equal("wilma@here.com", manager.email)
    assert_equal(23, manager.dept)
    customer = Person.find_by_name("Bert Public" )
    assert_equal("Customer", customer.class.to_s)
    assert_equal("b@public.net", customer.email)
    assert_equal("Midwest", customer.region)
  end
end