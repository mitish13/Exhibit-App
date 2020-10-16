# Exhibit-App

## Overview

Exhibit-App is as the name suggest made for the local exhibitions like clothe, imitation jewelry etc..
This App entails 2 login facilties. 
1. Log in as a organizer of exhibtion: Add exhibtions which you are going to organize
2. Log in as a customer: See the list of exhibtions created by different organizers around you and get in touch with them

## Software stack:
### Frontend:
This App is completely made up using react-native framework, So it should work on both android and ios devices.


### Backend: 
1. To store exhibtions:- firebase realtime database
2. For Authentication:- fireabase authentication (Email and password)
3. To save the state of authentication: local storage
4. To persist the favorites list : local storage


## Steps to run the application
Make sure that you have already installed node.js

### 1. Download 'expo app' in your phone. 
### 2. Download the zip file and extract it, move into the project directory
### 3. run below command, it will add node_modules folder to add all dependencies
```
npm install
```
### 4. run
```
npm start
```
if this won't work then try 
```
npm start --tunnel
```
### 5. QR code will appear in cmd as well as browser, scan it in expo application on your phone.



## link to directly open the app
* https://expo.io/@mitish_13/projects/Exhibit
