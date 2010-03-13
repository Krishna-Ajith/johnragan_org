class GameHistory
  def initialize
    @entries = {}
  end
  
  def add_history(outcome, game_moves)
    game_moves.each do |game_move|
      entry = @entries[game_move] || MoveToFinalResultHistoryEntry.new(game_move, 4)
      entry.update_outcome(outcome)
      @entries[entry.key] = entry
    end
  end
end