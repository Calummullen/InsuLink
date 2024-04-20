export interface IAuthContext {
  state: {
    isSignout: boolean;
    userToken: string;
    graphData: any;
  };
  isDashboardLoading: boolean;
  isLoginLoading: boolean;
  setErrorText: (text: string) => void;
  errorText: string;
  authContext: {
    signIn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => Promise<void>;
    signOut: () => void;
  };
}
