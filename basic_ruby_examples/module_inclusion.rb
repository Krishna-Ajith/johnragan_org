module Life      
  def answer           
    42      
  end
end

class Universe
end

u = Universe.new
begin
  u.answer  # => NoMethodError because Life not           
            # yet mixed into Universe
rescue
  puts "got NoMethodError (as expected) because tried to include module Life::answer prior to mixin to Universe"
end
            
u.extend(Life) # u is an object
puts "will now invoke answer, which should return 42"
puts u.answer  # => 42 because answer is now available           
          # as an instance method on u

begin          
  Universe.answer # => NoMethodError
rescue
  puts "got NoMethodError (as expected) by trying to invoke answer as a class method"
end  
