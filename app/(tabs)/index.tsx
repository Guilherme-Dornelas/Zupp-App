import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { id: '1', name: 'Hambúrguer', image: 'https://via.placeholder.com/64' },
  { id: '2', name: 'Pizza', image: 'https://via.placeholder.com/64' },
  { id: '3', name: 'Massas', image: 'https://via.placeholder.com/64' },
  { id: '4', name: 'Japonesa', image: 'https://via.placeholder.com/64' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.containerLocation}>

            <View style={styles.iconContainer}>
              <FontAwesome6 name="location-dot" size={18} color="#FF5A1F" />
            </View>

            <View style={styles.addressContainer}>
              <Text style={styles.subtitle}>ENTREGAR EM</Text>

              <View style={styles.row}>
                <Text style={styles.address} numberOfLines={1}>Rua Flor de Lis, 149</Text>
                <Entypo name="chevron-small-down" size={22} color="#222" />
              </View>
            </View>

          </View>

          <TouchableOpacity
            style={styles.bellContainer}
            onPress={() => router.push('/notifications')}
          >
            <FontAwesome5 name="bell" size={20} color="black" />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Oi, Ana 👋</Text>
          <Text style={styles.question}>O que você quer{'\n'}comer hoje?</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#8C8C8C" />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise pratos ou restaurantes"
              placeholderTextColor="#8C8C8C"
              onChangeText={(text) => console.log('search text:', text)}
            />
          </View>

          <TouchableOpacity
            style={styles.iconContainerFilter}
            onPress={() => console.log('filter pressed')}
          >
            <FontAwesome6 name="sliders" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bannerContainer}
          onPress={() => console.log('banner pressed')}
        >
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.bannerImage}
          />

          <View style={styles.bannerOverlay}>
            <View style={styles.bannerTag}>
              <Text style={styles.bannerTagText}>🔥 OFERTA DO DIA</Text>
            </View>

            <Text style={styles.bannerTitle}>Combo Duplo</Text>
            <Text style={styles.bannerDiscount}>com 30% OFF</Text>

            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => console.log('pedir agora pressed')}
            >
              <Text style={styles.bannerButtonText}>Pedir agora</Text>
              <Feather name="arrow-right" size={16} color="#1D1D1D" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <TouchableOpacity onPress={() => console.log('ver todas categorias pressed')}>
            <Text style={styles.sectionLink}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => console.log('category pressed:', category.name)}
            >
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurantes perto de você</Text>
        </View>

        <TouchableOpacity
          style={styles.restaurantCard}
          onPress={() => router.push('/detailsProduct')}
        >
          <View style={styles.restaurantImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80' }}
              style={styles.restaurantImage}
            />
            <View style={styles.topTag}>
              <Text style={styles.topTagText}>Top</Text>
            </View>
          </View>

          <View style={styles.restaurantInfo}>
            <View style={styles.restaurantRatingRow}>
              <FontAwesome name="star" size={14} color="#FFB800" />
              <Text style={styles.restaurantRating}>4.8</Text>
              <Text style={styles.restaurantReviews}>(2.1k)</Text>
              <Text style={styles.restaurantCategory}>· Hambúrguer</Text>
            </View>

            <Text style={styles.restaurantName}>Burger Fábrica</Text>

            <View style={styles.restaurantMetaRow}>
              <Feather name="clock" size={14} color="#8C8C8C" />
              <Text style={styles.restaurantMetaText}>25-35 min</Text>

              <FontAwesome6 name="motorcycle" size={14} color="#2ECC71" style={{ marginLeft: 8 }} />
              <Text style={styles.restaurantFreeText}>Grátis</Text>
            </View>
          </View>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EFEA",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  containerLocation: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFE4D7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
  },

  bellContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  bellDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5A1F",
  },

  addressContainer: {
    flex: 1,
    flexShrink: 1,
  },

  subtitle: {
    fontSize: 12,
    color: "#8C8C8C",
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    flexShrink: 1,
  },

  address: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D1D",
    marginRight: 4,
    flexShrink: 1,
  },

  greetingContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  greeting: {
    fontSize: 15,
    color: "#1D1D1D",
    marginBottom: 4,
  },

  question: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1D1D1D",
    lineHeight: 32,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#1D1D1D",
  },

  iconContainerFilter: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FF5A1F",
    justifyContent: "center",
    alignItems: "center",
  },

  bannerContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    height: 180,
    backgroundColor: "#1D1D1D",
  },

  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },

  bannerOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  bannerTag: {
    backgroundColor: "#FF5A1F",
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },

  bannerTagText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },

  bannerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },

  bannerDiscount: {
    color: "#FFB800",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },

  bannerButtonText: {
    color: "#1D1D1D",
    fontWeight: "700",
    fontSize: 13,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  sectionLink: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF5A1F",
  },

  categoriesScroll: {
    paddingLeft: 20,
  },

  categoryItem: {
    alignItems: "center",
    marginRight: 16,
    width: 64,
  },

  categoryImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#1D1D1D",
    marginBottom: 6,
  },

  categoryName: {
    fontSize: 12,
    color: "#1D1D1D",
    fontWeight: "500",
    textAlign: "center",
  },

  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },

  restaurantImageContainer: {
    position: "relative",
  },

  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#1D1D1D",
  },

  topTag: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#FF5A1F",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  topTagText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },

  restaurantInfo: {
    flex: 1,
    justifyContent: "center",
  },

  restaurantRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },

  restaurantRating: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  restaurantReviews: {
    fontSize: 12,
    color: "#8C8C8C",
  },

  restaurantCategory: {
    fontSize: 12,
    color: "#8C8C8C",
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D1D1D",
    marginBottom: 4,
  },

  restaurantMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  restaurantMetaText: {
    fontSize: 12,
    color: "#8C8C8C",
  },

  restaurantFreeText: {
    fontSize: 12,
    color: "#2ECC71",
    fontWeight: "600",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  navItem: {
    alignItems: "center",
    gap: 4,
  },

  navText: {
    fontSize: 11,
    color: "#8C8C8C",
  },

  navTextActive: {
    fontSize: 11,
    color: "#FF5A1F",
    fontWeight: "600",
  },
});