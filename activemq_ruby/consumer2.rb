## jaspinwall@super:~/rubies$ cat consumer2.rb
require 'rubygems'
require 'stomp'
require 'json'

begin

    @port = 61613
    @host = "localhost"
    @user = ""
    @password = ""

    @destination = "/queue/hallo.world"

    $stderr.print "Connecting to stomp://#{@host}:#{@port} as #{@user}\n"
    @conn = Stomp::Connection.open(@user, @password, @host, @port, true)
    $stderr.print "Getting output from #{@destination}\n"

    @conn.subscribe(@destination, { :ack =>"client" })
    while true
      @msg = @conn.receive

      body = JSON.parse @msg.body
      puts body.inspect
      $stdout.flush
      @conn.ack @msg.headers["message-id"]

      sleep(body['timeout'])

      reply_to = @msg.headers['reply-to']
      puts "reply_to: #{reply_to}  "
      body['start_at'] = Time.now.to_f
      body['end_at'] = Time.now.to_f
      puts "#{body['start_at']}: sleep for #{body['timeout']} until #{(Time.now+body['timeout']).to_f}"
      puts "start-request = #{body['start_at']-body['request_at']}"
      puts 
      @conn.publish reply_to, body.to_json
    end

rescue Exception => e
  puts '------------------------'
  puts Time.now.strftime("%H:%M:%S")
  raise e
end