import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResumenPedido() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del Pedido</Text>
      {/* Aquí puedes agregar la lógica para mostrar el resumen del pedido */}
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
