class HowdyBoy
  def howdy(msg)
    puts msg
  end
end

o = HowdyBoy.new

puts "we have a class, and we are using respond_to? to see if it has a certain method, and if so, we invoke it."
if o.respond_to? :howdy
     o.send :howdy, "ya'll"
end
