module M
     def self.included(cl)
          puts "I have just been mixed into #{cl}"
          
          def cl.a_class_method
               puts "Now the class has a new class method."
          end
     end
end

class C
  include M
end

C.a_class_method