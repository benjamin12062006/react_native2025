import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useEstilosGlobales from '@/hooks/miPropioEstilosGlobales';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

const categorias = [
  { id: 'entradas', nombre: 'Entradas', icono: 'leaf', color: '#10B981', descripcion: 'Aperitivos y entradas' },
  { id: 'principales', nombre: 'Platos Principales', icono: 'fork.knife', color: '#3B82F6', descripcion: 'Platos fuertes' },
  { id: 'postres', nombre: 'Postres', icono: 'birthday.cake', color: '#F59E0B', descripcion: 'Dulces y postres' },
  { id: 'bebidas', nombre: 'Bebidas', icono: 'cup.and.saucer', color: '#8B5CF6', descripcion: 'Refrescos y bebidas' },
];

export default function CategoriasScreen() {
  const estilos = useEstilosGlobales();

  const handleCategoriaPress = (categoriaId: string) => {
    router.push(`/(menu)/home?categoria=${categoriaId}`);
  };

  return (
    <VStack className={`${estilos.containerPrincipal} bg-slate-50`}>
      <ScrollView className="px-4 pt-6">
        <VStack className="space-y-4">
          <Text className="text-2xl font-bold text-slate-800 text-center mb-4">
            Explora por Categorías
          </Text>
          
          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              onPress={() => handleCategoriaPress(categoria.id)}
              className="transition-transform duration-200 active:scale-95"
            >
              <Card className="bg-white shadow-lg rounded-xl p-6 border border-slate-200">
                <HStack className="items-center space-x-4">
                  <VStack 
                    className="w-16 h-16 rounded-full items-center justify-center"
                    style={{ backgroundColor: categoria.color + '20' }}
                  >
                    <IconSymbol size={32} name={categoria.icono} color={categoria.color} />
                  </VStack>
                  
                  <VStack className="flex-1">
                    <Text className="text-xl font-bold text-slate-800">
                      {categoria.nombre}
                    </Text>
                    <Text className="text-sm text-slate-500">
                      {categoria.descripcion}
                    </Text>
                  </VStack>
                  
                  <IconSymbol size={20} name="chevron.right" color="#64748B" />
                </HStack>
              </Card>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
