import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import QuestionnaireScreen from "./screens/QuestionnaireScreen";
import ResultScreen from "./screens/ResultScreen";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Questionnaire"
        component={QuestionnaireScreen}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
