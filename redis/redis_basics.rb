#basic setup to connect

require "redis"
require "json"

redis = Redis.new

# Mirroring the basic API

redis.set("mykey", "hello world")

puts redis.get("mykey")

# Storing JSON objects

the_array = [1, 2, 3].to_json
redis.set "foo", the_array
puts the_array

puts JSON.parse(redis.get("foo"))


# Pipelining

redis.pipelined do
  redis.set "foo", "bar"
  redis.incr "baz"
end


# "Transations"

redis.multi do
  redis.set "foo", "bar"
  redis.incr "baz"
end


# Futures

redis.pipelined do
  @set = redis.set "foo", "bar"
  @incr = redis.incr "baz"
end

puts @set.value

puts @incr.value