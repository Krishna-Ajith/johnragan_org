#---
# Excerpted from "Security on Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material, 
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose. 
# Visit http://www.pragmaticprogrammer.com/titles/fr_secure for more book information.
#---
require File.dirname(__FILE__) + '/../test_helper'

class EventsControllerTest < ActionController::TestCase
  tests EventsController

  test "should create event and assign to authenticated user" do
    @request.session[:user_id] = users(:bob).id
    post :create, :venue_id => 1, :event => { 
      :occurs_on => DateTime.now + 1,
      :name => 'Belgium Beer Bash', 
      :notes => 'be sure to bring quarters for mad galaga sessions'}
    assert assigns(:event)
    assert_equal(0, assigns(:event).errors.size)
    assert_redirected_to event_path(assigns(:event))
  end
  
  
  test "not_authorized_update_status" do
    @request.session[:user_id] = users(:bob).id
    post :update, :id => 1, :event => { :status => 'organized' }
    assert_template 'no_access'
  end 
  
  
  
  test "update status redirects to event" do
    @request.session[:user_id] = users(:wally).id
    post :update, :id => 1, :event => { :status => 'organized' }    
    assert assigns(:event)
    assert_redirected_to event_path(assigns(:event))
  end 
  
  
  def test_not_authorized_show
    @request.session[:user_id] = users(:bob).id
    get :show, :id => 1
    assert_template 'no_access'
  end
  
  def test_show
    @request.session[:user_id] = users(:wally).id
    get :show, :id => 1
    assert_template 'show'
  end
  
end
