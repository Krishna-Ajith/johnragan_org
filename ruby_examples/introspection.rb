class C
     def initialize
          @ivar = 1
     end
end

c = C.new
puts c.instance_variables     # => ["@ivar"]
puts c.instance_variable_get(:@ivar)   # 1

c.instance_variable_set(:@ivar, 3)
puts c.instance_variable_get(:@ivar)     # 3

# -------------

class C
     def inst_method
     end

     def self.cls_method
     end
end

c = C.new

class << c
     def singleton_method
     end
end

puts c.methods - Object.methods  # ["inst_method, "singleton_method"]
puts "next"
puts c.methods(false)  # ["singleton_method]

# false to skip superclass methods
puts C.instance_methods(false)  # ["inst_method"]

=begin
# Using Metaid's metaclass (which returns class Object for a Class):
C.metaclass.instance_methods(false)   # ["new", "allocate", "cls_method", "superclass"]
------------
=end

puts "next"
puts Array.instance_methods.grep /sort/  # ["sort!", "sort", "sort_by"]

#-----------
# ObjectSpace

include ObjectSpace

String a = "a"
String b = "b"
define_finalizer(a, proc { puts "a does something" })
define_finalizer(b, proc { puts "b does something" })
undefine_finalizer(a)
garbage_collect

c = 102.7
d = 95
ObjectSpace.each_object(Numeric) {|x| p x }
print "Total count: ", ObjectSpace.each_object {} ,"\n"
# Total count: 340

s = "I am a string"     
r = ObjectSpace._id2ref(s.id)
puts r == s   #true

# a will do nothing when garbage collected, but b will say "b does something"