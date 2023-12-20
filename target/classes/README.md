# term-project-awang283-axwu-fvavrovs-kli154-jcohen45

# Project details

## Project name: 
Posters @ Brown

##
Project description :

While organizations tend to advertise events on social media, through Today@Brown, and physical flyers, there is no centralized place for event-goers to filter all Brown events based on their interests. For example, if a member of the Brown community knows they want to attend a performance or knows they want to attend an event with free food, they would need to individually search for event advertisements from organizations they already know about. Posters @ Brown remedies this problem by providing a centralized advertising hub for Brown events that allows uploaders to tag their events with “free food,” “performance,” etc. (and then users can filter by these tags and dates). The application also serves as an archive of poster and visual design of student groups on campus over the years, which users can navigate with the same searching and tagging functionality. It allows for uploaders to upload a photo of an existing physical poster, and then the web app “reads” the text on the poster and auto-suggest tags that the uploader can approve, delete, or edit. 

## Team members and contributions:

Jaclyn Cohen (cs login: jcohen45)
Anna Wang (cs login: awang283)
Katie Li (cs login: kli154)
AJ Wu (cs login: axwu)
Fanny Vavrovsky (fvavrovs)

## Include the total estimated time it took to complete project: 300 hours

## A link to our repo: https://github.com/cs0320-f23/term-project-awang283-axwu-fvavrovs-kli154-jcohen45

## Exterior resources (Applications, languages, APIs, documentations and other code) we have used within our project:

### Backend: 
- java 
- springboot 
- spark 
- JUnit 
- mongo db 

### Frontend:
- HTML 
- CSS 
- TS 
- npm 
- node js
- react 
- chakra recoil
- Axios
- tabler icons
- Oauth
- react responsive masonry

## Design choices -- high level design of your program

### Explain the relationships between classes/interfaces.

Backend: We have several folders in our backend that group together classes and interfaces that are related. We have one folder dedicated to all the classes necessary for the imgur upload process, another for OCR, another for Users, one for responses, one for types.. Both Posters and Users have three very similar classes, plus an interface. A defining class, a controller class and a service class. The controller class defines the mappings and endpoints for poster management and the service class handles the logic of creating a poster. This involves validating the input data and interacting with the database to persist the Poster object. It is used by the Controller class. 

On the frontend, which lives in the “client” folder, we also have several folders and main classes. There is a component folder as well as a styles class. The component folder is organized by elements of the web app including tags, buttons and create image modal. The styles folder contains the styling of the different elements. 

### Discuss any specific data structures you used, why you created it, and other high level explanations or Runtime/ space optimizations you made (if applicable).

We decided to use MongoDB as a database for both our Users and our Posters. Since the free version of MongoDB has limited capacity, we chose to store the images of our posters themselves through Imgur, which produces a link we can use to render the images on the website. 

## Errors/Bugs -- Write reproduction steps for all the bugs in your program. If the mentor TA finds an error and knows how to reproduce it, they will be able to leave better feedback. 

Unfortunately, we are currently encountering a few issues with Google authentication. While we have successfully integrated the login functionality into the web app, users, as soon as they log in, are not always being added properly to the MongoDB database. To reproduce this bug, you can just login with your Brown email address and check the database. Sometimes, when you comment and uncomment parts of the code responsible for the login portion (in the frontend, in the app class), the user is added, which makes us believe this could be a concurrency/operation timing issue.

## Tests -- Explain the testing suites that you implemented for your program and how each test ensures that a part of the program works. 
We used postman to test our program, sending all kinds of requests with many different edge cases and double checking if the expected and desired behavior was achieved. 

## How to build and run your program
In order to run our program, it is important to have the backend running in IntelliJ through the “App” class. On the frontend, make sure to install maven and run “npm install” inside the client folder. You can then run “npm run dev” to start the app. Follow the link to the website and you can then click all of the buttons and follow the instructions that are provided. 
