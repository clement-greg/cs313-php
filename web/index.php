
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS 313 Home Page - Greg Clement</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/g/bootstrap@3.3.7(css/bootstrap.min.css),jquery.owlcarousel@1.31(owl.carousel.css+owl.theme.css),animatecss@3.5.2">
    <link href="https://fonts.googleapis.com/css?family=Cousine:400,700|Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href="/css/bootstrap.css" rel="stylesheet" />
    <link href="/css/site.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
</head>
<body data-spy="scroll">
    <nav class="navbar navbar-default navbar-fixed-top main-menu">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a  href="#home" class="navbar-brand page-scroll">
                    <img src="/images/logo.png" alt="Home Warranty" title="Home Warranty">
                </a>
            </div>
            <div class="navbar-collapse collapse" id="nav-main">
                <nav>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="active">
                            <a class="page-scroll" href="#home"><span>Home</span></a>
                        </li>
                        <li class="">
                            <a class="page-scroll" href="#about"><span>About</span></a>
                        </li>
                        <li class="">
                            <a class="page-scroll" href="#projects"><span>My Projects</span></a>
                        </li>
                        <li class="">
                            <a class="page-scroll" href="#stories"><span>Games</span></a>
                        </li>
                        <li class="">
                            <a class="page-scroll" href="#contact"><span>Social</span></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    </nav>


<section id="home" class="home-static section-back-image margin-top-neg-50">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="home-static-text text-center">
                    <h2 data-wow-delay="0.5s" data-wow-duration="1s" class="wow fadeInLeft fade-in-left">Greg Clement</h2>
                    <p data-wow-delay="0.5s" data-wow-duration="1s" class="wow fadeInRight fade-in-right">
                        <img src="/images/gregclement.jpg" class="height-150" />
                    </p>

                    <p>Welcome to my home page for CS 313 - Web Engineering II<br>
                   
                    <a data-wow-delay="0.5s" data-wow-duration="1s" class="btn-home-slider page-scroll wow fadeInUp fade-in-up" href="menu.php">Site Menu</a>

                    <p>
    The time on the server is: <h1 id="server-time"></h1>
</p>
                </p>
                    <p data-wow-delay="0.5s" data-wow-duration="1s" class="wow fadeInLeft fade-in-right" >
                        I write code, and I love it. I'm a full-stack software developer with twenty years creating solutions that increase user satisfaction and drive business productivity. I love engaging with smaller organizations focused on nimbly delivering innovative solutions to the ever-changing business landscape.

                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
<section id="about" class="about-us section-padding">

    <div class="container text-center">
        <div class="row">
            <div class="section-title">
                <h2>About</h2>
                <span> <i class="fa fa-heart-o" aria-hidden="true"></i> </span>
                <p>
                    Code is a tool to solve a problem, not a means unto itself. I have spent the last 18 years solving problems and using code to do it.  Every business domain
                    problem can have its own nuances, but in general I have a set goto technology stack.
                </p>
            </div>

            <div flex id="aboutFlex">
                <div class="about-single wow fadeInUp fade-in-up" data-wow-delay="0.5s" data-wow-duration="1s" >
                    <div class="icon">
                        <span><i class="fa fa-chrome" aria-hidden="true"></i></span>
                    </div>
                    <h4>Web</h4>
                    <p>
                        Over the years there have been UI frameworks that have come and gone (anyone remember Silverlight?), but the constant over the last two decades has been the HTML stack.
                        With HTML5 adoption, the platform has matured to rival just about any competitor.
                    </p>
                </div>
                <div class="about-single  wow fadeInUp fade-in-up" data-wow-delay="0.5s" data-wow-duration="1s" >
                    <div class="icon">
                        <span><i class="fa fa-mobile" aria-hidden="true"></i></span>
                    </div>
                    <h4>Mobile</h4>
                    <p>
                        Let's face it, you may not even be a real developer if you aren't at least looking at mobile development.  Tiny super computers in everyones pockets has changed world yet again.
                        It would seem in the near term, the biggest constraint of innovation is in the imagination technologist to envision new and exciting uses for the technology readily available.
                    </p>
                </div>
                <div class="about-single wow fadeInUp fade-in-up" data-wow-delay="0.5s" data-wow-duration="1s" >
                    <div class="icon">
                        <span><i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
                    </div>
                    <h4>REST</h4>
                    <p>
                        The days of 3-tier applications with every tier happily communicating on the same local network are long gone.  Applications live where people live: everywhere.

                    </p>
                </div>
                <div class="about-single wow fadeInUp fade-in-up" data-wow-delay="0.5s" data-wow-duration="1s" >
                    <div class="icon">
                        <span><i class="fa fa-database" aria-hidden="true"></i></span>
                    </div>
                    <h4>Data</h4>
                    <p>All that information has to go somewhere, and breadth of options for that somewhere has never been greater.  </p>
                </div>
            </div>

        </div>

    </div>

