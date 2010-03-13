require 'test/unit'
require 'game_history'
require 'game_board'
require 'tests/single_game_play_module'

class GameHistoryTest < Test::Unit::TestCase
  include SingleGamePlayModule
  
  def setup
    @game_board = GameBoard.new
  end
  
  def test_create_game_history
    game_history = GameHistory.new
    setup_7_move_win
    assert @game_board.over?
    assert_equal GameBoard::WIN, @game_board.outcome
    game_history.add_history(@game_board.outcome, @game_board.game_moves)
  end
end