#---
# Excerpted from "Security on Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material, 
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose. 
# Visit http://www.pragmaticprogrammer.com/titles/fr_secure for more book information.
#---
require File.dirname(__FILE__) + '/../test_helper'

class VenuesControllerTest < ActionController::TestCase
  tests VenuesController
  
  def test_create_venue_success
    @request.session[:user_id] = 1
    post :create, :venue => { 
      :name => 'Test Venue', :address_one => 'Some Address', :city => 'Plano', :state => 'TX'}
  end
  
  
  def test_logged_out_redirect
    get :index
    assert_response :redirect
    assert_redirected_to :controller => 'session'
  end
  
  
  def test_index
    @request.session[:user_id] = 1
    get :index
    assert assigns(:venues)
  end
  
  def test_tag
    @request.session[:user_id] = 1
    get :tag, :id => 1
    assert assigns(:venues)
  end
end
