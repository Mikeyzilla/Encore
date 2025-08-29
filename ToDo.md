CURRENT GOAL: Implement account creation and role based auth.
                A) With punk, everything needs to be pushed up around 100px.
                B) With punk, all inputs' widths need to be increased.
                C) With pop, increase the width of where you enter your social information by 25px and change both the submit background color and add / delete song background color to aqua.
                D) With grunge, increase all inputs' widths by 55 px except for song entry and name of band.
                F) With metal, change the underline of each input to black.
                With Rock, the background buttons need to have the black background added again.
                G) With country, increase all input widths by 55px and change both the add/delete song buttons and the submit buttons background color to a country / western brown.
                H) With Gospel, increase all inputs' widths by 55px, reduce all font sizes by around 20% except for those on the buttons, and change the background color of the buttons to a light blue.
                I) Change the background color of the buttons inside latin to transparent.
                J) use value + onChange for inputs inside of Band Account Creation.
                K) Add a way to add / remove songs in Band Account Creation.
                L) Generate one Group Photo per genre type.
                M) Bring the Our Goals section on BandProfile higher up.
                N) Push the performance information section slightly to the right.
                O) Make the Ranked + Generated Album data's font sizes larger.
                P) Add in a tour picture and album cover per band.
                Q) Have the spotify section expand for long song titles.
                R) Make the songs in our songs so far larger in font size, as well as aligned better.
                S) Try to make font colors consistent from genre -> band sneak -> band profile.
                T) Make a login page on the frontend.
                U) Create a users table in the DB.
                V) Create a users entity in the backend.
                W) Create a user repo in the backend.
                X) Create a user-centric controller that features both account creation and login.
                Y) Hook those services up to the frontend pages.
                Z) Protect routes using role-based auth. In app.routes, make sure only managers can use the three routes that currently exist which are not account creation nor login by the use of JWTs.
                a) Test it out.
                b) Make account create the default route (otherwise known as / )
                c) Once a Band logs in, take them to their profile page.
                d) Create the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                e) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                f) Once a Manager logs in, they should be taken to the manager dashboard.
                g) Add a way to go from the dashboard to the genre page.
                h) Add in the band calendar view. (simple calendar for now)
                i) Make a way to go from the band profile view after login to the calendar view.
                j) For each day, render a simple, empty list with 3 categories / tabs - Venues, Concerts, Festivals.
                k) Change the empty list to one that renders all event information (what the managers posted to the DB in their dashboard or in account creation) regardless of the currently selected tab.
                l) Change the "all data everywhere" list in each tab to one that correctly filters by selected tab. 
                m) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                n) Have each band only able to accept one event per day. 
                o) Add in the inbox messaging system using web sockets.
                p) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                q) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                r) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                s) Add in a column to the song DB about songViewCount
                t) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                u) In CreateAccount on the band profile page, aboutentry and songentry are uneven vertically.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run