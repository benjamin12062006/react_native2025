import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { formStyles, colors } from '@/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button as ButtonPaper, Paragraph, Dialog, Portal } from "react-native-paper";
import axios from 'axios';

export default function NuevoCliente() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [visible, setVisible] = useState(false);

  interface Cliente {
    nombre: string;
    telefono: string;
    email: string;
    empresa: string;
    [key: string]: string;
  }

  const router = useRouter();

  const handleSubmit = async () => {

    if (nombre === '' || telefono === '' || email === '' || empresa === '') {
      setVisible(true);
      return;
    }

    const client : Cliente  = {nombre, telefono, email, empresa};
    console.log('Cliente a guardar:', client);
    
    setEmail('');
    setNombre('');
    setTelefono('');
    setEmpresa('');
    router.back();

    // try{
    //   // Reemplazar localhost por la IP de tu computadora
    //   await axios.post('http://localhost:4000/clientes', client)
    //   // router.back(); // Navegar de vuelta después de guardar exitosamente
    // }catch (error) {
    //   console.error('Error al guardar el cliente:', error);
    //   setVisible(true); // Mostrar diálogo de error
    // }
  };

  return (
    <View style={formStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={formStyles.scrollView}>
        <Text style={formStyles.title}>Añadir Nuevo Cliente</Text>
        
        <View style={formStyles.campo}>
          <Text style={formStyles.label}>Nombre:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Nombre del cliente"
            placeholderTextColor={colors.textSecondary}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={formStyles.campo}>
          <Text style={formStyles.label}>Teléfono:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Teléfono del cliente"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>

        <View style={formStyles.campo}>
          <Text style={formStyles.label}>Correo:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Email del cliente"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={formStyles.campo}>
          <Text style={formStyles.label}>Empresa:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Empresa del cliente"
            placeholderTextColor={colors.textSecondary}
            value={empresa}
            onChangeText={setEmpresa}
          />
        </View>

        <TouchableOpacity 
          style={formStyles.button}
          onPress={handleSubmit}
        >
          <Text style={formStyles.buttonText}>Guardar Cliente</Text>
        </TouchableOpacity>

        <Portal>
            <Dialog 
            visible={visible} 

            >
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Por favor, completa todos los campos.</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <ButtonPaper onPress={() => setVisible(false)}>Cerrar</ButtonPaper>
              </Dialog.Actions>
            </Dialog>
        </Portal>



        <ButtonPaper            
          onPress={() => router.back()}
          style={{
            backgroundColor: colors.primary,
          }}
          labelStyle={{
            color: colors.textPrimary
          }}
          icon={'arrow-back'}
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          Volver
        </ButtonPaper>
        <ButtonPaper
          onPress={()=> router.push('/views/Inicio')}
          labelStyle={{
            color: colors.backgroundTertiary
          }}
          style={{backgroundColor: colors.success}}
          icon={'pencil-circle'}
          mode='contained'
          >
            Volver a Inicio
          </ButtonPaper>


      </ScrollView>
    </View>
  );
}
