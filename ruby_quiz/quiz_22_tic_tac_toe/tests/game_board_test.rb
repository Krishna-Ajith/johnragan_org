require 'test/unit'
require 'game_board'

class GameBoardTest < Test::Unit::TestCase
  def test_identify_wins
    game_board = GameBoard.new
    
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
      game_board.instance_variable_set(:@board, board)
      assert game_board.win?
    end  
  end
  
  def test_identify_losses
    game_board = GameBoard.new
    
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
      game_board.instance_variable_set(:@board, board)
      assert game_board.lose?
    end  
  end
  
  def test_identify_draws
    game_board = GameBoard.new
    game_board.instance_variable_set(:@board, "XOOOXXOXO")
    assert game_board.draw?
    game_board.instance_variable_set(:@board, "OOOXXOOXX")
    assert !game_board.draw?
  end
end