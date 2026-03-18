import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, extendTheme } from 'native-base';
import 'react-native-reanimated';
//apollo
import client from '@/config/apollo';
import { ApolloProvider } from '@apollo/client';
import * as secureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import Inicio from './proyectos/inicio';
// Configuración del tema personalizado
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: '#f7fafc',
      500: '#667eea',
      600: '#5a67d8',
    },
    black: '#000000',
  },
});



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [token, setToken] = useState<string | null>(null);

  const checkTokenValidity = async () => {
    const storedToken = await secureStore.getItemAsync('token');
    
    if (storedToken) {
      try {
        // Decodificar el JWT para verificar expiración
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp < currentTime) {
          console.log('Token expirado en _layout, eliminando...');
          await secureStore.deleteItemAsync('token');
          setToken(null);
        } else {
          setToken(storedToken);
        }
      } catch (error) {
        console.log('Error al verificar token en _layout:', error);
        await secureStore.deleteItemAsync('token');
        setToken(null);
      }
    } else {
      setToken(null);
    }
  };

  useEffect(() => {
    checkTokenValidity();
    
    // Verificar el token cada 30 segundos
    const interval = setInterval(checkTokenValidity, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    // si token es true, entonces renderiza la aplicación
    // si token es false, entonces redirige a la pantalla de login
    <>
      {token && client ? (
        <ApolloProvider client={client} >
          <NativeBaseProvider theme={theme}>
            <ThemeProvider value={DarkTheme}>
              <Inicio/>
              <StatusBar style="light" />
            </ThemeProvider>
          </NativeBaseProvider>
        </ApolloProvider>
      ) :
        (
          <ApolloProvider client={client} >
            <NativeBaseProvider theme={theme}>
              <ThemeProvider value={DarkTheme}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="light" />
              </ThemeProvider>
            </NativeBaseProvider>
          </ApolloProvider>
        )
      }
    </>
  );
}
