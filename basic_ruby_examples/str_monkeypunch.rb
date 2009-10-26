str = "I am a string, and I am defining a new singleton method called twice, which prints this twice.  Let's see."
puts str
def str.twice
     self + " " + self
end
puts str.twice   #I am a string I am a string