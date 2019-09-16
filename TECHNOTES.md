# A basic react-native tutorial

My journey in learning react-native

## Workflow

To me, the most important part of using a tool / framework is to get it to create a production level
product as quickly as possible.  I also want the tool to be easily extensible and not be overly
abstract (i.e. magical) so I can see what goes on under the hood.

With the above in mind, I started looking at all the 'getting started' tutorials online, many mention
using expo as a way to bootstrap react-native project.  For the uninitiated, expo is a toolchain created
to make react-native easier for developers, at the expense of hiding some really important details.

For instance, in my example app, I wanted to create a google login workflow.  It turns out doing it
with expo is a real PITA as google login (or any other OAuth2 flow) requires some app-level settings
which conflicts with how expo works (especially via the expo app).  Expo works around it by providing
different authentication paths for development and production
([expo doc](https://docs.expo.io/versions/latest/sdk/auth-session/).  In my opinion, this just makes
the entire setup more complex, defeating the initial purpose of expo.

There is also the issue with creating standalone builds.  During development, expo uses an app to
load your application code to make for a nice developer experience.  However, when I tried to
create a standalone app, I found out that expo requires the use of their "build servers".  The build
server runs rather slow and I wanted to rapidly test my app in a standalone environment.  In order
to bypass their build service, you have to use 'expo eject', which essentially breaks the expo abstraction.

So after many hours of struggle, I came to the conclusion that expo, as it currently stands, is a rather
'leaky' abstraction.  While it may work well for some use cases, I would much rather spend the effort
to understand how things work under the hood so I can have to power to make changes when necessary.

I ended up using react-native directly.

## Installing react-native command line

To install react-native, follow the [getting started](https://facebook.github.io/react-native/docs/getting-started)
document.  You need to basically install the following:

 - nodejs, npm
 - react-native-cli (npm install -g react-native-cli)
 - java sdk (so android can be build)
 - Android Studio
 - XCode (so ios can be build)

That's a whole lot of things to install!  After everything is done, you will have access to the
**react-native** command on the command-line.

## Using the react-native command

Ok so assuming that you have successfully installed react-native, you use it my running
the following command in an empty directory:

```
react-native init MyApp
```

This command takes a while to execute on my computer, but will eventually end with the following message:

```
  Run instructions for iOS:
    • cd MyApp && react-native run-ios
    - or -
    • Open MyApp/ios/MyApp.xcodeproj in Xcode or run "xed -b ios"
    • Hit the Run button

  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd MyApp && react-native run-android
```

And create the following structure:

```
MyApp
├── App.js
├── __tests__
│   └── App-test.js
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   └── settings.gradle
├── app.json
├── babel.config.js
├── index.js
├── ios
│   ├── MyApp
│   ├── MyApp-tvOS
│   ├── MyApp-tvOSTests
│   ├── MyApp.xcodeproj
│   ├── MyApp.xcworkspace
│   ├── MyAppTests
│   ├── Podfile
│   ├── Podfile.lock
│   └── Pods
├── metro.config.js
├── package.json
└── yarn.lock
```

Some really important files/directories:

 - app.json - contains metadata on the app
 - App.js - entry point of the react native app (javascript)
 - android - the Android project directory, you use it to build android apk
 - ios - XCode project for your app

So the entire build chain is included in this directory structure, and everything can be controlled / build
locally on the developer's machine.


