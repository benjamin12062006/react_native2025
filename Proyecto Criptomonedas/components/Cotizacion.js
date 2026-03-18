import React from 'react'
import { Text, View, StyleSheet,TouchableHighlight,Alert } from 'react-native';


const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0 ) return null
  return (
    <View style={styles.resultado}>
        <Text style={[styles.latoBlackText,styles.texto]}>
                <Text style={[styles.span,styles.precio]}>{resultado.PRICE}</Text>
        </Text>
        <Text style={[styles.latoBlackText,styles.texto]}>El precio mas alto del dia:
            <Text style={styles.span}>{resultado.HIGHDAY}</Text>
        </Text>
        <Text style={[styles.latoBlackText,styles.texto]}>El precio mas alto del dia:
            <Text style={styles.span}>{resultado.LOWDAY}</Text>
        </Text>
        <Text style={[styles.latoBlackText,styles.texto]}>Variacion de las ultimas 24hrs:
            <Text style={styles.span}>{resultado.CHANGEPCT24HOUR}%</Text>
        </Text>
        <Text style={[styles.latoBlackText,styles.texto]}>Ultima Actualizacion:
            <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({

    resultado:{
        backgroundColor:'#5E49E2',
        padding:20,
        margin:20,
        borderRadius: 10,
    },
    texto:{
        color:'#FFF',
        fontSize:18,
        marginBottom:10
        


    },
    precio:{
        color:'#fff',
        marginBottom:10,
        fontSize:38
    },
    span:{
        fontWeight: 'bold', 
        letterSpacing: 0.3, 
        color: '#FFF', 
      
        fontFamily: 'sans-serif', 
    },
    latoBlackText: {
        // fontSize: 15, // Tamaño de fuente similar
        // fontWeight: 'bold', // Simulando el peso "Black"
        letterSpacing: 0.3, // Ajuste de espaciado de letras
        color: '#FFF', // Color negro estándar
        // textTransform: 'uppercase', // Convertir texto a mayúsculas (si es necesario)
        fontFamily: 'sans-serif', // Fuente genérica sans-serif
      },

  });
  
export default Cotizacion
