import { Text, View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { DeviceContext } from '../_layout';

export default function AboutScreen() {
  const { deviceInfo } = useContext(DeviceContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      {deviceInfo && (
        <>
          <Text style={styles.text}>Empresa: TechCorp</Text>
          <Text style={styles.text}>Device Name: {deviceInfo.deviceName}</Text>
          <Text style={styles.text}>Device ID: {deviceInfo.deviceId}</Text>
          <Text style={styles.text}>Device OS: {deviceInfo.deviceOS}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 10,
  },
});
