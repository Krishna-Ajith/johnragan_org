class C
     def self.inherited(subclass)
          puts "#{self} just got subclassed by #{subclass}"
     end
end

class D < C  # C just got subclassed by D
end
