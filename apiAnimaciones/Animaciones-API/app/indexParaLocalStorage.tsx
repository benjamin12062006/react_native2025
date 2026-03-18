import { Text, View, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useContext } from 'react';
import { DeviceContext } from './_layout';
import LocalStorage from '@/components/LocalStorage';

export default function Index() {
  const router = useRouter();
  const { setDeviceInfo } = useContext(DeviceContext);

  const informacion = {
    deviceName: 'iPhone 14 Pro Max',
    deviceId: '123456789',
    deviceOS: 10,
  };

  const mandarInformacion = () => {
    setDeviceInfo(informacion);
    router.push('/views/about');
  };

  return (
    <>
      <View style={styles.headerBox}>
        <Text style={styles.text}>Home screen</Text>
        <Text style={styles.button} onPress={mandarInformacion}>
          Go to About screen
        </Text>
      </View>

      <LocalStorage />
    </>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: '#33384d',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 24,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    minWidth: '70%',
  },
  text: {
    color: '#FFD700',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    textAlign: 'center',
  },
});

