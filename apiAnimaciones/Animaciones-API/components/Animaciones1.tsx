import { Text, View, StyleSheet, Animated, TouchableNativeFeedback, TouchableWithoutFeedback, Platform } from 'react-native';
import { useState, useEffect } from 'react';

const Animaciones1 = () => {
     const [animacion] = useState(new Animated.Value(1)); // Iniciar con valor 1 para escala normal
     const [animacion2] = useState(new Animated.Value(0)); // Iniciar con valor 1 para escala normal
     const [animacion3] = useState(new Animated.Value(-50)); // Iniciar con valor 1 para escala normal
     
    useEffect(()=>{
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    animacion3,
                    {
                        toValue: -30,
                        duration: 1000,
                        useNativeDriver: false, // Cambiar a false para evitar advertencias
                    }
                ),
                Animated.timing(animacion2,{
                    toValue: 60,
                    duration: 1000,
                    useNativeDriver: false, // Cambiar a false para evitar advertencias
                }),
                Animated.timing(animacion2,{
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false, // Cambiar a false para evitar advertencias
                }),
                Animated.timing(animacion3,{
                    toValue: -30,
                    duration: 1000,
                    useNativeDriver: false, // Cambiar a false para evitar advertencias
                }),
    
            ])
        ).start();
    },[])

    const estiloAnimacion2 = {
        transform: [{ translateY: animacion2 },
            { translateX: animacion3 }],
    }

     // Función para reiniciar y ejecutar la animación de presionar
     const presionarBtn = () => {
        // Reiniciar primero para asegurar estado consistente
        animacion.setValue(1);
        
        // Luego animar
        Animated.spring(
            animacion,
            {
                toValue: 0.8,
                friction: 3,
                tension: 40,
                useNativeDriver: false,
            }
        ).start();
    }

    // Función para devolver a tamaño normal
    const soltarBtn = () => {
        Animated.spring(
            animacion,
            {
                toValue: 1,
                friction: 4, // Un poco más de fricción para volver más rápido
                tension: 50, // Un poco más de tensión para volver más rápido
                useNativeDriver: false,
            }
        ).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacion }],
    }
    
    return (
        <View style={styles.container}>
            {Platform.OS === 'android' ? (
                <TouchableNativeFeedback
                    onPress={() => presionarBtn()}
                    onPressOut={() => soltarBtn()}
                    background={TouchableNativeFeedback.Ripple('#fff', false)}
                >
                    <Animated.View 
                        style={[
                            styles.button,
                            estiloAnimacion
                        ]}>      
                        <Text style={styles.texto}>Iniciar Session</Text>      
                    </Animated.View>
                </TouchableNativeFeedback>
            ) : (
                // En iOS usar TouchableWithoutFeedback para mejor compatibilidad
                <TouchableWithoutFeedback
                    onPressIn={() => presionarBtn()}
                    onPressOut={() => soltarBtn()}
                >
                    <Animated.View 
                        style={[
                            styles.button,
                            estiloAnimacion
                        ]}>      
                        <Text style={styles.texto}>Iniciar Session</Text>      
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}

            <Animated.View style={[styles.caja, estiloAnimacion2]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    caja: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
    },
    texto: {
        color: '#000',
    },
    button: {        
        width: 200,
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#fff',
    },
});

export default Animaciones1;