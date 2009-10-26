class C
     def method_missing(m)
          puts "There's no method called #{m} here -- please try again."
     end
end

C.new.anything
