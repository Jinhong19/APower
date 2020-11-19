# APower
gamePlay Service

## description 
game play service manages all gmaePlayService manages all chat rooms

## Setup 
You need the latest stable versions of these programs:

    * MongoDB
    * npm
    * node

## Instructions
Open up a terminal in the root directory of the project and type this in to install the dependencies locally.

```bash
npm install
```

Now in the same directory type this in to launch the server:

```bash
node server.js
```

Now, open up a web browser and enter http://localhost:3000 in the URL bar.

## Example

* /createGameRoom

![POST_createGameRoom](exampleImage/POST_createGameRoom.PNG)

* /deleteGameRoom

![POST_deleteGameRoom](exampleImage/POST_deleteGameRoom.PNG)

* /getRoomByPlayerId

![POST_getRoomByPlayerId](exampleImage/POST_getRoomByPlayerId.PNG)

* /getRoomByHostId

![POST_getRoomByHostId](exampleImage/POST_getRoomByHostId.PNG)

* /invitePlayer

![POST_invitePlayer](exampleImage/POST_invitePlayer.PNG)

* /kickPlayer

![POST_kickPlayer](exampleImage/POST_kickPlayer.PNG)

* /quit

![POST_quit](exampleImage/POST_quit.PNG)

* /assignHost

![GET_assignHost](exampleImage/GET_assignHost.PNG)

* /roomMember

![GET_roomMember](exampleImage/GET_roomMember.PNG)

* /changeCharId

![POST_changeCharId](exampleImage/POST_changeCharId.PNG)

* /story

![GET_story](exampleImage/GET_story.PNG)

* /characterById

![GET_characterById](exampleImage/GET_characterById.PNG)

* /skill

![GET_skill](exampleImage/GET_skill.PNG)