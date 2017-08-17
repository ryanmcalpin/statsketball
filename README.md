# Statsketball
Ryan McAlpin, Janek Brandt, Mark Fisher
Epicodus, May 15-18, 2017

## Description
A webapp made using the Angular2 javaScript framework that allows users (e.g., a coach of a high school basketball team) to log in via their google accounts and then create teams, players, and games, and track their statistics. Statsketball also allows users (when not logged in) to view other users' teams and statistics, but not edit them.

![screenshot](/../screenshots/screenshots/screenshot-home.png?raw=true "screenshot")
- - - -
![screenshot](/../screenshots/screenshots/screenshot-team.png?raw=true "screenshot")
- - - -
![screenshot](/../screenshots/screenshots/screenshot-game.png?raw=true "screenshot")
- - - -
![screenshot](/../screenshots/screenshots/screenshot-add-stats.png?raw=true "screenshot")


## Requirements
* Git
* Node.js (with npm)
* Angular2
* Angular CLI
* Typescript
* Bower
* Gulp

## Setup
* Download or clone directory
* In root directory, run 'npm install'
* Run 'bower install'
* Go to https://firebase.google.com/, create a project, and select 'Add Firebase to your web app'
* Create a file called 'api-keys.ts' in statsketball/src/app/ 
* Add
  ```
  export var masterFirebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx.firebaseapp.com",
    projectId: "xxxx"
    databaseURL: "https://xxxx.firebaseio.com",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "xxxx"
  };
  ``` 
  to api-keys.ts, replacing values with those from Firebase
* Run 'ng serve'
* Navigate to localhost:4200 in browser

## Legal
Copyright (c) 2017 Copyright Ryan McAlpin, Janek Brandt, & Mark Fisher, All Rights Reserved.<br/>
This webpage is licensed under the MIT license.
