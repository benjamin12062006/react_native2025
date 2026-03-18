import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import * as secureStorage from 'expo-secure-store';
// importar setContext
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  // Configurado para web - funciona desde navegador
  uri: 'https://f422-192-223-121-21.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Link para manejar errores de autenticación
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
      
      // Detectar token expirado o errores de autenticación
      if (
        message.includes('jwt expired') || 
        message.includes('invalid token') ||
        message.includes('No autenticado') ||
        message.includes('Token') ||
        extensions?.code === 'UNAUTHENTICATED'
      ) {
        console.log('Token expirado o inválido, eliminando...');
        // Eliminar token del secure storage
        secureStorage.deleteItemAsync('token').then(() => {
          console.log('Token eliminado del secure storage');
          // Recargar la app para mostrar login
          // En React Native puedes usar restart de react-native-restart
          // Por ahora solo logueamos
        });
      }
    });
  }
  
  if (networkError) {
    console.log(`Network error: ${networkError}`);
    
    // También verificar errores de red relacionados con autenticación
    if (networkError.statusCode === 401 || networkError.statusCode === 403) {
      console.log('Error 401/403: Token probablemente expirado');
      secureStorage.deleteItemAsync('token');
    }
  }
});

const authLink = setContext(async (_, { headers }) => {
  // Obtener el token de secure storage
  const token = await secureStorage.getItemAsync('token');
  console.log('Token obtenido desde secure storage:', token);
  
  // Verificar si el token ha expirado antes de enviarlo
  if (token) {
    try {
      // Decodificar el JWT para verificar expiración
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        console.log('Token expirado detectado, eliminando...');
        await secureStorage.deleteItemAsync('token');
        return { headers: { ...headers } }; // Sin token
      }
    } catch (error) {
      console.log('Error al decodificar token:', error);
      await secureStorage.deleteItemAsync('token');
      return { headers: { ...headers } };
    }
  }
  
  // Retornar los headers con el token
  return {
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;