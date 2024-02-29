import {create} from "zustand";
import  { END_POINT_BACKEND } from "../../constants";
import { getCookie } from "typescript-cookie";
import Select from "react-select"

interface Contribuyente{
  account_id: string,
  account_name: string
  rfc: string
  regimen: string
  cer: string
  key_value: string
  e_firma: string
  user_id: string
}

type ContribuyenteActivo = Contribuyente | null;

interface ContribuyenteState{
  total: number,
  contribuyenteActivo: ContribuyenteActivo
  contribuyentes: Contribuyente[]
  fetchContribuyentes: () => Promise<void>
  addContribuyente: (contribuyente: Contribuyente) => void
  setContribuyenteActivo: (contribuyente: ContribuyenteActivo) => void;
  filterContribuyentesByAccountId: (accountId: any) => void;
}

export const useContribuyenteStore = create<ContribuyenteState>() ((set, get) => ({
  total: 5,
    contribuyenteActivo: null,
        contribuyentes:[],
    fetchContribuyentes: async () => {
        try {
          let endpoint = END_POINT_BACKEND+'/accounts/'+getCookie("User");
          if (getCookie("Type") == "A"){
            endpoint = END_POINT_BACKEND+'/accounts';
          }
          const response = await fetch(endpoint);
          const data = await response.json();
          set({ contribuyentes: data });
        } catch (error) {
          console.error('Error fetching contribuyentes:', error);
        }
      },
      
      addContribuyente: (contribuyente) => set((state) =>({
        contribuyentes: [...state.contribuyentes, contribuyente]
      })),
      setContribuyenteActivo: (contribuyenteActivo) => set({ contribuyenteActivo }),

      
      filterContribuyentesByAccountId: (accountId ) => {
        console.log("Inside filterContribuyentesByAccountId");
        console.log(accountId)
        const contribuyentes = get().contribuyentes;
        const filtered = contribuyentes.filter(contribuyente => {
          //console.log(contribuyente.account_id)
          return contribuyente.account_id == accountId.value});
          //console.log(filtered.length )
        set({ contribuyenteActivo: filtered[0] });
        console.log(get().contribuyenteActivo)
        localStorage.setItem( 'contribuyenteActivo', JSON.stringify(get().contribuyenteActivo));
      }
}));
