# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_offline_rails_session',
  :secret      => 'e234faf7b9bb6b2c5121303643f63f1832d63ee8917467ef46f2090616fd2d50ae99aff1b31361e945ee612eeb4e57a9ec8419b56385ee5dde8944c398d689f4'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
