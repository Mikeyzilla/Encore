CURRENT GOAL: Implement account creation and role based auth.
                A) Add in JWT to create and then login, and test them both.
                B) add the option to go straight to login from account creation.
                C) Protect routes using role-based auth. In app.routes, make sure only managers can use the three routes that currently exist which are not account creation nor login by the use of JWTs.
                D) Fill out the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                E) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                F) Add a way to go from the dashboard to the genre page.
                G) Add in the band calendar view. (simple calendar for now)
                H) Make a way to go from the band profile view after login to the calendar view.
                I) For each day, render a simple, empty list with 3 categories / tabs - Venues, Concerts, Festivals.
                J) Change the empty list to one that renders all event information (what the managers posted to the DB in their dashboard or in account creation) regardless of the currently selected tab.
                K) Change the "all data everywhere" list in each tab to one that correctly filters by selected tab. 
                L) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                M) Have each band only able to accept one event per day. 
                N) Add in the inbox messaging system using web sockets.
                O) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                P) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                Q) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                R) Add in a column to the song DB about songViewCount
                S) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                T) In CreateAccount on the band profile page, aboutentry and songentry are uneven vertically.
                U) Revamp the Country Profile Page and Country Account Create styles.
                V) If a band has albums, but doesn't have performances or vice versa, the UI looks off. Change the empty area to something that has info.
                W) If a band has many performances, don't hard code the number of performances in band profile. Right now, if a band has one performance, I have two band performance "entries" by default on the frontend. Instead map each performance to its own performance entry.
                X) In Manager Account creation, make the time slot input a dropdown from 8am to 2am.
                Y) get rid of "a little about us" on band account creation for inexperienced bands since it shows up on both types of bands and replace it with something else.
                Z) Refreshing after a band account creation does not work. Make sure refreshes work

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run