# Proc objects

pr = Proc.new { puts "Inside a Proc's block" }
pr.call

pr2 = Proc.new {|x| puts "Called with argument #{x}" }
pr2.call(100)  # Called with argument 100

# ----------

pr = Proc.new { |x, y, z|  p x, y, z }
pr.call(1,2)
# 1
# 2
# nil

pr.call(1,2,3,4)
#1
#2
#3

#-------------

pr = Proc.new { |*x| p x }
pr.call
# []
pr.call(1)
# [1]
pr.call(1,2)
# [1,2]

# ------------

pr = Proc.new { |x, *y| p x, y }
pr.call(1,2,3)
# 1
# [2, 3]

# ---------------

# proc is another name for lambda, but should be avoided as it is being phased out
# --------------

=begin

   * UnboundMethod is like a Proc; it represents an instance method of a particular 
     class (and can be used for class methods as well).  It must be bound to a class before 
     it can invoked.
   * Method object is an UnboundMethod that has been bound to a class with UnboundMethod#bind.  
     They can also be obtained with Object#method.
=end


3 + 5
puts 3.+(5)

add_3 = 3.method(:+)
add_3 # => #<Method: Fixnum#+>


add_3.to_proc # converts to a proc
puts add_3.call(5)  # 8
puts add_3[5]  # 8, this is a synonum for call

# There are two ways to obtain an unbound method:

add_unbound = Fixnum.instance_method(:+)
puts add_unbound == 3.method(:+).unbind   # true
puts 3.+(6)
puts add_unbound.bind(3).call(7)  # 10
puts add_unbound.bind(15)[4]  # 19

# Note that these need to applied to an instance of the same class, else you will get an error.
