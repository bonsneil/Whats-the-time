<?php
if($_POST)
{
	$file = "contactDatabase.txt";
	
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {       
        $output = json_encode(array( //create JSON data
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    } 
    
    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    $message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($user_name)<4){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        die($output);
    }
    if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        die($output);
    }
    if(strlen($message)<3){ //check emtpy message
        $output = json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
        die($output);
    }
	
    $jsonObj  =json_decode(file_get_contents($file), true);
	//file_put_contents("console.txt", $jsonObj)
	
	//Create a JSON object from the contact form and append to database file
	//Create JSON object
	$contactMessage->userName = $user_name;
	$contactMessage->userEmail = $user_email;
	$contactMessage->userMessage = $message;
	$contactMessageJSON = json_encode($contactMessage);
	
	//Convert JSON object to array so it can be added to existing objects
	$contactMessageArray = json_decode($contactMessageJSON,true);
	$jsonObj["messages"][]  = $contactMessageArray;

	file_put_contents($file, json_encode($jsonObj));	
	//file_put_contents($file, $contactMessageJSON.PHP_EOL, FILE_APPEND);
		
	//Return confirmation message
	$output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_name .', Thank you for your message!'));
        die($output);
}
?>