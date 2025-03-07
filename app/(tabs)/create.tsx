import { View, StyleSheet } from 'react-native';
import TextBox from '@/components/TextBox';
export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <TextBox style={styles.text}>Create Screen</TextBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'yellow',
    fontSize: 20,
  },
});
