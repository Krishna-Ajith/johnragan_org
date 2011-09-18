def return_test
     puts "Here we have a lambda with a return, but we will stay here"
     l = lambda { return }
     l.call
     puts "Still here!  But now we will do a proc with a return, and we will be gone"
     p = Proc.new { return }
     p.call  # at this point, we would return from return_test
     puts "You won't see this message"
end

return_test