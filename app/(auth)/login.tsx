import { AuthCard } from "@/components/auth/AuthCard";
import { AntDesign } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

export default function Login() {

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBehaviorAsync('overlay-swipe');
      }, []);


      const [email, setEmail] = useState('');
      const [senha, setSenha] = useState('');
      const [mostrarSenha, setMostrarSenha] = useState(false);
      const [aceitouTermos, setAceitouTermos] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

        <Image 
          source={require('@/assets/logo.png')} 
          style={styles.image}
        />

        <AuthCard>

          <Text style={{marginTop: 61, marginBottom: 10 }}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={{marginTop: 22, marginBottom: 10}}>Senha</Text>

          <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
            />

          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setAceitouTermos(!aceitouTermos)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, aceitouTermos && styles.checkboxAtivo]}>
              {aceitouTermos && <Text style={styles.check}>✓</Text>}
            </View>

            <Text style={styles.checkboxTexto}>
              Concordo com os termos de{' '}
              <Text style={styles.link} onPress={() => console.log('abrir política')}>
                política
              </Text>{' '}
              e{' '}
              <Text style={styles.link} onPress={() => console.log('abrir privacidade')}>
                privacidade
              </Text>
            </Text>
          </TouchableOpacity>

      <View style={styles.boxButton}>

          <TouchableOpacity  style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Entrar como visitante</Text>
          </TouchableOpacity>
      </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={() => console.log('login google')}>
              <AntDesign name="google" size={32} color="#DB4437" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('login facebook')}>
              <Entypo name="facebook" size={32} color="#1877F2" />
            </TouchableOpacity>
          </View>

          <Text style={styles.cadastroTexto}>
            Ainda não cadastro?{' '}
            <Text style={styles.cadastroLink} onPress={() => router.push("./register")}>
              cadastre-se!
            </Text>
          </Text>

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
    marginTop: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  button:{
     backgroundColor: "red",
     height: 52,
     width: 293,
     borderRadius: 10,
     justifyContent: "center",
     alignItems: "center",
     marginTop: 40
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 500 
  },
  buttonOutline: {
    backgroundColor: "#FFFFFF",
    height: 52,
    width: 293,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },
  buttonOutlineText: {
    color: "#000000",
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxAtivo: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  check: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxTexto: {
    fontSize: 13,
    color: '#999',
    flexShrink: 1,
  },
  link: {
    color: 'red',
    fontWeight: '600',
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
    alignItems: "center",
    justifyContent: "center"
  }
});