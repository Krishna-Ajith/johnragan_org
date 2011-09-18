# 3 ways to instantiate:

hash1 = {} 

hash2 = {     "Connecticut" => "CT",
              "Delaware" => "DE" }

hash3 = Hash.new

hash4 = Hash["Connecticut" => "CT",
          "Deleware" => "DE"]
          
#-------------------

state_hash = {}
state_hash["New York1"] = "NY1"
state_hash.[]=("New York2", "NY2")
state_hash.store("New York3", "NY3")

# ---------------------

puts state_hash["New York1"]
puts state_hash.fetch("New York2")

# ------------

puts state_hash.values_at("New York1", "New York2").inspect    # ["NY, "DE"]  # Gets values at

# ----------------
# Default values:

puts Hash.new["no such key!"]     # nil
puts Hash.new(0)["no such key!"]   # 0

# ---------------------

# Automatic assignment of default values:

h = Hash.new {|hash, key| hash[key] = "foo" }
puts h["new key!"]     # {"new key!" => "foo"}

# ----------------

# Hash combining (destructive):

h1 = {"Smith" => "John",
          "Jones" => "Jane" }
h2 = {"Smith" => "Jim" }
h1.update(h2)
puts h1["Smith"] # "Jim"

# Hash combining (non-destructive):

h1 = {"Smith" => "John",
          "Jones" => "Jane" }
h2 = {"Smith" => "Jim" }
h1.merge(h2)
puts h1["Smith"] # "John"

# ----------
# Inverting
# Hash.invert flips the keys and values (beware that duplicate values can exist)
h1.invert
puts h1.inspect

# ---------
# Clearing

h1.clear()
puts h1.inspect

# ----------
# Replacing
# The replace method (which takes a hash) replaces the current hash's contents

num1 = { "a" => "A" }
num2 = { "b" => "B"}
num1.replace(num2)
puts num1.inspect

# ---------
# Iterating

{ 1 => "one", 2 => "two" }.each do |key, value|
     puts "The word for #{key} is #{value}."
end

# This puts out:
# The word for 1 is one.
# The word for 2 is two.

# ----------------
# Keys and values

a = { 1 => "one", 2 => "two" }.keys  # [1,2]
b = { 1 => "one", 2 => "two" }.values # ["one", "two"]
puts a.inspect
puts b.inspect

{ 1 => "one", 2 => "two" }.each_key {|k| puts "the next key is #{k}." }
{ 1 => "one", 2 => "two" }.each_value {|v| puts "the next value is #{v}." }

# --------------
# Filtering

a = { 1 => "one", 2 => "two" }.select {|k,v| k > 1}  # [[2, "two"]]

b = { 1 => "one", 2 => "two" }.find {|k,v| k == 1}  # [1, "one"]

c = { 1 => "one", 2 => "two", 3 => "three"}.map {|k,v| v.upcase }  # ["ONE", "TWO", "THREE"]

puts a.inspect
puts b.inspect
puts c.inspect

# ----------------
# Query methods
# has_key?(1)   # synonyms include include?(1), key?(1), member?(1)
# has_value?("three")     # value?("three")
# empty?
# size

# ------------