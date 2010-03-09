class ReceiverCandidates
  def add(candidate)
    @all_receivers ||= Array.new
    @all_receivers << candidate
  end
  
  def more_candidates?
    @remaining_receivers.size > 0
  end
  
  def next_random
    @remaining_receivers.delete_at(next_random_index)
  end
  
  def reset_for_next_matching_try!
    @remaining_receivers = @all_receivers.clone
  end
  
private

  def next_random_index
    rand(@remaining_receivers.size)
  end
end