import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type Props = {
  children: ReactNode;
};

export function AuthCard({ children }: Props) {
  return (
 
    <View style={styles.container}>
        <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      {children}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // marginTop: 70,

    backgroundColor: "#FFF",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    padding: 24,
  },
  scrollContent: {
    // flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
});