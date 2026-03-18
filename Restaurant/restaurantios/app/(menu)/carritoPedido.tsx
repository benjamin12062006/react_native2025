// RECORDAR: el codigo de carritopedido deberia estar aqui, y este codifo en progresoPedido pero por ahora lo dejo asi


import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { usePedidos } from '@/context/pedidos/PedidosContext';
import { Button, ButtonText } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

// Importaciones de Firebase
import firebase from '@/firebase';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, onSnapshot } from "firebase/firestore";

export default function DetallePlatillo() {
  const estilos = useEstilosGlobales();
  const { pedidoRealizado } = usePedidos();
  const [pedidoData, setPedidoData] = useState<any>(null);
  const [completarPedido, setCompletarPedido] = useState(false);
  const { pedidoId } = useLocalSearchParams();

  console.log('Pedido ID recibido:', pedidoId);

  useEffect(() => {
    if (!pedidoId || typeof pedidoId !== 'string') {
      console.log('No se encontró pedidoId válido');
      return;
    }

    console.log('Buscando pedido con ID:', pedidoId);

    try {
      // Crear referencia directa al documento usando el ID
      const pedidoDocRef = doc(firebase.db, 'pedidos', pedidoId);

      // Escuchar cambios en tiempo real del documento específico
      const unsubscribe = onSnapshot(pedidoDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const pedidoEncontrado = {
            id: docSnapshot.id,
            ...docSnapshot.data()
          };
          setPedidoData(pedidoEncontrado);
          console.log('Pedido encontrado:', pedidoEncontrado);
        } else {
          console.log('No se encontró el pedido con ID:', pedidoId);
          setPedidoData(null);
        }
      }, (error) => {
        console.error('Error al obtener el pedido:', error);
      });

      // Cleanup function
      return () => unsubscribe();
    } catch (error) {
      console.error('Error al configurar la suscripción:', error);
    }
  }, [pedidoId]);

  if (!pedidoData) {
    return (
      <Box className={`${estilos.containerPrincipal} bg-background-0 flex-1 justify-center items-center`}>
        <Text className="text-lg text-white">No se encontró el pedido</Text>
      </Box>
    );
  }

  return (
    <Box className={`${estilos.containerPrincipal} bg-background-0 flex-1`}>
      <VStack className="p-6 space-y-6 mt-7">
        <Card className="p-6 bg-background-50 shadow-soft-2 rounded-2xl border border-outline-200">
          <VStack className="space-y-4">
            <Heading size="lg" className="text-white">
              Estado del Pedido
            </Heading>

            <Text className="text-base text-white">
              ID del Pedido: {pedidoData.id}
            </Text>

            <Text className="text-base text-white">
              Tiempo de entrega: {pedidoData.tiempoEntrega || "No definido"}{" "}
              minutos
            </Text>
            <Text className="text-base text-white">
              Completado: {pedidoData.completado ? "Sí" : "No"}
            </Text>
            {/* boton para comenzar nueva orden */}
            {pedidoData.completado && (
              <>
                <Button
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-xl py-5"
                  size="lg"
                  onPress={() => {
                    router.push('/(tabs)');
                    pedidoRealizado(); // Reiniciar el estado del pedido
                    setCompletarPedido(false); // Reiniciar el estado de completar pedido
                  }}
                >
                  <ButtonText className="text-dark font-bold text-lg">
                    Comenzar Nueva Orden
                  </ButtonText>
                </Button>
              </>
            )}
          </VStack>
        </Card>
      </VStack>
    </Box>
  );
}