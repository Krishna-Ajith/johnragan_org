require 'rubygems'
require 'stomp'
require 'json'

begin

  @port = 61613
  @host = "localhost"
  @user = ""
  @password = ""

  @destination = "/queue/hallo.world"

  print "Connecting to stomp://#{@host}:#{@port} as #{@user}\n"
  @conn = Stomp::Connection.open(@user, @password, @host, @port, true)
  puts "Sending input to #{@destination}"

  (1..3000).each do |count|
    reply_to = "/temp-queue/#{rand()}"

    @headers = {'persistent'=>'false', 'reply-to'=> reply_to}
 
    @conn.subscribe(reply_to, { :ack =>"client" })

    body={}
    body[:request_at] = Time.now.to_f
    body[:timeout] = rand()*2
    body[:response_at] = Time.now.to_f + body[:timeout]
    @conn.publish @destination, body.to_json, @headers

    puts "#{Time.at(body[:request_at]).strftime("%H:%M:%S")} -  until #{Time.at(body[:response_at]).strftime("%H:%M:%S")} waiting #{body[:timeout].to_i} answer from #{reply_to}"
  
    Timeout::timeout(20) do
      @msg = @conn.receive
      @conn.ack @msg.headers["message-id"]
      @conn.unsubscribe(reply_to)
    end
  
    body = JSON.parse(@msg.body)
    puts body.inspect; $stdout.flush
    puts "start-request = #{body['start_at']-body['request_at']}"
    puts "round_trip-timeout = #{Time.now.to_f-body['request_at']-body['timeout']}"
    puts ''
  end

rescue Exception => e
  puts '-----------------------'
  puts "End at: #{Time.now.to_f}"
  raise e
end
