# Borrow my pet

## Description

It'a an app where you can borrrow a dog for a short period of time to take walks and other fun stuff. On the other hand, if you have a dog and whant him/ her to have fun with other people you can join also.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **pre login** - As a user I want to be able to access the homepage so that I see what the app is about. I can choose to sign up or login if already signed up.
- **sign up** - As a user I want to sign up on the webpage so that I can see a pet list with descripton and choose one.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **pet create** - As a user I want to create a profile for my pet
- **pet feed** - As a user I want to see all the avaiable pets for a specific period of time
- **pet details** - As a user I want to see the description and details about the pets and request to borrow the pet
- **request & accept** - As a user I want to request to borrow a pet and as a pet owner to accept or decline a request
- **profile** - As a user I want to edit my pets and user info
- **edit user** - As a user I want to request to borrow a pet
- **edit pet** - As a user I want to request to borrow a pet
- **delete pet** - As a user I want to delete a pet

## Routes:

| Method | Route | Description|

| GET  | /     | Main page route. If logged in takes to main feed. If not redirects to login
| GET  | /login | Login route. Renders login formulary view
| POST | /login | Login route. Sends login formulary info to the server
| GET | /signup | Signup route. Renders signup formulary view
| POST | /signup | Signup route. Sends signup info to server and creates user in DB
| GET | /main-feed | Main route. Renders the list of available  pets
| GET | /add-pets | Add Pets route. Renders the form to add new pet
| POST | /add-pets | Add Pets route. Sends the form into server and create a new pet
| GET | /profile/:ID | Profile route. Renders profile from user with pets
| POST | /profile/:ID | Profile route. Update user info and pet info
| GET | /pets/:ID | Pets route. Renders pet info and request  form
| POST | /pets/:ID | Pets route. Send the request from pet id to DB
| POST | /logout | logout route. User can logout
| POST | /delete | Delete route. Delete pet from server





## Models

User model

```javascript
{
  username: String, unique
  password: String, required
  email: String, unique
  picture: String
  hasPet: Boolean
  review: Array
}

```

Pet model

```javascript
name: String, require
creatorId: UserID
Type: String
Size: String, required
Age: Number
description: Array
picture: String, required
isAvaiable: Boolean,
datesAvailable: String
startTime:
endTime:
```




## Backlog

- messaging
- Testimonials
- Maps
- Facebook login
- Reviews

## Links

Trello

https://trello.com/b/oopcHn29

### Git



[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
