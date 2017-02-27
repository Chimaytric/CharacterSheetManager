# CharacterSheetManager
This app is designed to help RPG game master to organise their game sessions

**The project is beginning and clearly not ready to use right now for anything more than testing, stay tuned for more updates**

## Requirements
- node js
- http-server : `npm install -g http-server`
- json-server : `npm install -g json-server`

## Indications
- http-server has to use port 8080 (default)
- json-server has to use port 3000 (default) and db.json file as datasource

## Features

### Players

- [x] display
- [x] add
- [x] remove

### Games

- [x] display
- [x] add
- [x] remove
- [x] character sheet template

### Game Sessions

- [x] display
- [x] add
- [x] remove

### Game Session details

- [ ] general interface
- [ ] players and characters list
- [ ] charatter sheet view/edit
- [ ] tools

## How to make your own template

1. Create your template

  Your template is a directory located in the **"templates"** folder at project's root. It includes a **template.htm** file (which basically is your template) and any ressource file you need (stylesheets, images etc.)
  The template directory name is important for the following steps, in our example, we shall name it **"DD4Template"**.

  In our case, the template main file **"template.html"** has a css file inclusion and references to several images. In this file, **input fields have to be linked to the dataModel with a** `ng-model="characterSheetCtrl.characterData.myFooVar"`. Otherwise, they will **not** be persisted.

2. Modify db.json

  In db.json file, add a new object in the **"templates"** section as following : 
  ```json
  {
      "id": 3,
      "name": "D&D 4 character sheet",
      "squeletton": "DD4Template"
  }
  ```
    - Increment the **"id"** tag
    - Choose any **"name"** you want, it is the name that will appear in dropdown menus
    - **"squeletton"** has to be the name of your template directory
  
3. Play !

  Here you go, create a new game and assign your new template to it and **enjoy !**
