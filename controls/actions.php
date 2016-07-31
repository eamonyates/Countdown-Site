<?php

    include 'functions.php';
    

    if ($_GET['action'] == 'login') {
        
        $errorMsg = checkFormValidity();
        
        if ($errorMsg != "") {
            
            echo $errorMsg;
            exit();
            
        } elseif (!$link) {
            
            $errorMsg = "Unable to login. Please try again later.";
            die ($errorMsg);
            
        } else {
            
            // NOTE: Create a query to find the login email provided and return the result to variable $row
            $query = "SELECT * FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."' LIMIT 1";
            $result = mysqli_query($link, $query);
            $row = mysqli_fetch_assoc($result);
            
            // NOTE: If the password matches the password that has the md5 hash then create a session ID matching the AI ID from the DB query
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
            
        } elseif (!$link) {
            
            $errorMsg = "Unable to process signup. Please try again later.";
            die ($errorMsg);
            
        } else {
            
            /* NOTE: Create a mysql query to check if the email address already exists and store it into variable $query and check DB */
            $query = "SELECT * FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."' LIMIT 1";
            $result = mysqli_query($link, $query);
            
            // NOTE: With the mysql result if it is greater than 0 we already have that email address signed up
            if (mysqli_num_rows($result) > 0) $errorMsg = "That email address is already taken.";
            else {
                
                // NOTE: Set sign up mysql insertion query into variable $query to add details to DB
                $query = "INSERT INTO users (`email`, `password`) VALUES ('".mysqli_real_escape_string($link, $_POST['email'])."', '".mysqli_real_escape_string($link, $_POST['password'])."')";
                
                if (mysqli_query($link, $query)) {
                    
                    // NOTE: Set session id from the auto increment ID of the DB query
                    $_SESSION['id'] = mysqli_insert_id($link);
                    
                    /* NOTE: Update the password to a secure password in the DB that uses an md5 hash of the md5 session ID and password. */
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


    if ($_GET['action'] == 'addCountdown') {
        
        if (!$link) {
            
            $errorMsg = "Unable to add countdown. Please try again later.";
            die ($errorMsg);
            
        } else {
            
            // NOTE: Insert new Countdown into database
            $query = "INSERT INTO countdowns (`goal`, `userid`, `startdatetime`, `enddatetime`, `makepublic`) VALUES ('".mysqli_real_escape_string($link, $_POST['countdownGoal'])."', '".mysqli_real_escape_string($link, $_SESSION['id'])."', '".mysqli_real_escape_string($link, $_POST['startDateTime'])."', '".mysqli_real_escape_string($link, $_POST['endDateTime'])."', '".mysqli_real_escape_string($link, $_POST['makePublicCD'])."')";
            
            mysqli_query($link, $query);
            $countdownID = mysqli_insert_id($link);
            
            //NOTE: Add Countdown to Default Countdown
            $selectQuery = "SELECT * FROM default_countdown WHERE user_id = '".mysqli_real_escape_string($link, $_SESSION['id'])."' LIMIT 1";

            $result = mysqli_query($link, $selectQuery);

            if (mysqli_num_rows($result) === 0) {
                
                $insertQuery = "INSERT INTO default_countdown (`user_id`, `countdown_id`) VALUES ('".mysqli_real_escape_string($link, $_SESSION['id'])."', '".$countdownID."')";

                mysqli_query($link, $insertQuery);

            } elseif ($_POST['makePrimaryCD'] === "1") {

                $deleteQuery = "DELETE FROM default_countdown WHERE user_id = '".mysqli_real_escape_string($link, $_SESSION['id'])."'";

                mysqli_query($link, $deleteQuery);

                $insertQuery = "INSERT INTO default_countdown (`user_id`, `countdown_id`) VALUES ('".mysqli_real_escape_string($link, $_SESSION['id'])."', '".$countdownID."')";

                mysqli_query($link, $insertQuery);

            }

            echo "addedCountdown";
            
        }
        
    }


    //NOTE: Function to edit existing countdown
    if ($_GET['action'] == 'editCountdown') {
        
        if (!$link) {
            
            $errorMsg = "Unable to add countdown. Please try again later.";
            die ($errorMsg);
            
        } else {
            
            // NOTE: Insert new Countdown into database
            $updateQuery = "UPDATE countdowns SET goal='".mysqli_real_escape_string($link, $_POST['countdownGoal'])."', userid='".mysqli_real_escape_string($link, $_SESSION['id'])."', startdatetime='".mysqli_real_escape_string($link, $_POST['startDateTime'])."', enddatetime='".mysqli_real_escape_string($link, $_POST['endDateTime'])."', makepublic='".mysqli_real_escape_string($link, $_POST['makePublicCD'])."' WHERE id='".mysqli_real_escape_string($link, $_POST['countdownId'])."'";
            
            mysqli_query($link, $updateQuery);
            
            // NOTE: Update Primary Countdown if needed
            if ($_POST['makePrimaryCD'] === "1") {
                
                $deleteQuery = "DELETE FROM default_countdown WHERE user_id = '".mysqli_real_escape_string($link, $_SESSION['id'])."'";

                mysqli_query($link, $deleteQuery);

                $insertQuery = "INSERT INTO default_countdown (`user_id`, `countdown_id`) VALUES ('".mysqli_real_escape_string($link, $_SESSION['id'])."', '".mysqli_real_escape_string($link, $_POST['countdownId'])."')";

                mysqli_query($link, $insertQuery);
                
            }
            
            echo "countdownEdited";
            
        }
        
    }


    if ($_GET['action'] == 'countdownInfo') {
        
        if (!$link) {
            
            echo "No database connection";
            
        } else {
            
            $selectQuery = "SELECT * FROM default_countdown WHERE user_id = '".mysqli_real_escape_string($link, $_SESSION['id'])."' LIMIT 1";
            
            $result = mysqli_query($link, $selectQuery);
            $array = mysqli_fetch_row($result);
            
            $getCountdownQuery = "SELECT * FROM countdowns WHERE id = '".$array[2]."' LIMIT 1";
            
            $getCountdownResult = mysqli_query($link, $getCountdownQuery);
            $getCountdownArray = mysqli_fetch_row($getCountdownResult);
        
            echo json_encode($getCountdownArray);
            
        }
        
    }

    
    if ($_GET['action'] == 'makePublic') {
        
        if (!$link) {
            
            echo "No database connection";
            
        } else {
            
            // NOTE: Update default countdown to make it public
            $selectQuery = "SELECT * FROM default_countdown WHERE user_id = '".mysqli_real_escape_string($link, $_SESSION['id'])."' LIMIT 1";
            
            $result = mysqli_query($link, $selectQuery);
            $array = mysqli_fetch_row($result);
            
            $updateQuery = "UPDATE countdowns SET makepublic = '1' WHERE id = '".$array[2]."' LIMIT 1";
            mysqli_query($link, $updateQuery);
            
            echo "countdownNowPublic";
            
        }
        
    }

    
    //NOTE: Delete Countdown and replace default countdown if necessary
    if ($_GET['action'] == 'deleteCountdown') {
        
        if (!$link) {
            
            echo "No database connection";
            
        } else {
            
            $selectQuery = "SELECT * FROM default_countdown WHERE user_id = '".mysqli_real_escape_string($link, $_SESSION['id'])."' AND countdown_id = '".$_POST['countdownId']."' LIMIT 1";
            
            $result = mysqli_query($link, $selectQuery);
            
            if (mysqli_num_rows($result) === 0) {
                
                $deleteQuery = "DELETE FROM countdowns WHERE id = '".mysqli_real_escape_string($link, $_POST['countdownId'])."' LIMIT 1";
                mysqli_query($link, $deleteQuery);
                
                echo "countdownDeleted";
                
            } else {
                
                $deleteDefaultCountdownQuery = "DELETE FROM default_countdown WHERE user_id = '".mysqli_real_escape_string($link, $_SESSION['id'])."' AND countdown_id = '".mysqli_real_escape_string($link, $_POST['countdownId'])."' LIMIT 1";
                mysqli_query($link, $deleteDefaultCountdownQuery);
                
                $deleteQuery = "DELETE FROM countdowns WHERE id = '".mysqli_real_escape_string($link, $_POST['countdownId'])."' LIMIT 1";
                mysqli_query($link, $deleteQuery);
                
                $selectNewCountdownQuery = "SELECT * FROM countdowns WHERE userid = '".mysqli_real_escape_string($link, $_SESSION['id'])."' LIMIT 1";
                $newDefaultResult = mysqli_query($link, $selectNewCountdownQuery);
                
                if (mysqli_num_rows($newDefaultResult) === 1) {
                    
                    $array = mysqli_fetch_row($newDefaultResult);
                    
                    $insertQuery = "INSERT INTO default_countdown (`user_id`, `countdown_id`) VALUES ('".mysqli_real_escape_string($link, $_SESSION['id'])."', '".$array[0]."')";

                    mysqli_query($link, $insertQuery);
                    
                }
                
                echo "countdownDeleted";
                
            }
            
        }
        
    }
    

    if ($_GET['action'] == 'fetchCountdowns') {
        
        if (!$link) {
            
            echo "No database connection";
            
        } else {
            
            $selectQuery = "SELECT * FROM countdowns WHERE userid = '".mysqli_real_escape_string($link, $_SESSION['id'])."'";
            $result = mysqli_query($link, $selectQuery);
            
            $jsonarray = array();
            
            while ($row = mysqli_fetch_assoc($result)) {
            
                $jsonarray[] = $row;
            
            }
            
            echo json_encode($jsonarray, JSON_UNESCAPED_SLASHES);
                
        }
        
    }


    if ($_GET['action'] == 'fetchPublicCountdowns') {
        
        if (!$link) {
            
            echo "No database connection";
            
        } else {
            
            $selectQuery = "SELECT * FROM countdowns WHERE makepublic = '1' LIMIT 20";
            $result = mysqli_query($link, $selectQuery);
            
            $jsonarray = array();
            
            while ($row = mysqli_fetch_assoc($result)) {
            
                $jsonarray[] = $row;
            
            }
            
            echo json_encode($jsonarray, JSON_UNESCAPED_SLASHES);
                
        }
        
    }

    
    if ($_GET['action'] == 'fetchPersonalInfo') {
    
        if (!$link) {
            
            echo "No database connection";
            
        } else {
        
            $selectQuery = "SELECT * FROM users WHERE id = '".mysqli_real_escape_string($link, $_SESSION['id'])."' LIMIT 1";
            $result = mysqli_query($link, $selectQuery);
            
            $jsonarray = array();
            
            while ($row = mysqli_fetch_assoc($result)) {
            
                $jsonarray[] = $row;
            
            }
            
            echo json_encode($jsonarray, JSON_UNESCAPED_SLASHES);
        
        }
    
    }


    if ($_GET['action'] == 'logout') {
        
        session_unset();
        session_destroy();
        
    }

?>
