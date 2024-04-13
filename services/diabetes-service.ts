import * as SecureStore from "expo-secure-store";

export const libreLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(
      "https://api-eu2.libreview.io/llu/auth/login",
      {
        headers: {
          version: "4.2.1",
          product: "llu.android",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Encoding": "application/gzip",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        redirect: "follow",
      }
    );
    const authData = await response.json();
    console.log("sdf", authData);
    return authData.data.authTicket;
  } catch (e) {
    console.log("errorr", e);
  }
};

export const getPatientData = async () => {
  const token = await SecureStore.getItemAsync("bearer_token");
  if (!token) {
    throw new Error("No token available");
  }
  try {
    const response = await fetch(
      "https://api-eu2.libreview.io/llu/connections",
      {
        headers: {
          version: "4.7.0",
          product: "llu.android",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Encoding": "application/gzip",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error in getPatientData", e);
  }
};

export const getPatientGraphData = async (patientId: string) => {
  const data = await getPatientData();
  const token = data.ticket.token;
  //   const patientId = data.data[0].patientId;
  try {
    const response = await fetch(
      `https://api-eu2.libreview.io/llu/connections/${patientId}/graph`,
      {
        headers: {
          version: "4.7.0",
          product: "llu.android",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Encoding": "application/gzip",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const graphData = await response.json();
    //   console.log("my data 1", graphData.data.graphData.length);
    return graphData;
  } catch (e) {
    console.log("Error in getPatientGraphData", e);
  }
};
