import { AddressMap } from '@/components/addressMap';
import { useLocation } from '@/hooks/useLocation';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock de retorno de uma API de busca de endereços.
// Troque esta função pela chamada real à sua API (ex: Google Places, ViaCEP, etc).
const mockAddresses = [
  {
    id: '1',
    title: 'Avenida Presidente Vargas',
    subtitle: 'Ribeirão Preto, São Paulo - Brasil',
  },
  {
    id: '2',
    title: 'Avenida Presidente Vargas',
    subtitle: 'São Paulo, São Paulo - Brasil',
  },
  {
    id: '3',
    title: 'Avenida Presidente Vargas',
    subtitle: 'São José, São Paulo - Brasil',
  },
];

async function fetchAddressesFromApi(query: string) {
  // Aqui entraria o fetch/axios real para a API de geocoding.
  console.log('buscando endereços na API para:', query);

  if (!query) return [];

  return mockAddresses.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
}

export default function CadastroEndereco() {
  // const { location, address, loading: locationLoading, getLocation } = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof mockAddresses>([]);
  const [loading, setLoading] = useState(false);

  const isSearching = query.length > 0;

  async function handleChangeText(text: string) {
    setQuery(text);

    if (text.length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    const data = await fetchAddressesFromApi(text);
    setResults(data);
    setLoading(false);
  }

  function handleSelectAddress(item: (typeof mockAddresses)[number]) {
    console.log('endereço selecionado:', item);
  }

  async function handleGetLocation() {
    try {
      const result = await getLocation();

      if (result.location && result.address) {
        const fullAddress = `${result.address.street || 'N/A'} ${
          result.address.streetNumber || ''
        }, ${result.address.district || result.address.subregion || 'N/A'} - ${
          result.address.city || 'N/A'
        }, ${result.address.region || 'N/A'}`;

        console.log('✅ Endereço completo:', fullAddress);
        console.log('📍 Localização encontrada:', {
          latitude: result.location.coords.latitude,
          longitude: result.location.coords.longitude,
          accuracy: result.location.coords.accuracy,
          address: result.address,
        });
      } else if (result.location) {
        console.log('⚠️ Localização obtida, mas endereço não resolvido:', {
          latitude: result.location.coords.latitude,
          longitude: result.location.coords.longitude,
          accuracy: result.location.coords.accuracy,
        });
      }
    } catch (error) {
      console.error('❌ Erro ao obter localização:', error);
    }
  }

  const {
  location,
  address,
  loading: locationLoading,
  getLocation,
  updateLocationFromMap,
} = useLocation();

  const locationDetails = address
    ? [
       
        address.district || address.subregion || 'Bairro não informado',
        `${address.street || 'Rua não informada'}${
          address.streetNumber ? `, nº ${address.streetNumber}` : ', s/nº'
        }`,
      ]
    : location
      ? [
          `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`,
          `Precisão: ${location.coords.accuracy?.toFixed(1) || 'N/A'} metros`,
        ]
      : [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cadastre seu endereço</Text>
        <Text style={styles.subtitle}>
          Adicione um endereço para que possamos mostrar as lojas próximas
        </Text>
      </View>

      {/* Campo de busca */}
      <View style={[styles.searchContainer, isSearching && styles.searchContainerActive]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite seu endereço"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity onPress={() => console.log('buscar endereço pressionado')}>
          <Ionicons name="search" size={22} color={isSearching ? '#F97316' : '#000'} />
        </TouchableOpacity>
      </View>

      {/* Usar localização atual */}
      <TouchableOpacity
        style={styles.locationCard}
        onPress={handleGetLocation}
        disabled={locationLoading}
      >
        {locationLoading ? (
          <ActivityIndicator size="small" color="#F97316" style={styles.locationIcon} />
        ) : (
          <FontAwesome6 name="location-crosshairs" size={22} color="#000" style={styles.locationIcon} />
        )}
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationTitle}>Usar localização atual</Text>
          {locationDetails.length > 0 ? (
            <>
              {locationDetails.map((detail) => (
                <Text key={detail} style={styles.locationCurrentAddress}>
                  {detail}
                </Text>
              ))}
            </>
          ) : (
            <Text style={styles.locationSubtitle}>
              Clique aqui para permitir o app a encontrar restaurantes próximos.
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Lista de resultados da busca */}
      {isSearching && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          style={styles.resultsList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.emptyText}>Nenhum endereço encontrado</Text>
            ) : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelectAddress(item)}
            >
              <Ionicons name="location-outline" size={20} color="#9CA3AF" style={styles.resultIcon} />
              <View>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}



    {location && (
  <View style={styles.mapContainer}>
    <AddressMap
      latitude={location.coords.latitude}
      longitude={location.coords.longitude}
      onLocationChange={updateLocationFromMap}
    />
  </View>
)}



      {/* Espaço flexível apenas quando não está buscando */}
      {!isSearching && <View style={{ flex: 1 }} />}

      {/* Rodapé - Busque no mapa */}
      <View style={styles.footer}>
        {/* <Text style={styles.footerText}>Não encontrou seu endereço?</Text> */}
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => console.log('busque no mapa pressionado')}
        >
          <Text style={styles.mapButtonText}>Confirmar endereço</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 8,
    marginBottom: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  searchContainerActive: {
    borderColor: '#F97316',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  locationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 13,
    color: '#F97316',
    lineHeight: 18,
  },
  locationCurrentAddress: {
    fontSize: 13,
    color: '#6B7280',
  },
  resultsList: {
    marginTop: 16,
    flexGrow: 0,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  resultIcon: {
    marginRight: 12,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  emptyText: {
    fontSize: 13,
    color: '#9CA3AF',
    paddingVertical: 16,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 24,
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  mapButton: {
    width: '100%',
    backgroundColor: '#FF5A1F',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  mapButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  mapContainer:{
    paddingTop: 20
  }
});