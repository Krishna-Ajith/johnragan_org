DELIMITER $$

DROP PROCEDURE IF EXISTS sqrt_out$$

CREATE PROCEDURE sqrt_out(input_number INT, OUT out_number FLOAT)
BEGIN
  SET out_number=SQRT(input_number);
END$$

DELIMITER ;