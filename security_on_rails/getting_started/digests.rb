require 'openssl'
%w(DSS1 MD2 MD4 MD5 MDC2 RIPEMD160 SHA SHA1).each do |digest|
  h = eval("OpenSSL::Digest::#{digest}.new('chunky bacon')" ).hexdigest
  puts "#{digest}: #{h}"
end

OpenSSL::Digest::Digest.new('SHA1', 'chunky bacon')