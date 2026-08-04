import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sides = [
  { id: '1', name: 'Arroz branco soltinho' },
  { id: '2', name: 'Batata rústica assada' },
  { id: '3', name: 'Salada de folhas frescas' },
];

export default function ProductDetailScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.imageSection}>
          <Image
            source={{ uri: 'https://nacolher.com/wp-content/uploads/2022/09/Macarrao-com-Molho-de-Tomate.jpg' }}
            style={styles.dishImage}
          />

          <SafeAreaView edges={['top']} style={styles.topBar}>
            <TouchableOpacity
              style={styles.circleButtonDark}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={20} color="white" />
            </TouchableOpacity>

            <View style={styles.topBarRight}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => console.log('share pressed')}
              >
                <Feather name="share" size={18} color="#1D1D1D" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => console.log('favorite pressed')}
              >
                <Feather name="heart" size={18} color="#FF5A1F" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.content}>

          <View style={styles.tagsRow}>
            <View style={styles.tagOrange}>
              <Text style={styles.tagOrangeText}>Mais pedido</Text>
            </View>
            <View style={styles.tagGreen}>
              <Text style={styles.tagGreenText}>Sem glúten</Text>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.title}>Cream Chicken</Text>
            <Text style={styles.price}>R$ 30,50</Text>
          </View>

          <View style={styles.metaRow}>
            <FontAwesome name="star" size={14} color="#FFB800" />
            <Text style={styles.metaText}>4,8</Text>
            <Text style={styles.metaMuted}>(312)</Text>

            <Text style={styles.metaDot}>·</Text>

            <Feather name="clock" size={14} color="#8C8C8C" />
            <Text style={styles.metaMuted}>24 min</Text>

            <Text style={styles.metaDot}>·</Text>

            <FontAwesome name="fire" size={14} color="#FF5A1F" />
            <Text style={styles.metaMuted}>480 kcal</Text>
          </View>

         

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>
            O nome diz tudo! 'Cream Chicken' — pedaços suculentos de frango cozidos lentamente em um mix de temperos e creme fresco. Perfeito para dias mais frios.
          </Text>

          <Text style={styles.sectionTitle}>Acompanha</Text>

          {sides.map((side) => (
            <View key={side.id} style={styles.sideItem}>
              <View style={styles.checkCircle}>
                <Feather name="check" size={12} color="#FF5A1F" />
              </View>
              <Text style={styles.sideText}>{side.name}</Text>
            </View>
          ))}

         

          <View style={{ height: 100 }} />

        </View>

      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => console.log('decrease quantity pressed')}
          >
            <Feather name="minus" size={16} color="#FF5A1F" />
          </TouchableOpacity>

          <Text style={styles.stepperValue}>1</Text>

          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => console.log('increase quantity pressed')}
          >
            <Feather name="plus" size={16} color="#FF5A1F" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log('adicionar pressed')}
        >
          <Feather name="shopping-cart" size={18} color="white" />
          <Text style={styles.addButtonText}>Adicionar</Text>
          <Text style={styles.addButtonPrice}>R$ 30,50</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  imageSection: {
    height: 320,
    backgroundColor: "#1D1D1D",
  },

  dishImage: {
    width: "100%",
    height: "100%",
  },

  ratingBadge: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  ratingBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  topBarRight: {
    flexDirection: "row",
    gap: 12,
  },

  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  circleButtonDark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    backgroundColor: "white",
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },

  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  tagOrange: {
    backgroundColor: "#FFE4D7",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  tagOrangeText: {
    color: "#FF5A1F",
    fontSize: 12,
    fontWeight: "700",
  },

  tagGreen: {
    backgroundColor: "#E3F9E9",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  tagGreenText: {
    color: "#2ECC71",
    fontSize: 12,
    fontWeight: "700",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },

  metaText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  metaMuted: {
    fontSize: 13,
    color: "#8C8C8C",
  },

  metaDot: {
    fontSize: 13,
    color: "#8C8C8C",
    marginHorizontal: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D1D1D",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#706e6e",
    lineHeight: 21,
    marginBottom: 24,
  },

  sideItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    gap: 12,
  },

  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFE4D7",
    justifyContent: "center",
    alignItems: "center",
  },

  sideText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D1D1D",
  },

  observationInput: {
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 14,
    fontSize: 14,
    color: "#1D1D1D",
    minHeight: 56,
    textAlignVertical: "top",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    gap: 12,
  },

  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE4D7",
    borderRadius: 28,
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 10,
  },

  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  stepperValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D1D1D",
    minWidth: 16,
    textAlign: "center",
  },

  addButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5A1F",
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },

  addButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },

  addButtonPrice: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: "auto",
  },
});