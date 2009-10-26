puts "we have a method that takes an array and yields each one to a block"
def temp_chart(temps)
     new_temps = []
     for temp in temps
          new_temps << yield(temp)
     end
     new_temps
end

puts "the values are [0,10, 20, 30, 40, 50]"
celsiuses = [0, 10, 20, 30, 40, 50]

puts "the formula is cel * 9 / 5 + 32, so the new values are"
puts temp_chart(celsiuses) { |cel| cel * 9 / 5 + 32 }
