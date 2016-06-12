<?php

    include 'functions.php';
    

    if ($_GET['action'] == 'login') {
        
        $errorMsg = checkFormValidity();
        
        if ($errorMsg != "") {
            
            echo $errorMsg;
            exit();
            
        } else {
            
            //Create a query to find the login email provided and return the result to variable $row
            $query = "SELECT * FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."' LIMIT 1";
            $result = mysqli_query($link, $query);
            $row = mysqli_fetch_assoc($result);
            
            //If the password matches the password that has the md5 hash then create a session ID matching the AI ID from the DB query
            if ($row['password'] == md5(md5($row['id']).$_POST['password'])) {
                
                $_SESSION['id'] = $row['id'];
                
                echo "login";

            } else {

                $errorMsg = "Could not find that username/password. Please try again.";

            }
            
            if ($errorMsg != "") {
            
                echo $errorMsg;
                exit();
            
            }
            
        }
        
    }


    if ($_GET['action'] == 'signup') {
           
        $errorMsg = checkFormValidity();
        
        if ($errorMsg != "") {
            
            echo $errorMsg;
            exit();
            
        } else {
            
            //Create a mysql query to check if the email address already exists and store it into variable $query and check DB
            $query = "SELECT * FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."' LIMIT 1";
            $result = mysqli_query($link, $query);
            
            //With the mysql result if it is greater than 0 we already have that email address signed up
            if (mysqli_num_rows($result) > 0) $errorMsg = "That email address is already taken.";
            else {
                
                //Set sign up mysql insertion query into variable $query to add details to DB
                $query = "INSERT INTO users (`email`, `password`) VALUES ('".mysqli_real_escape_string($link, $_POST['email'])."', '".mysqli_real_escape_string($link, $_POST['password'])."')";
                
                if (mysqli_query($link, $query)) {
                    
                    //Set session id from the auto increment ID of the DB query
                    $_SESSION['id'] = mysqli_insert_id($link);
                    
                    //Update the password to a secure password in the DB that uses an md5 hash of the md5 session ID and password.
                    $query = "UPDATE users SET password = '".md5(md5($_SESSION['id']).$_POST['password'])."' WHERE id = ".$_SESSION['id']." LIMIT 1";
                    
                    mysqli_query($link, $query);
                    
                    echo "signup";
                    
                } else {
                    
                    $errorMsg = "Couldn't create user - please try again later";
                    
                } 
            
            }
            
            if ($errorMsg != "") {
            
                echo $errorMsg;
                exit();
            
            }
            
        } 
        
    }


    if ($_GET['action'] == 'logout') {
        
        session_unset();
        session_destroy();
        
    }

?>
