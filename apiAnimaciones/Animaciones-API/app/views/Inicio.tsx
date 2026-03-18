import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useContext } from 'react';
import { DeviceContext } from '../_layout';
import Barra from '@/components/ui/Barra'; // Asegúrate de que la ruta sea correcta

export default function Inicio() {
  const router = useRouter();
  const { theme } = useContext(DeviceContext);

  // Función para navegar a Nuevo Cliente
  const navigateToNuevoCliente = () => {
    router.push('/views/NuevoCliente');
    // console.log('Tema actual:', theme);
  };

  // Función para navegar a Detalles Cliente (con un ID de ejemplo)
  const navigateToDetallesCliente = () => {
    router.push({
      pathname: '/views/DetallesCliente',
      params: { id: '1' }
    });
  };

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Panel de Control</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={navigateToNuevoCliente}
          >
            <Text style={styles.buttonText}>Nuevo Cliente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={navigateToDetallesCliente}
          >
            <Text style={styles.buttonText}>Ver Cliente</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.linksContainer}>
          <Text style={styles.linksTitle}>Enlaces rápidos:</Text>
          
          <Link href="/views/NuevoCliente" style={styles.link}>
            <Text style={styles.linkText}>Registrar Nuevo Cliente</Text>
          </Link>
          
          <Link 
            href={{
              pathname: '/views/DetallesCliente',
              params: { id: '1' }
            }} 
            style={styles.link}
          >
            <Text style={styles.linkText}>Ver Detalles del Cliente</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#3a3f46',
    paddingTop: 20,
  },
  linksTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  link: {
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    color: '#3498db',
    fontSize: 16,
  }
});
