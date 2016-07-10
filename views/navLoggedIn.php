<header>
    <nav class="navbar navbar-static-top navbar-light bg-faded">
        <button class="navbar-toggler hidden-lg-up pull-xs-right" type="button" data-toggle="collapse" data-target="#startupNavbar">
            &#9776;
        </button>

        <a class="navbar-brand" href="?page=loggedIn">Get Set, Go!</a>

        <div class="collapse navbar-toggleable-md" id="startupNavbar">

            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="?page=inspiration">Countdown Inspiration</a>
                </li>
            </ul>

            <a id="logoutBtn" class="btn btn-danger pull-md-right" href="?action=logout">Log Out</a>
               
            <form class="pull-md-right form-inline navbar-input-group">
                <div class="input-group pull-md-right">
                    <input type="text" class="form-control" placeholder="Search for...">
                    <span class="input-group-btn">
                        <button class="btn btn-success-outline" type="button">Go!</button>
                    </span>
                </div>
            </form>

            <ul id="yourProfile" class="nav navbar-nav pull-md-right">
                <li class="nav-item">
                    <a class="nav-link" href="?page=profile">Your Profile</a>
                </li>
            </ul>


        </div>
    </nav>
</header>