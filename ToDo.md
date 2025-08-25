CURRENT GOAL: Make it so that depending on the route / genre of the band, different band ticket background images, fonts, colors, and webkit text strokes are used. 
    - To do this, pass in the genreOfMusic param to the sneak peek component as a prop from either useParams or band.genreOfMusic, and inside bandsneakpeek, use that prop to set the specific styles.
- Add in band logos to each band ticket - so add in a new column in the DB for that.


To run frontend:
cd into Encore-Frontend and run npm run dev

To run backend:
first open up MySQL workbench and connect to the DB. 
Then, cd into EncoreBackend and run .\mvnw spring-boot:run