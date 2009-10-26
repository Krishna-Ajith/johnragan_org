class AccountClient
     def self.instance(uri=PS.system(:account_service_uri))          
       @instance ||= new(uri)     
      end     
      
      attr_accessor :uri     
      
      def initialize(uri) # parameters passed to new get passed here    
        @uri = uri     
      end
end

ac = AccountClient.instance "www.cnn.com"
ac.uri = "www.msnbc.com"
ac.initialize("www.wtf.com")
puts ac.uri
