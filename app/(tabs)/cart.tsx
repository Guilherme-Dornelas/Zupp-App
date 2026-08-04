import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>

          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Feather name="arrow-left" size={22} color="#FF5A1F" />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center", marginRight: 40 }}>
            Sua sacola
          </Text>

        </View>

        <TouchableOpacity style={styles.deliveryCard} onPress={() => console.log('editar endereco pressed')}>
          <View style={styles.deliveryCardTop}>
            <View style={styles.locationIconContainer}>
              <FontAwesome6 name="location-dot" size={16} color="#FF5A1F" />
            </View>

            <View style={styles.deliveryAddressContainer}>
              <Text style={styles.deliveryLabel}>ENTREGAR EM</Text>
              <Text style={styles.deliveryAddress}>Rua das Flores, 234 — Apto 51</Text>
              <Text style={styles.deliveryNeighborhood}>Vila Madalena · Trocar</Text>
            </View>

            <Feather name="chevron-right" size={20} color="#8C8C8C" />
          </View>

          <View style={styles.divider} />

          <View style={styles.deliveryCardBottom}>
            <View style={styles.timeRow}>
              <Feather name="clock" size={16} color="#1D1D1D" />
              <Text style={styles.timeText}>30-45 min · Padrão</Text>
            </View>

            <TouchableOpacity onPress={() => console.log('agendar pressed')}>
              <Text style={styles.scheduleLink}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>1 ITEM NO PEDIDO</Text>

        <View style={styles.itemCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/64' }}
            style={styles.itemImage}
          />

          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Macarrão à Bolonhesa</Text>
            <Text style={styles.itemDescription}>Massa artesanal com molho da casa e parmesão</Text>
            <Text style={styles.itemPrice}>R$ 90,00</Text>
          </View>

          <View style={styles.stepperContainer}>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => console.log('decrease quantity pressed')}
            >
              <Feather name="minus" size={14} color="#FF5A1F" />
            </TouchableOpacity>

            <Text style={styles.stepperValue}>2</Text>

            <TouchableOpacity
              style={[styles.stepperButton, styles.stepperButtonActive]}
              onPress={() => console.log('increase quantity pressed')}
            >
              <Feather name="plus" size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addMoreButton}
          onPress={() => console.log('adicionar mais itens pressed')}
        >
          <Feather name="plus" size={18} color="#FF5A1F" />
          <Text style={styles.addMoreText}>Adicionar mais itens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => console.log('adicionar observacoes pressed')}
        >
          <Feather name="message-square" size={18} color="#1D1D1D" />
          <Text style={styles.optionText}>Adicionar observações ao pedido</Text>
          <Feather name="chevron-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => console.log('trocar cupom pressed')}
        >
          <FontAwesome5 name="ticket-alt" size={16} color="#2ECC71" />
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 12, gap: 6 }}>
            <Text style={styles.optionText}>Cupom BOMDIA10</Text>
            <Text style={styles.appliedText}>aplicado</Text>
          </View>
          <Text style={styles.changeLink}>Trocar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => console.log('trocar forma de pagamento pressed')}
        >
          <FontAwesome5 name="wallet" size={16} color="#1D1D1D" />
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 12, gap: 4 }}>
            <Text style={styles.optionText}>Pix</Text>
            <Text style={styles.optionSubText}>· aprovação instantânea</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>RESUMO DE VALORES</Text>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ 90,00</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cupom BOMDIA10</Text>
            <Text style={styles.summaryDiscount}>-R$ 10,00</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxa de entrega</Text>
            <Text style={styles.summaryValue}>R$ 8,00</Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ 88,00</Text>
        </View>

        <View style={{ height: 100 }} />

      </ScrollView>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => console.log('ir para pagamento pressed')}
        >
          <Text style={styles.checkoutButtonText}>Ir para o pagamento</Text>
          <Feather name="arrow-right" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  backButtonContainer: {
    marginTop: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE4D7",
  },

  deliveryCard: {
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 16,
  },

  deliveryCardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFE4D7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  deliveryAddressContainer: {
    flex: 1,
  },

  deliveryLabel: {
    fontSize: 11,
    color: "#8C8C8C",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 2,
  },

  deliveryAddress: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D1D1D",
    marginBottom: 2,
  },

  deliveryNeighborhood: {
    fontSize: 12,
    color: "#8C8C8C",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 12,
  },

  deliveryCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  timeText: {
    fontSize: 13,
    color: "#1D1D1D",
    fontWeight: "500",
  },

  scheduleLink: {
    fontSize: 13,
    color: "#FF5A1F",
    fontWeight: "700",
  },

  sectionLabel: {
    fontSize: 12,
    color: "#8C8C8C",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 12,
  },

  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D1D1D",
    marginBottom: 2,
  },

  itemDescription: {
    fontSize: 12,
    color: "#8C8C8C",
    marginBottom: 6,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE4D7",
    borderRadius: 20,
    padding: 4,
    gap: 8,
  },

  stepperButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  stepperButtonActive: {
    backgroundColor: "#FF5A1F",
  },

  stepperValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  addMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },

  addMoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5A1F",
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D1D1D",
  },

  optionSubText: {
    fontSize: 13,
    color: "#8C8C8C",
  },

  appliedText: {
    fontSize: 12,
    color: "#2ECC71",
    fontWeight: "600",
  },

  changeLink: {
    fontSize: 13,
    color: "#FF5A1F",
    fontWeight: "700",
  },

  summaryContainer: {
    marginHorizontal: 20,
    gap: 10,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryLabel: {
    fontSize: 14,
    color: "#8C8C8C",
  },

  summaryValue: {
    fontSize: 14,
    color: "#1D1D1D",
    fontWeight: "600",
  },

  summaryDiscount: {
    fontSize: 14,
    color: "#2ECC71",
    fontWeight: "600",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  totalLabel: {
    fontSize: 14,
    color: "#8C8C8C",
  },

  totalValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D1D1D",
  },

  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5A1F",
    borderRadius: 28,
    paddingVertical: 16,
    gap: 8,
  },

  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});