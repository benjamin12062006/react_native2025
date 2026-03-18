import { Button as ButtonPaper } from "react-native-paper";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useContext } from 'react';
import { DeviceContext } from "@/app/_layout";
import { Color } from "three";

const Barra = () => {
    const router = useRouter();
    const { theme } = useContext(DeviceContext);
    console.log('theme', theme.colors.primary);

    const handlePress = () => {
        console.log('Botón presionado');
        router.push('/views/NuevoCliente');
    };

  return (
    <>

        <ButtonPaper            
            onPress={() => handlePress()}
            style={{
                // backgroundColor: theme.colors.primary,               
            }}
            labelStyle={{
                color: theme.colors.primary
            }}
            icon={'eyedropper-plus'}
            contentStyle={{ flexDirection: 'row-reverse' }}
        >
            Nuevo Cliente
        </ButtonPaper>
    
    
    </>
      

  )
}

export default Barra
