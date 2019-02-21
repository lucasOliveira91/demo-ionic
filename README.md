# Ionic 3 app - about ecommerce

## Cordova commands
Adding new platform to run in browsers.
> ionic cordova platform add browser --save

Adding new platform to run in Android devices.
> ionic cordova platform add android --save

Adding camera plugin
> cordova plugin add cordova-plugin-camera --save

Install native camera
> npm install --save @ionic-native/camera

To run the app with native features
> ionic cordova run browser

You can user the "Vysor" a google chrome plugin to degub in your android device
> ionic cordova run android -device

### Production Build (Generate .apk)
> ionic cordova build android -release -prod

- sign app
1. Generate a key:
> keytool -genkey -v -keystore spring-ionic-key.jks -keyalg RSA -keysize 2048 -validity 1000 -alias app-test-ionic

2. Sign youer unsigned apk generated before:
> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore spring-ionic-key.jks android-release-unsigned.apk app-test-ionic


### Mobile
To show your mobile screen in computer, use the "Vysor" a google chrome extension.

