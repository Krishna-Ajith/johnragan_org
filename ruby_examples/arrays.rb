a = [1, "2", ["3", "4"]]
puts a.inspect

=begin
These are equivalent:

[]
Array.new
=end

# You can do this:

puts Array.new(3).inspect     # [ nil, nil, nil ]
puts Array.new(3, "abc").inspect    # [ "abc", "abc", "abc" ]

puts Array.new(3) {|n| n += 1; n * 10}     # [10,20,30]

# ---------------------

a = [ "red", "orange", "yellow", "purple", "gray", "indigo", "violet" ]
puts a[3,2].inspect   # ["purple", "gray"]

# -----------------

puts [1,2,3,4].unshift(0).inspect  # [0,1,2,3,4]
puts [1,2,3,4].push(5).inspect     # [1,2,3,4,5]
flip = [1,2,3,4] << 5         # [1,2,3,4,5]
puts flip.inspect


the_array = [1,2,3,4,5]
a = the_array.pop  # a is equal to 5, while the array is now [1,2,3,4]
puts a.inspect

the_array = [1,2,3,4,5]
a = the_array.shift  # a is equal to 1, while the array is now [2,3,4,5]
puts a.inspect

#concat is a bang version of + for array operations
#replace

puts [1,2,3].zip([4,5,6]).inspect # [[1,4],[2,5],[3,6]]

# -------------------


a = [0, 2, 4, 6]
b = [1, 3, 5, 7]

puts a.zip(b).flatten.inspect       # [0, 1, 2, 3, 4, 5, 6, 7]
# [1, 2, [3, 4, [5, 6], 7], [[[8,9]]]].flatten
# [1,2,3,4,5,6,7,8,9]

# -------------

puts [1,2,3,4].reverse.inspect     # [4,3,2,1]

puts ["abc", "de", "fgh"].join     # "abcdefgh"
puts ["abc", "de", "fgh"].join(", ")     # "abc, de, fgh"

puts [1,2,3,1,4,3,5,1].uniq.inspect     # [1,2,3,4,5]

# ----------

["a", "b", "c"].each_with_index {|x,i| puts "element #{i} is #{x}"}

     # element 0 is a
     # element 1 is b
     # element 2 is c

# -------------------

f1 = [1,2,3,4,5,6,7,8,9,10].find {|n| n > 5 }     # 6
puts f1

f2 = [1,2,3,4,5,6,7,8,9,10].find_all {|n| n > 5 }  # [6,7,8,9,10]
puts f2.inspect
[1,2,3,4,5,6,7,8,9,10].find_all {|n| n > 100 }  # []

f3 = [1,2,3,4,5,6,7,8,9,10].reject {|item| item > 5} # [1,2,3,4,5]
puts f3.inspect

=begin

-------------------

a.size # or length
a.empty?
a.include?(item)
a.any? { |item| test }
a.all? { |item| test }

--------------------

>> a = %w[a b c]
=> ["a", "b", "c"]
>> a.map {|x| x + "!"}
=> ["a!", "b!", "c!"]
>> a.map! {|x| x + "!"}
=> ["a!", "b!", "c!"]
>> 

=end