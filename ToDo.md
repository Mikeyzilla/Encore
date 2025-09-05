CURRENT GOALS:  Style manager dashboard, test logout in both dashboard and calendar, style the logout button, then try making an event in the dashboard. 

                A) add in a way for the bands to accept the requests (denial is ignorance) that are posted (on click, show popup of ACCEPT and IGNORE).
                B) Add in the inbox messaging system using web sockets.
                C) if a band accepts a request, they start a chat with the manager who posted the event using web sockets.
                D) In Band Profile, display the most famous song as the song with the highest view count. In the Account Creation Page for Bands, display the most famous song as the highest view count as well, except you can't grab the view counts from the DB (because they haven't stored anything to the DB yet) so, instead, as they add in songs + view counts, keep track of the highest view counted song (add in a state).
                E) In Calendar view, instead of just getting the Manager's id and displaying their name as Manager {id}, use that id to lookup the username, and then display that instead.
                F) You can't view the band calendar view from BandProfile because it doesn't know where to get role / how to determine users role. Therefore, add in the call to get RoleByUserId in the users controller to determine that, using the userIdentifier from session storage.
                
Future Goals (Post MVP):
                A) When a manager looks at an open timeslot in their dashboard, they should be able to click on that timeslot and view all available bands that are looking to perform on that timeslot, allowing the manager to fill the slots up easier.
                B) In the scenario that all time slots for a specific manager's event get filled up, the event should be deleted from both the frontend view (hidden) and removed from the DB entirely (after the following time the user logs out), so that way the manager knows it's been filled up and isn't curious as to where it went.
                C) Make sure the JWTs actually enforce backend route protection
                D) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                E) Change the JPA repository methods to sort by most recent performance / latest album.
                F) Make sure if you're logged in, you can't go "Log in again" - right now, you can still visit the login page, even if logged in (and still login).

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run