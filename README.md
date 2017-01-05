## Twgitbot ##
A node.js bot that checks a github repo changes and  *tweets* it to your Twitter account

**Twgitbot** does:

 - Checks for the 3 most used languages on the repo and constructs the *twit* making them #hashtags
 - Watches your repo with the help of the [Github's api](https://developer.github.com/v3/)

**Twgitbot** doesn't:

 - Hack anything... Or does he? :frowning:
 - Make coffee, unfortunately

To try just:

    git clone https://github.com/VzqzAc/twgitbot.git && cd twgitbot
    npm install
    # And to setup your custom config
    npm run first-twgit
    # Fill the prompted form to share your first Twgit
    
Twgitbot is Heroku ready, so if you want to deploy it there you should run:

    heroku create <your twgitbot's name>
    git push heroku master
    # Wait for it
Aaaand done, visit `<your twgitbot's name>.herokuapp.com` or run `heroku logs` just to make sure.
By the way, I will work on a script to automate a heroku deploy, **contributions are welcome!**

Special thanks to [@bashz](https://github.com/bashz) and [@omarandstuff, David de Anda](https://github.com/omarandstuff) for contributing

Better code using:

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
