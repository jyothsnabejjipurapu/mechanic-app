import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/customer/LoginScreen';
import RegisterScreen from './src/screens/customer/RegisterScreen';
import CustomerHomeScreen from './src/screens/customer/CustomerHomeScreen';
import CreateRequestScreen from './src/screens/customer/CreateRequestScreen';
import RateMechanicScreen from './src/screens/customer/RateMechanicScreen';
import MechanicHomeScreen from './src/screens/mechanic/MechanicHomeScreen';
import MechanicProfileScreen from './src/screens/mechanic/MechanicProfileScreen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { ROLE_CUSTOMER, ROLE_MECHANIC } from './src/utils/constants';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  if (user?.role === ROLE_CUSTOMER) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={CustomerHomeScreen}
          options={{ title: 'Mechanic Assist' }}
        />
        <Stack.Screen
          name="CreateRequest"
          component={CreateRequestScreen}
          options={{ title: 'Create Request' }}
        />
        <Stack.Screen
          name="RateMechanic"
          component={RateMechanicScreen}
          options={{ title: 'Rate Mechanic' }}
        />
      </Stack.Navigator>
    );
  }

  if (user?.role === ROLE_MECHANIC) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MechanicHomeScreen}
          options={{ title: 'Mechanic Dashboard' }}
        />
        <Stack.Screen
          name="Profile"
          component={MechanicProfileScreen}
          options={{ title: 'Update Profile' }}
        />
      </Stack.Navigator>
    );
  }

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;

