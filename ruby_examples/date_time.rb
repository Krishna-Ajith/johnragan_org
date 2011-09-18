puts Time.now.strftime('%b %d, %Y')

require 'date'
Date.parse("April 24 1705").england.strftime("%B %d %Y")   # "April 13, 1705"

d = Date.today
puts d               # "2006-01-07"

# << and >> go backward or forward by the number of months supplied:

puts d << 2      # "2005-11-17"
puts d >> 5     # "2006-06-17"

=begin
For strftime("%m-%d-%Y"), here are some of the common settings

%Y - year (four digits)
%y - year (last two digits)
%b, %B - short month, full month
%m - Month (number)
%d Day of month (left-padded with zeroes)
%e - day of month (left-padded with blanks)
%a, %A - short day name, full day name
%H, %I  Hour (24-hour clock), hour (12-hour clock)
%M - minute
%S - second
%C - equivalent to "%a %b %d %H:%M:%S %Y"
%x - equivalent to "%m/%d/%y"
=end