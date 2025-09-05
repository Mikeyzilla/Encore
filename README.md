Hello everyone who's reading my Encore README!
This app was made by me, Mike.

I wanted to go above and beyond for this project. Add in all sorts of features and gizmos to my core idea of a two-way marketplace app but for music. 
This app, although currently in progress (very early stages of development), will be based around the core idea of "Managers looking for bands to hire for their shows / concerts / festivals" and 
"Bands looking for venues / events they can be a part of". As a manager, your flow will be as follows: Click on a genre -> see the bands that make music in that genre -> click on a band you're interested in 
-> Find out more info about the band, with the option to send them a message and start the negotiation process.

As a band, your flow will be as follows: Create your band profile -> view the calendar hub that will contain all event details per day (where the event is, what type of event it is, what time slot is it for,
who the manager is, and how much they're offering) -> if you like an offer, you can send out a message to the manager saying you're interested. If not interested, just keep searching. As bands, you can also go into your inbox to see messages sent to you by managers, who are looking to start that negotiation process.


Current Features: 
Role-based Authentication
    Users can create an account and log in as a Manager, Experienced Band, or Inexperienced Band. Access to certain routes is restricted based on role (e.g., managers can view specific pages, while some routes will later be exclusive to bands).

    Manager Features
    Managers can browse bands by genre, view their own in progress events, and (need to test, but has been implemented) can create their own events for bands to see. When clicking on the "Find Bands!" button, a manager can select a genre, see all bands in that category, and click a band’s sneak peek to open the full band profile page.

    Band Features
    Logged-in bands can view the event calendar, from the /calendar route. If you're a band and click on a date (on days where events exist), you can see a list of scheduled events filtered by event type.

There are a ton of features I'm going to implement for this, like location filtering (only show bands within X miles of the venue), overlap functionality for events, an inbox messaging system, and so much more. I'm going to try and make this as real of an app as possible. 

Thanks for reading,
Mike
