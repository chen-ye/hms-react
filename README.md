# HMS (0.0.1) Preview
Hi!  This is HMS, what will hopefully become a full-featured hackathon management webapp that allows organizers to focus on the unique parts of their hackathon.  

![Check-in system](https://d13yacurqjgara.cloudfront.net/users/329021/screenshots/2306660/hms-checkin-demo.gif)

## Installation
1. You'll need Meteor, which you can install at [meteor.com](https://www.meteor.com/).

2. Then, clone this repo with `git clone https://github.com/chen-ye/hms-react.git`.  Alternately, you can [download](https://github.com/chen-ye/hms-react/archive/master.zip) a static version of this repo. 

3. Then, using the console, `cd` into `hms-react/hms`, and type `meteor install`.

4. You're set up!  Start up the app by typing `meteor` inside `hms-react/hms`.  Firstrun takes some time, because Meteor has to download dependencies and build the app for the first time.  When it's done, using a default install of Meteor, you should be able to view your install using a browser at http://locahost:300.

## Configuration
Hold on though, you probably want to actually *use* this thing, don't you?

In order to do so, you'll need to set up an admin account in `hms-react/hms/private/config` first.  The syntax should be right in the file.  

## Contribute!  
HMS is still in very very early development, and any help is appreciated!  

Code, bugfixes, and pull requests are welcome, but I'd also love to hear organizer perspectives--what would *you* find useful to have?  [Let's chat!](https://github.com/chen-ye/hms-react/issues)

## Debugging
If you are running HMS locally, you have access to [MeteorToys](https://atmospherejs.com/meteortoys/allthings), which allow you to observe and modify the data being stored in the background. Press `CTRL + M` to activate MeteorToys. Please note that (for obvious reasons), this is not deployed to release instances.

You can debug React with the [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), which adds a pane to your Chrome Developer tools where you can observe the flow of data through the frontend.  

## Status

### Stable
Nothing yet!

### Functional
- People
  - User account system
  - Email + password login
  - Roles with permissions (volunteers, hackers, organizers, mentors, admin)
- Event
  - Check-in system

### Indev
- Event
  - Registration
- Debug

### Planned
`TK`


