require 'rubygems'
require 'watir'

Watir::Browser.default = "firefox"
b = Watir::Browser.start "http://www.weather.com"
loc = b.text_field(:id, "whatwhereForm2")
loc.set "20148"
searchLoc = b.text_field(:id, "headerSearchButton")
searchLoc.flash