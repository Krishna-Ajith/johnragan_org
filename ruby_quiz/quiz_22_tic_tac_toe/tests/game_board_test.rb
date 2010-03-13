require 'test/unit'
require 'game_board'
require 'tests/single_game_play_module'

class GameBoardTest < Test::Unit::TestCase
  include SingleGamePlayModule
  
  def setup
    @game_board = GameBoard.new
  end
  
  def test_initial_board
    assert_not_nil @game_board.instance_variable_get(:@board)
  end
  
  def test_identify_wins
    [
      "XXX______",
      "___XXX___",
      "______XXX",
      "X__X__X__",
      "_X__X__X_",
      "__X__X__X",
      "X___X___X",
      "__X_X_X__"
    ].each do |board|
      @game_board.instance_variable_set(:@board, board)
      assert @game_board.win?
    end  
  end
  
  def test_identify_losses
    [
      "OOO______",
      "___OOO___",
      "______OOO",
      "O__O__O__",
      "_O__O__O_",
      "__O__O__O",
      "O___O___O",
      "__O_O_O__"
    ].each do |board|
      @game_board.instance_variable_set(:@board, board)
      assert @game_board.lose?
    end  
  end
  
  def test_identify_draws
    @game_board.instance_variable_set(:@board, "XOOOXXOXO")
    assert @game_board.draw?
    @game_board.instance_variable_set(:@board, "OOOXXOOXX")
    assert !@game_board.draw?
  end
  
  def test_key
    assert_not_nil @game_board.key
  end
  
  def test_add_computer_player_move
    @game_board.add_computer_player_move(GameBoard::POS_UPPER_LEFT)
    game_moves = @game_board.instance_variable_get(:@game_moves)
    assert_equal 1, game_moves.size
    assert_equal "X________0", game_moves[0].key
  end
  
  def test_add_computer_opponent_move
    @game_board.add_computer_opponent_move(GameBoard::POS_UPPER_LEFT)
    game_moves = @game_board.instance_variable_get(:@game_moves)
    assert_equal 0, game_moves.size
    assert_equal "O________", @game_board.key
  end
  
  def test_full_game_move_history_entries
    setup_draw
    
    game_moves = @game_board.instance_variable_get(:@game_moves)
    assert_equal 5, game_moves.size
    assert_equal "X________0", game_moves[0].key
    assert_equal "X_____O_X8", game_moves[1].key
    assert_equal "X_X_O_O_X2", game_moves[2].key
    assert_equal "X_XXOOO_X3", game_moves[3].key
    assert_equal "XOXXOOOXX7", game_moves[4].key
  end
  
  def test_identify_draw
    assert !@game_board.over?
    setup_draw
    assert_equal GameBoard::DRAW, @game_board.outcome
    assert @game_board.over?
  end
  
  def test_identify_win
    assert !@game_board.over?
    setup_7_move_win
    assert @game_board.over?
    assert_equal GameBoard::WIN, @game_board.outcome
  end
  
  def test_identify_loss
    assert !@game_board.over?
    setup_6_move_loss
    assert @game_board.over?
    assert_equal GameBoard::LOSS, @game_board.outcome
  end
  
  def test_ongoing_game_outcome_reports_ongoing
    assert_equal GameBoard::ONGOING, @game_board.outcome
    @game_board.add_computer_player_move(GameBoard::POS_UPPER_LEFT)
    assert_equal GameBoard::ONGOING, @game_board.outcome
  end
end