require 'name_parser'

class SantaListReporter
  include NameParser
  
  def matches_as_newline_str(matches)
    str = ""
    matches.each do |santa, receiver|
      str += "#{first_name(santa)} #{last_name(santa)} -> #{first_name(receiver)} #{last_name(receiver)}\n"
    end
    str
  end
end