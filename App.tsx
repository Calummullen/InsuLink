import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Logbook } from "./views/Logbook";
import { Header } from "./components/Header";
import { Login } from "./views/Login";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "./context/auth-context";
import {
  getPatientData,
  getPatientGraphData,
  libreLogin,
} from "./services/diabetes-service";
import { LoginType } from "./types/LoginType";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dashboard } from "./views/Dashboard";
import { useFonts } from "expo-font";
import {
  Entypo,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { Reminders } from "./views/Reminders";
import { ConvertLibreDateToFormattedDate } from "./utils/date-helper";
import { Checklist } from "./views/Checklist";

const Stack = createNativeStackNavigator();

// const AuthContext = React.createContext({});
// Test

export default function App() {
  const [sensorData, setSensorData] = useState();

  useEffect(() => {
    const getPatientId = async () => {
      try {
        const patientDataResponse = await getPatientData();
        // Handle Error

        const patientGraphDataResponse = await getPatientGraphData(
          patientDataResponse.data[0].patientId
        );
        const graphData = patientGraphDataResponse.data.graphData;

        graphData.map((item) => {
          const convertedDate = ConvertLibreDateToFormattedDate(item.Timestamp);
          item.Timestamp = convertedDate;
          if (!item.Value.toString().includes(".")) {
            item.Value = Number(
              item.Value.toLocaleString("en", {
                minimumFractionDigits: 1,
              })
            );
          }
        });

        setSensorData(graphData);
      } catch (e) {
        console.log("AHHH", e);
      }
    };

    getPatientId();
  }, []);

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("bearer_token");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({ email, password }: LoginType) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          const response = await libreLogin(email, password);
          await SecureStore.setItemAsync("bearer_token", response.token);
          dispatch({ type: "SIGN_IN", token: response.token });
        } catch (e) {
          // TODO - Handle Error
          console.log(e);
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  const [fontsLoaded] = useFonts({
    hussar: require("./assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  const Drawer = createDrawerNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {(!state.userToken || state.userToken !== "") &&
        fontsLoaded &&
        sensorData ? (
          <>
            <Drawer.Navigator
              initialRouteName="Dashboard"
              screenOptions={{
                drawerContentContainerStyle: {},
                drawerLabelStyle: {
                  fontSize: 24,
                  fontFamily: "hussar",
                  color: "black",
                },
              }}
            >
              <Drawer.Screen
                name="Dashboard"
                options={{
                  headerTitle: () => <Header />,
                  headerTitleAlign: "center",
                  drawerIcon: () => (
                    <Entypo name="home" size={24} color="black" />
                  ),
                }}
              >
                {() => <Dashboard dataTest={sensorData} />}
              </Drawer.Screen>
              <Drawer.Screen
                name="Logbook"
                component={Logbook}
                options={{
                  headerTitleStyle: {
                    fontSize: 24,
                    fontFamily: "hussar",
                  },
                  drawerIcon: () => (
                    <FontAwesome5
                      name="book"
                      size={24}
                      color="black"
                      style={{ marginRight: 4 }}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Reminders"
                component={Reminders}
                options={{
                  headerTitleStyle: {
                    fontSize: 24,
                    fontFamily: "hussar",
                  },
                  drawerIcon: () => (
                    <AntDesign
                      name="clockcircle"
                      size={24}
                      color="black"
                      style={{ marginRight: 2 }}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Checklist"
                component={Checklist}
                options={{
                  headerTitleStyle: {
                    fontSize: 24,
                    fontFamily: "hussar",
                  },
                  drawerIcon: () => (
                    <MaterialIcons
                      name="checklist"
                      size={24}
                      color="black"
                      style={{ marginRight: 2 }}
                    />
                  ),
                }}
              />
            </Drawer.Navigator>
            {/* <Stack.Screen name="Navigation" component={Navigation} /> */}
            {/* <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                  headerTitle: () => <Header />,
                  headerTitleAlign: "center",
                }}
              /> */}
          </>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
