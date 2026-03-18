import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image
              style={styles.banner}
              source={require('./assets/img/bg.jpg')}
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Qué hacer en París</Text>
            <ScrollView horizontal style={styles.scrollView}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.activityImage}
                  source={require('./assets/img/actividad1.jpg')}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.activityImage}
                  source={require('./assets/img/actividad2.jpg')}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.activityImage}
                  source={require('./assets/img/actividad3.jpg')}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.activityImage}
                  source={require('./assets/img/actividad4.jpg')}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.activityImage}
                  source={require('./assets/img/actividad5.jpg')}
                />
              </View>
            </ScrollView>    
          </View>

          <View style={styles.contentContainer}>
          <Text style={styles.titulo}>Los mejores Alojamientos</Text>
          <View>
              <View>
                  <Image
                      style={styles.mejores}
                      source={require('./assets/img/mejores1.jpg')}
                   />
              </View>
              <View>
                  <Image
                      style={styles.mejores}
                      source={require('./assets/img/mejores2.jpg')}
                   />
              </View>
              <View>
                  <Image
                      style={styles.mejores}
                      source={require('./assets/img/mejores3.jpg')}
                   />
              </View>
          </View>

          </View>

          <Text style={styles.titulo}> Hospedajes en los Angeles</Text>
          <View
            style={styles.listado}
          >
              <View style={styles.listadoItem}>
                    <Image
                        style={styles.mejores}
                        source={require('./assets/img/hospedaje1.jpg')}
                    />
              </View>
              <View style={styles.listadoItem}>
                    <Image
                        style={styles.mejores}
                        source={require('./assets/img/hospedaje2.jpg')}
                    />
              </View>
              <View style={styles.listadoItem}>
                    <Image
                        style={styles.mejores}
                        source={require('./assets/img/hospedaje3.jpg')}
                    />
              </View>
              <View style={styles.listadoItem}>
                    <Image
                        style={styles.mejores}
                        source={require('./assets/img/hospedaje4.jpg')}
                    />
              </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  banner: {
    height: 250,
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
  },
  scrollView: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
  },
  activityImage: {
    height: 250,
    width: 200,
  },
  mejores:{
    width:'100%',
    height: 200,
    marginVertical:5
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
    color:'#FFF'
  },
  listado:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between'
  },
  listadoItem:{
    flexBasis:'49%'
  }

});

export default App;
