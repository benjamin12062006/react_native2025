import { gql, useMutation } from '@apollo/client';
import { Box, Button, FormControl, Heading, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const NUEVO_PROYECTO = gql`
  mutation nuevoProyecto($input: ProyectoInput){
    nuevoProyecto(input: $input){
      nombre
      id
    } 
  }
`;

export default function NuevoProyecto() {

  const [mensaje, setMensaje] = React.useState("");
  const [nombreProyecto, setNombreProyecto] = useState("");

  //apollo
  const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
    refetchQueries: [{ query: OBTENER_PROYECTOS }]
  });
  const router = useRouter();

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
  }, [mensaje]);

  const hancleSubmit = async () => {
    if (!nombreProyecto.trim()) {
      setMensaje("Por favor, ingresa el nombre del proyecto.");
      return;
    }

    try {
      console.log('Enviando mutación con:', { nombre: nombreProyecto.trim() });
      
      const {data} = await nuevoProyecto({
        variables:{
          input:{
            nombre: nombreProyecto.trim()            
          }
        }
      });
      
      console.log("Respuesta completa:", data);
      console.log("Proyecto creado:", data?.nuevoProyecto);
      
      if (data?.nuevoProyecto) {
        setMensaje(`${data.nuevoProyecto.nombre} creado exitosamente`);
        setNombreProyecto(""); // Limpiar el campo
        // Opcional: navegar de vuelta
        router.back();

      } else {
        setMensaje("Error: No se pudo crear el proyecto");
      }

    } catch (error: any) {
      console.error("Error al crear el proyecto:", error);
      setMensaje(error.message.replace("GraphQL error: ", ""));
    }
  };



  return (
    <Box safeArea flex={1} bg="black" p="4">
      <Heading size="lg" color="coolGray.100" mb="4">
        Nuevo Proyecto
      </Heading>
      <VStack space={4}>
        <Text color="coolGray.300">
          Aquí podrás agregar los detalles de tu nuevo proyecto.
        </Text>
        <Button colorScheme="indigo" onPress={() => hancleSubmit()}>
          Nuevo Proyecto
        </Button>

        <FormControl isRequired>
          <FormControl.Label color="coolGray.300">Nombre del Proyecto</FormControl.Label>
            <TextInput style={styles.input} 
              value={nombreProyecto}
              onChangeText={setNombreProyecto}
              placeholder="Ingresa el nombre del proyecto"
              placeholderTextColor="gray"
            />
        </FormControl>



      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#a1a1aa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    backgroundColor: '#1f2937',
    fontSize: 16,
  },
});