class C
end

class D < C
end

puts D.superclass # "C"
puts D.superclass.superclass # "Object"
