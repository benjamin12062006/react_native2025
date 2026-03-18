import { gql, useMutation } from "@apollo/client";
import { router } from "expo-router";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { Colors } from "../../constants/Colors";


  // Mutation para crear cuenta
const NUEVA_CUENTA = gql`
  mutation crearUsuario($input: UsuarioInput)
    { crearUsuario(input: $input) }
`


export default function CrearCuentaForm() {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");


  const [crearUsuario] = useMutation(NUEVA_CUENTA)

  
  // useEffect para mostrar alertas
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

  const handleSubmit = async (nombre: string, email: string, password:string)=>{
    if (!nombre || !email || !password) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;      
    }

    try {
      const {data} = await crearUsuario({
        variables:{
          input:{
            nombre,
            email,
            password
          }
        }        
      });

      setMensaje(data.crearUsuario);
      router.push("/(tabs)");

      console.log(data)
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      setMensaje((error as Error).message.replace("GraphQL error: ", ""));
      return;      
    }

  }


  return (
    <>
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto" bg="black">
        <Heading size="lg" fontWeight="600" color="coolGray.100">
          Crea tu Cuenta
        </Heading>
        <Heading mt="1" color="coolGray.100" fontWeight="medium" size="xs">
          Ingresa tus datos para crear una cuenta
        </Heading>

        <VStack space={3} mt="5">

          {/* forms */}
          <FormControl>
            <FormControl.Label _text={{ color: "white" }}>
              Nombre
            </FormControl.Label>

            <TextInput style={styles.input} 
              value={nombre}
              onChangeText={setNombre}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ color: "white" }}>
              Email ID
            </FormControl.Label>

            <TextInput style={styles.input} 
              value={email}
              onChangeText={setEmail}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ color: "white" }}>
              Contraseña
            </FormControl.Label>

            <TextInput style={styles.input} 
              value={password}
              onChangeText={setPassword}
              secureTextEntry 
            />
          </FormControl>

          {/* boton */}
          <Button 
            mt="2" colorScheme="indigo"
            onPress={() => handleSubmit(nombre, email, password)}
          >
            Crear Cuenta
          </Button>

          {/* linnks */}
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.100">
              ¿Ya tienes una cuenta?{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => {
                router.push("/(tabs)");
              }}
            >
              Inicia Sesión
            </Link>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  input: Colors.dark.input,
});
