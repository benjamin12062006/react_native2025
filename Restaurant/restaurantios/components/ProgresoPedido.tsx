import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgresoPedido() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progreso del Pedido</Text>
      {/* Aquí puedes agregar la lógica para mostrar el progreso del pedido */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
