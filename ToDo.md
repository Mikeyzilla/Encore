CURRENT GOAL: Implement account creation and role based auth.
                A) Add in a way on the Manager's end in Account Creation for the user to click on an arrow to go from username and password view to venue entry field view.
                B) Add in necessary Band UI fields and styles (styles switch on genre selection) to make it feel like you're building your band profile. 
                C) Fix the position of the group photo, and generate one per genre type.
                D) Populate DB with Data. (Make all bands that have performances have albums, all bands that have albums have performances, and all bands that don't have either have the elevator pitch and why choose us filled out)
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
                T) Move on to Band Calendar view.

Future Goals:  
A) Change the JPA repository methods to sort by most recent / latest / highest grossing.


To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run