CURRENT GOAL: A) Style BandProfile and BandProfilePage. 
                - (Format date in Band Profile Page to human-readable format).
                All data displays, but coming up with the UI layout first before showing the information, as I don't know where it'll go yet.
              B) Go back in and change the two routes to one /getProfileInfo route by using a DTO.
              C) Remove the passed prop values (The session storage) since /getProfileInfo will have all the info necessary.
              D) Change the JPA repository methods to sort by most recent / latest / highest grossing.
              E) After this is done, implement account creation and role based auth.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run