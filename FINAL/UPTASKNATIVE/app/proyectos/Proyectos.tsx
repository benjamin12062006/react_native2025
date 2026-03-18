import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Heading, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';

export type Proyecto = {
  id: string;
  nombre: string;
}
const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`

export default function Proyectos() {
  // Función para manejar la navegación al crear un nuevo proyecto con react navigation
  const {data, loading, error} = useQuery(OBTENER_PROYECTOS)
  const navigation = useNavigation();
  
  const navegarAProyecto = (proyecto: Proyecto) => {
    try {
      console.log('Intentando navegar al proyecto:', proyecto.id, proyecto.nombre);
      // Usar any para evitar problemas de tipado temporalmente
      (navigation as any).navigate('proyecto', {
        id: proyecto.id,
        nombre: proyecto.nombre
      });
    } catch (error) {
      console.log('Error de navegación:', error);
      // Si la navegación falla, usar alert como fallback
      Alert.alert('Info', `Proyecto: ${proyecto.nombre}\nID: ${proyecto.id}`);
    }
  };
  

  
  return (
    <Box safeArea flex={1} p="4" bg="black">
      <Heading size="lg" color="coolGray.100">
        Mis Proyectos
      </Heading>
      <Text color="coolGray.400" mb="4">
        Gestiona todos tus proyectos
      </Text>

      <HStack justifyContent="space-between" mb="4">
        <Text color="coolGray.100" fontSize="md" fontWeight="bold">
          Proyectos
        </Text>

      </HStack>

      <VStack space="3">
        {loading && (
          <Text color="coolGray.100" fontSize={"sm"}>
            Cargando proyectos...
          </Text>
        )}

        {error && (
          <Text color="red.400" fontSize="sm">
            Error al cargar proyectos: {error.message}
          </Text>
        )}
        
        {data?.obtenerProyectos && data.obtenerProyectos.length > 0 ? (
          data.obtenerProyectos.map((proyecto : Proyecto)=>{
            // utilizaremos otro componente para mostrar cada proyecto
            return (
              <Box
                key={proyecto.id}
                bg={'coolGray.400'}
                p="4"
                borderRadius={"md"}              
                shadow={2}
              >
                  <HStack
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Text color={"coolGray.100"} fontSize="md" fontWeight={"bold"}>
                      {proyecto.nombre}
                    </Text>
                    
                    <Button
                      size={"sm"}
                      bg="coolGray.600"
                      borderRadius="md"
                      colorScheme={"indigo"}
                      onPress={() => {
                        navegarAProyecto(proyecto);
                      }}
                    >
                      <Text color="white" fontSize="xs">Ver Detalles</Text>
                    </Button>

                  </HStack>

              </Box>           

            )
            
          })
        ) : (
          !loading && (
            <Text color="coolGray.400" textAlign="center" mt="8">
              No tienes proyectos aún. ¡Crea tu primer proyecto!
            </Text>
          )
        )}
        

      </VStack>
    </Box>
  );
}
