print "Enter method name:"
m = gets.chomp

puts "we are creating a new method with the name #{m}, that when invoked says 'Hi!'"
puts "we will invoke it now"

eval("def #{m}; puts 'Hi!'; end")
eval(m)  # Hi!