</section>
<section id="projects" class="section-padding section-back-image section-projects">
    <div class="container">
        <div class="row text-center">
            <div class="section-title">
                <h2 class="section-title-white">My Projects</h2>
                <span class="section-title-white-span"> <i class="fa fa-bolt" aria-hidden="true"></i> </span>
                <p class="section-dec-white">I've been a on a lot of projects over the years, here are a few of them I can share:</p>
            </div>

            <div flex>

                <div class="services flex1" >
                    <div class="icon">
                        <span><i class="fa fa-fire" aria-hidden="true"></i></span>
                    </div>
                    <h4>OneGuard Homeowner's Portal</h4>
                    <span></span>
                    <p>
                        This was a project that was both a web application and a mobile application for Android and iOS for customers of OneGurd Home Warranties to access warranty information and submit claims.
                    </p>
                    <div class="text-right margin-top-30">
                        <a href="https://play.google.com/store/apps/details?id=net.oneguard.customerportal" target="_blank">
                            <img src="/images/google-play.png" class="height-25" />
                        </a>
                        <a href="https://itunes.apple.com/us/app/oneguard-homeowners/id1397571409?mt=8" target="_blank">
                            <img src="/images/ios-app-store.png" class="height-25" />
                        </a>&nbsp;&nbsp;
                        <a class="btn-home-slider small" target="_blank" href="https://homeowners.oneguardhomewarranty.com/log-in">
                            <div class="flex-container">
                                <div>
                                    View
                                </div>
                                <div class="flex-none">
                                    <i class="material-icons">
                                        chevron_right
                                    </i>
                                </div>
                            </div>


                        </a>
                    </div>
                </div>


                <div class="services flex1 flex flex-column">
                    <div class="flex1">
                        <div class="icon">
                            <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
                        </div>
                        <h4>Warranty Manager</h4>
                        <span></span>
                        <p>This is a project where I am re-writing the entire application front-end using angular as a single page application.</p>
                    </div>
                    <div class="flex-none text-right" >
                        <a class="btn-home-slider small" target="_blank" href="https://wm-ahs.azurewebsites.net/">
                            <div class="flex-container">
                                <div>
                                    View
                                </div>
                                <div class="flex-none">
                                    <i class="material-icons">
                                        chevron_right
                                    </i>
                                </div>
                            </div>


                        </a>
                    </div>

                </div>

            </div>

        </div>

    </div>

</section>

