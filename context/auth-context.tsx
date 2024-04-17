import { createContext, useState } from "react";
import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { LoginType } from "../types/LoginType";
import {
  getPatientData,
  getPatientGraphData,
  libreLogin,
} from "../services/diabetes-service";
import { ConvertLibreDateToFormattedDate } from "../utils/date-helper";
import { IAuthContext } from "../types/IAuthContext";

export const getGraphData = async () => {
  try {
    const patientDataResponse = await getPatientData();
    // Handle Error

    const patientGraphDataResponse = await getPatientGraphData(
      patientDataResponse.data[0].patientId
    );
    const graphData = patientGraphDataResponse.data.graphData;

    graphData.map((item: any) => {
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

    return graphData;
  } catch (e) {
    console.log("Error getting graph data", e);
  }
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDashboardLoading, setIsDashboardLoading] = useState<boolean>(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  const [errorText, setErrorText] = useState<string>("");
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            graphData: action.graphData,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            graphData: action.graphData,
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
      isSignout: false,
      userToken: null,
      graphData: {},
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        setIsDashboardLoading(true);
        userToken = await SecureStore.getItemAsync("bearer_token");
        if (userToken) {
          const graphData = await getGraphData();
          dispatch({
            type: "RESTORE_TOKEN",
            token: userToken,
            graphData: graphData,
          });
        }
      } catch (e) {
        // Restoring token failed
      } finally {
        setIsDashboardLoading(false);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
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
          setIsLoginLoading(true);
          const response = await libreLogin(email, password);
          if (response.token) {
            await SecureStore.setItemAsync("bearer_token", response.token);
            const graphData = await getGraphData();
            dispatch({
              type: "SIGN_IN",
              token: response.token,
              graphData: graphData,
            });
          }
        } catch (e) {
          console.log("Error during login: ", e);
          setErrorText("Invalid email or password");
        } finally {
          setIsLoginLoading(false);
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        state,
        isDashboardLoading,
        isLoginLoading,
        setErrorText,
        errorText,
        authContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
