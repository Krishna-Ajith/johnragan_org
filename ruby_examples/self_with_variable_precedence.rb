class A
  puts "we have a method called talk which says 'talk talk'"
  def talk
    "talk talk"
  end
  
  def howdy
    puts "in a method, we want to invoke talk, but we have a local variable talk, so when we invoke, we"
    puts "get 'howdy' instead of 'talk talk'.  We need to use self.talk here:"
    talk = "howdy"
    puts talk  
  end
end

a = A.new
a.howdy