<?php
       
//echo '<script language="javascript">alert("file included successfully")</script>';

    session_start();

    $link = mysqli_connect("localhost", "root", "root", "countdown");


    function checkFormValidity() {
        
        $error = "";
        
        if (!$_POST['email']) {
            
            $error = "An email address is required";
            
        } else if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) === false) {
            
            $error = "Please enter a valid email address";
            
        } else if (!$_POST['password']) { 
            
            $error = "A password is required";
            
        }
        
        return $error;
        
    }

?>