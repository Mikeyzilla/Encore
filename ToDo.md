CURRENT GOALS:  Style manager dashboard, then try making an event in the dashboard. 

                A) add in overlap logic (If manager A posts an event of any type at 6pm on a friday at the location Y, manager B should not also be able to make an event at 6pm on a friday at location Y. They can make an event at 6pm on a friday at a different location, but not the same one.)
                B) add in a way for the bands to accept the requests (denial is ignorance) that are posted.
                C) Add in the inbox messaging system using web sockets.
                D) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                E) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                F) Change the JPA repository methods to sort by most recent / latest / highest grossing.
                G) In CreateAccount on the Band-Specific Profile Creation page, instead of displaying their most famous song (Which we don't know and don't want to ask directly, as they enter in their song information and view count, just take the max view counted song) - only if they're a new band. Otherwise, go and find their highest view counted song.
                H) In Calendar view, instead of just getting the Manager's id and displaying their name as Manager {id}, use that id to lookup the username, and then display that instead.
                I) You can't view the band calendar view from BandProfile because it doesn't know where to get role / how to determine users role. Therefore, add in the call to get RoleByUserId in the users controller to determine that, using the userIdentifier from session storage.
                
Future Goals (Post MVP):
                A) When a manager looks at an open timeslot in their dashboard, they should be able to click on that timeslot and view all available bands that are looking to perform on that timeslot, allowing the manager to fill the slots up easier.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run