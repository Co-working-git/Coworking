<?php

// Show all errors (for educational purposes)
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

// Constanten (connectie-instellingen databank)
define ('DB_HOST', 'localhost');
define ('DB_USER', 'root');
define ('DB_PASS', 'Azerty123');
define ('DB_NAME', 'contact');

date_default_timezone_set('Europe/Brussels');

// Verbinding maken met de databank
try {
    $db = new PDO('mysql:host=' . DB_HOST .';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Verbindingsfout: ' .  $e->getMessage();
    exit;
}



$name = isset($_POST['name']) ? (string) $_POST['name'] : '';
$message = isset($_POST['message']) ? (string) $_POST['message'] : '';
$msgName = '*';
$msgMessage = '*';

// form is sent: perform formchecking!
if (isset($_POST['btnSubmit'])) {

	$allOk = true;

	// name not empty
	if (trim($name) === '') {
		$msgName = 'Gelieve een naam in te voeren';
		$allOk = false;
	}

	if (trim($message) === '') {
		$msgMessage = 'Gelieve een boodschap in te voeren';
		$allOk = false;
	}

	// end of form check. If $allOk still is true, then the form was sent in correctly
	if ($allOk) {
		// build & execute prepared statement
		$stmt = $db->prepare('INSERT INTO messages (sender, message, added_on) VALUES (?, ?, ?)');
		$stmt->execute(array($name, $message, (new DateTime())->format('Y-m-d H:i:s')));

		// the query succeeded, redirect to this very same page
		if ($db->lastInsertId() !== 0) {
			header('Location: formchecking_thanks.php?name=' . urlencode($name));
			exit();
		}

		// the query failed
		else {
		    echo 'Databankfout.';
		    exit;
		}		

	}

}

?><!DOCTYPE html>
<html>
<head>
	<title>Testform</title>
	<meta charset="UTF-8" />
	<link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body>

	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">

		<fieldset>

			<h2>Testform</h2>

			<dl class="clearfix">

				<dt><label for="name">Jouw naam:</label></dt>
				<dd class="text">
					<input type="text" id="name" name="name" value="<?php echo htmlentities($name); ?>" class="input-text" />
					<span class="message error"><?php echo $msgName; ?></span>
				</dd>

				<dt><label for="message">Boodschap:</label></dt>
				<dd class="text">
					<textarea name="message" id="message" rows="5" cols="40"><?php echo htmlentities($message); ?></textarea>
					<span class="message error"><?php echo $msgMessage; ?></span>
				</dd>

				<dt class="full clearfix" id="lastrow">
					<input type="submit" id="btnSubmit" name="btnSubmit" value="Send" />
				</dt>

			</dl>

		</fieldset>

	</form>


</body>
</html>