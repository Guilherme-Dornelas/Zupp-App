import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AddressItem = {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  isCurrentLocation?: boolean;
};

const defaultAddressItems: AddressItem[] = [
  {
    id: 'current',
    title: 'Usar localização atual',
    address: 'Av. Presidente Vargas, 395',
    neighborhood: 'Bairro Novo - São Paulo',
    isCurrentLocation: true,
  },
  {
    id: 'home',
    title: 'Casa',
    address: 'Av. Presidente Vargas, 395',
    neighborhood: 'Bairro Novo - São Paulo',
  },
  {
    id: 'work',
    title: 'Trabalho',
    address: 'Av. Presidente Vargas, 395',
    neighborhood: 'Bairro Novo - São Paulo',
  },
];

function AddressOption({
  item,
  selected,
  onPress,
}: {
  item: AddressItem;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.optionCard, selected && styles.optionCardSelected]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.optionHeader}>
        <View style={styles.optionIconWrapper}>
          <FontAwesome6
            name={item.isCurrentLocation ? 'location-crosshairs' : 'location-dot'}
            size={18}
            color="#FF5A1F"
          />
        </View>

        <Text style={[styles.optionTitle, selected && styles.optionTitleSelected]}>
          {item.title}
        </Text>

        <View style={[styles.selectionCircle, selected && styles.selectionCircleSelected]}>
          {selected ? <FontAwesome5 name="check" size={12} color="white" /> : null}
        </View>
      </View>

      <Text style={styles.optionSubtitle}>{item.address}</Text>
      <Text style={styles.optionNeighborhood}>{item.neighborhood}</Text>
    </TouchableOpacity>
  );
}

type AddressSelectionContentProps = {
  /** Endereços cadastrados do usuário. Se não vier, usa uma lista de exemplo. */
  addressItems?: AddressItem[];
  /** Id do endereço selecionado inicialmente */
  initialSelectedId?: string;
  /** Disparado quando o usuário seleciona um endereço da lista */
  onSelectAddress?: (item: AddressItem) => void;
  /** Disparado quando o usuário toca em "Adicionar endereço" */
  onAddAddress?: () => void;
};

export function AddressSelectionContent({
  addressItems = defaultAddressItems,
  initialSelectedId = 'home',
  onSelectAddress,
  onAddAddress,
}: AddressSelectionContentProps) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [search, setSearch] = useState('');

  const handleSelect = (item: AddressItem) => {
    setSelectedId(item.id);
    onSelectAddress?.(item);
  };

  const filteredItems = addressItems.filter((item) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) || item.address.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchContainer}>
        <View style={styles.searchPrefix}>
          <FontAwesome name="search" size={16} color="#8C8C8C" />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar endereço"
          placeholderTextColor="#8C8C8C"
          importantForAutofill="no"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {filteredItems.map((item) => (
        <AddressOption
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          onPress={() => handleSelect(item)}
        />
      ))}

      <TouchableOpacity style={styles.addAddressCard} activeOpacity={0.7} onPress={onAddAddress}>
        <View style={styles.addAddressIconWrapper}>
          <Feather name="plus" size={18} color="#FF5A1F" />
        </View>
        <Text style={styles.addAddressText}>Adicionar endereço</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchPrefix: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1D1D1D',
    padding: 0,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    padding: 16,
  },
  optionCardSelected: {
    borderColor: '#FF5A1F',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  optionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF3ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1D1D1D',
  },
  optionTitleSelected: {
    color: '#FF5A1F',
  },
  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCircleSelected: {
    backgroundColor: '#FF5A1F',
    borderColor: '#FF5A1F',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  optionNeighborhood: {
    fontSize: 12,
    color: '#6B7280',
  },
  addAddressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    padding: 16,
    marginTop: 4,
  },
  addAddressIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF3ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressText: {
    fontSize: 15,
    color: '#1D1D1D',
    fontWeight: '700',
  },
});