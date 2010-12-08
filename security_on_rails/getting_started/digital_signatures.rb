require 'openssl'
include OpenSSL::X509

puts "lets create a private key."
File.open("host.key" , "w" ) do |f|
  f.write(OpenSSL::PKey::RSA.new(1024))
end

puts "create a certificate containing public key"
File.open("host.cert1" , "w" ) do |f|
  private_key = OpenSSL::PKey::RSA.new(File::read('host.key' ))
  cert = OpenSSL::X509::Certificate.new
  dn = [ ["C", "JP"], ["O", "example"], ["CN", "www.example.jp"] ]
  cert.subject = OpenSSL::X509::Name.new(dn)
  cert.not_before = Time.now
  cert.not_after = Time.now + 365 * 24 * 60 * 60
  cert.public_key = private_key.public_key
  cert.serial = 3
  cert.version = 2
  cert.sign(private_key, OpenSSL::Digest::SHA1.new)
  f.write(cert)
end

puts "inspect the certificate"
# inspect the certificate
cert = Certificate.new(File.read("host.cert1" ))
puts "Subject: #{cert.subject}"
puts "Algorithm: #{cert.signature_algorithm}"
puts "Serial: #{cert.serial}"
puts "Not Before: #{cert.not_before}"
puts "Not After: #{cert.not_after}"
puts "#{cert.public_key.to_pem}"

puts "create and verify a digital signature"
cert = OpenSSL::X509::Certificate.new(File.read('host.cert1'))
private_key = OpenSSL::PKey::RSA.new(File.read("host.key"))
input = "Loafing is not permitted"
signature = private_key.sign(OpenSSL::Digest::SHA1.new, input)
is_verified = cert.public_key.verify(OpenSSL::Digest::SHA1.new, signature, input)
puts "is_verified is #{is_verified}"

puts "create a PKCS12 key store"
pkey = OpenSSL::PKey::RSA.new(512)
cert = OpenSSL::X509::Certificate.new
cert.version = 1
cert.subject = cert.issuer = OpenSSL::X509::Name.parse("/C=FOO" )
cert.public_key = pkey.public_key
cert.not_before = Time.now
cert.not_after = Time.now + (365*24*60*60)
cert.sign(pkey, OpenSSL::Digest::SHA1.new)
p12 = OpenSSL::PKCS12.create("supers3cr3t" , "P12 Certificate" , pkey, cert)
File.open("test.p12" , "w" ) { |s| s.write(p12.to_der) } 

puts "read from the key store"
p12 = OpenSSL::PKCS12.new(File::read('test.p12' ), "supers3cr3t" )
puts p12.certificate
puts p12.key
