import React  from "react";
import { Text,StyleSheet,Platform } from "react-native";

const Header = () => (

    <Text style={[styles.encabezado,styles.latoBlackText]}>Criptomonedas</Text>
)







const styles= StyleSheet.create({

    encabezado:{
        padding:Platform.OS === 'ios'? 50 :10,
        backgroundColor:'#5E49E2',
        paddingBottom:10,
        textAlign:'center',
        textTransform:'uppercase',
        fontSize:20,
        marginBottom:30
    },
    latoBlackText: {
        fontSize: 15, // Tamaño de fuente similar
        fontWeight: 'bold', // Simulando el peso "Black"
        letterSpacing: 0.3, // Ajuste de espaciado de letras
        color: '#FFF', // Color negro estándar
        // textTransform: 'uppercase', // Convertir texto a mayúsculas (si es necesario)
        fontFamily: 'sans-serif', // Fuente genérica sans-serif
      },

})

export default Header
