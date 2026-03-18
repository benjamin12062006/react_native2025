import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
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
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { Colors } from "../../constants/Colors";

import { gql, useMutation } from "@apollo/client";

const INICIAR_SESSION = gql`
mutation	autenticarUsuario($input: AutenticarInput){
    	autenticarUsuario(input: $input){
      	token
    }
}

`
export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");


  const [autenticarUsuario] = useMutation(INICIAR_SESSION);

  useEffect(() => {
    if(mensaje){
      Alert.alert(
        "Información",
        mensaje,
        [
          {
            text:"OK",
            onPress: () => setMensaje("")
          }
        ]        
      )
    }

  }, [mensaje]);

  const handleIniciarSession = async () => {
    if (!email || !password) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {

      const {data} = await autenticarUsuario({
        variables:{
          input:{
            email,
            password
          }
        }
      })
  
      const {token} = data.autenticarUsuario;
      setMensaje("Inicio de sesión exitoso");

      await SecureStore.setItemAsync("token", token);

      console.log("token:",SecureStore.getItemAsync("token"));



      
    } catch (error) {
      setMensaje((error as Error).message.replace("GraphQL error: ", ""));
    }
  }



  return (
    <>
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto" bg="black">
        <Heading size="lg" fontWeight="600" color="coolGray.100">
          Bienvenido
        </Heading>
        <Heading mt="1" color="coolGray.100" fontWeight="medium" size="xs">
          Inicia sesión para continuar!
        </Heading>

        <VStack space={3} mt="5"  >


          <FormControl>

            <FormControl.Label _text={{color:"white"}}>Email ID</FormControl.Label>
            <TextInput style={styles.input} 
              value={email}
              onChangeText={(text)=> setEmail(text.toLowerCase())}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label _text={{color:"white"}}>Contraseña</FormControl.Label>
            <TextInput style={styles.input} secureTextEntry 
              value={password}
              onChangeText={setPassword}
            />



            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Olvidaste tu contraseña?
            </Link>
          </FormControl>



          <Button mt="2" colorScheme="indigo"
            onPress={() => handleIniciarSession()
            }
          >
            Iniciar Sesión
          </Button>


          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.100">
              Soy un nuevo usuario.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => {
                router.push("/CrearCuenta");
              }
              }
            >
              Crear Cuenta
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
