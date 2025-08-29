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
                T) Once a Manager logs in, they should be taken to the genre view.
                U) Make account create the default route (otherwise known as / )
                V) Once a Band logs in, take them to their profile page.
                W) Move on to Band Calendar view.

Future Goals:  
A) Change the JPA repository methods to sort by most recent / latest / highest grossing.


To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run