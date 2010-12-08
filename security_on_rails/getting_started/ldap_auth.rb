require 'rubygems'
require 'net/ldap'

def authentic?(u, p)
  ldap = Net::LDAP::new({
    :host => "JohnLab2-PC" ,
    :port => 389,
    :auth => {
      :method => :simple,
      :username => u,
      :password => p
    }
    #, :encryption => :simple_tls
  })
  bind = ldap.bind
  puts bind
  bind
end

puts "enter password"
password = gets
password.chop!
authentic?("uid=aragan,ou=users,dc=johnragan,dc=com", password)