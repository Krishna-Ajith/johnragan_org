require 'test/unit'
require 'delegate'

class Vehicle
  def go(speed)
    "Going forward at #{speed} mph"
  end
  
  def stop
    "braking to a stop"
  end
  
  def left_signal
    "Turning on left signal"
  end
end


class Motorcycle < DelegateClass(Vehicle)
  def initialize(vehicle)
    super(vehicle)
    @vehicle = vehicle
  end
  
  def wheelie
    "popping a wheelie"
  end  
  
  def left_signal
    "#{@vehicle.left_signal} flashing"
  end
end


# Find a more class_macro or something approach to this
class Motorcycle2
  def initialize
    @delegate = Vehicle.new
  end
  
  def wheelie
    "popping a wheelie"
  end
  
  def left_signal
    "#{@delegate.left_signal} flashing"
  end  
    
  def method_missing(method_name, *args, &block)
    @delegate.send(method_name, *args, &block)
  end
end  

class DelegateTest < Test::Unit::TestCase
  def test_delegate
    vehicle = Vehicle.new
    motorcycle = Motorcycle.new(vehicle)
    assert_equal "Going forward at 55 mph", motorcycle.go(55)
    assert_equal "braking to a stop", motorcycle.stop
    assert_equal "popping a wheelie", motorcycle.wheelie
    assert_equal "Turning on left signal flashing", motorcycle.left_signal
  end
  
  def test_class_delegate
    motorcycle = Motorcycle2.new
    assert_equal "Going forward at 55 mph", motorcycle.go(55)
    assert_equal "braking to a stop", motorcycle.stop
    assert_equal "popping a wheelie", motorcycle.wheelie
    assert_equal "Turning on left signal flashing", motorcycle.left_signal
  end
end