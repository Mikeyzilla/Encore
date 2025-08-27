CURRENT GOAL: A) Test it out on Good Predictions since that's the only band that has values in the DB so far.
                - It does work! But albums and performance data are not rendering on the frontend. When running mvnw, spring didn't complain or change any values - so I suspect it's on the frontend.
              B) Then style everything. 
              C) Go back in and change the three routes to one /getProfileInfo route by using a DTO.
              D) Remove the passed prop values (The session storage) since /getProfileInfo will have all the info necessary.
              E) Change the JPA repository methods to sort by most recent / latest / highest grossing.
              F) After this is done, implement account creation and role based auth.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run