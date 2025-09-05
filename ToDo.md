CURRENT GOALS: Work on the Manager Dashboard.

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
                K) Refreshing after a band account creation does not work. Make sure refreshes work
                L) In Calendar view, instead of just getting the Manager's id and displaying their name as Manager {id}, use that id to lookup the username, and then display that instead.
                M) You can't view the band calendar view from BandProfile because it doesn't know where to get role / how to determine users role. Therefore, add in the call to get RoleByUserId in the users controller to determine that, using the userIdentifier from session storage.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run