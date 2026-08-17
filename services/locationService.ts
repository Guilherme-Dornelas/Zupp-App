import * as Location from 'expo-location';

export async function getCurrentLocation() {
  // Solicita permissão para usar a localização
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão de localização negada.');
  }

  // Obtém a localização atual
 const location = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.High,
});

const { latitude, longitude } = location.coords;

const addresses = await Location.reverseGeocodeAsync({
  latitude,
  longitude,
});

if (addresses.length > 0) {
  const address = addresses[0];

  console.log("📍 Endereço:", address);

  console.log("Rua:", address.street);
  console.log("Número:", address.streetNumber);
  console.log("Bairro:", address.district);
  console.log("Cidade:", address.city);
  console.log("Estado:", address.region);
  console.log("CEP:", address.postalCode);
}
}