<?php
    
    include 'controls/actions.php';

    // NOTE: Define constants here setting TITLE based on page
    if ($_GET['page'] == 'inspiration') {
        
        define("TITLE", "5-4-3-2-1 | Countdown Inspiration");
        
    } else if ($_GET['page'] == 'walkthrough') {
        
        define("TITLE", "5-4-3-2-1 | Walkthrough");
        
    } else if ($_GET['page'] == 'loggedIn') {
        
        define("TITLE", "5-4-3-2-1 | Home");
        
    } else if ($_GET['page'] == 'profile') {
        
        define("TITLE", "5-4-3-2-1 | Profile");
    
    } else {
        
        define("TITLE", "5-4-3-2-1 | Sign Up");
        
    }


    // NOTE: Include header
    include 'views/header.php';


    // NOTE: Chooses which Navbar to use
    if ($_SESSION['id']) { 
    
        include 'views/navLoggedIn.php';

    } else {

        include 'views/nav.php';
        
    }

            
    // NOTE: Chooses which Page to use
    if ($_GET['page'] == 'inspiration') {
        
        include 'views/inspiration.php';
    
    } else if ($_GET['page'] == 'profile') {
        
        include 'views/profile.php';
    
    } else if ($_GET['page'] == 'walkthrough') {
        
        include 'views/walkthrough.php';
        
    } else if ($_GET['page'] == 'loggedIn') {
        
        include 'views/loggedInHome.php';
        
    } else {
        
        include 'views/home.php';
        
    }

    include 'views/footer.php';

?>