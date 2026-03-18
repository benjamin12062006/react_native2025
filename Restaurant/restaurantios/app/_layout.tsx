import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

//importar el contexto de firebase
import { FirebaseProvider } from '@/context/firebase/FirebaseContext';
import { PedidosProvider } from '@/context/pedidos/PedidosContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  console.log('RootLayout rendering...');

  return (
    <GluestackUIProvider mode="dark" >
        <FirebaseProvider>
          <PedidosProvider>        
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen 
                  name="(tabs)" 
                  options={{ 
                    headerShown: false,
                    headerAccessibilityLabel: "Panel de navegación principal",
                  }} 
                />
                <Stack.Screen 
                  name="(menu)" 
                  options={{ 
                    headerShown: false, // El header se maneja en el layout interno
                  }} 
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </PedidosProvider>
        </FirebaseProvider>
      </GluestackUIProvider>
  );
}
