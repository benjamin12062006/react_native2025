import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

// Importar contexto de pedidos
import { usePedidos } from '@/context/pedidos/PedidosContext';
import { router } from 'expo-router';

export default function ResumenPedido() {
  const estilos = useEstilosGlobales();
  const { state, comstrarResumen,total } = usePedidos();
  const { pedido } = state;

  // Calcular total general usando la función local
  const calcularTotal = () => {
    const nuevoTotal = pedido.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
    comstrarResumen(nuevoTotal);
  };

  useEffect(() => {
    calcularTotal(); // Calcular total al cargar el componente o cuando cambie el pedido
  }, [pedido]);


  return (
    <Box className={`${estilos.containerPrincipal} bg-background-0 flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="p-6 space-y-6 mt-7">
          {/* Header */}
          <Heading size="2xl" className="text-white text-center">
            Resumen del Pedido
          </Heading>

          {/* Content - Lista de pedidos */}
          <Card className="p-6 bg-background-50 shadow-soft-2 rounded-2xl border border-outline-200">
            <VStack className="space-y-4">
              {pedido.length === 0 ? (
                <Text className="text-center text-gray-500 text-lg">
                  No hay platillos en el pedido
                </Text>
              ) : (
                pedido.map((platillo, index) => (
                  <React.Fragment key={`${platillo.id}-${index}`}>
                    {/* List Item */}
                    <Card className="p-4 bg-white shadow-soft-1 rounded-lg border border-outline-100">
                      <HStack className="items-center space-x-4">
                        {/* Left - Thumbnail */}
                        <Box className="w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            source={{ uri: platillo.imagen }}
                            className="w-full h-full"
                            alt={platillo.nombre}
                          />
                        </Box>

                        {/* Body */}
                        <VStack className="flex-1 space-y-1">
                          {/* Text - Nombre */}
                          <Text className="text-lg font-bold text-gray-800">
                            {platillo.nombre}
                          </Text>
                          
                          {/* Text - Cantidad y precio unitario */}
                          <Text className="text-sm text-gray-600">
                            Cantidad: {platillo.cantidad} x ${platillo.precio}
                          </Text>
                        </VStack>

                        {/* Total a pagar */}
                        <VStack className="items-end">
                          <Text className="text-lg font-bold text-green-600">
                            ${(platillo.precio * platillo.cantidad).toFixed(2)}
                          </Text>
                        </VStack>
                      </HStack>
                    </Card>

                    {/* Divider entre items (excepto el último) */}
                    {index < pedido.length - 1 && (
                      <Divider className="my-2" />
                    )}
                  </React.Fragment>
                ))
              )}
            </VStack>
          </Card>

          {/* Total General */}
          {pedido.length > 0 && (
            <Card className="p-6 bg-primary-50 shadow-soft-2 rounded-2xl border border-primary-200">
              <HStack className="justify-between items-center">
                <Heading size="lg" className="text-primary-800">
                  Total a Pagar:
                </Heading>
                <Heading size="xl" className="text-primary-900 font-bold">
                  ${total.toFixed(2)}
                </Heading>
              </HStack>
            </Card>
          )}

          {/* Botones de acción */}
          {pedido.length > 0 && (
            <VStack className="space-y-3">
              <Button
                variant="solid"
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onPress={() => {
                  router.push('/(menu)/progresoPedido');
                }}
              >
                <ButtonText>Ordenar Pedido</ButtonText>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onPress={() => {
                  router.push('/(tabs)');
                }}
              >
                <ButtonText>Agregar Más Platillos</ButtonText>
              </Button>
            </VStack>
          )}

          {/* boton para al index */}
          <VStack className="mt-6">
            <Button
              variant="solid"
              size="lg"
              onPress={() => {
                router.push('/(tabs)')
              }}
            >
              <ButtonText>NUEVO PEDIDO</ButtonText>
            </Button>
          </VStack>

        </VStack>
      </ScrollView>
    </Box>
  );
}
