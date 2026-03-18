
import React,{useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator

} from 'react-native';

import Header from './components/Header.js';
import Formulario from './components/Formulario.js';
import Cotizacion from './components/Cotizacion.js';

const App = () =>{

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false)
  


  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        // Consultar la API para obtener la cotización
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        try {
          const response = await fetch(url);
          const resultado = await response.json();
          // Obtener solo los datos de las 10 criptomonedas más importantes
          const extraeLosDatos = resultado.DISPLAY[criptomoneda][moneda];
          

          guardarCargando(true);
          // Ocultar el spinner y mostrar el resultado
          setTimeout(() => {
            guardarResultado(extraeLosDatos)
            guardarConsultarAPI(false);
            guardarCargando(false);

          }, 3000);
        } catch (error) {
          console.error(error);
        }
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI]);


  // Mostrar el spinner o el resultado
  const componente = cargando ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#5E49E2" style={styles.spinner} />
    </View>
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
     <>
      <ScrollView>


       <Header
       />
       <Image
       style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
       />
      
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        
        />
      </View>
      <View style={{marginTop:40}}>
        {componente}

      </View>

      </ScrollView>

     </>
  );
}

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    marginHorizontal:'2.5%'

  },
  contenido:{
    marginHorizontal: '4.5%',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    padding: 60,
    backgroundColor: 'rgba(94, 73, 226, 0.1)',
    borderRadius: 20,
    marginHorizontal: '4.5%',
  },
  spinner: {
    transform: [{ scale: 2.5 }], // Aumenta el tamaño del spinner
    shadowColor: 'rgba(94, 73, 226, 1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 2, // Añade sombra en Android
  },
});

export default App;
