import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { usePedidos } from '@/context/pedidos/PedidosContext';
import firebase from '@/firebase';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { addDoc, collection } from "firebase/firestore";

import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView } from 'react-native';

export default function ProgresoPedidoScreen() {
  const estilos = useEstilosGlobales();
  const { state, dispatch, pedidoRealizado } = usePedidos();
  const { pedido } = state;

  const handleEliminar = (idPlatillo: string) => {
    dispatch({
      type: 'ELIMINAR_PLATILLO_PEDIDO',
      payload: { idPlatillo }
    });
  };

  // Función asíncrona para ordenar pedido
  const handleOrdenarPedido = async () => {
    try {
      if (pedido.length === 0) {
        Alert.alert('Error', 'No hay platillos en el pedido');
        return;
      }

      Alert.alert(
        'Ordenar Pedido',
        '¿Confirmas que deseas ordenar este pedido?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                console.log('Procesando pedido...', pedido);
                            
                // // Limpiar el estado del pedido
                // pedidoRealizado();
                
                Alert.alert(
                  '¡Pedido Ordenado!',
                  'Tu pedido ha sido procesado exitosamente.',
                  [
                    { 
                      text: 'OK', 
                      onPress: async() => {
                        const pedidoObj = {
                            tiempoEntrega:0,
                            completado: false,
                            total:pedido,
                            creado:Date.now(),
                        }
                        try{
                            // Guardar el pedido en Firestore
                            const pedidosCollection = collection(firebase.db,'pedidos');
                            const docRef = await addDoc(pedidosCollection,pedidoObj);
                            console.log('Pedido creado con ID:', docRef.id);
                            
                            // Limpiar el estado del pedido ANTES de navegar
                            pedidoRealizado();
                            
                            // Navegar a la página de seguimiento del pedido
                            router.push({
                              pathname: '/(menu)/carritoPedido',
                              params: { pedidoId: docRef.id }
                            });

                        }catch (error) {
                            console.error('Error al crear el pedido:', error);
                        }
                        }
                      }
                  ]
                );
                
              } catch (error) {
                console.error('Error al procesar pedido:', error);
                Alert.alert(
                  'Error',
                  'Hubo un problema al procesar tu pedido. Intenta nuevamente.',
                  [{ text: 'OK' }]
                );
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error en handleOrdenarPedido:', error);
      Alert.alert('Error', 'Ocurrió un error inesperado.');
    }
  };

  return (
    <VStack className={`${estilos.containerPrincipal} bg-slate-50`}>
      <ScrollView className="flex-1">
        <VStack className="p-6 space-y-6">
          {/* Mis Pedidos */}
          <Card className="p-6 bg-white shadow-lg rounded-2xl">
            <VStack className="space-y-4">
              <Heading size="lg" className="text-slate-800">
                Mis Pedidos
              </Heading>
              {pedido.map((item, index) => (
                <Card key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <HStack className="items-center space-x-4">
                    {/* Imagen del platillo */}
                    <Box className="w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        source={{ uri: item.imagen }}
                        className="w-full h-full"
                        alt={item.nombre}
                      />
                    </Box>
                    
                    {/* Información del platillo */}
                    <VStack className="flex-1">
                      <Text className="text-base font-medium text-slate-800">
                        {item.nombre}
                      </Text>
                      <Text className="text-sm text-slate-500">
                        Cantidad: {item.cantidad}
                      </Text>
                      <Text className="text-lg font-bold text-slate-800">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </Text>
                    </VStack>

                    {/* Botón eliminar */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-500 border-red-500"
                      onPress={() => handleEliminar(item.id)}
                    >
                      <ButtonText className="text-white">Eliminar</ButtonText>
                    </Button>
                    
                  </HStack>
                </Card>
              ))}
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
      {/* Botón fijo en la parte inferior */}
      <VStack className="px-6 py-4 bg-white border-t border-slate-200 shadow-lg">
        <Button
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-xl py-5"
          size="lg"
          onPress={handleOrdenarPedido}
        >
          <ButtonText className="text-dark font-bold text-lg">
            Ordenar Pedido
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
      
  );
}
