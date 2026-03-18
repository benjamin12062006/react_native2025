import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
              backgroundColor: '#25292e',
              height: Platform.OS === 'ios' ? 40 : undefined, // Reducir altura en iOS
            },
            headerTitleStyle: {
              fontSize: 16, // Reducir tamaño del texto del header
              lineHeight: Platform.OS === 'ios' ? 20 : undefined, // Ajustar línea en iOS
              marginTop: Platform.OS === 'ios' ? -10 : 0, // Subir el texto en iOS
              color: '#FFFFFF', // Cambiar el color del texto a blanco
            },
            headerTitleContainerStyle: {
              paddingBottom: Platform.OS === 'ios' ? 8 : 0, // Ajuste adicional para iOS
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
              backgroundColor: '#25292e',
            },
        }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About', // Cambiar el título mostrado en el encabezado
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={20}/>
          ),
        }}
      />


    </Tabs>
    
  );
}
