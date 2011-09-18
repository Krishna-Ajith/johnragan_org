begin
     a = 4/0
rescue ZeroDivisionError
  puts "divide by zero raises an error"
end

def fussy_method(x)
     raise ArgumentError, "I need a number under 10" unless x < 10
end

fussy_method(11)

# RuntimeError
# NoMethodError
# NameError
# IOError
# Errno::error
# TypeError
# ArgumentError

class MyNewException < Exception
end

raise MyNewException, "some new kind of error has occurred!"

