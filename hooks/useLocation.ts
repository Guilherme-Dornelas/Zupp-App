import * as Location from 'expo-location';
import { useState } from 'react';

// Função auxiliar para escolher o melhor endereço dentre os retornados.
function selectBestAddress(
  addresses: Location.LocationGeocodedAddress[]
): Location.LocationGeocodedAddress | null {
  if (addresses.length === 0) return null;

  if (addresses.length === 1) return addresses[0];

  const scoredAddresses = addresses.map((addr, index) => {
    let score = 0;

    // Priorizamos endereços que possuem mais informações.
    if (addr.street) score += 10;
    if (addr.streetNumber) score += 20;
    if (addr.district) score += 15;
    if (addr.city) score += 10;
    if (addr.postalCode) score += 5;
    if (addr.name) score += 5;

    // Penaliza resultados muito genéricos.
    if (addr.street?.includes('Unknown')) score -= 50;
    if (addr.district?.includes('Unknown')) score -= 30;

    // Pequena preferência pelo primeiro resultado quando ele já é completo.
    if (index === 0 && score > 40) score += 5;

    return {
      address: addr,
      score,
      index,
    };
  });

  scoredAddresses.sort((a, b) => b.score - a.score);

  return scoredAddresses[0].address;
}

export function useLocation() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);

  const [loading, setLoading] = useState(false);

  /**
   * Recebe latitude e longitude e transforma a coordenada
   * em um endereço utilizando o reverse geocoding do Expo.
   *
   * Essa função será utilizada tanto:
   *
   * 1. Pela localização automática do aparelho.
   * 2. Pelo ponto escolhido pelo usuário no mapa.
   */
  async function reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<Location.LocationGeocodedAddress | null> {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses.length === 0) {
        console.warn(
          '⚠️ Nenhum endereço encontrado para esta coordenada.'
        );

        return null;
      }

      console.log(
        `📍 ${addresses.length} endereço(s) retornado(s)`
      );

      addresses.forEach((addr, index) => {
        console.log(
          `[${index}]`,
          {
            street: addr.street,
            streetNumber: addr.streetNumber,
            district: addr.district,
            city: addr.city,
            region: addr.region,
            postalCode: addr.postalCode,
          }
        );
      });

      const bestAddress = selectBestAddress(addresses);

      console.log('✅ Melhor endereço:', {
        street: bestAddress?.street,
        streetNumber: bestAddress?.streetNumber,
        district: bestAddress?.district,
        city: bestAddress?.city,
        region: bestAddress?.region,
        postalCode: bestAddress?.postalCode,
      });

      return bestAddress;
    } catch (error) {
      console.error(
        '❌ Erro no reverse geocoding:',
        error
      );

      return null;
    }
  }

  /**
   * Obtém a localização atual do aparelho.
   */
  async function getLocation() {
    try {
      setLoading(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        throw new Error('Permissão de localização negada.');
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 0,
        });

      console.log('📍 GPS obtido:', {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy,
      });

      const currentAddress = await reverseGeocode(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );

      setLocation(currentLocation);
      setAddress(currentAddress);

      return {
        location: currentLocation,
        address: currentAddress,
      };
    } finally {
      setLoading(false);
    }
  }

  /**
   * Atualiza a localização a partir de uma coordenada
   * escolhida pelo usuário no mapa.
   *
   * O mapa fornece:
   *
   * latitude
   * longitude
   *
   * A partir disso fazemos novamente o reverse geocoding.
   */
  async function updateLocationFromMap(
    latitude: number,
    longitude: number
  ) {
    try {
      setLoading(true);

      console.log('🗺️ Nova localização selecionada no mapa:', {
        latitude,
        longitude,
      });

      // Atualiza apenas as coordenadas mantendo os demais
      // dados da localização anterior.
      setLocation((currentLocation) => {
        if (!currentLocation) {
          return null;
        }

        return {
          ...currentLocation,
          coords: {
            ...currentLocation.coords,
            latitude,
            longitude,
          },
        };
      });

      // Busca novamente o endereço para a nova coordenada.
      const newAddress = await reverseGeocode(
        latitude,
        longitude
      );

      // Atualiza o endereço.
      setAddress(newAddress);

      return {
        latitude,
        longitude,
        address: newAddress,
      };
    } catch (error) {
      console.error(
        '❌ Erro ao atualizar localização pelo mapa:',
        error
      );

      return {
        latitude,
        longitude,
        address: null,
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    location,
    address,
    loading,
    getLocation,
    updateLocationFromMap,
  };
}