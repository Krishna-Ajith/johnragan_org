<?php

class Registration
{
	public $FirstName = "";
	public $LastName = "";
	public $DateOfBirth;
	public $EmailAddress = "";
	public $IpAddress = "";

	public $ValidationErrors;

	public function IsValid() {
		$this->ValidationErrors = array();
		if ($this->IsNullOrEmpty($this->FirstName)) {
			array_push($this->ValidationErrors, 'First name is required');
		}
		if ($this->IsNullOrEmpty($this->LastName)) {
                        array_push($this->ValidationErrors, 'Last name is required');
                }
		if ($this->IsNullOrEmpty($this->EmailAddress)) {
                        array_push($this->ValidationErrors, 'Email Address is required');
                }
		if ($this->IsNullOrEmpty($this->DateOfBirth)) {
                        array_push($this->ValidationErrors, 'Date of Birth is required');
                }
		else {
			$date = DateTime::createFromFormat('d/m/y', $this->DateOfBirth);
			if (DateTime::getLastErrors()['warning_count'] > 0) {
				array_push($this->ValidationErrors, 'Date of Birth must be dd/mm/yyyy format');
			}
			else {
				$this->DateOfBirth = $date;
			}
		}
		return count($this->ValidationErrors) == 0;
	}

	private function IsNullOrEmpty($string) {
		return (!isset($string) || trim($string) === '');
	}
}

?>
