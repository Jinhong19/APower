# APower
Rulebook Service

## description 
Rulebook service manages all rulebook,stories,skills creation and access, and handle incoming http request

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

Now, open up a web browser and enter http://localhost:3005 in the URL bar.

## Example
* /create

![POST_create](exampleImage/POST_create.PNG)
![POST_create_respond](exampleImage/POST_create2.PNG)

* /renameRulebook

![POST_renameRulebook](exampleImage/POST_renameRulebook.PNG)

* /deleteRulebook

![POST_deleteRulebook](exampleImage/POST_deleteRulebook.PNG)

* /uploadStory

![POST_uploadStory](exampleImage/POST_uploadStory.PNG)
![POST_uploadStory](exampleImage/POST_uploadStory2.PNG)

* /removeStory

![POST_removeStory](exampleImage/POST_removeStory.PNG)

* /renameStory

![POST_renameStory](exampleImage/POST_renameStory.PNG)

* /addSkill

![POST_addSkill](exampleImage/POST_addSkill.PNG)

* /removeSkill

![POST_removeSkill](exampleImage/POST_removeSkill.PNG)

* /deleteSkillTemp

![POST_deleteSkillTemp](exampleImage/POST_deleteSkillTemp.PNG)