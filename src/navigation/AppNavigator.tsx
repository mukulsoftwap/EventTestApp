import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import EventListScreen from '../screens/EventListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import TrackingListScreen from '../screens/TrackingListScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EventList" component={EventListScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="TrackingList" component={TrackingListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;