import {create} from "zustand";

interface ContabilidadState{
  stateFlag: string,
  setContabilidadState: (state: string) => void
}

export const useContabilidadStore = create<ContabilidadState>() ((set, get) => ({
    // INITIAL , LOADING , POLIZAS, AUXILIARES, B_COMPROBACION, B_GENERAL, ESTADO_RESULTADOS, ERROR
    stateFlag: "INITIAL",
    setContabilidadState: (stateFlag) => set({ stateFlag })
}));
