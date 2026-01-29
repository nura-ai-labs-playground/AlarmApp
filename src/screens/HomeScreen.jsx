import { StyleSheet,View } from "react-native";
import AlarmButtons from "../../components/AlarmButtons";
import Datetime from "../../components/dateTime";
import { SafeAreaView } from "react-native-safe-area-context";



export default function HomeScreen(){

    return(
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
            <Datetime></Datetime>
            <AlarmButtons></AlarmButtons>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#d6cfcf',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#444',
  },
});
