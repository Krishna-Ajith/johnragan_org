DELIMITER $$

DROP PROCEDURE IF EXISTS my_sqrt$$

CREATE PROCEDURE my_sqrt(input_number INT)
BEGIN
  DECLARE l_sqrt FLOAT;
  SET l_sqrt=SQRT(input_number);
  SELECT l_sqrt;
END$$

DELIMITER ;