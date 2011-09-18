class A
  def talk
    "talk talk"
  end
 
  def howdy
    talk = "howdy"
    puts talk 
  end
end

a = A.new
a.howdy
