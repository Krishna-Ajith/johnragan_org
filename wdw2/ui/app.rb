# ruby -rubygems app.rb
require 'sinatra'
require 'mongo'
require 'json'

configure do
  DB = Mongo::Connection.new.db('example', :pool_size => 5, :timeout => 5);
end

set :public_folder, File.dirname(__FILE__) + '/'

# create something...
post '/api/:thing' do
  oid = DB.collection(params[:thing]).insert(JSON.parse(request.body.read.to_s))
  "{\"_id\": \"#{oid.to_s}\"}"
end

# get something(s)...
get '/api/:thing' do
  DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json
end

# update something...
put '/api/:thing' do 
  DB.collection(params[:thing]).update({'_id' => to_bson_id(params[:id])}, JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'},{:upsert  => true})
  from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json
end

# delete something...
delete '/api/:thing' do 
  DB.collection(params[:thing]).remove('_id' => to_bson_id(params[:id]))
end
# serve index.html as the default page ...
get '/' do
  send_file File.join( settings.public_folder, '/index.html' )
end

# serve index.html as the default page ...
get '/spec' do
  send_file File.join( settings.public_folder, '/spec/runner.html' )
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
