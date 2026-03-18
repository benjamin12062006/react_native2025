import { Stack } from 'expo-router';
import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppTheme, defaultTheme } from '@/styles/colors';
import Barra from '@/components/ui/Barra';

interface DeviceInfo {
  id: string;
  model: string;
  os: string;
  version: string;
  // Add other device properties as needed
}
interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  empresa: string;
  [key: string]: string;
}
interface DeviceContextType {
  deviceInfo: DeviceInfo | null;
  setDeviceInfo: Dispatch<SetStateAction<DeviceInfo | null>>;
  // Add other properties as needed
  theme: AppTheme;
  setTheme: Dispatch<SetStateAction<AppTheme>>;
  clientes: {} | Cliente | null;
  setClientes: Dispatch<SetStateAction<{} | Cliente | null>>;
  todosClientes: Cliente[];
  setTodosClientes: Dispatch<SetStateAction<Cliente[]>>;
  // // {
  //   Dispatch: Es un tipo genérico de React que representa una función que maneja acciones para actualizar el estado
  //   SetStateAction<{} | null>: Define qué tipo de datos puede recibir la función setClientes    
  // // }
}

export const DeviceContext = createContext<DeviceContextType>({
  deviceInfo: null,       // Almacena información sobre el dispositivo del usuario
  setDeviceInfo: () => {}, // Función para actualizar la información del dispositivo
  theme: defaultTheme,    // Tema actual aplicado en la aplicación
  setTheme: () => {},     // Función para cambiar el tema de la aplicación
  // para almacena los id de los clientes
  clientes: null,
  setClientes: () => {},  // Función para actualizar la lista de clientes
  todosClientes: [],      // Lista completa de clientes
  setTodosClientes: () => {}, // Función para actualizar la lista completa de clientes
});

export default function RootLayout() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [theme, setTheme] = useState<AppTheme>(defaultTheme);
  const [clientes, setClientes] = useState<{} | Cliente | null>(null);
  const [todosClientes, setTodosClientes] = useState<Cliente[]>([]);

  return (
    <PaperProvider>
      <DeviceContext.Provider value={{ 
        deviceInfo, 
        setDeviceInfo, 
        theme, 
        setTheme, 
        clientes, 
        setClientes, 
        todosClientes, 
        setTodosClientes 
      }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,         
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{  
              headerShown: false,
              headerAccessibilityLabel: "Panel de navegación principal",
            }} 
          />
          <Stack.Screen 
            name='views/Inicio'
            options={{ 
              headerTitle: 'Inicio',
              headerRight: () => <Barra />,
              headerTitleStyle: {
                fontSize: 16,
                color: '#FFD700',
              },
            }}
          />
          <Stack.Screen 
            name='views/NuevoCliente'
            options={{ 
              headerTitle: 'Añadir Cliente',
              headerTitleStyle: {
                fontSize: 16,
                color: '#FFD700',
              },
            }}
          />
          <Stack.Screen 
            name='views/DetallesCliente'
            options={{ 
              headerTitle: 'Detalles Cliente',
              headerTitleStyle: {
                fontSize: 16,
                color: '#FFD700',
              },
            }}
          />
        </Stack>
      </DeviceContext.Provider>
    </PaperProvider>
  );
}