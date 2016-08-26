require 'test_helper'

class RoadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @road = roads(:one)
  end

  test "should get index" do
    get roads_url
    assert_response :success
  end

  test "should get new" do
    get new_road_url
    assert_response :success
  end

  test "should create road" do
    assert_difference('Road.count') do
      post roads_url, params: { road: { allow_delta_dist: @road.allow_delta_dist, allow_delta_time: @road.allow_delta_time, capacity: @road.capacity, dep_time: @road.dep_time, path: @road.path } }
    end

    assert_redirected_to road_url(Road.last)
  end

  test "should show road" do
    get road_url(@road)
    assert_response :success
  end

  test "should get edit" do
    get edit_road_url(@road)
    assert_response :success
  end

  test "should update road" do
    patch road_url(@road), params: { road: { allow_delta_dist: @road.allow_delta_dist, allow_delta_time: @road.allow_delta_time, capacity: @road.capacity, dep_time: @road.dep_time, path: @road.path } }
    assert_redirected_to road_url(@road)
  end

  test "should destroy road" do
    assert_difference('Road.count', -1) do
      delete road_url(@road)
    end

    assert_redirected_to roads_url
  end
end
