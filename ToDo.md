CURRENT GOALS:  Style manager dashboard's view events area and the calendar button in band profile.

                A) add in a way for the bands to accept the requests (denial is ignorance) that are posted (on click, show popup of ACCEPT and IGNORE).
                B) Add in a button on each band profile page, so that if you're a manager, you see "Send Request" to initiate the negotiation process using the Web Socket messaging system below.
                C) Add in the inbox messaging system using web sockets + a way for both parties to see the chat.
                D) if a band accepts a request, they start a chat with the manager who posted the event using web sockets, while if a manager clicks Send Request on the band profile, they start a chat with that band.
                
Future Goals (Post MVP):
                A) When a manager looks at an open timeslot in their dashboard, they should be able to click on that timeslot and view all available bands that are looking to perform on that timeslot, allowing the manager to fill the slots up easier.
                B) In the scenario that all time slots for a specific manager's event get filled up, the event should be deleted from both the frontend view (hidden) and removed from the DB entirely (after the following time the user logs out), so that way the manager knows it's been filled up and isn't curious as to where it went.
                C) Make sure the JWTs actually enforce backend route protection
                D) In addition to the genre filters, also add in filters for how many miles away from one of the manager's closest venues a band is. (If a band is 500 miles away from the manager's festival in tennessee, but only 4 miles away from the manager's florida venue, the filter will show how far away the band is from one of the manager's closest venues possible)
                E) Change the JPA repository methods to sort by most recent performance / latest album.
                F) Make sure if you're logged in, you can't go "Log in again" - right now, you can still visit the login page, even if logged in (and still login).
                G) In Band Profile, use the route in song controller to get the song with the highest view count, and set that as the mostFamousSong. In the Account Creation Page for Bands, display the most famous song as the highest view count as well, except you can't grab the view counts from the DB (because they haven't stored anything to the DB yet) so, instead, as they add in songs + view counts, keep track of the highest view counted song (add in a state).
                H) Have and enforce username / password strength requirements in account creation
                I) In Manager and Band account creation change the input of "when is it" / when did you play to a date instead of text

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run