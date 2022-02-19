import React, {useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {API_URL, API_TOKEN, API_USER_ID} from "@env"

import Tabla from "./components/Tabla";
import Nodos from "./components/Nodos";

export default function App() {
  const [name, setName] = useState("");
  const [nodes, setNodes] = useState([]);
  const [data, setData] = useState([]);

  const title = "Redes de sensores IoT";

  const url = API_URL;
  const token = API_TOKEN;
  const userId = API_USER_ID;

  console.log("url:", url);

  const getUserData = async (id) => {
    const response = await fetch(`${url}/users/${id}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const rp = await response.json();
    setName(rp.name);
    setNodes(rp.nodes);
    // console.log("rp:",rp);
    // console.log("rp.nodes:", nodes);
    // console.log("rp.nodes longitud:", nodes.length);
  }

  const getData = async (sensorId) => {
    const response = await fetch(`${url}/sensors/${sensorId}/data?limit=40`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const rp = await response.json();
    setData(rp);
}

  useEffect(() => {
    getUserData(userId);
  }, [])

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.containerUser}>
        <Text style={{fontWeight: 'bold',}}>Usuario: </Text>
        <Text>{name}</Text>
      </View>

      <View style={styles.containerNodos}>
        <Text style={styles.textoNodos}>Nodos : {nodes.length}</Text>
      </View>

      {nodes.length>0 ? <Nodos nodes={nodes} getData={getData} /> : null} 


      <View style={{backgroundColor: '#841584', height: 40, alignItems: 'center'}}>
        <Text style={{textAlign: 'center', color:  'white', textAlignVertical: 'center' }}>DATOS</Text>
      </View>

      <View style={styles.tablaContainer}>
        {data.length>0 && <Tabla data={data}  />}
      </View>
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff'
  },
  title:{
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },

  containerUser:{
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  containerNodos:{
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#1e90ff',
  },
  textoNodos: {
    textAlign: 'center',
    color: 'white',
  },
  tablaContainer:{
    // backgroundColor: 'blue',
    alignItems: 'center',
  },
});