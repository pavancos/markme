import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'
const space = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>space {id}</Text>
    </View>
  )
}
export default space;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  }
})