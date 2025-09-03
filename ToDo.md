CURRENT GOAL: Implement account creation and role based auth.
                A) populate the database.
                A) Add in missing fields to createAnAccount, test it, add in JWT to create, test that.
                B) Test out Login using postman, and update it on each success to be more like the fully developed (but not working) one.
                C) In create account, make sure all fields have onChange and value that need them. Make sure to include a usestate with userRole and setUserRole as well. 
                E) Make sure in band profile creation, that about us (a required input) is on both experienced AND inexperienced profiles.
                F) Hook up the current minimal routes to the frontend, but not createAccount yet. Instead, make a dummy version of the createAccount page, and keep adding to it as it keeps working.
                G) Flesh out createAnAccount with date formatting, JWT, and password encryption. 
                H) Make sure the dummy matches the complexity level.
                I) Flesh out Login by adding in encryption and JWT.  
                J) Make sure if you create your account, you skip login and go directly to the page that's next for your role.
                    - Once a Band logs in, take them to their profile page.
                    - Once a Manager logs in, they should be taken to the manager dashboard.
                K) Protect routes using role-based auth. In app.routes, make sure only managers can use the three routes that currently exist which are not account creation nor login by the use of JWTs.
                L) Fill out the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                M) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                N) Add a way to go from the dashboard to the genre page.
                O) Add in the band calendar view. (simple calendar for now)
                P) Make a way to go from the band profile view after login to the calendar view.
                Q) For each day, render a simple, empty list with 3 categories / tabs - Venues, Concerts, Festivals.
                R) Change the empty list to one that renders all event information (what the managers posted to the DB in their dashboard or in account creation) regardless of the currently selected tab.
                S) Change the "all data everywhere" list in each tab to one that correctly filters by selected tab. 
                T) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                U) Have each band only able to accept one event per day. 
                V) Add in the inbox messaging system using web sockets.
                W) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                X) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                Y) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                Z) Add in a column to the song DB about songViewCount
                a) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                b) In CreateAccount on the band profile page, aboutentry and songentry are uneven vertically.
                c) Revamp the Country Profile Page and Country Account Create styles.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run