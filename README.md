Bike Barn is a motorcycle fleet management too built by Melinda Evans at melinda.codes.com 2015.
If you have any questions or requests please contact Melinda at:
melinda@melindacodes.com

And remember... shiny side up, rubber side down, stay on the black path between the trees!



To set up the dev environment:
git init
npm install -g grunt-cli
sudo chown -R $USER /usr/local
npm install

git config user.name "name"
git config user.email "name@gmail.com"

add and commit

git remote add origin https://github.com/name/yourProjectName.git
git push -u origin master

- install heroku if needed
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh

git remote add heroku git@heroku.com:your-app.git
 -or-
heroku git:remote -a shrouded-oasis-4528

git push heroku master
* git push -f heroku master // if necessary