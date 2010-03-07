require 'test/unit'

3.times do
  class C
    puts "Hello"  # This gets printed out three times, without effect on the class definition
  end
end

v1 = 1                 

# can't access v1 across the class scope gate
class MyClass
  v2 = 2               
  puts local_variables    # => ["v2"], notice the v1 is not in scope
  
  def my_method
    v3 = 3
    puts local_variables  # => ["v3"]
  end

  puts local_variables    # => ["v2"]
end

obj = MyClass.new
obj.my_method        # => ["v3"]
obj.my_method        # => ["v3"]
puts local_variables      # => ["v1", "obj"]

# but with this approach, can access across the scope gate
MyClass2 = Class.new do
  puts "#{v1} in the class definition!"
  v3 = 'howdy'

  # and can go across this scope gate as well, as well as for those within class
  define_method :my_method do
    puts "#{v1} in the method!"
    puts v3
  end
  
  def method_scope_gate
    puts v3  # You cannot access v3 here (you must do a define_method instead)
  end
end

#----------------------

def define_methods
  shared = 0
 
  Kernel.send :define_method, :counter do
    shared
  end

  Kernel.send :define_method, :inc do |x|
    shared += x
  end
end

#-----------------------

class ScopeTest < Test::Unit::TestCase

  def test_this
    m = MyClass.new
  end
  
  def test_flattening_scope
    m2 = MyClass2.new
    m2.my_method
    
    # this last one is disabled because v3 cannot cut across the scope gate
    #m2.method_scope_gate
  end
  
  def test_shared_scope
    define_methods
    
    assert_equal 0, counter
    inc(4)
    assert_equal 4, counter
  end
end