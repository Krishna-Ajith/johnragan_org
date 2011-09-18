class C
     def initialize
          @x = 1
     end
end

c = C.new
puts "here, we are using instance_eval on the class C to gets its private @x field"
c.instance_eval { puts @x }

class C
  def reveal_x
    p @x
  end
end

puts "Here we are monkey patching C to add a new method which returns the private @x"
c.reveal_x

puts "finally, we are monkey patching a C instance to return the private @x"
def c.show_x
  p @x
end

c.show_x