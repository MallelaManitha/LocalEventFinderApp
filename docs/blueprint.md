# **App Name**: Eventide

## Core Features:

- User Authentication: Enable users to register and log in using email and password authentication provided by Firebase.
- Event Display: Display a real-time list of events fetched from Firebase Firestore. Each event includes the event name, location, date, time, description and image.
- Event Creation: Allow users to add new events through a form that uploads event details and images to Firebase.
- Event Search: Provide search functionality to find events by city name, event type, or date.

## Style Guidelines:

- Primary color: White (#FFFFFF) for a clean and modern look.
- Secondary color: Light gray (#F2F2F2) for backgrounds and subtle contrasts.
- Accent: Teal (#008080) for interactive elements and highlights.
- Use a grid-based layout for consistent spacing and alignment.
- Employ a set of consistent and recognizable icons from a library like Material Icons.
- Incorporate subtle animations for transitions and loading states.

## Original User Request:
"Build an Android Mobile App called 'Local Event Finder App'.

Features:

User can Register/Login using Firebase Authentication (email and password).

Home Screen should display a real-time list of events from Firebase Firestore Database.

Each Event should have the following fields:

Event Name (String)

Event Location (String or GeoPoint)

Event Date and Time (Timestamp)

Event Description (String)

Event Image (uploaded to Firebase Storage and saved as a URL)

Created By (User ID)

Created At (Timestamp)

Users should be able to Add New Events via a Form (event upload screen).

Search functionality to search events by City Name, Event Type, or Date.

Optional: Integrate Google Maps to show the location of events.

Optional: Push Notifications when a new event is posted near the user's location.

Requirements:

Use Android Studio for development (Java or Kotlin preferred).

Follow good UI/UX practices using Windsurf UI or Material Design principles.

Code must be modular, clean, and follow MVVM architecture if possible.

Include error handling for network/database errors.

Firestore Database should have a Collection named 'Events' with above fields.

Realtime updates must be supported (events list auto-refresh when new events are added).

Backend:

Firebase Authentication

Firebase Firestore Database

Firebase Storage (for event images)

Deliverables:

Full Android project source code.

Firebase project setup instructions (Authentication, Firestore rules, Storage rules).

UI must be mobile responsive and clean.

Sample JSON for Firestore 'Events' Collection.

Constraints:

Do not use paid APIs or services.

The app should run fully on Android devices (minimum SDK 21+).

Give complete folder structure, main code files, activity layouts, Firebase integration steps, and basic testing notes."
  