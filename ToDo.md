CURRENT GOAL: A) Change the Band Table DB to include an optional Elevator Pitch and Why Choose us section. 
              B) Set up the Band Table entity to match accordingly.
              C) Change the band type in BandGenres to add in two optional strings, elevatorPitch and whyChooseUs.
              D) Grab the why choose us and elevator pitch inside band list and add to session storage.
              E) Use the session storage to pass into band profile from band profile page.
              F) Change songsection for new bands to instead of their most played song, have the parent container call SongController's getAllSongsByBand, then pass in the songs as a prop to the child, if they're a new user.
              G) Change newBand to be a collection of data rather than solely a boolean (Change ProfileInformation from a collection of values to either ExperiencedProfileInfo or NewProfileInfo, and have NewProfileInfo include ElevatorPitch and WhyChooseUs)
              H) Remove the two fields added to the band data type because they're now in ProfileInfo.
              I) Go back in and change the three routes to one /getProfileInfo route by using a DTO from the Band, Performances, and Albums entities.
              J) Remove the passed prop values (The session storage) since /getProfileInfo will have all the info necessary.
              K) Change the JPA repository methods to sort by most recent / latest / highest grossing.
              L) After this is done, implement account creation and role based auth.

To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run