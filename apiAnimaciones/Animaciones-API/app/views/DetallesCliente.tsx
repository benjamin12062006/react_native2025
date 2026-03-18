import { View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeviceContext } from '../_layout';
import { List, Avatar, Divider, FAB } from 'react-native-paper';

interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  empresa: string;
  [key: string]: string;
}

export default function DetallesCliente() {
  const { clientes, todosClientes } = useContext(DeviceContext);
  const { id } = clientes as Cliente;
  // const params = useLocalSearchParams();

  const router = useRouter();
  
  // Ejemplo de datos de cliente (normalmente vendría de una API o base de datos)
  const [cliente, setCliente] = useState(clientes as Cliente || null);
  const [listaClientes, setListaClientes] = useState<Cliente[]>(todosClientes || []);

  useEffect(() => {
    // Aquí podrías hacer una llamada a la API para obtener los detalles del cliente con el ID
    if (todosClientes && todosClientes.length > 0) {
      setListaClientes(todosClientes);
    }
  }, [todosClientes]);

  const handleEdit = () => {
    // Navegar a editar cliente
    router.push({
      pathname: '/views/NuevoCliente',
      params: { id }
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Cliente',
      '¿Estás seguro de que deseas eliminar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            // Lógica para eliminar cliente
            console.log('Eliminando cliente con ID:', id);
            router.back();
          } 
        }
      ]
    );
  };

  const selectCliente = (selectedCliente: Cliente) => {
    setCliente(selectedCliente);
    // También podrías actualizar el contexto aquí si es necesario
  };
  
  // Si no hay cliente aún, mostramos un mensaje de carga
  if (!cliente) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles del Cliente</Text>
      
      <View style={styles.card}>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{cliente.nombre}</Text>
        </View>
        
        <View style={styles.campo}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{cliente.telefono}</Text>
        </View>
        
        <View style={styles.campo}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.valor}>{cliente.email}</Text>
        </View>
        
        <View style={styles.campo}>
          <Text style={styles.label}>Empresa:</Text>
          <Text style={styles.valor}>{cliente.empresa}</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={handleEdit}
        >
          <Ionicons name="pencil" size={20} color="#25292e" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={20} color="#ffffff" />
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de todos los clientes */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Todos los Clientes</Text>
        
        <List.Section>
          {listaClientes.map((clienteItem) => (
            <View key={clienteItem.id}>
              <List.Item
                title={clienteItem.nombre}
                description={clienteItem.empresa}
                left={props => <Avatar.Text {...props} size={40} label={clienteItem.nombre.substring(0, 2)} />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => selectCliente(clienteItem)}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                style={cliente.id === clienteItem.id ? styles.selectedItem : styles.listItem}
              />
              <Divider />
            </View>
          ))}
        </List.Section>
        
      </View>
      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        label="Agregar Cliente"
        onPress={() => router.push('/views/NuevoCliente')}
        color="#fff"
        theme={{ colors: { accent: '#ffd33d' } }}
      ></FAB>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2c3035',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  campo: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3f46',
    paddingBottom: 15,
  },
  label: {
    color: '#ffd33d',
    fontSize: 14,
    marginBottom: 5,
  },
  valor: {
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#ffd33d',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  deleteButtonText: {
    color: '#ffffff',
  },
  // Estilos para la lista
  listContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  listItem: {
    backgroundColor: '#2c3035',
    marginVertical: 2,
  },
  selectedItem: {
    backgroundColor: '#3a3f46',
    marginVertical: 2,
  },
  listItemTitle: {
    color: '#fff',
  },
  listItemDescription: {
    color: '#aaa',
  }
});
