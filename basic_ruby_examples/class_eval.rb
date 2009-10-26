C = Class.new

puts "we are using class_eval to dynamically add a new method to C, and then invoke it:"
C.class_eval do
  def some_method
    puts "Created in class_eval"
  end
end

c = C.new
c.some_method 
