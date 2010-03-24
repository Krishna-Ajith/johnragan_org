class GameHistory
  def initialize
    @entries = {}
  end
  
  def add_history(outcome, game_moves)
    game_moves.each do |game_move|
      game_move_key = game_move.key
      if @entries[game_move_key]
        @entries[game_move_key].update_outcome(outcome)
      else
        game_move.update_outcome(outcome)
        @entries[game_move_key] = game_move  
      end  
    end
  end
  
  def entry?(board, pos)
    @entries[entry_key(board, pos)] != nil
  end  
  
  def win_ratio(board, pos)
    entry = @entries[entry_key(board, pos)]
    raise "unknown move to final result history entry for #{board} at position #{pos}" if entry.nil?
    entry.win_ratio
  end
  
private

  def entry_key(board, pos)
    (board + pos.to_s).intern
  end  
end