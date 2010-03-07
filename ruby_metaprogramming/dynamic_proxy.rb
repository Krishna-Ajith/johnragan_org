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

class DataSourceDynamicProxy
  def initialize
    @data_source = DataSource.new
  end
  
  def method_missing(method_name, *args, &block)
    target_name = /yahoo_(\w*)/.match(method_name.to_s)[1]
    @data_source.send target_name, args
  end
end

class DynamicInvocationTest < Test::Unit::TestCase
  def test_dynamic_proxy
    ds = DataSourceDynamicProxy.new
    
    assert_equal "mouse info", ds.yahoo_get_mouse_info(17)
    assert_equal 49.53, ds.yahoo_get_mouse_price(17)
    
    assert_equal "cpu info", ds.yahoo_get_cpu_info(17)
    assert_equal 149.53, ds.yahoo_get_cpu_price(17)
    
    assert_equal "keyboard info", ds.yahoo_get_keyboard_info(17)
    assert_equal 249.53, ds.yahoo_get_keyboard_price(17)
  end
end