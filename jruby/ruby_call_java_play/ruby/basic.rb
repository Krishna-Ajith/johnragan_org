require 'java'

# From the ruby directory
# jruby -J-Xss64m -J-cp ./lib/jruby.jar:./lib/JavaTarget.jar basic.rb

# for doing it from source:
# jruby -J-Xss64m -J-cp ./lib/jruby.jar basic.rb
# uncomment this to do it from source:
#require './lib/jruby.jar'  

JavaTarget = org.johnragan.JavaTarget

java_target = org.johnragan.JavaTarget.new "Bonjour!"
java_target.print_message

java_target_using_constant = JavaTarget.new "Salut!"
java_target_using_constant.print_message

JavaTarget::static_method_greeting "This is my static greeting."

colors = %w[red blue green]
puts colors
puts java_target.array_to_upper(colors)
puts java_target.array_to_upper(colors)[0]
puts java_target.array_to_upper(colors)[1]
puts java_target.array_to_upper(colors)[2]

java_target.variable_args_method "one", "two", "three", "four"

games = %w[halo mass_effect]
java_list = java_target.array_to_upper_as_list(games)

java_list.each do |game|
  puts "game is: #{game}"
end

java_out = java.lang.System.out.to_io
#java_out << 'Hello from JRuby!'

begin
  java.text.SimpleDateFormat.new(nil)
rescue java.lang.NullPointerException
  puts 'Ouch!'
end

puts java_target.overloaded_method("a string");
puts java_target.overloaded_method(727);

puts java_target.how_many_bits_needed 1_000_000
puts java_target.java_send :howManyBitsNeeded, [Java::int],  1_000_000

how_many_bits_needed = java_target.java_method :howManyBitsNeeded, [Java::int]
puts how_many_bits_needed.call 1_000_000

java_import java.lang.Runnable

class Foo
  include Runnable
  
  def run
    puts "foo"
  end
end

callable = java.util.concurrent.Executors.callable(Foo.new)
callable.call

callable = java.util.concurrent.Executors.callable do
  puts "more direct"
end
callable.call

myproc = Proc.new { puts "proc methods" }
callable = java.util.concurrent.Executors.callable(myproc)
callable.call