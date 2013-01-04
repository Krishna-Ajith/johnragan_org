require 'test_helper'

class AttractionsControllerTest < ActionController::TestCase
  setup do
    @attraction = attractions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:attractions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create attraction" do
    assert_difference('Attraction.count') do
      post :create, attraction: { description: @attraction.description, fast_pass: @attraction.fast_pass, height: @attraction.height, intensity: @attraction.intensity, name: @attraction.name, pal_mickey: @attraction.pal_mickey, rating: @attraction.rating, rider_swap: @attraction.rider_swap, wait_type: @attraction.wait_type, wheelchair: @attraction.wheelchair }
    end

    assert_redirected_to attraction_path(assigns(:attraction))
  end

  test "should show attraction" do
    get :show, id: @attraction
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @attraction
    assert_response :success
  end

  test "should update attraction" do
    put :update, id: @attraction, attraction: { description: @attraction.description, fast_pass: @attraction.fast_pass, height: @attraction.height, intensity: @attraction.intensity, name: @attraction.name, pal_mickey: @attraction.pal_mickey, rating: @attraction.rating, rider_swap: @attraction.rider_swap, wait_type: @attraction.wait_type, wheelchair: @attraction.wheelchair }
    assert_redirected_to attraction_path(assigns(:attraction))
  end

  test "should destroy attraction" do
    assert_difference('Attraction.count', -1) do
      delete :destroy, id: @attraction
    end

    assert_redirected_to attractions_path
  end
end
