Feature: User Login Scenario

    Background: User interact with login page
        Given User visit login page

    Scenario: As a user when I put wrong credentials error message will popout above button click
        And User input wrong username and password
        When User click login button 
        Then error message "Username Or Password is not match" will popout above button click

    Scenario: As a user when I put correct credentials then login will show home page
        And User input correct username and password
        When User click login button 
        Then User successfull login and see home page