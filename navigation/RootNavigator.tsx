// import React, { useState, useContext, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { onAuthStateChanged } from 'firebase/auth';

// import { LoadingIndicator } from '../components';
// import { auth } from '../config';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator  ();

// export const AppStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Home' component={HomeScreen} />
//     </Stack.Navigator>
//   );
// };

// export const AuthStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName='Login'
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name='Login' component={LoginScreen} />
//       <Stack.Screen name='Signup' component={SignupScreen} />
//       <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
//     </Stack.Navigator>
//   );
// };

// export const RootNavigator = () => {
//   const { user, setUser } = useContext(AuthenticatedUserContext);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // onAuthStateChanged returns an unsubscriber
//     const unsubscribeAuthStateChanged = onAuthStateChanged(
//       auth,
//       authenticatedUser => {
//         alert('user is in ' + authenticatedUser)
//         authenticatedUser ? setUser(authenticatedUser) : setUser(null);
//         setIsLoading(false);
//       }
//     );

//     // unsubscribe auth listener on unmount
//     return unsubscribeAuthStateChanged;
//   }, [user]);

//   if (isLoading) {
//     return <LoadingIndicator />;
//   }

//   return (
//     <NavigationContainer>
//       {user ? <AppStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };
