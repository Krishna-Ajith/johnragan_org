DELIMITER $$

DROP PROCEDURE IF EXISTS cursor_example
$$
CREATE PROCEDURE cursor_example()
  READS SQL DATA
BEGIN
  DECLARE l_employee_id INT;
  DECLARE l_salary NUMERIC(8,2);
  DECLARE l_department_id INT;
  
  DECLARE done INT DEFAULT 0;
  
  DECLARE cur1 CURSOR FOR
    SELECT employee_id, salary, department_id
      FROM employees;
      
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;
  
  OPEN cur1;
  emp_loop:LOOP
    FETCH cur1 INTO l_employee_id, l_salary, l_department_id;
    IF done=1 THEN
      LEAVE emp_loop;
    END IF;
  END LOOP emp_loop;
  CLOSE cur1;
END;
$$

DELIMITER ;