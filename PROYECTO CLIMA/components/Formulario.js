import React,{useState} from 'react'
import { Text, View,StyleSheet, TextInput,TouchableNativeFeedback, TouchableWithoutFeedback,Animated, Alert} from 'react-native'
import NativePicker from './NativePicker.js'
const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {

    const {pais,ciudad} = busqueda

    const [animbacionboton] = useState( new Animated.Value(1))


    const consultarClima = ()=>{
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return
        }

        guardarConsultar(true)
    }

    const mostrarAlerta = ()=>{
        Alert.alert(
            'error',
            'Agrega una ciudad y pais para la busqueda',
            [{text:'Entendido'}]
        )
    }



    const animacionEntrada= ()=>{
        Animated.spring(animbacionboton,{
            toValue:.9,
            useNativeDriver: true

        }).start();
    }
    const animacionSalida= ()=>{
        Animated.spring(animbacionboton,{
            toValue:1,
            friction:4,
            tension:30,
            useNativeDriver: true
        }).start();
    }

    const estiloAnimacion= {
        transform:[{scale:animbacionboton}]
    }
    // Define los items para NativePicker
    const paises = [
        { label: "-- Seleccione un país --", value: "" },
        { label: "Estados Unidos", value: "US" },
        { label: "Bolivia", value: "BO" },
        { label: "México", value: "MX" },
        { label: "Argentina", value: "AR" },
        { label: "Colombia", value: "CO" },
        { label: "Costa Rica", value: "CR" },
        { label: "España", value: "ES" },
        { label: "Perú", value: "PE" }
    ];


  return (

    <>
        <View style={styles.formulario}>
            <View >
                <TextInput
                    value={ciudad}
                    style={styles.input}
                    onChangeText={ciudad=> guardarBusqueda({...busqueda,ciudad})}
                    placeholder='Ciudad'
                    placeholderTextColor={'#666'}
                />

            </View>
            <View>
                <NativePicker
                    selectedValue={pais}
                    onValueChange={pais=> guardarBusqueda({...busqueda,pais})}
                    items={paises}
                />
            </View>
            <TouchableWithoutFeedback
                onPressIn={()=> animacionEntrada()}
                onPressOut={( )=> animacionSalida()}
                onPress={()=> consultarClima()}
            >
                <Animated.View style={[styles.btnBuscar,estiloAnimacion]}>
                    <Text style={styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    
    </>
  )
}

const styles = StyleSheet.create({
    // formulario:{
    //     marginTop:100
    // },
    input:{
        padding:10,
        height:50,
        backgroundColor:'#fff',
        fontSize:20,
        marginBottom:20,
        textAlign:'center',
        color:'#000',
    },
    textoBuscar:{
        color:'#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18

    },
    btnBuscar:{
        marginTop:50,
        backgroundColor:'#000',
        padding:10,
        justifyContent:'center'
    },


});

export default Formulario
