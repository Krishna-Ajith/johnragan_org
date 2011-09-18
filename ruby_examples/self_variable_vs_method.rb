class Self1
  def venue=(the_venue)
    @venue = the_venue
  end
  
  def venue
    @venue
  end
  
  def howdy
    puts "in howdy, we use venue=, and we should have used 'self.venue='."
    puts "the value should have been 'disney', but it is not:"
    venue= "disney"  # Need to use self.venue here
    puts @venue
  end
end

s = Self1.new

puts "we have a 'venue=' method, which we use to assign 'initial value' to @venue"
s.venue = "initial value"
puts "The actual value is #{s.venue}"
s.howdy