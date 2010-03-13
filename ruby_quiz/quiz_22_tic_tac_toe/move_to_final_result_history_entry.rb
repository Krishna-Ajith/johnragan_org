class MoveToFinalResultHistoryEntry
  def initialize(board_key, move)
    @board_key = board_key
    @move = move
    @wins = 0
    @losses_or_draws = 0
  end
  
  def update_outcome(outcome)
    if outcome == GameBoard::WIN
      @wins += 1
    else
      @losses_or_draws += 1
    end
  end
  
  def win_ratio
    # Assumes we only create once we have something to record
    return 1 if @losses_or_draws == 0
    @wins.to_f / (@losses_or_draws.to_f + @wins.to_f)
  end
  
  def key
    "#{@board_key}#{@move}"
  end
end