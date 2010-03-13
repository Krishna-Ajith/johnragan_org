module SingleGamePlayModule
  def setup_draw
    @game_board.add_computer_player_move(GameBoard::POS_UPPER_LEFT)
    @game_board.add_computer_opponent_move(GameBoard::POS_LOWER_LEFT)
    @game_board.add_computer_player_move(GameBoard::POS_LOWER_RIGHT)
    @game_board.add_computer_opponent_move(GameBoard::POS_MIDDLE_MIDDLE)
    @game_board.add_computer_player_move(GameBoard::POS_UPPER_RIGHT)
    @game_board.add_computer_opponent_move(GameBoard::POS_MIDDLE_RIGHT)
    @game_board.add_computer_player_move(GameBoard::POS_MIDDLE_LEFT)
    @game_board.add_computer_opponent_move(GameBoard::POS_UPPER_MIDDLE)
    @game_board.add_computer_player_move(GameBoard::POS_LOWER_MIDDLE)
  end  
  
  def setup_7_move_win
    @game_board.add_computer_player_move(GameBoard::POS_UPPER_LEFT)
    @game_board.add_computer_opponent_move(GameBoard::POS_MIDDLE_RIGHT)
    @game_board.add_computer_player_move(GameBoard::POS_LOWER_RIGHT)
    @game_board.add_computer_opponent_move(GameBoard::POS_MIDDLE_LEFT)
    @game_board.add_computer_player_move(GameBoard::POS_LOWER_LEFT)
    @game_board.add_computer_opponent_move(GameBoard::POS_LOWER_MIDDLE)
    @game_board.add_computer_player_move(GameBoard::POS_MIDDLE_MIDDLE)
  end
  
  def setup_6_move_loss
    @game_board.add_computer_player_move(GameBoard::POS_MIDDLE_LEFT)
    @game_board.add_computer_opponent_move(GameBoard::POS_UPPER_RIGHT)
    @game_board.add_computer_player_move(GameBoard::POS_UPPER_LEFT)
    @game_board.add_computer_opponent_move(GameBoard::POS_LOWER_RIGHT)
    @game_board.add_computer_player_move(GameBoard::POS_MIDDLE_MIDDLE)
    @game_board.add_computer_opponent_move(GameBoard::POS_MIDDLE_RIGHT)
  end
end