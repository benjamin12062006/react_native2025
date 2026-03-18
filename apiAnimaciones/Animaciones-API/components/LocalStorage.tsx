import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorage = () => {
  const [input1, setInput1] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [nombreDelStorage ,setNombre] = useState('');

  useEffect(() => {
    // Ejemplo de efecto secundario
    setMensaje('Bienvenido al examen de estilos y botones');
    obtenerDatos();
  }, []);

  const guardarDatos = async () => {
    setMensaje(`Botón normal: ${input1}`);
    console.log('Guardando datos en el local storage:', input1);
    try{
      await AsyncStorage.setItem('nombre', input1);
      setMensaje(`Guardado: ${input1}`);    
      setNombre(input1);
    }catch (error) {
      console.error('Error guardando datos:', error);
      setMensaje('Error al guardar los datos');
    }
  };
  const obtenerDatos = async () => {
    try{
      const nombre = await AsyncStorage.getItem('nombre');
      if ( nombre !== null){
        setMensaje(`Nombre guardado: ${nombre}`);
        setNombre(nombre);
      }
      console.log(nombre);      
    }catch (error) {
      console.error('Error obteniendo datos:', error);
      setMensaje('Error al obtener los datos');
    }
  }
  const eliminarDatos = async () => {
    try{
      await AsyncStorage.removeItem('nombre');
      setMensaje('Nombre eliminado');
      setNombre('');
    }catch (error) {
      console.error('Error eliminando datos:', error);
      setMensaje('Error al eliminar los datos');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.examTitle}>Practicamos el Local Storage</Text>
      {nombreDelStorage ? <Text style={styles.text}>Hola : {nombreDelStorage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Escribe algo aquí (input 1)"
        placeholderTextColor="#aaa"
        value={input1}
        onChangeText={texto => setInput1(texto)}
      />
      <Button
        title="Guardar"
        onPress={() => guardarDatos()}
        color="#4CAF50"
      />
      {nombreDelStorage ? (
        <>
          <TouchableHighlight
            style={styles.highlightButton}
            underlayColor="#388E3C" 
            onPress={() => eliminarDatos()}       
          >
            <Text style={styles.highlightText}>Eliminar Nombre</Text>
          </TouchableHighlight>
          <Text style={styles.mensaje}>{mensaje}</Text>
        </>) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e'
  },
  text: {
    color: 'white',
    fontSize: 18
  },
  examTitle: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: '80%',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFD700'
  },
  highlightButton: {
    backgroundColor: '#43A047',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center'
  },
  highlightText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  mensaje: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  }
});

export default LocalStorage;
