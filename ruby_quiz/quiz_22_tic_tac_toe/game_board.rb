class GameBoard
  COMPUTER_PLAYER_CHAR = 'X'
  TRAINING_OPPONENT_CHAR = 'O'
  
  def win?
    @player_char = COMPUTER_PLAYER_CHAR
    someone_wins?
  end
  
  def lose?
    @player_char = TRAINING_OPPONENT_CHAR
    result = someone_wins?
  end
  
  def draw?
    return false unless (@board =~ /_/).nil?
    return !win? && !lose?
  end
  
private

  def someone_wins?
    return true if matches [0, 1, 2]
    return true if matches [3, 4, 5]
    return true if matches [6, 7, 8]
    return true if matches [0, 3, 6]
    return true if matches [1, 4, 7]
    return true if matches [2, 5, 8]
    return true if matches [0, 4, 8]
    return true if matches [2, 4, 6]
    false
  end
  
  def matches(grids)
    grids.each do |grid|
      return false unless @board[grid].chr == @player_char
    end  
    true
  end  
end