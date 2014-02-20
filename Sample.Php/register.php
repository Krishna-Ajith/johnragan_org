<html>
<?php header_remove('X-Powered-By'); ?>
<?php include('shared/head.php'); ?>
<head>
	<title>Welcome to PHP</title>
</head>
<body>
	<h1>Hello from <?php echo 'PHP!'; ?>
	</h1>
        <p>
	Hello from <?php echo 'PHP!'; ?>
        </p>
	<p>
	My name is <?php echo gethostname(); ?>

	<?php
	$ver = phpversion();
	if (strpos($ver,'5.3') === false) {
		echo '<p>I am something else - ' . $ver . '</p>';
	} else {
		echo "<p>I am a 5.3 variant - $ver</p>";
	}
	?>

	<?php if (isset($_POST['btnSubmit'])) : ?>
	<p>
	Hello <?php echo $_POST['txtName']; ?>
	</p>
	<?php else : ?>
	<p>What is your name</p>
	<form action="register.php" method="POST">
	<input type="text" name="txtName" />
	<input type="submit" name="btnSubmit" />
	</form>
	<?php endif; ?>
</body>
</html>
