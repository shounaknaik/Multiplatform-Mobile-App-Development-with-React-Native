# Multiplatform-Mobile-App-Development-with-React-Native


To connect to your Expo app with your JSON server, follow these steps
1) install ngrok on your device the installation guideline is on ngrok website

2) go to json-server folder and start your server on port 3001. You can choose any port you want.

3) then open another terminal and write the following code

ngrok HTTP 3001

This will serve up a tunnel on the same port I.e 3001 in my case!

4) go to base URL and edit the URL by the link given by the ngrok. Note: you have to change the base URL link every time you reload ngrok. Don't forget to put / in the last of URL.

5) finally start your Expo cli and scanthe QR with your android or iOS. Everything will work fine.

This solution was given by Mr Abdul Aziz Khan. 

For using Secure store:

1) Run this: expo install expo-secure-store
2) import it in your file like this :import * as SecureStore from 'expo-secure-store';

