require "cgi"

url_encoded_string = CGI::escape("'Stop!' <said Fred>")
puts url_encoded_string
