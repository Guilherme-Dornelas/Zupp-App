import { AuthCard } from "@/components/auth/AuthCard";
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import * as NavigationBar from 'expo-navigation-bar';
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  const [step, setStep] = useState(1);

  // etapa 1
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [telefone, setTelefone] = useState('');

  // etapa 2
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');

  // etapa 3
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');


  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  function handleVoltar() {
    if (step === 1) {
      router.push("/(auth)/login");
      return;
    }
    setStep((prev) => prev - 1);
  }

  function handleProximo() {
    if (step === 1 && senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem");
      return;
    }

    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    finalizarCadastro();
  }

  function finalizarCadastro() {
    // aqui você junta tudo e chama sua API de cadastro
    console.log({ email, senha, telefone, dataNascimento, cpf, cep, endereco, numero, complemento });
  }


  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require('@/assets/logo.png')}
        style={styles.image}
      />

      <AuthCard>

        <View style={styles.stepHeader}>
          <Text style={styles.stepIndicator}>{step}/3</Text>
        </View>

        {step === 1 && (
          <>
            <Text style={{ marginTop: 61, marginBottom: 10 }}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={{ marginTop: 22, marginBottom: 10 }}>Telefone</Text>
           <MaskedTextInput
            mask="(99) 99999-9999"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="Digite seu telefone"
          />

            <Text style={{ marginTop: 22, marginBottom: 10 }}>Senha</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputSenha}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  autoCapitalize="none"
                />

                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <Ionicons
                    name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

            <Text style={{ marginTop: 22, marginBottom: 10 }}>Confirme a sua Senha</Text>
           <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputSenha}
                placeholder="Digite sua senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!mostrarConfirmarSenha}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() =>
                  setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                }>
                <Ionicons
                  name={mostrarConfirmarSenha ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={{ marginTop: 61, marginBottom: 10 }}>Data de Nascimento</Text>
         <MaskedTextInput
            mask="99/99/9999"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Digite sua data de nascimento"
          />

            <Text style={{ marginTop: 22, marginBottom: 10 }}>CPF</Text>
           <MaskedTextInput
                mask="999.999.999-99"
                value={cpf}
                onChangeText={(text, rawText) => {
                  setCpf(text);

                  console.log(text);    // 123.456.789-00
                  console.log(rawText); // 12345678900
                }}
                keyboardType="numeric"
                placeholder="Digite seu CPF"
                style={styles.input}
          />
          </>
        )}

        {step === 3 && (
          <>
            <Text style={{ marginTop: 61, marginBottom: 10 }}>CEP para entrega</Text>
            <MaskedTextInput
                mask="99999-999"
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Digite seu CEP"
            />

            <Text style={{ marginTop: 22, marginBottom: 10 }}>Endereço / Logradouro</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu endereço"
              value={endereco}
              onChangeText={setEndereco}
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginTop: 22, marginBottom: 10 }}>Numero</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000"
                  value={numero}
                  onChangeText={setNumero}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={{ marginTop: 22, marginBottom: 10 }}>Complemento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu Complemento"
                  value={complemento}
                  onChangeText={setComplemento}
                />
              </View>
            </View>
          </>
        )}

        <View style={styles.boxButton}>

          <TouchableOpacity style={styles.buttonOutline} onPress={handleVoltar}>
            <Entypo name="chevron-left" size={24} color="#A0A0A0" />
            <Text style={styles.buttonOutlineText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={[
            styles.button,
            { paddingHorizontal: step === 3 ? 10 : 40 }
          ]}
          onPress={handleProximo}
        >
          <Entypo
            name={step === 3 ? "check" : "chevron-right"}
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>
            {step === 3 ? "Finalizar cadastro" : "Próximo"}
          </Text>
        </TouchableOpacity>

        </View>

      </AuthCard>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: "#FF521D",
     alignItems: "center"
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  image: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 500 
  },
  buttonOutline: {
    backgroundColor: "#FFFFFF",
    height: 52,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonOutlineText: {
    color: "#A0A0A0",
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 20,
  },
  cadastroTexto: {
    marginTop: 24,
    marginBottom: 30,
    fontSize: 14,
    color: '#333',
    textAlign: "center"
  },
  cadastroLink: {
    color: 'red',
    fontWeight: '600',
  },
  boxButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    justifyContent: "space-around",
    marginTop: 40,
    gap: 25

  },

  button: {
    backgroundColor: "red",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    gap: 11
  },
  
  stepHeader: {
    width: '100%',
    alignItems: 'flex-end',
  },
  stepIndicator: {
    color: '#A0A0A0',
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 12,
},
inputSenha: {
  paddingVertical: 12,
   flex: 1,
  fontSize: 16,
}
});