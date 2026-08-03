import { borderRadius, colors, spacing } from "@/utils/theme";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";
export default function VerifyCode() {

  const CELL_COUNT = 6;
  const [value, setValue] = useState("");

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] =
    useClearByFocusCell({
      value,
      setValue,
    });

  return (
    <SafeAreaView style={styles.container}>

    <Text style={styles.title}>Confirme o código</Text>
    <Text style={styles.subtitle}>Digite o código enviado para
     seu•••••.com</Text>

     <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[
              styles.cell,
              isFocused && styles.focusCell,
            ]}
            onLayout={getCellOnLayoutHandler(index)}
    >

      <Text style={styles.cellText}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </Text>
    </View>
  )}
/>

    <View style={styles.optionsContainer}>
      <Text>Ainda não recebeu o código?</Text>
      <TouchableOpacity onPress={() => console.log("Reenviar código")}>
        <Text style={{ 
          color: "#FF521D",
          textDecorationLine: "underline",
          fontWeight: "600",
          }}>Reenviar código</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.buttonsContainer}>

    <TouchableOpacity style={styles.button} onPress={() => console.log("Confirmar")}>
      <Text style={styles.buttonText}>Confirmar</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonBack} onPress={() =>  router.navigate("/(auth)/login")}>
      <Text style={styles.buttonTextBack}>Voltar</Text>
    </TouchableOpacity>

    </View>

     
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    paddingTop: 80,
    
  },
  cell: {
    width: 48,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lightGray,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "transparent",
  },

  focusCell: {
    borderColor: colors.primary,
    backgroundColor: colors.whiteSoft,
  },

  cellText: {
    fontSize: 22,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginBottom: 20,
  },
  optionsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  buttonsContainer: {
  marginTop: "auto",
  paddingBottom: 20,
  gap: 15,
},
  button: {
     marginTop: "auto",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  buttonBack: {
     marginTop: "auto",
    borderColor: colors.grayDark,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextBack: {
    color: colors.grayDark,
    fontSize: 16,
    fontWeight: "bold",
  },
});