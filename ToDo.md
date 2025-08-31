CURRENT GOAL: Implement account creation and role based auth.
                A) Present the date in BandProfile in a readable format.
                B) Make a login page on the frontend.
                C) Create a users table in the DB.
                D) Create a users entity in the backend.
                E) Create a user repo in the backend.
                F) Add a way to add / remove songs in Band Account Creation. Do this by implementing a post to song controller that posts a singular song to the DB every time add is clicked, and every time delete is clicked, it removes the latest song (the song that just got added to the DB)
                H) Create a user-centric controller that features both account creation and login.
                I) Hook those services up to the frontend pages.
                J) Protect routes using role-based auth. In app.routes, make sure only managers can use the three routes that currently exist which are not account creation nor login by the use of JWTs.
                K) Test it out.
                L) Make account create the default route (otherwise known as / )
                M) Once a Band logs in, take them to their profile page.
                N) Create the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                O) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                P) Once a Manager logs in, they should be taken to the manager dashboard.
                Q) Add a way to go from the dashboard to the genre page.
                R) Add in the band calendar view. (simple calendar for now)
                S) Make a way to go from the band profile view after login to the calendar view.
                T) For each day, render a simple, empty list with 3 categories / tabs - Venues, Concerts, Festivals.
                U) Change the empty list to one that renders all event information (what the managers posted to the DB in their dashboard or in account creation) regardless of the currently selected tab.
                V) Change the "all data everywhere" list in each tab to one that correctly filters by selected tab. 
                W) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                X) Have each band only able to accept one event per day. 
                Y) Add in the inbox messaging system using web sockets.
                Z) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                a) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                b) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                c) Add in a column to the song DB about songViewCount
                d) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                e) In CreateAccount on the band profile page, aboutentry and songentry are uneven vertically.
                f) Revamp the Country Profile Page and Country Account Create styles.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run