import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { SafeAreaView } from "react-native-safe-area-context";
import {AuthContext }from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const getDetails = async ()=>{
  const details = await AsyncStorage.getItem("userDetails")
  if (details) {
        const user = JSON.parse(details);
        if (user.status === 'loggedIn') {
          setIsLoggedIn(true);
        }
      }
 }
 {isLoggedIn?'':getDetails()}
  return (
        <AuthContext.Provider value={{setIsLoggedIn}}>
      <NavigationContainer>
   
      {isLoggedIn? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
