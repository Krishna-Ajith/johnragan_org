class SantaCandidates
  def initialize
    @index = 0
  end
  
  def add(candidate)
    @candidates ||= Array.new
    @candidates << candidate
  end
  
  def next
    @index += 1
    @candidates.at(@index-1)
  end
  
  def reset_for_next_matching_try!
    @index = 0
  end
  
  def more_candidates?
    @index < @candidates.size
  end  
end