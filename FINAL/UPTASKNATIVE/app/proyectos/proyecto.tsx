import { useNavigation,useRoute } from '@react-navigation/native';
import { Box, Heading, Text, VStack, HStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import ListaTareas from '../../components/ListaTareas';
import { gql, useMutation, } from '@apollo/client';
import { Alert, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Input, Icon } from 'native-base';
import { QueryInfo } from '@apollo/client/core/QueryInfo';
import { Route } from 'expo-router/build/Route';



/**
          actualizarProyecto(id:ID!, input:ProyectoInput): Proyecto
        eliminarProyecto(id:ID!): String
                obtenerProyectos: [Proyecto]

 */
type ProyectoType = {
  id: string;
  nombre: string;
}

const ELIMINAR_PROYECTO = gql`
  mutation eliminarProyecto($id: ID!){
    eliminarProyecto(id: $id)
    }

`
const ACTUALIZAR_PROYECTO = gql`
  mutation actualizarProyecto($id: ID!, $input: ProyectoInput) {
    actualizarProyecto(id: $id, input: $input) {
      id
      nombre
    }
  }
`

const OBTENER_PROYECTOS= gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`

export default function ProyectoDetalle() {
  const route = useRoute();
  const { id, nombre } = route.params as ProyectoType;


  const [actualizarProyecto] = useMutation(ACTUALIZAR_PROYECTO,{
    refetchQueries:[
      {
        query: OBTENER_PROYECTOS,
      }
    ]
  })

  const [eliminarProyecto] = useMutation(ELIMINAR_PROYECTO, {
    refetchQueries: [
      {
        query: OBTENER_PROYECTOS,
      }
    ]
  });

  const [nombreProyecto, setNombreProyecto] = useState<string>('');
  const [idProyecto, setIdProyecto] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [editar, setEditar] = useState<boolean>(false);
  const [cambio, setCambio] = useState<boolean>(false);

  const proyectoId = id;
  const proyectoNombre = nombre;

  const navigation = useNavigation();

  useEffect(() => {
    if (mensaje) {
      Alert.alert(
        "Información",
        mensaje,
        [
          {
            text: "OK",
            onPress: () => setMensaje("")
          }
        ]
      );
    }


  }, [mensaje, editar]);
  
  
  const hancleUpdate = async () => {

    if (!nombreProyecto.trim()) {
      setMensaje("Por favor, ingresa el nombre del proyecto.");
      return;
    }

    try {
      const {data} = await actualizarProyecto({
        variables:{
          id: proyectoId,
          input:{
            nombre: nombreProyecto.trim()
          }
        }
      });
      setMensaje(`Proyecto ${data.actualizarProyecto.nombre} actualizado correctamente`);
      console.log('Proyecto actualizado:', data.actualizarProyecto);
      setNombreProyecto(data.actualizarProyecto.nombre); 
      setIdProyecto(data.actualizarProyecto.id);
      setEditar(false); // Cerrar el modo de edición después de actualizar
      setCambio(true); // Indicar que hubo un cambio
    } catch (error) {
      setMensaje((error as Error).message.replace("GraphQL error: ", ""));
    }

  }

  const hancleDelete = async () => {

    try {
      const {data}= await eliminarProyecto({
        variables:{
          id: proyectoId
        }
      })
      setMensaje(`Proyecto ${data.eliminarProyecto} eliminado correctamente`);
            // redirecionar a proyectos

      navigation.goBack();
    } catch (error) {
      setMensaje((error as Error).message.replace("GraphQL error: ", ""));
    }

  }



  return (
    <Box safeArea flex={1} p="4" bg="black">
      <VStack space="4">
        <Box>
          <HStack justifyContent="space-between" alignItems="center" mb="4">

            {!cambio ? (
              <Heading size="lg" color="#FFD700" mb="2" mr={"6"}>
              {proyectoNombre}
              </Heading>
            ):(
            <Heading size="lg" color="#FFD700" mb="2" mr={"6"}>
              {nombreProyecto}
            </Heading>
            )}
              {!editar && (
                  <Icon
                    
                    as={MaterialIcons}
                    name="edit"
                    size="md"
                    color="white"
                    onPress={()=> setEditar(!editar)}
                  />
                )}


          </HStack>


          { editar && (
            
            <>
              <HStack space="2" alignItems="center" mb={"5"}>
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: '#2D2D2D',
                    color: 'white',
                    padding: 8,
                    borderRadius: 4,
                  }}
                  placeholder="Nuevo nombre del proyecto"
                  placeholderTextColor="#888"
                  value={nombreProyecto || proyectoNombre}
                  onChangeText={setNombreProyecto}
                />
                <Pressable
                  onPress={hancleUpdate}
                  bg="#FFD700"
                  p="2"
                  borderRadius="md"
                >
                  <Icon as={MaterialIcons} name="edit" size="sm" color="black" />
                </Pressable>
              </HStack>
            
            </>
            
            )}


         <HStack justifyContent="space-between" alignItems="center" mb="4">
            <Text color="coolGray.400" fontSize="sm">
              ID: {proyectoId}
            </Text>
              <Icon
                as={MaterialIcons}
                name="delete"
                size="lg"
                color="red.500"
                onPress={hancleDelete}
                ml="2"
              />
          
         </HStack>


        </Box>

        {/* Componente de lista de tareas */}
        <ListaTareas proyectoId={proyectoId} />
      </VStack>
    </Box>
  );
}
