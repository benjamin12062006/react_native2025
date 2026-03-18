import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';

interface Platillo {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  rating: number;
  tiempo: string;
}

const platillos: Platillo[] = [
  {
    id: '1',
    nombre: 'Tacos al Pastor',
    descripcion: 'Deliciosos tacos con carne al pastor, piña y cebolla morada',
    precio: 85,
    imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    categoria: 'Principales',
    rating: 4.8,
    tiempo: '15 min'
  },
  {
    id: '2',
    nombre: 'Quesadillas de Oaxaca',
    descripcion: 'Quesadillas artesanales con queso oaxaca derretido',
    precio: 65,
    imagen: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300&h=200&fit=crop',
    categoria: 'Entradas',
    rating: 4.6,
    tiempo: '10 min'
  },
  {
    id: '3',
    nombre: 'Enchiladas Verdes',
    descripcion: 'Enchiladas bañadas en salsa verde con pollo deshebrado',
    precio: 120,
    imagen: 'https://images.unsplash.com/photo-1599974681879-9350cd6e9c03?w=300&h=200&fit=crop',
    categoria: 'Principales',
    rating: 4.9,
    tiempo: '20 min'
  },
  {
    id: '4',
    nombre: 'Pozole Rojo',
    descripcion: 'Tradicional pozole rojo con carne de cerdo y garnachas',
    precio: 150,
    imagen: 'https://images.unsplash.com/photo-1621997967351-39b59b2c55e8?w=300&h=200&fit=crop',
    categoria: 'Principales',
    rating: 4.7,
    tiempo: '25 min'
  }
];

export default function MenuList() {
  const estilos = useEstilosGlobales();

  const handleSelectPlatillo = (platillo: Platillo) => {
    router.push({
      pathname: "/(tabs)/detalle/[id]",
      params: {
        id: platillo.id,
        nombre: platillo.nombre,
        descripcion: platillo.descripcion,
        precio: platillo.precio.toString(),
        imagen: platillo.imagen,
        rating: platillo.rating.toString(),
        tiempo: platillo.tiempo
      }
    });
  };

  return (
    <VStack className={`${estilos.containerPrincipal} bg-slate-50`}>
      <ScrollView className="px-4 pt-4">
        <VStack className="space-y-6">
          <Text className="text-3xl font-bold text-slate-800 text-center">
            Nuestro Menú
          </Text>
          
          {platillos.map((platillo) => (
            <TouchableOpacity
              key={platillo.id}
              onPress={() => handleSelectPlatillo(platillo)}
              className="transition-transform duration-200 active:scale-95"
            >
              <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200">
                <VStack className="space-y-0">
                  <Image
                    source={{ uri: platillo.imagen }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                  
                  <VStack className="p-4 space-y-3">
                    <HStack className="justify-between items-start">
                      <VStack className="flex-1 mr-3">
                        <Text className="text-xl font-bold text-slate-800">
                          {platillo.nombre}
                        </Text>
                        <Text className="text-sm text-slate-600 leading-5 mt-1">
                          {platillo.descripcion}
                        </Text>
                      </VStack>
                      
                      <VStack className="items-end">
                        <Text className="text-2xl font-bold text-green-600">
                          ${platillo.precio}
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <HStack className="justify-between items-center pt-2 border-t border-slate-100">
                      <HStack className="items-center space-x-4">
                        <HStack className="items-center space-x-1">
                          <IconSymbol size={16} name="star.fill" color="#F59E0B" />
                          <Text className="text-sm font-medium text-slate-700">
                            {platillo.rating}
                          </Text>
                        </HStack>
                        
                        <HStack className="items-center space-x-1">
                          <IconSymbol size={16} name="clock" color="#64748B" />
                          <Text className="text-sm text-slate-600">
                            {platillo.tiempo}
                          </Text>
                        </HStack>
                      </HStack>
                      
                      <Text className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                        {platillo.categoria}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Card>
            </TouchableOpacity>
          ))}
        </VStack>
        
        <VStack className="h-20" />
      </ScrollView>
    </VStack>
  );
}