<section id="stories" class="section-padding min-height-600">
    <div class="container">
        <div class="row text-center">
            <div class="section-title">
                <h2>Games</h2>
                <span> <i class="fa fa-gamepad" aria-hidden="true"></i> </span>
                <p>Here are some of the simple games I have created over the years.  None of them were ever a serious effort, but they were a whole lot of fun to make.</p>
            </div>

            <ul class="gamesList">
                <li>
                    <a href="https://gregbclement.com/Games/TicTacToe">
                        <img src="/images/tic_tac_toe_thumbnail.jpg" />
                        <div class="description">
                            <h3>Tic-Tac-Toe</h3>
                            Play against the computer or against a friend.  Computer play has degrees of difficulty from easy to impossible.
                        </div>
                    </a>
                </li>
                <li>
                    <a href="https://gregbclement.com/Games/Connect4">
                        <img src="/images/connect_4_thumbnail.jpg" />
                        <div class="description">
                            <h3>Connect 4</h3>
                            Play against a friend with the classic game of connect 4.
                        </div>
                    </a>
                </li>

                <li>
                    <a href="https://gregbclement.com/bubbles">
                        <img src="/images/bubbles_thumbnail.jpg" />
                        <div class="description">
                            <h3>Bubble Burst</h3>
                            Play the classic bubble burst game, with multiple styles of game play.
                        </div>
                    </a>
                </li>
            </ul>
            <ul class="gamesList">
                <li>
                    <a href="https://gregbclement.com/Games/Pong">
                        <img src="/images/pong_thumbnail.jpg" />
                        <div class="description">
                            <h3>Pong</h3>
                            A really lame version of the classic game of pong.
                        </div>
                    </a>
                </li>
                <li>
                    <a href="https://gregbclement.com/eaglesquest">
                        <img src="/images/eagles_quest_thumbnail.jpg" />
                        <div class="description">
                            <h3>Eagle's Quest</h3>
                            3D Adventure game created with Unity
                        </div>
                    </a>
                </li>

                <li>
                    <a href="https://gregbclement.com/Games/WhackAScout">
                        <img src="/images/whack-a-scout-thumbnail.jpg" />
                        <div class="description">
                            <h3>Wack-A-Scout</h3>
                            Very simple game created to teach basic programming concepts.
                        </div>
                    </a>
                </li>
            </ul>

            <ul class="gamesList">
                <li>
                    <a href="https://gregbclement.com/Games/RockPaperScissors">
                        <img src="/images/rock-paper-scissors-thumbnail.png" />
                        <div class="description">
                            <h3>Rock Paper Scissors</h3>
                            Another really simple game to demonstrate programming concepts.
                        </div>
                    </a>
                </li>
                <li>
                    <a href="https://gregbclement.com/Games/PowerCell">
                        <img src="/images/powercell_thumbnail.jpg" />
                        <div class="description">
                            <h3>Power Cell</h3>
                            Another 3D Adventure game created with Unity
                        </div>
                    </a>
                </li>

                <li>
                    <a href="https://gregbclement.com/Games/Asteroids">
                        <img src="/images/asteroids_thumbnail.jpg" />
                        <div class="description">
                            <h3>Asteroids</h3>
                            A port of the classic game of asteroids into JavaScript.
                        </div>
                    </a>
                </li>
            </ul>
            <ul class="gamesList">
                <li>
                    <a href="https://gregbclement.com/Games/MoonLanding">
                        <img src="/images/moon_landing_thumbnail.jpg" />
                        <div class="description">
                            <h3>Moon Landing</h3>
                            Another JavaScript port of the classic moon landing game.
                        </div>
                    </a>
                </li>
                <li>
                    <a href="https://gregbclement.com/Games/Skeet">
                        <img src="/images/Skeet_thumbnail.jpg" />
                        <div class="description">
                            <h3>Skeet Shoot</h3>
                            Another JavaScript port of the classic skeet shoot game.
                        </div>
                    </a>
                </li>

                <li>
                    <a href="https://gregbclement.com/Games/PacMan">
                        <img src="/images/pacman_thumbnail.jpg" />
                        <div class="description">
                            <h3>Pac-Man</h3>
                            Another JavaScript port of the classic pac-man.
                        </div>
                    </a>
                </li>
            </ul>
        </div>

    </div>

</section>

<section id="contact" class="contact-area section-padding section-back-image connect-section">
    <div class="container">
        <div class="row">
            <div class="section-title text-center">
                <h2 class="section-title-white">Connect with me</h2>
                <span class="section-title-white-span"> <i class="fa fa-address-card" aria-hidden="true"></i> </span>
                <p class="section-dec-white">Hit me up on the social networks</p>
            </div>


            

            <div class="col-md-12 col-xs-12 wow fadeInRight fade-in-right" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">

                <div class="text-center clearfix">
                    <div class="row">
                        
                    </div>
                    <div>
                        <a href="https://www.facebook.com/GregBClement">
                            <img src="/images/facebook.svg" class="social" />
                        </a>
                        <a href="https://twitter.com/gregb_clement?lang=en">
                            <img src="/images/twitter.svg" class="social" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCGFOlm8Vgj-t8iFPKwcEQ5A?view_as=subscriber" target="_blank">
                            <img src="/images/youtube.svg" class="social" />
                        </a>
                        <a href="https://www.linkedin.com/in/greg-clement-a91401a1/" target="_blank">
                            <img src="/images/linkedin.png" class="social" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    <footer>
        <div class="container">


            <div class="footer-container">

                <img src="/images/logo.png" class="height-100" />
                <p>Copyright 2018 - Greg Clement.  All Rights Reserved.</p>
            </div>
        </div>
    </footer>




    <script src="/scripts/jquery.min.js"></script>

    <script src="/scripts/bootstrap.min.js"></script>

    
    <script src="https://cdn.jsdelivr.net/g/bootstrap@3.3.7,jquery.owlcarousel@1.31,modernizr@2.8.3,jquery.appear@0.3.3,jquery.inview@0.2,wow@1.1.2"></script>
    <script src="/scripts/home.js?v=2"></script>
</body>
</html>
