class ReceiverCandidates
  def add(candidate)
    @all_receivers ||= Array.new
    @all_receivers << candidate
  end
  
  def ready_for_matching!
    @remaining_receivers = @all_receivers.clone
  end
  
  def more_candidates?
    @remaining_receivers.size > 0
  end
  
  def next_random
    @remaining_receivers.delete_at(next_random_index)
  end
  
  def reset_for_next_matching_try!
    ready_for_matching!
  end
  
private

  def next_random_index
    rand(@remaining_receivers.size)
  end
end