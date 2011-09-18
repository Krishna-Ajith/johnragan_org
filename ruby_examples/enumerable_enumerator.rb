require "enumerator"
module Enumerable
  def map_with_index &b
    enum_for(:each_with_index).map(&b)
  end
end

puts ("a".."f").map_with_index{|letter, i| [letter,i]}.inspect

h = { "one" => 1, "two" => 2, "three" => 3}

# Takes hash, builds an array of values, and maps over the array
puts h.values.map{|value| value + 1}

# More efficient, as it removes the intermediate steps
puts h.enum_for(:each_value).map{|value| value + 1}

# hash.each_value.map {|value| value + 1}    - The 1.9 version