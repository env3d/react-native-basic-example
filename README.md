# A scanning app in React-Native

This is a simple 3-screens react-native app.  It's purpose is to
act as an example of a modern app with connections to various
backend API's and services.

# App details

User can scan any documents using the device's camera, and have the
result text saved into the google drive.  A basic workflow:

 1) User logs in to app using their google id (via OAuth2)
 1) User captures an image and send to google vision API for OCR
 1) OCR result is sent back to app, user can save result into their
 google drive folder (via google drive API)
 1) User can choose to scan again

Below is how the app look in action, since it's running on the emulator,
the camera screen is all black.

![Scanning app in the iOS simulator](http://g.recordit.co/3tUMTJvIvO.gif)