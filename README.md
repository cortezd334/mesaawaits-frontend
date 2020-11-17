# MesaAwaits

## Table of Contents
- General Info
- Technologies
- Setup
- User Story
- Features
- Inspiration
- Troubles
- Contributions

## General Info
MesaAwaits was created by Danira Cortez for Flatiron School's Mod 5 Final Project. It combines React, Rails, and the Yelp, Google Maps, and Geolocation APIs, so users can book reservations at restaurants in their area or from their search result.

## Technologies
- React
- Rails
- ActiveRecord
- PostgreSQL
- HTML
- Bootstrap
- CSS
- Yelp API
- Google Maps API
- Geolocation API

## Setup
Fork and open https://github.com/cortezd334/mesaawaits-backend
In the terminal run:
`$ bundle install`
`$ rails s`

Once you fork and open MesaAwaits, run the following in your terminal:
`$ bundle install`
`$ yarn start`

## User Story
Once an account is created, an user will see restaurants in their area. From this page, they can choose to book a reservation, favorite a restaurant, or view the restaurants on a map. The user also has the option of searching for restaurants in other cities, by typing in the cuisine and location at the top of the page. In map view, the user is able to click on a custom marker to see the name of the restaurant, while the information will be on the left. When a restaurant is favorited the icon will change from a heart with a plus sign to a heart, the restaurant will be stored in the database, and the user will be able to view all their favorite restaurants from their profile. To remove a favorite restaurant, the user can either click on the heart icon, changing it back to a heart with a plus sign, or click on the Remove From Favorites button in the Favorite Restaurants list. When making a reservation, the user will fill in the fields, name, date, time, party size, special occasion, and notes. After submitting, a confirmation of the reservation will pop up with the option to Find More Restaurants or View Profile. The profile page will load with the user's information, which can be edited, a link to view upcoming reservations, a link to view favorite restaurants, and a button to delete account. 

## Features
- Sign up/login as a User
- View local restaurants
- View restaurants from search result
- Favorite/un-favorite restaurants
- Make reservations at restaurants
- View or remove favorite restaurants
- View or delete restaurant reservations

## Inspiration
The restaurant industry is in need of support after being greatly affected by Covid. This app was created as a way for people to  view restaurants, not just in their area, but world wide. 

## Troubles
The Yelp API offers a wealth of information, but due to this I wasn't able to save everything to the database. Due to this it only makes sense to save the restaurant when favoriting a restaurant or making a reservation. The program first checks to see if the restaurant is already in the database (by name, longitude, and latitude to avoid duplicates) then saves it. This ended up being a bigger challenge than  expected when first planning out the program. 

Another issue came with wanting to use the useEffect hook and Geolocation API. I wanted to make sure it was getting my location accurately, so I defaulted the location to San Francisco, as I was in Seattle. Ideally when the page would load, the restaurants for Seattle would show, however, that was not the case. With useEffect being similar to a componentDidMount and componentDidUpdate, it would load restaurants with the San Francisco location, then the geolocation would be used and updated, but the restaurants were not. It took a bit of research (since I had not had much experience with useEffect) but eventually I made two states (previous and current), compared them, and if different then the useEffect was used with center as a dependency.

## Contributions
Danira Cortez, Yelp, Google Maps, Geolocation
