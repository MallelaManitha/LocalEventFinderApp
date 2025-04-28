LocalEventFinderApp
LocalEventFinderApp is a mobile application designed to help users discover and manage local events in various locations. It provides a smooth and interactive user experience with functionalities for secure user authentication, event management, and geo-location to find events around the user. Built using Android Studio, Java/Kotlin, and REST API integration, the app is optimized for performance and scalability.

Key Features
User Authentication: Secure login and registration functionality with support for local storage or API-based authentication.

Event Management: Users can create, view, and manage events with the ability to update or delete events.

UI Components: A rich set of reusable UI components, such as alerts, dialogs, forms, and event cards, built using Android Views and Material Design components.

Custom Features: Includes custom functionalities like mobile detection and toast notifications for smooth user interaction.

Backend Integration: The app uses a RESTful API for managing data related to events, user authentication, and other backend services.

Geo-Location: Users can search for events based on their location or explore events in different cities or regions, leveraging Android's location services.

Screenshots

Events displayed based on user's location


Creating a new event

Tech Stack
Android Studio: IDE used for building Android apps.

Java/Kotlin: Programming languages for Android development.

REST API: For backend communication, handling user authentication and event management.

Google Maps API: For geo-location functionality to discover events nearby.

Firebase Authentication (Optional): Can be used for handling secure user login (if desired).

Room Database: Local database for storing event information and user data offline.

Getting Started
Prerequisites
Android Studio (Latest version)

A Google Developer Account (if using Google Maps API)

Installation
To run this project locally, follow these steps:

Clone the Repository:
[git clone https://github.com/MallelaManitha/LocalEventFinderApp.git
cd LocalEventFinderApp
Open the Project in Android Studio: Launch Android Studio and open the cloned project directory.

Set up Backend (REST API):

If you’re using your custom API, set up a server and configure endpoints for event management and authentication.

Replace any API URLs in the app with your own backend URLs.

Set up Geo-Location:

Obtain an API key from Google Cloud for using the Google Maps API and configure it in your project.

Run the App: Connect an Android device or use an emulator to run the app from Android Studio.

Sign up/Login: The app will prompt you to create an account or log in using your credentials.

Contributing
Feel free to open an issue or submit a pull request if you'd like to contribute to the project.

License
This project is licensed under the MIT License - see the LICENSE file for details.
