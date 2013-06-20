h1. Rain CSS Framework Readme

Rain css is a CSS Framework can build your web easier and efficient,and all object are set in screen.css and rain.css,so you can only invoke it now and it support all css3 properties, and the reset css use blueprint framework.it's include these commponents:

* Base HTML elements
* HTML Common Components
* Page Layout
* Mobile UI

h2. Project Info

* *Web*: "http://www.webdevelopmentmachine.com/rain-css/index.html":http://www.webdevelopmentmachine.com/rain-css/index.html
* *Source*: "https://github.com/RainZhai/Rain-CSS-Framework":https://github.com/RainZhai/Rain-CSS-Framework

h2. Setup Instructions

Here's how you set up Rain CSS on your site.

# Upload the "blueprint" folder in this folder to your server, and place it in whatever folder you'd like. A good choice would be your CSS folder.
# Add the following three lines to every @<head/>@ of your site. Make sure the three @href@ paths are correct (here, BP is in my CSS folder): <pre><code>
<link rel="stylesheet" href="css/blueprint/rain.css" type="text/css" media="screen, projection"></code></pre>
Remember to include trailing slashes (" />") in these lines if you're using XHTML.
# For development, add the .showgrid class to any container or column to see the underlying grid. Check out the @plugins@ directory for more advanced functionality.

h2. Files in Rain CSS

The framework has a few files you should check out. Every file in the @rain@ directory contains lots of (hopefully) clarifying comments.

Source files:
* @rain/css/rain.css@<br/>
This file resets CSS values that browsers tend to set for you.

Scripts:
* @js/html5.js@<br/>
Validates the Blueprint core files with the W3C CSS validator.