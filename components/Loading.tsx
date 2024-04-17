import { LoaderScreen } from "react-native-ui-lib";

export const Loading = ({ message }: { message: string }) => (
  <LoaderScreen message={message} color={"blue"} />
);
