import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { DeviceContext } from './_layout';
import { Provider as PaperProvaider } from 'react-native-paper';

export default function Index() {
  const router = useRouter();
  const { setClientes, setTodosClientes } = useContext(DeviceContext);

  useEffect(() => {
    const obtenerClientes = async () => {
      // try{
      //   const resultado = await fetch('http://localhost:4000/clientes');
      //   const data = await resultado.json();
      //   console.log('Clientes obtenidos:', data);
      // }catch (error) {
      //   console.error('Error al obtener clientes:', error);
      // }

      // Crear 4 clientes de ejemplo (1 principal + 3 adicionales)
      const clientePrincipal = {
        id: '1',
        nombre: 'Cliente Principal',
        telefono: '123-456-7890',
        email: 'principal@empresa.com',
        empresa: 'Empresa Ejemplo'
      };
      
      // Lista con múltiples clientes
      const listaClientes = [
        clientePrincipal,
        {
          id: '2',
          nombre: 'Ana García',
          telefono: '612-345-6789',
          email: 'ana.garcia@email.com',
          empresa: 'Diseño Web SL'
        },
        {
          id: '3',
          nombre: 'Luis Rodríguez',
          telefono: '623-456-7890',
          email: 'luis.rodriguez@email.com',
          empresa: 'Consultora Digital'
        },
        {
          id: '4',
          nombre: 'Elena Martínez',
          telefono: '634-567-8901',
          email: 'elena.martinez@email.com',
          empresa: 'Software Solutions'
        }
      ];

      console.log('Obteniendo lista de clientes');

      // Establecer el cliente principal
      setClientes(clientePrincipal); 
      
      // Establecer la lista completa de clientes
      setTodosClientes(listaClientes);
      
      console.log('Clientes cargados en el contexto:', listaClientes.length);
    }
    
    obtenerClientes();
  }, []);

  // Función para navegar a la pantalla de inicio
  const navigateToInicio = () => {
    router.push('/views/Inicio');
  };

  return (
    <>
      {/* <PaperProvaider>      
      </PaperProvaider>   */}
      <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la Aplicación</Text>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={navigateToInicio}
            >
              <Text style={styles.buttonText}>Ir a Inicio</Text>
            </TouchableOpacity>
            
            <View style={styles.linksContainer}>
              <Text style={styles.linksTitle}>O usa este enlace:</Text>
              <Link href="/views/Inicio" style={styles.link}>
                <Text style={styles.linkText}>Inicio</Text>
              </Link>
              </View>
          </View>  
    </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25292e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linksTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    marginVertical: 8,
  },
  linkText: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});

