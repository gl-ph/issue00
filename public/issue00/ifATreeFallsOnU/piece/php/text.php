<?php
	$to = $_POST['number'];
	$from = $_POST['sender'];
	$message = $_POST['message'];
	$headers = "From: $from" . "\r\n";

  if(strlen($message) > 100)
  {
    $currentMessage = "";
    for($x = 0; $x < strlen($message); $x++)
    {
      $currentMessage .= substr($message, $x, 1);

      if(strlen($currentMessage) == 100)
      {
        mail($to,"",$currentMessage,$headers);
        $currentMessage = "";
      }
    }

    mail($to,"",$currentMessage,$headers);
  }
  else
  {
    mail($to,"",$message,$headers);
  }
?>
