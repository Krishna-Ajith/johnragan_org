class ClockRadio
  def on!
    puts "- this is the original on! method"
    @on = true
  end
end

class ClockRadio
  alias :old_on! :on!
  
  def on!
    old_on!
    puts "- this is the added functionality on the new on! method"
    @display_time = true
  end
end

cr = ClockRadio.new
puts "let's first invoke the new on! method, which invokes the old one"
cr.on!
puts "let's invoke the old on! method, which is now old_on!"
cr.old_on!