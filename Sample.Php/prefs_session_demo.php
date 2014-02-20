<?php
	session_start() ;
	$backgroundName = $_SESSION['backgroundName'] ;
	$foregroundName = $_SESSION['foregroundName'] ;
?>

<html>
<head>
	<title>Front Door</title>
</head>
<body bgcolor="<?= $backgroundName; ?>" text="<?= $foregroundName; ?>">
	<h1>Welcome to the Store</h1>
	<p>We have many fine products for you to view. Please feel free to browse
the aisles and stop an assistant at any time. But remember, you break it
you bought it!</p>
	<p>Would you like to <a href="colors.php">change your preferences?</a></p>
</body>
</html>
