# ruby -rubygems app.rb
require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/'

# serve index.html as the default page ...
get '/' do
  send_file File.join( settings.public_folder, '/index.html' )
end

# serve all non routed requests directly ...
get '*' do
  send_file File.join( settings.public_folder, request.path )
end

# utilities ...
def to_bson_id(id) 
  BSON::ObjectId.from_string(id) 
end

def from_bson_id(obj) 
  obj.merge({'_id' => obj['_id'].to_s}) 
end