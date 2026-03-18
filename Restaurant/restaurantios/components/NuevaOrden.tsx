import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { router } from 'expo-router';
import React from 'react';


export default function NuevaOrden() {
  const estilos = useEstilosGlobales();

  const handlePress = () => {
    console.log('Nueva Orden Pressed');
    router.push('/(menu)/home');
  }
  
  const handlePress2 = () => {
    console.log('Inicio Pressed');
    router.push('/(tabs)/DetallePlatillo');
  }
  
  return (
    <VStack className={`${estilos.containerPrincipal} bg-slate-700`}>
      <Center className={`${estilos.centrado}`}>
        <Button 
          size="lg" 
          variant="solid"
          onPress={handlePress}
          className={`${estilos.botonSecundario} `}
        >
          <ButtonText className={`${estilos.textoBoton} text-white`}>
            Nueva Orden
          </ButtonText>
        </Button>
        <Button 
          size="lg" 
          variant="solid"
          onPress={handlePress2}
          className={`${estilos.botonSecundario} `}
        >
          <ButtonText className={`${estilos.textoBoton} text-white`}>
            Crear Nueva Orden
          </ButtonText>
        </Button>
      </Center>
    </VStack>
  );
}