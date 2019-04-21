<?php
	$to = $_POST['email'];
	$from = $_POST['sender'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	$headers = "From: $from" . "\r\n";

	if($message == "sammy")
	{
		$message = file_get_contents("../emails/sam/sam.html");
		$headers = "From: doyou@remember.me <doyou@remember.me>" . "\r\n" . "MIME-Version: 1.0" . "\r\n" . "Content-type: text/html; charset=UTF-8" . "\r\n";
	}

	// send the message!
	mail($to,$subject,$message,$headers);
?>
