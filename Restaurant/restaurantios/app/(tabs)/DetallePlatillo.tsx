import { usePedidos } from '@/context/pedidos/PedidosContext';
import React from 'react';
import { Text } from 'react-native';

// Importaciones de gluestack-ui
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { router } from 'expo-router';

export default function DetallePlatillo() {
  const estilos = useEstilosGlobales();
  const { platillo } = usePedidos();
  console.log(platillo);

  if (!platillo) {
    return (
      <Box className={`${estilos.containerPrincipal} bg-background-0 flex-1 justify-center items-center`}>
        <Text className='text-white'>No se ha seleccionado ningún platillo.</Text>
      </Box>
    );
  }

  const { nombre, descripcion, precio, imagen } = platillo;

  return (
    <>
      <Box className={`${estilos.containerPrincipal} bg-background-0`}>
        <VStack className="p-6 space-y-6 mt-7">
          <Card className="p-6 bg-background-50 shadow-soft-2 rounded-2xl border border-outline-200">
            <Image
              source={{ uri: imagen }}
              className="w-full h-48 rounded-lg"
              alt={nombre}
            />
            <VStack className="p-4 space-y-3">
              <Text className="text-xl font-bold text-white">{nombre}</Text>
              <Text className="text-sm text-white">{descripcion}</Text>
              <Text className="text-base text-white font-semibold">${precio}</Text>
              <Button className="mt-4" variant="solid" size="lg"
                onPress={() => {
                        router.navigate('/(tabs)/FormularioPlatillo'); 
                }}
              >
                <ButtonText>Ordenar Platillo</ButtonText>
              </Button>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </>
  );
}
