# Introduction
Space Explorer is a game built entirely using JavaScript, Canvas, HTML and CSS (Bootstrap). 

As a user, you are able to create an account, chose an avatar and play Space Explorer! The game involves jumping through bars in space, with the aim to jump through as many as possible without your character crashing into one of the bars. When your character collides with either a bar or the rocky ground it will be game over. 

If you'd like to run the code from your own machine please follow the below instructions:

# Getting Started

Clone the Github repository onto your machine using the terminal command 

   git clone <url here> 

You can find the necessary url on the right hand side of the Github repository. 

To install any gems, run

    bundle install

# Create Your Server

Navigate into the space-explorer-backend folder and run 

    rails db:migrate 

To set up your database. Next run

    rails db:seed

To populate your database with the characters necessary to play the game. Then,

    rails s 

To run the API needed for the page to load properly.

# Open the app 
To open the app on your machine, navigate into the space-explorer-frontend folder and enter the following into your terminal

    open index.html

You’re now ready to play Space Explorer!


Thank you for checking out our app :) Music is ‘Lady of Sorrows’ by The Black Madonna.

# Authors
Rebecca Huseyin & Ayush Gehlot
