=begin
Every class name is a constant (which is why they begin with uppercase letters).  It 
  evaluates the class object, which is an instance of the class Class.  This is distinct 
  from the Class object, which represents the actual class Class.

   * "class object" - any object which represents a class
   * "Class object" - the class Class, which is the superclass of all class objects

Class inherits from Module; thus, every class is a Module.  However, classes cannot be mixed 
into other classes.

----------

Every ruby object has the following fields in memory:  # seems like some is the object and 
some is the class object

   * klass.  Pointer to the class object of this object.
   * iv_tbl.  "Instance Variable Table", a hashtable containing the instance variables 
          belonging to this object.
   * flags.  A bitfield of Boolean flags with some status information, such as the object's 
          taint status, garbage collection mark bit, and whether the object is frozen.
   * m_table.  "Method Table", a hashtable of this class or module's instance methods.
   * super.  A pointer to this class or module's superclass.
-----------------

Method Lookup Rules

  1. Ruby follows the receiver's klass pointer and searches the m_tbl of that class object 
      for a matching method.
  2. If not, it follows the class object's super pointer and searches its m_tbl
  3. It progresses in this manner until the top of the super chain is reached
  4. If not found, it invokes method_missing on the receiver of the original method, which 
      starts the process over again.
------------------
=end
class A
end

puts A.class
puts A.superclass
puts A.superclass.class

=begin
  1. The object class A's super pointer points to the Object's object class
  2. Both of their klass pointers point to the Class class (the Class object)
  3. The Class class has a klass pointer to a Class class (itself)
=end

class B < A
end

puts "--- B < A ---"
puts B.class
puts B.superclass
puts B.superclass.class
puts B.superclass.superclass

=begin
It is like the above, except B's super points to A, whose super points to Object.

If in B, you invoke super in an instance method, it will begin with A and follow the method chain

-----------

Including Modules

ICLASSes are proxies for modules.  When you insert a module into a class, ruby inserts an 
ICLASS to represent that included module.  This is because the same module may be mixed into 
different classes, and the module only has a single super pointer.  See below:
=end

module Mixin
     def mixed_method
          puts "Hello from mixin"
     end
end

class A
     include Mixin
end

=begin
  1. A's super points to the ICLASS
  2. The ICLASS's klass points to the Module
  3. The ICLASS's super points to Object
If you include multiple modules into a class that all share the same name, the last one included 
is the one that is invoked.  The is because the links are linearized to resolve any ambiguity.

------------------

Singleton Class
=end

objA = A.new
objB = A.new

class << objA
     def to_s; "Object A"; end
end

puts objA.to_s  # "Object A"
puts objB.to_s  # "#<A:0x1c4e28>"
puts objA.class  # A      # Note that it finds the first non-virtual class in the lookup chain

=begin
  1. objA klass points to "Class:objA (virtual)", whose super points to A
  2. objB klass points to A
Called Singleton Class because only one can exist.  Can be defined on any object except FixNum 
  and symbol.

----------------

Singleton Classes of Class Objects

Since classes are also objects, they can also have their own singleton classes.  Since the 
singleton  class is accessed through the klass pointer of the owner's klass, the singleton class's 
instance methods are class methods of the singleton's owner.

A.to_s

  1. Follow A's klass to the Class
  2. Since not found, follow Class's super to Module
  3. Since not found, follow Module's super to Object, where it is found
  
You can define class methods on any class by defining instance methods on the Class object.  
  This would apply to all classes (which is less interesting):
=end

puts A.to_s

class Class
     def to_s; "Class#to_s" end
end

puts A.to_s  # => "Class#to_s"

# To define class methods on a unique class, you open up its singleton:

class <<A
     def to_s; "Class A"; end
end

puts A.to_s  # => "Class A"
puts String.to_s # => "B"

=begin
  1. A's klass points to Class:A (virtual), and its super points to Object
  2. Class:A(virtual)'s super points Class:Object (virtual), which Object's klass points to
-----------------------

There are a number of different ways to create class methods (note that self inside classes or 
  modules refers to the class or module):
=end

class A
     def A.class_method_one; "Class method 1"; end

     def self.class_method_two; "Also a class method"; end

     class <<A
          def class_method_three; "Still a class method"; end
     end

     class <<self
          def class_method_four; "Yes another class method"; end
     end
end

def A.class_method_five
     "Works outside a class method definition"
end

class <<A
     def A.class_method_six
          "YOu can open the metaclass outside of the class definition"
     end
end

# Notice this interesting idiom to invoke:

bar = %w{one two three four five six}.each do |number|
     puts A.send(:"class_method_#{number}")
end
puts bar.inspect

# --------------------
# Metaid

class Object
  # The hidden singleton that lurks behind everyone.  Since
  # self is the last statement, it returns the singleton.
  def metaclass; class << self; self; end; end
 
  # Invoke the block with the singleton as the receiver
  def meta_eval &blk; metaclass.instance_eval &blk; end
 
  # Adds methods to a singleton
  def meta_def name, &blk
    meta_eval { define_method name, &blk }
  end   
 
  # Defines an instance method within a class
  def class_def name, &blk
    class_eval { define_method name, &blk }
  end
end

class Person
  def name; "Bob"; end
  def self.species; "Homo sapiens"; end
end

p = Person.new
puts p.name  # Bob
puts Person.species # Homo sapiens

puts Person.instance_methods(false);  # name
puts Person.metaclass.instance_methods - Object.metaclass.instance_methods # species

Person.class_def(:name2) {"Rob"}
puts p.name2  # "Rob"
Person.meta_def(:species2) { "Homo sapiens 2"}
puts Person.species2  # Homo Sapiens 2
p.meta_def(:specific_to_p) { "specific to p" }
puts p.specific_to_p

=begin
--------------------
Instance Variable Lookup
Instance variables are not inherited in subclasses, but class variables are
=end

class Top
  @foo = "bar"
  @@classvar = "classvar"
end

class Bottom < Top
  def getFoo
    return @foo
  end
  
  def classVar
    return @@classvar
  end
end

bottom = Bottom.new
puts bottom.getFoo
puts bottom.classVar