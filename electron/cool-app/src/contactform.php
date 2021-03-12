<?php

// Show all errors (for educational purposes)
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

// Constanten (connectie-instellingen databank)
define ('DB_HOST', 'localhost');
define ('DB_USER', 'dbaccount');
define ('DB_PASS', '%Strong123');
define ('DB_NAME', 'contactdb');

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
$email = isset($_POST['email']) ? (string) $_POST['email'] : '';
$message = isset($_POST['message']) ? (string) $_POST['message'] : '';
$google = isset($_POST['google']) ? (string) $_POST['google'] : '';
$socialmedia = isset($_POST['socialmedia']) ? (string) $_POST['socialmedia'] : '';
$friends = isset($_POST['friends']) ? (string) $_POST['friends'] : '';
$other = isset($_POST['other']) ? (string) $_POST['other'] : '';
$msgName = '*';
$msgEmail = '*';
$msgMessage = '*';
// form is sent: perform formchecking!
if (isset($_POST['btnSubmit'])) {

	$allOk = true;

	// name not empty
	if (trim($name) === '') {
		$msgName = 'Gelieve een naam in te voeren';
		$allOk = false;
	}

	if (trim($email) === '') {
		$msgEmail = 'Gelieve een email-addres in te voeren';
		$allOk = false;
	}

	if (trim($message) === '') {
		$msgMessage = 'Gelieve een boodschap in te voeren';
		$allOk = false;
	}

	if( isset($_POST["google"]) ){
		$google = 'google: true';
	}

	if( isset($_POST["socialmedia"]) ){
		$socialmedia = 'socialmedia: true';
	}

	if( isset($_POST["friends"]) ){
		$friends = 'friends: true';
	}

	if( isset($_POST["other"]) ){
		$other = 'other: true';
	}

	// end of form check. If $allOk still is true, then the form was sent in correctly
	if ($allOk) {
		$stmt = $db->exec('INSERT INTO messages (sender, email, message, google, socialmedia, friends, other, added_on) VALUES (\''. $name .  '\',\'' . $email .'\',\''. $message .'\',\''. $google .'\',\''. $socialmedia .'\',\''. $friends .'\',\''. $other .'\',\'' . (new DateTime())->format('Y-m-d H:i:s') . '\')');

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
	<link rel="stylesheet" href="reset.css">
	<link rel="stylesheet" href="headerfooter.css">
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="workAndprojects.css">
	<link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body>
<header>
    <nav>
        <div class="logo">
        <a class="logo" href="index.html"><img src="img/logo2.png" alt="logo van de website" width="350"></a>
        </div>
        <div class="right">
        <ul>    
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="work.html">Work</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a class="active" href="contactform.php">Contact</a></li>
        <li><a href="https://docs.google.com/document/d/1PpzlCOBRE8_76ITnHb-ufpNEQIGFEuHOmLP91VzeyxI/edit#heading=h.akj6i1och7nj">Logboek</a></li>
        </ul>
        </div>
    </nav>
</header>
<main>
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">

		<fieldset>

			<h2>Mijn contactformulier </h2>

			<dl class="clearfix">

				<dt><label for="name">Naam:</label></dt>
				<dd class="text">
					<input type="text" id="name" name="name" value="<?php echo $name; ?>" class="input-text" />
					<span class="message error"><?php echo $msgName; ?></span>
				</dd>

				<dt><label for="email">Email:</label></dt>
				<dd class="text">
					<input type="text" id="email" name="email" value="<?php echo $email; ?>" class="input-text" />
					<span class="message error"><?php echo $msgEmail; ?></span>
				</dd>

				<dt><label for="message">Boodschap:</label></dt>
				<dd class="text">
					<textarea name="message" id="message" rows="5" cols="40"><?php echo $message; ?></textarea>
					<span class="message error"><?php echo $msgMessage; ?></span>
				</dd>

				<h3>Hoe heb je mij gevonden? </h3>
				<dt><label for="google">Google:</label></dt>
				<dd class="check">
					<input type="checkbox" id="google" name="google" value="<?php echo $google; ?>" class="input-text" />
				</dd>

				<dt><label for="socialmedia">Social media:</label></dt>
				<dd class="check">
					<input type="checkbox" id="socialmedia" name="socialmedia" value="<?php echo $socialmedia; ?>" class="input-text" />
				</dd>

				<dt><label for="friends">Friends:</label></dt>
				<dd class="check">
					<input type="checkbox" id="friends" name="friends" value="<?php echo $friends; ?>" class="input-text" />
				</dd>

				<dt><label for="other">Other:</label></dt>
				<dd class="check">
					<input type="checkbox" id="other" name="other" value="<?php echo $other; ?>" class="input-text" />
				</dd>

				<dt id="lastrow">
					<input type="submit" id="btnSubmit" name="btnSubmit" value="Send" />
				</dt>

			</dl>

		</fieldset>

	</form>
</main>
<footer>
	<div>
			<p>
			Sander Spaas - 
			<a href="https://www.facebook.com/profile.php?id=100019157269329"> Facebook </a> -
			<a href=https://twitter.com/>Twitter</a> -
			<a href=https://www.instagram.com/spaassander//>Instagram</a> -
			<a href="https://www.google.be/maps/place/Bevrijdingslaan+173,+9000+Gent/"> Bevrijdingslaan 173</a> -
			<a href="https://en.wikipedia.org/wiki/Copyright">Copyright</a> -
			<a href="contactform.php">Contact</a>
			</p>
		</div>
</footer>
</body>
</html>