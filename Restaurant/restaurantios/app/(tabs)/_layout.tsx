import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,// Ocultar el header en las pestañas
      tabBarStyle: Platform.select({
        ios: {
        position: 'absolute',
        },
        default: {},
      }),
      }}
    >
      <Tabs.Screen
      name="index"
      options={{
        title: 'Inicio',
        headerShown: false, // Mostrar el header en la pantalla de inicio
        headerTitle: 'Mi Restaurante',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
      }}
      />
      <Tabs.Screen
      name="DetallePlatillo"
      options={{ 
        title: 'Detalle',
        headerShown: false,
        headerTitle: 'Detalle del Platillo',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.circle" color={color} />,
      }}
      />
      <Tabs.Screen
      name="FormularioPlatillo"
      options={{
        title: 'Pedido',
        headerShown: true,
        headerTitle: 'Realizar Pedido',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil" color={color} />,
        headerStyle: {
        backgroundColor: '#0f172a',
        },
        headerTintColor: '#ffffff',
      }}
      />
    </Tabs>
  );
}
