import Menu from '@/app/views/Menu';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MenuIndex() {
  console.log('MenuIndex rendering...');
  
  return (
    <View style={styles.container}>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
