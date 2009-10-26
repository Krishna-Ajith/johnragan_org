require 'test_helper'

class FilterDemosControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:filter_demos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create filter_demo" do
    assert_difference('FilterDemo.count') do
      post :create, :filter_demo => { }
    end

    assert_redirected_to filter_demo_path(assigns(:filter_demo))
  end

  test "should show filter_demo" do
    get :show, :id => filter_demos(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => filter_demos(:one).id
    assert_response :success
  end

  test "should update filter_demo" do
    put :update, :id => filter_demos(:one).id, :filter_demo => { }
    assert_redirected_to filter_demo_path(assigns(:filter_demo))
  end

  test "should destroy filter_demo" do
    assert_difference('FilterDemo.count', -1) do
      delete :destroy, :id => filter_demos(:one).id
    end

    assert_redirected_to filter_demos_path
  end
end
