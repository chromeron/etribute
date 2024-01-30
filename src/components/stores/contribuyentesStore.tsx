import {create} from "zustand";
import { getCookie } from 'typescript-cookie'
import  { END_POINT_BACKEND } from "../../constants";

interface Contribuyente{
  account_id: number,
  account_name: string
  rfc: string
  regimen: string
  cer: string
  key_value: string
  e_firma: string
  token: string
}

interface ContribuyenteState{
  contribuyentes: Contribuyente[]
  fetchContribuyentes: () => Promise<void>
  addContribuyente: (contribuyente: Contribuyente) => void
}

export const useContribuyenteStore = create<ContribuyenteState> ((set) => ({
    contribuyentes:[],
    fetchContribuyentes: async () => {
        try {
          const response = await fetch(END_POINT_BACKEND+'/eTribute/getAccountByToken/'+getCookie('Authorization'));
          const data = await response.json();
          set({ contribuyentes: data });
        } catch (error) {
          console.error('Error fetching contribuyentes:', error);
        }
      },
      addContribuyente: (contribuyente) => set((state) =>({
        contribuyentes: [...state.contribuyentes, contribuyente]
      })),
}));
