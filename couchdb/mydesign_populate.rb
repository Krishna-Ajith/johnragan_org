require 'rubygems'
require 'couchrest'

DATABASE_NAME = "mydesign"
DATABASE_URL = "http://127.0.0.1:5984/#{DATABASE_NAME}"

#@old_db = CouchRest.database DATABASE_URL
#if @old_db.server.available_database? DATABASE_NAME
#  CouchRest.delete DATABASE_URL
#end
system("curl -X DELETE http://127.0.0.1:5984/#{DATABASE_NAME}")

def database
  @db ||= CouchRest.database! DATABASE_URL
end

def create_ride(type, name, park, rating, filePath)
  response = create_ride_doc(type, name, park, rating)
  put_attachment(response, "picture", filePath)
end 

def create_ride_doc(type, name, park, rating)
  database.save_doc({:type => type,:name => name, :park => park, :rating => rating})
end

def create_dining(type, name, park, rating, cost, filePath)
  response = create_dining_doc(type, name, park, rating, cost)
  put_attachment(response, "picture", filePath)
end 

def create_dining_doc(type, name, park, rating, cost)
  database.save_doc({:type => type,:name => name, :park => park, :rating => rating, :cost => cost})
end

def put_attachment(doc, name, file)
  docid = doc['id']
  rev = doc['rev']
  system ("curl -vX PUT #{DATABASE_URL}/#{docid}/#{name}?rev=#{rev}  --data-binary @#{file} -H 'Content-Type: image/jpg'")
end  

create_ride("ride", "Living With The Land", "Epcot", 7, "./images/living_with_the_land.jpg")
create_ride("ride", "Sounds Dangerous", "Disney Studios", 2, "./images/sounds_dangerous.jpg")
create_ride("ride", "Expedition Everest", "Animal Kingdom", 10, "./images/everest.jpg")
create_ride("ride", "Splash Mountain", "Magic Kingdom", 9, "./images/splash_mountain.jpg")
create_ride("ride", "Soaring", "Epcot", 9, "./images/soaring.jpg")
create_ride("ride", "Peter Pan", "Magic Kingdom", 7, "./images/peter_pan.jpg")
create_ride("ride", "Haunted Mansion", "Magic Kingdom", 8, "./images/haunted_mansion.jpg")
create_ride("ride", "Dinosaur", "Animal Kingdom", 9, "./images/dinosaur.jpg")
create_ride("ride", "Circle of Life", "Epcot", 6, "./images/circle_of_life.jpg")
create_ride("ride", "Primeval Whirl", "Animal Kingdom", 7, "./images/primeval_whirl.jpg")

create_dining("dining", "Hollywood Brown Derby", "Disney Studios", 10, :expensive, "./images/hollywood_brown_derby.jpg")
create_dining("dining", "Chefs de France", "Epcot", 7, :moderate, "./images/chefs_de_france.jpg")
create_dining("dining", "Yak and Yeti", "Animal Kingdom", 7, :moderate, "./images/yak_yeti.jpg")
create_dining("dining", "Cosmic Rays", "Magic Kingdom", 6, :cheap, "./images/cosmic_rays.jpg")
create_dining("dining", "Pizzafari", "Animal Kingdom", 3, :cheap, "./images/living_with_the_land.jpg")
create_dining("dining", "Mama Melrose's", "Disney Studios", 6, :moderate, "./images/mama_melrose.jpg")
create_dining("dining", "Le Cellier", "Epcot", 8, :expensive, "./images/le_cellier.jpg")
create_dining("dining", "Tony's Town Square", "Magic Kingdom", 7, :expensive, "./images/tonys_town_square.jpg")

system("curl -X PUT http://127.0.0.1:5984/#{DATABASE_NAME}/_design/example -d @mydesign.json")