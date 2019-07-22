// shared function for login using AppAuth
import { authorize } from 'react-native-app-auth';

import session from '../../src/Globals';

export default function login() {  
  console.log('login');
  const config = {
    issuer: 'https://accounts.google.com',
    clientId: '107256413984-b289he1lfrsdq5kmtal2htgheo9fvkf7.apps.googleusercontent.com',
    //clientId: '107256413984-himbdkj6rbv03pcj7sib3bjb8jvv45u0.apps.googleusercontent.com',
    redirectUrl: 'com.alphabit.rntest://',
    scopes: ['profile', 'email', 'openid',
             'https://www.googleapis.com/auth/cloud-vision',
             'https://www.googleapis.com/auth/drive.file'],
  };
  
  return new Promise( async (resolve, reject) => {
    // use the client to make the auth request and receive the authState
    try {

      // Authorize flow
      let result = await authorize(config);
      console.log(result);
      session['accessToken']  = result.accessToken;
      session['idToken'] = result.idToken;
      
      // get the user info
      let res = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        // retrieve user information      
        headers: {
          "Authorization": `Bearer ${result.accessToken}`
        }
      });
      let json = await res.json()

      session['email'] = json.email;
      session['name'] = json.name;
      session['picture'] = json.picture;
      
      console.log(json);
      resolve(session);

      
    } catch (error) {
      console.log(error);
      reject(error);
    }    
  });
  
}
