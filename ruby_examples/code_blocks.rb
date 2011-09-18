def yield_an_arg
     puts "Yielding 10!"
     yield(10)
end

yield_an_arg {|x| puts "> Code block received this argument: #{x}" }

# -----------------
# Returning a value

def more_yielding
     puts "The code block shall multiply a number by 10."
     result = yield(3)
     puts "The result of this operation is #{result}."
end

more_yielding { |x| x * 10 }

# ----------------
# Array multiple iterations

def temp_chart(temps)
     for temp in temps
          converted = yield(temp)
          puts "#{temp}\t#{converted}"
     end
end

celsiuses = [0, 10, 20, 30, 40, 50]
temp_chart(celsiuses) { |cel| cel * 9 / 5 * 32 }

[0, 10, 20, 30, 40, 50].each { |x| puts x * 10 }