// import { Text, View, StyleSheet, Animated } from 'react-native';
// import { Link } from 'expo-router'; 
// import Animaciones1 from "@/components/Animaciones1";
// import Simple3DGame from "@/components/Simple3DGame";
// import LocalStorage from "@/components/LocalStorage";
// import { useState, useEffect } from 'react';
// import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
// import React from 'react'
// import 'react-native-get-random-values'
// import DeviceInfo from 'react-native-device-info'
// import '@react-native-async-storage/async-storage'
// import { withDevCycleProvider, useVariableValue } from '@devcycle/react-native-client-sdk'

// global.DeviceInfo = DeviceInfo

// function Index() {
//   const variableKey = 'probando'
//   const defaultValue = 'false'
//   const featureVariable = useVariableValue(variableKey, defaultValue)

//   return (
//     <>
//       {/* <Animaciones1 /> */}
//       {/* <View style={styles.container}>
//         <Simple3DGame />
//       </View> */}
//       {featureVariable === 'false' && <LocalStorage />}
//       {/* <Text style={styles.text}>Home screen </Text>
//       <Link href="/about" style={styles.button}>
//         Go to About screen
//       </Link> */}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: '#25292e',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   // },
//   // text: {
//   //   color: '#fff',
//   // },
//   // button: {
//   //   fontSize: 20,
//   //   textDecorationLine: 'underline',
//   //   color: '#fff',
//   // },
// });

// export default withDevCycleProvider(
//   { sdkKey: 'TU_API_KEY_AQUI' }
// )(Index);