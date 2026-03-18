import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,TouchableHighlight,Alert } from 'react-native';
import NativePicker from './NativePicker.js';

const Formulario = ({moneda,criptomoneda,guardarMoneda,guardarCriptomoneda,guardarConsultarAPI}) => {

  const [criptomonedas, guardarCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      try {
        const response = await fetch(url);
        const resultado = await response.json();
        // Obtener solo los datos de las 10 criptomonedas más importantes
        const criptomonedasImportantes = resultado.Data.slice(0, 10);
        guardarCriptomonedas(criptomonedasImportantes);
      } catch (error) {
        console.error(error);
      }
    };
    consultarAPI();
  }, []);

    //Almacena las acciones del ususario
  const obtenerCriptomoneda = (cripto) => {
    console.log(cripto);
    guardarCriptomoneda(cripto);
  };
  const obtenerMoneda = (moneda) => {
    console.log(moneda);
    guardarMoneda(moneda);
  };

  const cotizarPrecio = ()=>{
    if(moneda.trim()==='' || criptomoneda.trim()===''){
        mostrarAlerta()
        return
    }
    //se pasa la validacionr
    guardarConsultarAPI(true)
  }
  
  const mostrarAlerta = ()=>{
    Alert.alert(
        'Error...',
        'Ambos campos son obligatorios',
        [
            {text:'Ok'}
        ]

    )
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.label, styles.latoBlackText]}>Moneda</Text>
      <NativePicker
        selectedValue={moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}
        items={[
          { label: '- Seleccione -', value: '' },
          { label: 'Dólar de Estados Unidos', value: 'USD' },
          { label: 'Peso Mexicano', value: 'MXN' },
          { label: 'Euro', value: 'EUR' },
          { label: 'Libra Esterlina', value: 'GBP' },
        ]}
      />
      <Text style={[styles.label, styles.latoBlackText]}>Criptomonedas</Text>
      <NativePicker
        selectedValue={criptomoneda}
        onValueChange={(cripto) => obtenerCriptomoneda(cripto)}
        items={
            criptomonedas.map((cripto) => ({
            label: cripto.CoinInfo.FullName,
            value: cripto.CoinInfo.Name,
            key:cripto.CoinInfo.id,
        }))
        }
      />
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={()=>cotizarPrecio()}
      >
        <Text style={[styles.txtCotizar,styles.latoBlackText]}>Cotizar</Text>
      </TouchableHighlight>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  label: {
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  latoBlackText: {
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: '#FFF', // Cambiado a negro para que sea visible
    fontFamily: 'sans-serif',
  },
  btnCotizar:{
    backgroundColor:'#5E49E2',
    padding:10,
    marginTop:20,
    borderRadius: 10
  
  },
  txtCotizar:{
    color:'#FFF',
    fontSize:18,
    textTransform:'uppercase',
    textAlign:'center',
    

  },
  latoBlackText: {
    // fontSize: 15, // Tamaño de fuente similar
    fontWeight: 'bold', // Simulando el peso "Black"
    letterSpacing: 0.3, // Ajuste de espaciado de letras
    color: '#FFF', // Color negro estándar
    // textTransform: 'uppercase', // Convertir texto a mayúsculas (si es necesario)
    fontFamily: 'sans-serif', // Fuente genérica sans-serif
  },
});

export default Formulario;


