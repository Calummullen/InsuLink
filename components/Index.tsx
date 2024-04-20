import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as React from "react";
import { useContext } from "react";
import { LoaderScreen } from "react-native-ui-lib";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context/auth-context";
import { IAuthContext } from "../types/interfaces/IAuthContext";
import { Checklist } from "../views/Checklist";
import { Dashboard } from "../views/Dashboard";
import { Logbook } from "../views/Logbook";
import { Login } from "../views/Login";
import { Reminders } from "../views/Reminders";

const Stack = createNativeStackNavigator();

const Index = () => {
  const { state, authContext, isDashboardLoading } =
    useContext<IAuthContext>(AuthContext);

  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      {/* {isLoading ? (
        <LoaderScreen message={"Loading Dashboard"} color={"blue"} />
      ) :  */}

      {isDashboardLoading ? (
        <LoaderScreen message="Loading Dashboard..." />
      ) : state?.userToken && fontsLoaded && state?.graphData ? (
        <>
          <Drawer.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              drawerContentContainerStyle: {
                flex: 1,
                flexDirection: "column",
              },
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
              {() => <Dashboard graphData={state.graphData} />}
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
            <Drawer.Screen
              name="Logout"
              options={{
                headerShown: false,
                drawerItemStyle: { marginTop: "auto" },
                headerTitleStyle: {
                  fontSize: 24,
                  fontFamily: "hussar",
                },
                drawerIcon: () => (
                  <AntDesign
                    name="logout"
                    size={24}
                    color="black"
                    style={{ marginRight: 2 }}
                  />
                ),
              }}
            >
              {() => {
                authContext.signOut();
                return <Loading message={"Logging out..."} />;
              }}
            </Drawer.Screen>
          </Drawer.Navigator>
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
  );
};

export default Index;
