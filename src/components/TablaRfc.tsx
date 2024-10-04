import { Fragment, useEffect } from "react";
import {useContribuyenteStore} from "./stores/contribuyentesStore";
import {ContribuyenteRecord} from "./ContribuyenteRecord";

export default function tablaRfcConstribuyentes(){    
    
    const contribuyentes = useContribuyenteStore((state) => state.contribuyentes);
    const addContribuyente = useContribuyenteStore((state) => state.addContribuyente);
    const fetchContribuyente = useContribuyenteStore((state) => state.fetchContribuyentes);
   
    console.log(contribuyentes)
    useEffect(() => {
        fetchContribuyente();
    },[addContribuyente]);

    

return(
        <Fragment>
            {  contribuyentes.map((contribuyente) => (
                <ContribuyenteRecord key={contribuyente.account_id} contribuyente={contribuyente}/>
            ))
            }
                
        </Fragment>
       
  )
}