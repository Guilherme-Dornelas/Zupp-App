import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: '1',
    date: '18/12/2023 - 16:00',
    title: 'Seu pedido 1398 saiu para a entrega.',
    forecast: 'Previsão de Entrega: 16:15 - 16:35',
    unread: true,
  },
  {
    id: '2',
    date: '18/12/2023 - 15:46',
    title: 'Seu pedido 1398 começou a ser preparado.',
    forecast: 'Previsão de Entrega: 16:15 - 16:35',
    unread: false,
  },
  {
    id: '3',
    date: '18/12/2023 - 15:45',
    title: 'Seu pedido 1398 recebido pelo restaurante.',
    forecast: 'Previsão de Entrega: 16:15 - 16:35',
    unread: false,
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={22} color="#FF5A1F" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notificações</Text>
        </View>

        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.card}
            onPress={() => console.log('notification pressed:', notification.id)}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardDate}>{notification.date}</Text>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>

            <Text style={styles.cardTitle}>{notification.title}</Text>
            <Text style={styles.cardForecast}>{notification.forecast}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },

  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1D1D",
    flex: 1,
    textAlign: "center",
    marginRight: 32,
  },

  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 12,
    padding: 16,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  cardDate: {
    fontSize: 13,
    color: "#8C8C8C",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5A1F",
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D1D1D",
    marginBottom: 8,
    lineHeight: 20,
  },

  cardForecast: {
    fontSize: 13,
    color: "#8C8C8C",
  },
});