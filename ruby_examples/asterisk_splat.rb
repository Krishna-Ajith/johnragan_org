puts "the following line:  "
puts *1..10

puts "does exactly the same thing as"
(1..10).each { |x| puts x }

puts "lets try it with an array"
foo = ["a", "b", "c"]
puts *foo