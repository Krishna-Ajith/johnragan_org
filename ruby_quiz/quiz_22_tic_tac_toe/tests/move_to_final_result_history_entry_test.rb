require 'test/unit'
require 'move_to_final_result_history_entry'

class MoveToFinalResultHistoryTest < Test::Unit::TestCase
  def setup
    @board = GameBoard.new
    @board_key = @board.key
    @move = GameBoard::POS_MIDDLE_RIGHT
    @other_move = GameBoard::POS_MIDDLE_LEFT
  end
  
  def test_create_move_history_entry
    entry = MoveToFinalResultHistoryEntry.new(@board_key, @move)
    assert_equal @board_key, entry.instance_variable_get(:@board_key)
    assert_equal @move, entry.instance_variable_get(:@move)
    assert_equal 0, entry.instance_variable_get(:@wins)
    assert_equal 0, entry.instance_variable_get(:@losses_or_draws)
  end
  
  def test_win_ratio_100_percent_when_first_created
    entry = MoveToFinalResultHistoryEntry.new(@board_key, @move)
    assert_equal 1.0, entry.win_ratio
  end
  
  def test_updated_win_ratios
    entry = MoveToFinalResultHistoryEntry.new(@board_key, @move)
    assert_equal 1.0, entry.win_ratio 
    entry.update_outcome(GameBoard::LOSS)
    assert_equal 0, entry.win_ratio
    entry.update_outcome(GameBoard::WIN)
    assert_equal 0.5, entry.win_ratio
    entry.update_outcome(GameBoard::DRAW)
    entry.update_outcome(GameBoard::LOSS)
    assert_equal 0.25, entry.win_ratio
  end
  
  def test_key
    entry1 = MoveToFinalResultHistoryEntry.new(@board_key, @move)
    entry2 = MoveToFinalResultHistoryEntry.new(@board_key, @other_move)
    assert entry1.key != entry2.key
  end
end