# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_library_session',
  :secret      => 'd867dc05ebd115f045fafc4ec0ab76f85835e6445ffd8d3468d8bab50c3ce043f2d2499b692f897587d6a7e7a7d5312ef3e8325cf6ddfc9ccf0a13eb88c17d9e'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
