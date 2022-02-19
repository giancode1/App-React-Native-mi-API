import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React from 'react'

const Tabla = ({data}) => {
  console.log("data:", data)
  let propiedades = Object.keys(data[0]).filter(key => key !== '_id' && key !== 'sensorId' && key !== 'updatedAt');
  
  //primera letra en mayuscula
  let propiedadesMayus = propiedades.map(prop => prop === 'createdAt' ? 'fecha' : prop);
  propiedadesMayus = propiedadesMayus.map(prop => prop.charAt(0).toUpperCase() + prop.slice(1));
  console.log("propiedades:", propiedades);


    return (
      // <Text>hola</Text>
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

      {/* Titulos */}
      <View style={styles.values}>
        <FlatList
          horizontal={true}
          data={propiedadesMayus}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
              <Text  style={styles.itemValue}> {item} </Text>
          )}
        />
      </View>
      
      {/* columnas de datos */}
      <FlatList 
          data={data}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => 
            <View style={styles.containerItem}>

              {propiedades.map(prop => 
                <Text style={styles.item}>{
                  prop === 'createdAt' ? new Date (item[prop]).toLocaleTimeString() : item[prop]
                  }
                </Text>
                )
              }
             </View>
          }
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  values:{
    flexDirection: 'row',
    paddingTop: 10,
    borderBottomWidth: .5,
  },
  containerItem: {
    backgroundColor: '#f8f8ff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: .5,
    paddingTop: 10,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  item:{
    width: 90 ,
    // borderWidth: 2,
    //backgroundColor: '#f8f8ff',
  },
  itemValue:{
    width: 90 ,
    fontWeight: 'bold',
    // borderWidth: 2,
  },
  scroll:{
    // paddingLeft: 12,
    flexDirection: 'column',
    paddingTop: 10,
    // backgroundColor: 'red',
  },
})

export default Tabla