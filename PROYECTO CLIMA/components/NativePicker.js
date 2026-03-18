import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const NativePicker = ({ selectedValue, onValueChange, items }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectItem = (item) => {
    onValueChange(item.value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {items.find(item => item.value === selectedValue)?.label || '- Seleccione -'}
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectItem(item)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    justifyContent: 'center',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor:'#FFF'
  },
  pickerText: {
    fontSize: 16,
    color:'#000',
    textAlign:'center'

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
    color:'#000'
  },
  modalClose: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseText: {
    color:'#fff',
    fontSize: 16,
  },
});

export default NativePicker;
