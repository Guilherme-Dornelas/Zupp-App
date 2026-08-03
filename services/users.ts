import { cleanNumber } from "@/utils/helpers";
import { api } from "./api";

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function buscarCep(cep: string) {
  const cepLimpo = cleanNumber(cep);

  const response = await api.get<ViaCepResponse>(
    `/${cepLimpo}/json/`
  );

  return response.data;
}