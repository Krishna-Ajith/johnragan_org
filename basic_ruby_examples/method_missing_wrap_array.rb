class Recipe
  attr_accessor :main_ingredient
end  

class Cookbook
  attr_accessor :title, :author
  
  def initialize
    @recipes = []
  end
  
  def method_missing(m, *args, &block)
    @recipes.send(m,*args,&block)
  end
end

cb = Cookbook.new

recipe_for_cake = Recipe.new
recipe_for_cake.main_ingredient = "flour"
recipe_for_chicken = Recipe.new
recipe_for_chicken.main_ingredient = "chicken"

puts "we are doing '<<' to add like an array, and method missing passes it the internal @recipes array"
cb << recipe_for_cake 
cb << recipe_for_chicken   
puts "we use 'find_all' with method_missing to redirect to interal @recipes array"
chicken_dishes = cb.find_all {|recipe| recipe.main_ingredient == "chicken"}
puts "we will know print out the one we find that is chicken recipe"
p chicken_dishes[0]