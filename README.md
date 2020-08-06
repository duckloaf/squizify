# Squizify Coding Challenge

To see a working version of this code, go to:
http://au.com.squizify.test.s3-website-ap-southeast-2.amazonaws.com/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Project Scope

To create a simple tea shop where a user can select a bubble tea and customise it will different toppings, then add the tea to a shopping cart, and purchase the tea. There is a settings menu to edit and add products to the tea and toppings list. The Statistics menu will aggregate all orders and show the total number of orders, total value of orders, and leaderboards for the most commonly ordered teas and bubbles.

## Data persistence

With no backend API or database, data is persisted in the app in the following ways:
* **Local Database** JSON files are included in the assets folder which act as the initial database. There are files that hold the default list of products (teas) and bubbles (toppings).
* **Ephemeral Cart** For this example, the shopping cart is held in memory. Also, once the product and bubble databases have been read, they are stored and utilised in-memory. This means that any changes to the products, or any items you add to your cart are lost if you refresh the page.
* **Persistent Storage** All orders have to persist across sessions. For this example I have used local storage.

## Unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Most of the tests are concentrated to the components that contain calculation functions. Most of these are in the Cart component (calculating unit totals, line totals, and changing quantities to re-calculate the order total), and the Stats component (calculating sales, volumes, and leaderboards across all orders).
There are some UI element checks done in the Thanks component.
