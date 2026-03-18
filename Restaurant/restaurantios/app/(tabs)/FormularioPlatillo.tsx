// VESION O EXTENCION
// import NuevaOrden from '@/components/NuevaOrden';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function FormularioPlatillo() {
//   console.log('FormularioPlatillo rendering...');
  
//   return (
//     <NuevaOrden />
//   );
// }
import { usePedidos } from '@/context/pedidos/PedidosContext';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
// Importaciones de gluestack-ui
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { router } from 'expo-router';
// importar vector icons
import { Ionicons } from '@expo/vector-icons';
import { Pedido } from '@/context/pedidos/PedidosState';

// importar tipos
import { PlatilloSeleccionado } from '@/types';

export default function FormularioPlatillo() {
  const estilos = useEstilosGlobales();
  const { platillo, dispatch,confirmarPedido } = usePedidos();
  const [cantidad, setCantidad] = useState(1);

  // state cantidades
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  const calcularTotal = () => {
    if (platillo){
      const totalPagar = platillo.precio * cantidad;
      setTotal(totalPagar);
    }else {
      setTotal(0);
    }
  };
type PedidoConCantidad = Pedido &{
  cantidad: number;
  total: string;
}


  if (!platillo) {
    return (
      <Box className={`${estilos.containerPrincipal} bg-background-0 flex-1 justify-center items-center`}>
        <Text className="text-white">No hay platillo seleccionado.</Text>
      </Box>
    );
  }

  const { nombre, descripcion, precio, imagen } = platillo;

  const handleAumentar = () => setCantidad(cantidad + 1);
  const handleDisminuir = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);


  const handleConfirmar = () => {
    Alert.alert(
      'Confirmar Pedido',
      `¿Deseas agregar ${cantidad} ${nombre}(s) al pedido?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () =>{
            const pedido:PedidoConCantidad = {
              ...platillo,
              cantidad,
              total:total.toFixed(2),
            }
            confirmarPedido(pedido);
            router.push('/(tabs)/Resumen Pedido');
          },
        },
      ],
      { cancelable: true }
    )
    
    // dispatch({
    //   type: 'AGREGAR_PLATILLO_PEDIDO',
    //   payload: {
    //     id: platillo.id,
    //     nombre: platillo.nombre,
    //     cantidad,
    //     precio: platillo.precio,
    //   }
    // });
    // router.push('/(tabs)/ResumenPedido');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              <HStack className="items-center space-x-4 mt-4">
                <Button variant="outline" size="sm" onPress={handleDisminuir}
                  className='mr-4 bg-slate-100'
                >
                  <Ionicons name="remove" size={20} color="black" />
                </Button>
                {/* Input de cantidad usando TextInput nativo */}
                <TextInput
                  style={{
                    width: 48,
                    height: 40,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    borderRadius: 8,
                    fontSize: 18,
                    color: 'black',
                  }}
                  keyboardType="numeric"
                  value={String(cantidad)}
                  onChangeText={text => {
                    const val = parseInt(text, 10);
                    if (!isNaN(val) && val > 0) setCantidad(val);
                    else if (text === '') setCantidad(1);
                  }}
                />
                <Button variant="outline" size="sm" onPress={handleAumentar}
                  className='ml-4 bg-slate-100'
                >
                  <Ionicons name="add" size={20} color="black" />
                </Button>
              </HStack>
              <Button className="mt-6 " variant="solid" size="lg" onPress={handleConfirmar}>
                <ButtonText>Confirmar Pedido</ButtonText>
              </Button>
            </VStack>


            <HStack className="mt-4 justify-between">
              <Text className="text-lg text-white">Total:</Text>
              <Text className="text-lg text-white font-bold">${total.toFixed(2)}</Text>
            </HStack>
          </Card>
        </VStack>        
      </Box>
    </TouchableWithoutFeedback>
  );
}
