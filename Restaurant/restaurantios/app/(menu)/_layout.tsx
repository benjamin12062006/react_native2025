import { IconSymbol } from '@/components/ui/IconSymbol';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';

export default function MenuLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f172a', // slate-900
          height: Platform.OS === 'ios' ? 90 : 56,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#FFD700', // Dorado como en tu ejemplo
          lineHeight: Platform.OS === 'ios' ? 22 : undefined,
          marginTop: Platform.OS === 'ios' ? -5 : 0,
        },
        headerTitleContainerStyle: {
          paddingBottom: Platform.OS === 'ios' ? 8 : 0,
        },
        headerShadowVisible: true,
        animation: 'slide_from_right',
        headerBackTitleVisible: false,
      }}
    >
      
         <Stack.Screen 
        name="progresoPedido"
        options={{
          title: 'Progreso del Pedido',
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={{ 
                marginLeft: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="arrow.left" color="#FFD700" />
            </Pressable>
          ),
          // headerRight: () => (
          //   <Pressable 
          //     onPress={() => router.push('/(menu)/categorias')}
          //     style={{ 
          //       marginRight: Platform.OS === 'ios' ? 15 : 10,
          //       padding: 8,
          //       borderRadius: 20,
          //       backgroundColor: 'rgba(255, 211, 0, 0.1)'
          //     }}
          //   >
          //     <IconSymbol size={24} name="line.3.horizontal.decrease" color="#FFD700" />
          //   </Pressable>
          // ),
          headerAccessibilityLabel: "Progreso del Pedido",
        }}
      />


      <Stack.Screen 
        name="home"
        options={{
          title: 'Nuestro Menú',
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={{ 
                marginLeft: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="arrow.left" color="#FFD700" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable 
              onPress={() => router.push('/(menu)/categorias')}
              style={{ 
                marginRight: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="line.3.horizontal.decrease" color="#FFD700" />
            </Pressable>
          ),
          headerAccessibilityLabel: "Menú principal del restaurante",
        }}
      />
      
      <Stack.Screen 
        name="detalle/[id]"
        options={{
          title: 'Detalle del Platillo',
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={{ 
                marginLeft: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="arrow.left" color="#FFD700" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable 
              onPress={() => {
                console.log('Agregar a favoritos');
              }}
              style={{ 
                marginRight: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="heart" color="#FFD700" />
            </Pressable>
          ),
          headerAccessibilityLabel: "Detalle y opciones del platillo",
        }}
      />

      <Stack.Screen 
        name="categorias"
        options={{
          title: 'Categorías',
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={{ 
                marginLeft: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="arrow.left" color="#FFD700" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable 
              onPress={() => router.push('/(menu)/home')}
              style={{ 
                marginRight: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="house" color="#FFD700" />
            </Pressable>
          ),
          headerAccessibilityLabel: "Categorías de platillos",
        }}
      />

      <Stack.Screen 
        name="carritoPedido"
        options={{
          title: 'Carrito de Pedidos',
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={{ 
                marginLeft: Platform.OS === 'ios' ? 15 : 10,
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 211, 0, 0.1)'
              }}
            >
              <IconSymbol size={24} name="arrow.left" color="#FFD700" />
            </Pressable>
          ),
          headerAccessibilityLabel: "Carrito de compras",
        }}
      />
    </Stack>


  );
}
