# TODO - Change all LOSE TO LOSS OR GET CONGRUENT

require 'move_to_final_result_history_entry'

class GameBoard
  PLAYER_COMPUTER_CHAR = 'X'
  PLAYER_OPPONENT_CHAR = 'O'
  PLAYER_BLANK_SPOT_CHAR = '_'
  
  WIN = 0
  LOSS = 1
  DRAW = 2
  ONGOING = 3
  
  NEW_GAME = "_________"
  
  POS_UPPER_LEFT = 0
  POS_UPPER_MIDDLE = 1
  POS_UPPER_RIGHT = 2
  POS_MIDDLE_LEFT = 3
  POS_MIDDLE_MIDDLE = 4
  POS_MIDDLE_RIGHT = 5
  POS_LOWER_LEFT = 6
  POS_LOWER_MIDDLE = 7
  POS_LOWER_RIGHT = 8
  
  def initialize
    @board = NEW_GAME.dup
    @game_moves = []
  end  
  
  def win?
    @player_char = PLAYER_COMPUTER_CHAR
    someone_wins?
  end
  
  def lose?
    @player_char = PLAYER_OPPONENT_CHAR
    result = someone_wins?
  end
  
  def draw?
    result = Regexp.new(PLAYER_BLANK_SPOT_CHAR).match(@board)
    return false unless (Regexp.new(PLAYER_BLANK_SPOT_CHAR).match(@board)).nil?
    return !win? && !lose?
  end
  
  def key
    @board.intern
  end
  
  def add_computer_player_move(pos)
    entry = MoveToFinalResultHistoryEntry.new(key, pos)
    @game_moves << entry
    
    mark_grid_pos(pos, PLAYER_COMPUTER_CHAR)
  end  
  
  def add_computer_opponent_move(pos)
    mark_grid_pos(pos, PLAYER_OPPONENT_CHAR)
  end
  
  def outcome
    return WIN if win?
    return LOSS if lose?
    return DRAW if draw?
    return ONGOING
  end
  
  def over?
    win? || lose? || draw?
  end  
  
  def game_moves
    @game_moves
  end
  
private

  def mark_grid_pos(pos, marker)
    @board[pos] = marker
  end  

  def someone_wins?
    return true if (
      check_three_in_row([POS_UPPER_LEFT, POS_UPPER_MIDDLE, POS_UPPER_RIGHT]) ||
      check_three_in_row([POS_MIDDLE_LEFT, POS_MIDDLE_MIDDLE, POS_MIDDLE_RIGHT]) ||
      check_three_in_row([POS_LOWER_LEFT, POS_LOWER_MIDDLE, POS_LOWER_RIGHT]) ||
      check_three_in_row([POS_UPPER_LEFT, POS_MIDDLE_LEFT, POS_LOWER_LEFT]) ||
      check_three_in_row([POS_UPPER_MIDDLE, POS_MIDDLE_MIDDLE, POS_LOWER_MIDDLE]) ||
      check_three_in_row([POS_UPPER_RIGHT, POS_MIDDLE_RIGHT, POS_LOWER_RIGHT]) ||
      check_three_in_row([POS_UPPER_LEFT, POS_MIDDLE_MIDDLE, POS_LOWER_RIGHT]) ||
      check_three_in_row([POS_UPPER_RIGHT, POS_MIDDLE_MIDDLE, POS_LOWER_LEFT])
    )
    false
  end
  
  def check_three_in_row(grid_positions)
    grid_positions.each do |pos|
      return false unless @board[pos].chr == @player_char
    end  
    true
  end  
end