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
    assert_equal 1, game_history.win_ratio("_________", GameBoard::POS_UPPER_LEFT)
    assert_equal 1, game_history.win_ratio("X____O___", GameBoard::POS_LOWER_RIGHT)
    assert_equal 1, game_history.win_ratio("X__O_O__X", GameBoard::POS_LOWER_LEFT)
    assert_equal 1, game_history.win_ratio("X__O_OXOX", GameBoard::POS_MIDDLE_MIDDLE)
  end
end