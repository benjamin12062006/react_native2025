import { useFirebase } from '@/context/firebase/FirebaseContext';
import { usePedidos } from '@/context/pedidos/PedidosContext';
import React, { JSX, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

// Importaciones de gluestack-ui
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { MenuSeparator } from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { Platillo, PlatilloSeleccionado } from '@/types'; // Asegúrate de que Platillo esté definido en tu types.ts



export default function DetallePlatillo() {
  console.log('DetallePlatillo rendering...');
  const { firebase, menu: rawMenu, obtenerProductos } = useFirebase();
  const estilos = useEstilosGlobales();
  const menu = rawMenu as Platillo[];
  const { seleccionarPlatillo } = usePedidos();

  useEffect(() => {
    obtenerProductos();
  }, []);

  console.log(menu);
  const mostrarHeading = (categoria: string, i: number): JSX.Element | undefined => { //tipamos la función para que retorne un JSX.Element o undefined
    if (i > 0) {
      const categoriaAnterior = menu[i - 1]?.categoria;
      if (categoria !== categoriaAnterior) {
        return (
          <>
            <MenuSeparator className="mb-3" />
            <Text className="text-lg font-bold text-gray-800 mb-2">
              {categoria} :
            </Text>

          </>
        );
      }
    } else {
      // Si es el primer elemento, siempre mostramos el heading
      return (
        <Text className="text-lg font-bold text-gray-800 mb-2">
          {categoria} :
        </Text>
      );
    }
  }

  // Función para manejar la selección del platillo
  const handleSeleccionarPlatillo = (platillo: PlatilloSeleccionado) => {
    console.log('Platillo seleccionado:', platillo.nombre);
    seleccionarPlatillo(platillo);
    // Aquí puedes agregar navegación si es necesario
    // router.push('/(tabs)/FormularioPlatillo');
  };

  return (
    // Estamos utilizando un componente de Gluestack UI para el diseño
    <>
      <Box className={`${estilos.containerPrincipal} bg-background-0`}>

        {/* Nesesitamos algo parecido al content y dentro pondremos algo parecido a la etiqueta List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack className="p-6 space-y-6 mt-7">
            <Card className="p-6 bg-background-50 shadow-soft-2 rounded-2xl border border-outline-200"

            >

              {menu.map((platillo: Platillo, index) => {
                const { id, nombre, descripcion, precio, existencia, imagen, categoria } = platillo;
                return (
                  <React.Fragment key={id}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {

                        const {existencia, ...platillo2} = platillo;
                        handleSeleccionarPlatillo(platillo2 as PlatilloSeleccionado);
                        router.push('/(tabs)/DetallePlatillo')
                      }}
                      className="transition-transform duration-200 active:scale-95"
                    >
                      <Card className="p-4 mb-3 bg-white shadow-soft-1 rounded-lg border border-outline-200">
                        {mostrarHeading(categoria, index)}

                        <HStack className="items-center justify-start">
                          <Box className='mr-4 w-20 h-20 rounded-lg overflow-hidden'>
                            <Image
                              className='w-full h-full rounded-lg'
                              source={{ uri: imagen }}
                              alt={`Imagen de ${nombre}`}
                            />
                          </Box>

                          <VStack className="flex-1 items-start">
                            <Text className="text-lg font-bold text-gray-800">
                              {nombre}
                            </Text>
                            <Text className="text-sm text-gray-700">
                              {descripcion}
                            </Text>
                          </VStack>
                          <HStack className="items-center justify-end">
                            <Text className="text-base text-black font-semibold mr-2">
                              ${precio}
                            </Text>
                          </HStack>
                        </HStack>
                      </Card>
                    </TouchableOpacity>
                  </React.Fragment>
                );
              })}
            </Card>


          </VStack>





        </ScrollView>






      </Box>
    </>

  );
}
