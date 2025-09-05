CURRENT GOALS: Populate the DB and work on I K L Q and R.

                A) Add in JWT to create and then login, and test them both.
                B) Fill out the manager dashboard page where managers can look at their venue statuses (This one is still incomplete, this one got complete) and can add in new venue information.
                    - Venue Statuses will be determined by an additional foreign key, which can be nullable, inside the managers table. If the row in the managers table does not have a band id, it's available. If it does, that means a band already took the timeslot, so it's unavailable. Will need to add in a controller for returning all events by venue name, venue date (not time) and event type.
                C) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                D) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                E) Have each band only able to accept one event per day. 
                F) Add in the inbox messaging system using web sockets.
                G) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                H) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                I) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                J) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                K) In CreateAccount on the band profile page, aboutentry and songentry are uneven vertically.
                L) Revamp the Country Profile Page and Country Account Create styles.
                M) If a band has albums, but doesn't have performances or vice versa, the UI looks off. Change the empty area to something that has info.
                N) In Manager Account creation, make the time slot input a dropdown from 8am to 2am.
                O) get rid of "a little about us" on band account creation for inexperienced bands since it shows up on both types of bands and replace it with something else.
                P) Refreshing after a band account creation does not work. Make sure refreshes work
                Q) In Calendar view, instead of just getting the Manager's id and displaying their name as Manager {id}, use that id to lookup the username, and then display that instead.
                R) When viewing a Punk Band from genrelist, the AlbumsSection class is way too far down. Add in a special class for punk and modify it. (-100px of margin top, and -50px of margin right)

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run