# If method is venue=, you must use self.venue= as opposed to just venue=, 
# which will create a local variable called venue and then assign a value to it.

class C
     def show_var
          # This would belong to each individual instance
          @v = "I am an instance variable initialized to a string."
          puts @v
     end
     
     # This instance variable belongs to the class object
     @v = "Instance variables can appear anywhere...."      
end

C.new.show_var

# prints the following:
#   I am an instance variable initialized to a string.

# ----------------------

# top-level self
# for those not part of modules or classes - belongs to something called "main"
puts self

# -------------------------

# Inside class and module definitions

class C
     puts "Just started class C:"
     puts self  # Output: C
     module M
          puts "Nested module C::M"
          puts self     # Output C::M
     end
     puts "Back in the outer level of C:"
     puts self # Output C
end



# ----------------------

# Self in instance method definitions
# The instance object that is being invoked

class C
  def foo
    puts "inside of foo method for a given instance"
    puts self
  end
end

instance_c = C.new
instance_c.foo

=begin
--------------

Singleton-method and class-method definitions

For a singleton-method (a method definied solely on an object instance), the self is that object instance.

For class method definitions, it is the class itself

=end