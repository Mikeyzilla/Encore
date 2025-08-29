CURRENT GOAL: Implement account creation and role based auth.
                A) Add in necessary Band UI fields and styles (styles switch on genre selection - use musicMap[genrekey]) to make it feel like you're building your band profile. 
                B) Fix the position of the group photo, and generate one per genre type.
                C) Populate DB with Data. (Make all bands that have performances have albums, all bands that have albums have performances, and all bands that don't have either have the elevator pitch and why choose us filled out)
                D) Bring the Our Goals section on BandProfile higher up.
                E) Push the performance information section slightly to the right.
                F) Make the Ranked + Generated Album data's font sizes larger.
                G) Add in a tour picture and album cover per band.
                H) Have the spotify section expand for long song titles.
                I) Make the songs in our songs so far larger in font size, as well as aligned better.
                J) Try to make font colors consistent from genre -> band sneak -> band profile.
                K) Make a login page on the frontend.
                L) Create a users table in the DB.
                M) Create a users entity in the backend.
                N) Create a user repo in the backend.
                O) Create a user-centric controller that features both account creation and login.
                P) Hook those services up to the frontend pages.
                Q) Protect routes using role-based auth. In app.routes, make sure only managers can use the three routes that currently exist which are not account creation nor login by the use of JWTs.
                R) Test it out.
                S) Once a Manager logs in, they should be taken to the genre view.
                T) Make account create the default route (otherwise known as / )
                U) Once a Band logs in, take them to their profile page.
                V) Move on to Band Calendar view.

Future Goals:  
A) Change the JPA repository methods to sort by most recent / latest / highest grossing.


To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run