# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_wdw_session',
  :secret      => 'b8ae9ce20fa42d4bbc51dcad947d3a3cddf9e30de9d563b54084e92fe161a7cda7e4dcd7d9398a56c12e224ec85582fed4044d2f391287ca073676ae421b26e4'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
