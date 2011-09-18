class PeterPan
     def initialize(speech)
          @speech = speech
     end
     def give_speech
          puts @speech
     end
end

p = PeterPan.new('girls talk too much')
p.give_speech