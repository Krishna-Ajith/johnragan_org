require 'openssl'
include OpenSSL

rsa = PKey::RSA.generate(512)
txt = "Chunky Bacon"
puts "Plain Text: #{txt}"

cipher_text_with_priv = rsa.private_encrypt(txt)
cipher_text_with_pub = rsa.public_encrypt(txt)

puts "Private key encrypted text #{cipher_text_with_priv}"
puts "Public key encrypted text #{cipher_text_with_pub}"

puts "== Plain Text Decrypted With Public Key =="
puts pt_with_pub = rsa.public_decrypt(cipher_text_with_priv)

puts "== Plain Text Decrypted With Private Key =="
puts pt_with_priv = rsa.private_decrypt(cipher_text_with_pub)