import { HapticTab } from '@/components/expo/HapticTab';
import { IconSymbol } from '@/components/expo/ui/IconSymbol';
import TabBarBackground from '@/components/expo/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import NuevoProyecto from './nuevoProyecto';
import Proyecto from './Proyectos';
import ProyectoDetalle from './proyecto';
import * as secureStorage from 'expo-secure-store';


const Tab = createBottomTabNavigator();

export default function Inicio() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tab.Screen
          name="Proyectos"
          component={Proyecto}
          options={{
            title: 'Proyectos',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="briefcase.fill" color={color} />,
          }}
        />
        <Tab.Screen
          name="NuevoProyecto"
          component={NuevoProyecto}
          options={{
            title: 'Nuevo Proyecto',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
          }}
        />
        <Tab.Screen
          name="proyecto"
          component={ProyectoDetalle}
          options={{
            title: 'Proyecto',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
            tabBarButton: (props) => <HapticTab {...props} />, // usar HapticTab para el botón de proyecto
          }}
          />
          {/* btn para cerrar cesion y elimnar el token */}
        <Tab.Screen
          name="CerrarSesion"
          component={() => null} // Componente vacío, solo para manejar la acción
          options={{
            title: 'Cerrar Sesión',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="power" color={color} />,
            tabBarButton: (props) => (
              <HapticTab
                {...props}
                onPress={() => {
                  secureStorage.deleteItemAsync('token')
                    .then(()=>{
                      console.log('Token eliminado correctamente');
                      // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión o hacer otra acción                      

                    })
                    .catch((error) => {
                      console.error('Error al eliminar el token:', error);
                    });
                  
                }}
              />
            ),
          }}
        />

      </Tab.Navigator>
    </>
  );
}