import Reactotron from "reactotron-react-native";

Reactotron.configure({}).useReactNative({ asyncStorage: true }).connect();

export default Reactotron;
