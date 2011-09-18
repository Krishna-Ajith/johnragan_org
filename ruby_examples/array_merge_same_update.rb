h = {:a => "a old", :b => "b", :c => "c"}
b = {:a => "a new ", :d => "d"}

puts "A merge means that old values are overridden, you should see 'a new'"
puts h.merge(b).inspect # also update is the same
puts "An update also means that old values are overridden, you should see 'a new'"
puts h.update(b).inspect # also update is the same
puts "update and merge are the same method"
