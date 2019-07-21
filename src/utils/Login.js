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

  return new Promise( (resolve, reject) => {
    // use the client to make the auth request and receive the authState
    try {
      authorize(config).then( result => {
        console.log(result);
        session['accessToken']  = result.accessToken;
        resolve(result);        
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }    
  });
  
}
