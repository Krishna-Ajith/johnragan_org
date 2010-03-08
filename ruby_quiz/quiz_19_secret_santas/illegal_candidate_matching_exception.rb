class IllegalCandidateMatchingException < Exception
  def initialize(santa, receiver)
    super("#{santa.first_name} #{santa.last_name} cannot be the santa for #{receiver.first_name} #{receiver.last_name}")
  end
end