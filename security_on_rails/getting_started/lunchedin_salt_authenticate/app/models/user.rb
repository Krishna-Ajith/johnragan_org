#---
# Excerpted from "Security on Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material, 
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose. 
# Visit http://www.pragmaticprogrammer.com/titles/fr_secure for more book information.
#---
class User < ActiveRecord::Base
  validates_presence_of :email, :first_name, :last_name, :username, :password
  validates_uniqueness_of :username
  validates_length_of :zip_code, :is => 5
  validates_numericality_of :zip_code
  validates_confirmation_of :password
  has_many :events
  has_many :comments, :as => :commentable
  belongs_to :role
  
  def hashed_and_salted_password(p, s)
    OpenSSL::Digest::SHA1.new([s,p].to_s).hexdigest
  end
  
  def password=(password)
    @password = password
    salt = OpenSSL::Digest::SHA1.new(
      OpenSSL::Random.random_bytes(256)).hexdigest
    write_attribute(:salt,
      salt)
    write_attribute(:password,
      hashed_and_salted_password(password, salt))
      #password)
  end
  
  def authentic?(p)
    password_hash ==
      hashed_and_salted_password(p,:salt)
  end
end
