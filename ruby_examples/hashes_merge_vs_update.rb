h1 = {"Smith" => "John",
          "Jones" => "Jane" }
h2 = {"Smith" => "Jim" }

puts "h1.merge(h2), h1 is John, and h2 is Jim.  So it should now be John since it is pre-existing"

h1.merge(h2)
puts h1["Smith"] 

puts "with an update, the new one overwrites, so it should now be Jim"
h1.update(h2)
puts h1["Smith"]