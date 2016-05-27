# Gulp Settings
My gulp settings for front end development

Move this to your theme directory, then just run `npm-install`. It will read your package.json file and install all modules needed to run this.

Once that's installed, just run the following commands:

`$gulp # runs all gulp tasks once
$gulp watch # constantly runs gulp and watches any changed files`

### Note
Make sure the node_modules directory doesn't get checked in. There was an edge case where a .info file running on Drupal 8.x on Pantheon caused a silent timeout error. We discovered the mistake was that this directory accidentally got checked in. Drupal 8 loves .info files.
