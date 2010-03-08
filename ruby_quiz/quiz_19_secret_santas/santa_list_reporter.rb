class SantaListReporter
  def matches_as_newline_str(matches)
    str = ""
    matches.each do |santa, receiver|
      str += "#{santa.first_name} #{santa.last_name} -> #{receiver.first_name} #{receiver.last_name}\n"
    end
    str
  end
end