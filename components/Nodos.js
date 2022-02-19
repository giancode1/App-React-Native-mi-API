import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";

const Nodos = ({ nodes, getData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [configuraciones, setConfiguraciones] = React.useState("");
  const [selectedId, setSelectedId] = useState(null);

  const reaccionaModal = (id, visible) => {
    setSelectedId(id);
    setModalVisible(visible);
  };

  const enviar = async (payload, sensorId) => {
    let a;
    try {
      a = JSON.parse(`{  ${payload}  }`);
      const response = await fetch(`${url}/sensors/${sensorId}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(a),
      });
      // const rp = await response.json();
      if (response.status === 200) {
        Alert.alert("Enviado correctamente");
      } else {
        Alert.alert("Error al enviar");
      }
      setConfiguraciones("");
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error);
      Alert.alert("Datos incorrectos");
    }
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <FlatList
        data={nodes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>Nombre: {item.name}</Text>
            <FlatList
              data={item.sensors}
              keyExtractor={(item) => item._id}
              extraData={selectedId}
              renderItem={({ item }) => (
                <View>
                  <Text> Sensor: {item.name}</Text>
                  <View style={styles.fixToText}>
                    <Button
                      title="ver id"
                      onPress={() => Alert.alert(`${item._id}`)}
                    />
                    <Button
                      title="Mostrar datos"
                      onPress={() => getData(`${item._id}`)}
                    />
                  </View>

                  {/* boton configurar, abre modal */}
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    // onPress={() => setModalVisible(true)}
                    onPress={() => reaccionaModal(item._id, true)}
                    // onPress={() => Alert.alert(`${item._id}`)}
                  >
                    <Text style={styles.textStyle}>Configurar</Text>
                  </Pressable>

                  <Modal            ///////////////////////////////////
                    animationType="slide"
                    transparent={true}
                    visible={(modalVisible && item._id === selectedId)}
                    //dar id a un modal:
                    id={item._id}

                    // onRequestClose={() => {
                    //   Alert.alert('Modal has been closed.');
                    //   setModalVisible(!modalVisible);
                    // }}
                  >

                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                          {/* <Text>sensorId: {item._id}</Text> */}
                        <Text style={styles.modalText}>
                          Ingrese parámetros: 
                        </Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={setConfiguraciones}
                          value={configuraciones}
                        />

                        <Pressable
                          style={[styles.button, styles.botonCancelar]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Cancelar</Text>
                        </Pressable>

                        <Pressable
                          style={[styles.button, styles.botonEnviar]}
                          onPress={() => enviar(configuraciones, item._id)}
                        >
                          <Text style={styles.textStyle}>Enviar</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </View>
              )}
            />
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  /////////////////////modal:////////////////
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
    backgroundColor: "#28B463",
  },
  botonCancelar: {
    backgroundColor: "#dc143c",
  },
  botonEnviar: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 80,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Nodos;
