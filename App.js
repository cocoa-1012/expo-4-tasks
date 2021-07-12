
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  HomeScreen  from "./src/components/HomeScreen";
import  PostScreen  from "./src/components/PostScreen";
import  ShowScreen  from "./src/components/ShowScreen";
import  ScanPostScreen  from "./src/components/ScanPostScreen";
import  UpdateShowScreen from "./src/components/UpdateShowScreen";
import  ScanScreen from "./src/components/ScanScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="Post" component={PostScreen} options={{ title: 'Post' }}/>
        <Stack.Screen name="Show" component={ShowScreen} options={{ title: 'Show/Update/Delete' }}/>
        <Stack.Screen name="ScanPost" component={ScanPostScreen} options={{ title: 'ScanPost' }}/>
        <Stack.Screen name="UpdateShow" component={UpdateShowScreen} options={{ title: 'UpdateShow' }}/>
        <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scanning' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;