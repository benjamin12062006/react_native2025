import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import Simple3DGame from "@/components/Simple3DGame";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Demo 3D</Text>
      <View style={styles.gameContainer}>
        <Simple3DGame />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  gameContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  }
});

