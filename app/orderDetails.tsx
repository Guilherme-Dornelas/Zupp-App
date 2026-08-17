import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Passos do pedido. currentStep define até onde a barra fica preenchida
// e qual segmento recebe a animação "indeterminate" (efeito usado no iFood).
const steps = ['Recebido', 'Preparando', 'A caminho', 'Entregue'];
const currentStep = 1; // 0 = Recebido, 1 = Preparando, 2 = A caminho, 3 = Entregue

const rebuyItems = [
  { id: '1', name: 'Hambúrguer', store: 'Burger Shack', image: 'https://via.placeholder.com/64' },
  { id: '2', name: 'Sushi combo', store: 'Ino', image: 'https://via.placeholder.com/64' },
  { id: '3', name: 'Açaí 500ml', store: 'Frooty', image: 'https://via.placeholder.com/64' },
];

export default function PedidoDetalhes() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pedido #10203</Text>
          <TouchableOpacity onPress={() => console.log('opções pressionado')}>
            <Entypo name="dots-three-horizontal" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Tempo de entrega */}
        <View style={styles.etaContainer}>
          <Text style={styles.etaLabel}>Chega em</Text>
          <View style={styles.etaRow}>
            <Text style={styles.etaValue}>50–60</Text>
            <Text style={styles.etaUnit}>min</Text>
          </View>
          <Text style={styles.etaSubtitle}>Macarrão · 04 out 2025</Text>
        </View>

        {/* Barra de progresso do pedido */}
        {/*
          Em vez de depender de uma biblioteca externa de progresso, mantemos o estado
          do pedido em um componente simples baseado em View. Isso reduz a chance de
          conflitos com versões do Expo/React Native e mantém a UI previsível.
        */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarsRow}>
            {steps.map((step, index) => {
              const isCompleted = index <= currentStep;

              return (
                <View
                  key={step}
                  style={[
                    styles.progressBarTrack,
                    isCompleted && styles.progressBarTrackActive,
                  ]}
                >
                  <View
                    style={[
                      styles.progressBarFill,
                      isCompleted && styles.progressBarFillActive,
                    ]}
                  />
                </View>
              );
            })}
          </View>

          <View style={styles.progressLabelsRow}>
            {steps.map((step, index) => (
              <Text
                key={step}
                style={[
                  styles.progressLabel,
                  index === currentStep && styles.progressLabelActive,
                ]}
              >
                {step}
              </Text>
            ))}
          </View>
        </View>

        {/* Acompanhar entrega */}
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => console.log('acompanhar entrega pressionado')}
        >
          <Text style={styles.trackButtonText}>Acompanhar entrega</Text>
          <Feather name="arrow-right" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Código de entrega */}
        <View style={styles.deliveryCodeCard}>
          <View>
            <Text style={styles.deliveryCodeLabel}>CÓDIGO DE ENTREGA</Text>
            <Text style={styles.deliveryCodeValue}>12BAB2</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => console.log('copiar código pressionado')}
          >
            <Feather name="copy" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Seu pedido */}
        <Text style={styles.sectionTitle}>SEU PEDIDO</Text>
        <View style={styles.orderItemRow}>
          <Image
            source={{ uri: 'https://via.placeholder.com/48' }}
            style={styles.orderItemImage}
          />
          <View style={styles.orderItemInfo}>
            <Text style={styles.orderItemName}>Macarrão</Text>
            <Text style={styles.orderItemDescription}>1 · Molho ao sugo, parmesão</Text>
          </View>
          <Text style={styles.orderItemPrice}>R$ 90,80</Text>
        </View>

        {/* Resumo */}
        <Text style={styles.sectionTitle}>RESUMO</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>R$ 90,80</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabelDiscount}>Cupom BEMVINDO</Text>
          <Text style={styles.summaryValueDiscount}>-R$ 10,00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabelDiscount}>Cashback</Text>
          <Text style={styles.summaryValueDiscount}>-R$ 10,00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxa de entrega</Text>
          <Text style={styles.summaryValue}>R$ 7,50</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ 78,30</Text>
        </View>

        {/* Pagamento */}
        <Text style={styles.sectionTitle}>PAGAMENTO</Text>
        <View style={styles.paymentRow}>
          <View style={styles.paymentIconContainer}>
            <MaterialCommunityIcons name="credit-card" size={20} color="#FF5A1F" />
          </View>
          <View>
            <Text style={styles.paymentTitle}>Crédito · final 1234</Text>
            <Text style={styles.paymentSubtitle}>Mastercard</Text>
          </View>
        </View>

        {/* Entrega em */}
        <Text style={styles.sectionTitle}>ENTREGA EM</Text>
        <View style={styles.addressRow}>
          <View style={styles.addressIconContainer}>
            <Ionicons name="location-outline" size={20} color="#FF5A1F" />
          </View>
          <View>
            <Text style={styles.addressTitle}>Casa · Al. Gomide, 231</Text>
            <Text style={styles.addressSubtitle}>Apto 42 · São Paulo, SP</Text>
          </View>
        </View>

        {/* Peça de novo */}
        <Text style={styles.sectionTitle}>PEÇA DE NOVO</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.rebuyScroll}
        >
          {rebuyItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rebuyCard}
              onPress={() => console.log('peça de novo pressionado:', item.name)}
            >
              <Image source={{ uri: item.image }} style={styles.rebuyImage} />
              <Text style={styles.rebuyName}>{item.name}</Text>
              <Text style={styles.rebuyStore}>{item.store}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Precisa de ajuda */}
        <TouchableOpacity
          style={styles.helpContainer}
          onPress={() => console.log('precisa de ajuda pressionado')}
        >
          <Text style={styles.helpText}>Precisa de ajuda?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  etaContainer: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  etaLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  etaValue: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
  },
  etaUnit: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 6,
    marginBottom: 6,
  },
  etaSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  progressBarsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  progressBarTrack: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressBarTrackActive: {
    backgroundColor: '#FDE7DE',
  },
  progressBarFill: {
    height: '100%',
    width: '0%',
    backgroundColor: 'transparent',
  },
  progressBarFillActive: {
    width: '100%',
    backgroundColor: '#FF5A1F',
  },
  progressLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  progressLabelActive: {
    color: '#FF5A1F',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5A1F',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    gap: 8,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  deliveryCodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
  },
  deliveryCodeLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  deliveryCodeValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 1,
  },
  copyButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  orderItemImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFE4D7',
    marginRight: 12,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  orderItemDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#374151',
  },
  summaryValue: {
    fontSize: 14,
    color: '#111827',
  },
  summaryLabelDiscount: {
    fontSize: 14,
    color: '#2ECC71',
  },
  summaryValueDiscount: {
    fontSize: 14,
    color: '#2ECC71',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 12,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFE4D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  paymentSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 12,
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFE4D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  addressSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  rebuyScroll: {
    paddingLeft: 20,
  },
  rebuyCard: {
    width: 110,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 14,
    padding: 10,
  },
  rebuyImage: {
    width: '100%',
    height: 64,
    borderRadius: 10,
    backgroundColor: '#FFE4D7',
    marginBottom: 8,
  },
  rebuyName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  rebuyStore: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  helpContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  helpText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});