import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StyleSheet, View } from 'react-native';
import MapView, {
    Region,
} from 'react-native-maps';

type AddressMapProps = {
  latitude: number;
  longitude: number;
  onLocationChange: (latitude: number, longitude: number) => void;
};

export function AddressMap({
  latitude,
  longitude,
  onLocationChange,
}: AddressMapProps) {
  function handleRegionChangeComplete(region: Region) {
    onLocationChange(
      region.latitude,
      region.longitude
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0015,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
      />

      {/* Pino fixo no centro */}
      <View style={styles.marker}>
        <FontAwesome6
          name="location-dot"
          size={36}
          color="#F97316"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    overflow: 'hidden',
    borderRadius: 16,
  },

  map: {
    flex: 1,
  },

  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -36,
  },
});