import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Button, Heading, HStack, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert, TextInput } from 'react-native';
import TareaItem, { Tarea } from './TareaItem';

// Query para obtener tareas
const OBTENER_TAREAS = gql`
  query obtenerTareas($input: ProyectoIDInput) {
    obtenerTareas(input: $input) {
      id
      nombre
      estado
    }
  }
`;

// Mutación para crear nueva tarea
const NUEVA_TAREA = gql`
  mutation nuevaTarea($input: TareaInput) {
    nuevaTarea(input: $input) {
      nombre
      id
      proyecto 
      estado
    }
  }
`;

interface ListaTareasProps {
  proyectoId: string;
}

export default function ListaTareas({ proyectoId }: ListaTareasProps) {
  const [nombreTarea, setNombreTarea] = useState<string>('');
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  // Query para obtener tareas
  const { data, loading, error } = useQuery(OBTENER_TAREAS, {
    variables: {
      input: {
        proyecto: proyectoId
      }
    },
    skip: !proyectoId
  });

  // Mutación para crear nueva tarea
  const [nuevaTarea] = useMutation(NUEVA_TAREA, {
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

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (mostrarFormulario) {
      setNombreTarea(''); // Limpiar el campo si se cancela
    }
  };

  const handleCrearTarea = async () => {
    if (!nombreTarea.trim()) {
      Alert.alert("Error", "Por favor, ingresa el nombre de la tarea.");
      return;
    }

    try {
      const { data: response } = await nuevaTarea({
        variables: {
          input: {
            nombre: nombreTarea.trim(),
            proyecto: proyectoId
          }
        }
      });

      console.log("Nueva tarea creada:", response);
      
      if (response?.nuevaTarea) {
        Alert.alert("Éxito", `Tarea "${response.nuevaTarea.nombre}" creada exitosamente`);
        setNombreTarea(""); // Limpiar el campo
        setMostrarFormulario(false); // Ocultar el formulario
      }

    } catch (error) {
      console.error("Error al crear tarea:", error);
      Alert.alert("Error", (error as Error).message.replace("GraphQL error: ", ""));
    }
  };

  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center" mb="4">
        <Heading size="md" color="coolGray.100">
          Tareas del Proyecto
        </Heading>
        <Button 
          size="sm" 
          colorScheme="yellow"
          onPress={handleToggleFormulario}
        >
          {mostrarFormulario ? "Cancelar" : "Crear Tarea"}
        </Button>
      </HStack>

      {/* Formulario para crear nueva tarea */}
      {mostrarFormulario && (
        <HStack space="2" mb="4">
          <Box flex={1}>
            <Text color="coolGray.100" mb="2">Nombre de la Tarea</Text>
            <TextInput
              style={{
                backgroundColor: '#2D3748',
                color: '#E2E8F0',
                padding: 10,
                borderRadius: 5,
              }}
              placeholder="Escribe el nombre de la tarea"
              placeholderTextColor="#A0AEC0"
              value={nombreTarea}
              onChangeText={setNombreTarea}
            />
          </Box>
          <Button
            colorScheme="green"
            onPress={handleCrearTarea}
          >
            Crear
          </Button>
        </HStack>
      )}

      {/* Loading state */}
      {loading && (
        <Text color="coolGray.400">Cargando tareas...</Text>
      )}

      {/* Error state */}
      {error && (
        <Text color="red.400" fontSize="sm">
          Error al cargar tareas: {error.message}
        </Text>
      )}

      {/* Lista de tareas */}
      {!mostrarFormulario && (
        <VStack space="3">
          {data?.obtenerTareas && data.obtenerTareas.length > 0 ? (
            data.obtenerTareas.map((tarea: Tarea) => (
              <TareaItem 
                key={tarea.id} 
                tarea={tarea} 
                proyectoId={proyectoId}
              />
            ))
          ) : (
            !loading && (
              <Text color="coolGray.400" textAlign="center" mt="8">
                No hay tareas en este proyecto
              </Text>
            )
          )}
        </VStack>
      )}
    </Box>
  );
}
