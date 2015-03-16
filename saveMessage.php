<html>
<head></head>
<body>
<?php
if(isset($_POST['submit']))
{
$file = 'messages.html';
$message = "<p>";
$message .= strip_tags($_POST["name"]);
$message .= " : ";
$message .= strip_tags($_POST["email"]);
$message .= " : ";
$message .= strip_tags($_POST["message"]);
$message .= "</p>";
echo($message);
if(file_put_contents($file, $message, FILE_APPEND | LOCK_EX))
{
	echo("Thank you. Message Saved.");
}
else
{
	echo("Message not saved. Failed.");
}
}
if (!empty($_SERVER['HTTP_REFERER'])){
    $address=$_SERVER['HTTP_REFERER'];
}
else
{
   $address="http://divyavrat.co.nf";
}?>

</body>
</html>