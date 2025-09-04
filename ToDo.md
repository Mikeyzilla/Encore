CURRENT GOAL: Work on the Band Calendar View.
                A) Add in JWT to create and then login, and test them both.
                B) Add in the suffix for day number logic.
                C) Style the Event Ticket better.
                D) If the role is band, inside BandProfile, make it so that only band users can see the calendar view button, which goes to the calendar view route. 
                E) Make the calendar view route only authorized by bands.
                F) Fill out the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                    - Venue Statuses will be determined by an additional foreign key, which can be nullable, inside the managers table. If the row in the managers table does not have a band id, it's available. If it does, that means a band already took the timeslot, so it's unavailable. Will need to add in a controller for returning all events by venue name, venue date (not time) and event type.
                G) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                H) Add a way to go from the dashboard to the genre page.
                I) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                J) Have each band only able to accept one event per day. 
                K) Add in the inbox messaging system using web sockets.
                L) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                M) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                N) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                O) Add in a column to the song DB about songViewCount
                P) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                Q) In CreateAccount on the band profile page, aboutentry and songentry are uneven vertically.
                R) Revamp the Country Profile Page and Country Account Create styles.
                S) If a band has albums, but doesn't have performances or vice versa, the UI looks off. Change the empty area to something that has info.
                T) If a band has many performances, don't hard code the number of performances in band profile. Right now, if a band has one performance, I have two band performance "entries" by default on the frontend. Instead map each performance to its own performance entry.
                U) In Manager Account creation, make the time slot input a dropdown from 8am to 2am.
                V) get rid of "a little about us" on band account creation for inexperienced bands since it shows up on both types of bands and replace it with something else.
                W) Refreshing after a band account creation does not work. Make sure refreshes work

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run