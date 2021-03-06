require 'test/unit'

class DataSource
  def get_mouse_info(id)
    "mouse info"
  end
  
  def get_mouse_price(id)
    49.53
  end
  
  def get_cpu_info(id)
    "cpu info"
  end
  
  def get_cpu_price(id)
    149.53
  end
  
  def get_keyboard_info(id)
    "keyboard info"
  end
  
  def get_keyboard_price(id)
    249.53
  end
end

# class Computer
#   def initialize(computer_id, data_source)
#     @id = computer_id
#     @data_source = data_source
#   end
# 
#   def mouse
#     info = @data_source.get_mouse_info(@id)
#     price = @data_source.get_mouse_price(@id)
#     result = "Mouse: #{info} ($#{price})"
#     return "* #{result}" if price >= 100
#     result
#   end
# 
#   def cpu
#     info = @data_source.get_cpu_info(@id)
#     price = @data_source.get_cpu_price(@id)
#     result = "Cpu: #{info} ($#{price})"
#     return "* #{result}" if price >= 100
#     result
#   end
# 
#   def keyboard
#     info = @data_source.get_keyboard_info(@id)
#     price = @data_source.get_keyboard_price(@id)
#     result = "Keyboard: #{info} ($#{price})"
#     return "* #{result}" if price >= 100
#     result
#   end
# end

class Computer
  def initialize(computer_id, data_source)
    @id = computer_id
    @data_source = data_source
  end
  
  def method_missing(method_name, *args, &block)
    info = @data_source.send "get_#{method_name}_info", @id
    price = @data_source.send "get_#{method_name}_price", @id
    result = "#{method_name.to_s.capitalize}: #{info} ($#{price})"
    return "* #{result}" if price >= 100
    result
  end
  
  def respond_to?(method)    
    @data_source.respond_to?("get_#{method}_info") || super
  end
  
end

class RefactoringWithMethodMissingTest < Test::Unit::TestCase
  def test_refactoring
    computer = Computer.new(25, DataSource.new)
    assert_equal "Mouse: mouse info ($49.53)", computer.mouse
    assert_equal "* Cpu: cpu info ($149.53)", computer.cpu
    assert_equal "* Keyboard: keyboard info ($249.53)", computer.keyboard
  end
end