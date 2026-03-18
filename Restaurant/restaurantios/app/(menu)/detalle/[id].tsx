import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView } from 'react-native';

export default function DetalleMenuScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const estilos = useEstilosGlobales();
  
  const { nombre, descripcion, precio, imagen, rating, tiempo } = params;

  const handleOrdenar = () => {
    navigation.navigate('(tabs)' as never, {
      screen: 'FormularioPlatillo',
      params: { nombre, precio }
    });
  };

  return (
    <VStack className={`${estilos.containerPrincipal} bg-slate-50`}>
      <ScrollView>
        <VStack className="space-y-0">
          <VStack className="relative">
            <Image
              source={{ uri: imagen as string }}
              className="w-full h-80"
              resizeMode="cover"
            />
          </VStack>

          <VStack className="px-6 -mt-6 relative z-10 space-y-4">
            <Card className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
              <VStack className="space-y-4">
                <VStack className="space-y-2">
                  <Text className="text-3xl font-bold text-slate-800">
                    {nombre}
                  </Text>
                  <Text className="text-lg text-slate-600 leading-6">
                    {descripcion}
                  </Text>
                </VStack>

                <HStack className="justify-between items-center pt-4 border-t border-slate-100">
                  <VStack>
                    <Text className="text-sm text-slate-500 uppercase tracking-wide">
                      Precio
                    </Text>
                    <Text className="text-4xl font-bold text-green-600">
                      ${precio}
                    </Text>
                  </VStack>
                  
                  <VStack className="items-end space-y-2">
                    <HStack className="items-center space-x-1">
                      <IconSymbol size={18} name="star.fill" color="#F59E0B" />
                      <Text className="text-lg font-medium text-slate-700">
                        {rating}
                      </Text>
                    </HStack>
                    <Text className="text-xs text-slate-500">248 reseñas</Text>
                  </VStack>
                </HStack>
              </VStack>
            </Card>
          </VStack>
        </VStack>
      </ScrollView>

      <VStack className="px-6 py-4 bg-white border-t border-slate-200 shadow-lg">
        <Button
          onPress={handleOrdenar}
          className="bg-slate-800 hover:bg-slate-700 active:bg-slate-900 rounded-xl py-4 shadow-lg"
        >
          <HStack className="items-center space-x-2">
            <IconSymbol size={20} name="cart.badge.plus" color="#FFFFFF" />
            <ButtonText className="text-white font-bold text-lg">
              Ordenar ahora • ${precio}
            </ButtonText>
          </HStack>
        </Button>
      </VStack>
    </VStack>
  );
}
