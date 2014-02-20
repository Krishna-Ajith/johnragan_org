<html>
<head>
	<title>Set Your Preferences</title></head>
<body>
	<form action="prefs.php" method="post">
		<p>Background:
			<select name="background">
				<option value="black">Black</option>
				<option value="white">White</option>
				<option value="red">Red</option>
				<option value="blue">Blue</option>
			</select><br />

		Foreground:
			<select name="foreground">
				<option value="black">Black</option>
				<option value="white">White</option>
				<option value="red">Red</option>
				<option value="blue">Blue</option>
			</select></p>
	
		<input type="submit" value="Change Preferences">
	</form>

<?php

try {
	$db = new PDO("mysql:host=localhost;dbname=php", "jragan", "Bigmickey");
	/*$db->query("INSERT INTO demo_people (id, name, phone) VALUES(2, 'Jenny', '8675309');");*/
	$st = $db->query('SELECT name FROM demo_people');
	foreach ($st->fetchAll() as $row) {
 	print "<h1>{$row['name']} goes with everything</h1>\n";
}

} catch (Exception $error) {
	die("Connection Failed" . $error->getMessage());
}

?>
</body>
</html>
