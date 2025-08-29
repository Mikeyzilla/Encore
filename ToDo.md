CURRENT GOAL: Implement account creation and role based auth.
                A) Style the band profile view inside of account creation. (Start from bandorigin now).
                B) use value + onChange for inputs inside of Band Account Creation.
                C) Add a way to add / remove songs in Band Account Creation.
                D) Fix the position of the group photo, and generate one per genre type.
                E) Bring the Our Goals section on BandProfile higher up.
                F) Push the performance information section slightly to the right.
                G) Make the Ranked + Generated Album data's font sizes larger.
                H) Add in a tour picture and album cover per band.
                I) Have the spotify section expand for long song titles.
                J) Make the songs in our songs so far larger in font size, as well as aligned better.
                K) Try to make font colors consistent from genre -> band sneak -> band profile.
                L) Make a login page on the frontend.
                M) Create a users table in the DB.
                N) Create a users entity in the backend.
                O) Create a user repo in the backend.
                P) Create a user-centric controller that features both account creation and login.
                Q) Hook those services up to the frontend pages.
                R) Protect routes using role-based auth. In app.routes, make sure only managers can use the three routes that currently exist which are not account creation nor login by the use of JWTs.
                S) Test it out.
                T) Make account create the default route (otherwise known as / )
                U) Once a Band logs in, take them to their profile page.
                V) Create the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                W) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                X) Once a Manager logs in, they should be taken to the manager dashboard.
                Y) Add a way to go from the dashboard to the genre page.
                Z) Add in the band calendar view. (simple calendar for now)
                a) Make a way to go from the band profile view after login to the calendar view.
                b) For each day, render a simple, empty list with 3 categories / tabs - Venues, Concerts, Festivals.
                c) Change the empty list to one that renders all event information (what the managers posted to the DB in their dashboard or in account creation) regardless of the currently selected tab.
                d) Change the "all data everywhere" list in each tab to one that correctly filters by selected tab. 
                e) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                f) Have each band only able to accept one event per day. 
                g) Add in the inbox messaging system using web sockets.
                h) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                i) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                j) Change the JPA repository methods to sort by most recent / latest / highest grossing.


To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run