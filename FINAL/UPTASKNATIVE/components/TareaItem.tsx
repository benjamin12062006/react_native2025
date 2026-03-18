import { gql, useMutation } from '@apollo/client';
import { Box, Button, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';

// Tipo para la tarea
export type Tarea = {
  id: string;
  nombre: string;
  estado: boolean;
  proyecto: string;
}

// Mutación para actualizar tarea
const ACTUALIZAR_TAREA = gql`
  mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: Boolean) {
    actualizarTarea(id: $id, input: $input, estado: $estado) {
      id
      nombre
      estado
      proyecto
    }
  }
`;

// Mutación para eliminar tarea
const ELIMINAR_TAREA = gql`
  mutation eliminarTarea($id: ID!) {
    eliminarTarea(id: $id)
  }
`;

// Query para refetch (debe coincidir con la del componente padre)
const OBTENER_TAREAS = gql`
  query obtenerTareas($input: ProyectoIDInput) {
    obtenerTareas(input: $input) {
      id
      nombre
      estado
    }
  }
`;

interface TareaItemProps {
  tarea: Tarea;
  proyectoId: string;
}

export default function TareaItem({ tarea, proyectoId }: TareaItemProps) {
  
  // Mutación para actualizar tarea
  const [actualizarTarea] = useMutation(ACTUALIZAR_TAREA, {
    refetchQueries: [
      {
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: proyectoId
          }
        }
      }
    ]
  });

  // Mutación para eliminar tarea
  const [eliminarTarea] = useMutation(ELIMINAR_TAREA, {
    refetchQueries: [
      {
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: proyectoId
          }
        }
      }
    ]
  });

  // Función para cambiar el estado de la tarea
  const handleCambiarEstado = async () => {
    try {
      const nuevoEstado = !tarea.estado; // Cambia el estado actual
      
    const {data} = await actualizarTarea({
        variables:{
            id: tarea.id,
            input: {
                nombre:tarea.nombre,
                proyecto: proyectoId,
            },
            estado: nuevoEstado
        }
    })

      console.log('Tarea actualizada:', data);
      
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };
  const handleEliminarTarea = async () => {
    Alert.alert(
        'Confirmar eliminación',
        `¿Estás seguro de que quieres eliminar la tarea "${tarea.nombre}"?`,
        
        [
            {
                text:'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async ()=>{
                    try {
                        const {data} = await eliminarTarea({
                            variables:{
                                id: tarea.id
                            }
                        })
                        console.log('Tarea eliminada:', data);                        
                    } catch (error) {
                        console.error('Error al eliminar tarea:', error);
                        Alert.alert('Error', 'No se pudo eliminar la tarea');
                        
                    }
                }
            }
        ]
    )
}

  return (
    <Box
      bg="coolGray.800"
      p="4"
      borderRadius="md"
      shadow={2}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <VStack flex={1}>
          <Text 
            color="coolGray.100" 
            fontSize="md" 
            fontWeight="bold"
            strikeThrough={tarea.estado}
          >
            {tarea.nombre}
          </Text>
          <Text color={tarea.estado ? "green.400" : "orange.400"} fontSize="sm">
            {tarea.estado ? "Completada" : "Pendiente"}
          </Text>
        </VStack>
        
        <HStack space="2">
          {/* Botón para cambiar estado */}
          <Button
            size="sm"
            colorScheme={tarea.estado ? "green" : "orange"}
            variant="outline"
            onPress={handleCambiarEstado}
          >
            {tarea.estado ? "✓" : "○"}
          </Button>
          
          {/* Botón para eliminar */}
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onPress={handleEliminarTarea}
          >
            🗑️
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
