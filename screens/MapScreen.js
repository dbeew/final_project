import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  return(
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.736717, // ตัวอย่างพิกัดกรุงเทพฯ
          longitude: 100.523186,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* ตัวอย่าง Marker */}
        <Marker
          coordinate={{
            latitude: 13.736717,
            longitude: 100.523186,
          }}
          title="ตัวอย่างโรคพืช"
          description="ข้อมูลเกี่ยวกับโรคพืชที่สแกนแล้ว"
        />
      </MapView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;