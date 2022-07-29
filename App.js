import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

import "./firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function App() {
  const [instructorLatitude, setInstructorLatitude] = useState(0);
  const [instructorLongitude, setInstructorLongitude] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "instructor_location", "1zgqpcjSN7nvIJgDsjqw"),
      (doc) => {
        console.log("Current data: ", doc.data());
        setInstructorLatitude(doc.data().location._lat);
        setInstructorLongitude(doc.data().location._long);
      }
    );

    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <View className="card">
        <Text>Instructor location</Text>
        <Text>{`Latitude: ${instructorLatitude}`}</Text>
        <Text>{`Longitude: ${instructorLongitude}`}</Text>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: instructorLatitude,
          longitude: instructorLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: instructorLatitude,
            longitude: instructorLongitude,
            title: "El instructo",
          }}
        />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
