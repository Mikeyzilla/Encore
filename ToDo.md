CURRENT GOAL: Implement account creation and role based auth.
                A) hook up the add and delete song routes to the frontend in the appropriate locations.
                B) Hook the create and login routes up to the frontend pages. (Make sure that login checks role, in addition to user and password. If the user creates an account, skip login and go straight to the appropriate page (depending on their role))
                C) Protect routes using role-based auth. In app.routes, make sure only managers can use the three routes that currently exist which are not account creation nor login by the use of JWTs.
                D) Make account create the default route (otherwise known as / )
                E) Test create account, login, add song, and delete song.
                F) Once a Band logs in, take them to their profile page.
                G) Create the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                H) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                I) Once a Manager logs in, they should be taken to the manager dashboard.
                J) Add a way to go from the dashboard to the genre page.
                K) Add in the band calendar view. (simple calendar for now)
                L) Make a way to go from the band profile view after login to the calendar view.
                M) For each day, render a simple, empty list with 3 categories / tabs - Venues, Concerts, Festivals.
                N) Change the empty list to one that renders all event information (what the managers posted to the DB in their dashboard or in account creation) regardless of the currently selected tab.
                O) Change the "all data everywhere" list in each tab to one that correctly filters by selected tab. 
                P) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                Q) Have each band only able to accept one event per day. 
                R) Add in the inbox messaging system using web sockets.
                S) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                T) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                U) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                V) Add in a column to the song DB about songViewCount
                W) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                X) In CreateAccount on the band profile page, aboutentry and songentry are uneven vertically.
                Y) Revamp the Country Profile Page and Country Account Create styles.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run