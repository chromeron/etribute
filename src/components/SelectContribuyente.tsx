import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import { useContribuyenteStore } from "./stores/contribuyentesStore";

export default function menuContribuyente() {
    
    const contribuyenteActivo = useContribuyenteStore((state) => state.contribuyenteActivo);
    
    const [selectedOption, setSelectedOption] = useState<any>("");

    const urlContribuyentes: { [key: string]: string } = { 
        "Contabilidad": `/contribuyente/${selectedOption.value}/contabilidad/`,
        "Planeacion": `/contribuyente/${selectedOption.value}/planeacion/`,
        "Sat-docs": `/contribuyente/${selectedOption.value}/sat-docs/`,
        "Analisis": `/contribuyente/${selectedOption.value}/analisis/`
    }

    const keyValueContribuyentes = Object.entries(urlContribuyentes);

    useEffect(() => {
        const data = localStorage.getItem('contribuyenteActivo');
        if (data){
          const parsedData = JSON.parse(data)
          setSelectedOption({ value: parsedData.account_id, label: parsedData.rfc });
        }
    }, []);

    useEffect(() => {
        const data = localStorage.getItem('contribuyenteActivo');
        if (data){
          const parsedData = JSON.parse(data)
          setSelectedOption({ value: parsedData.account_id, label: parsedData.rfc });
        }
    }, [contribuyenteActivo]);

    

    return (

                            keyValueContribuyentes.map(([key, value]) => (
                                <div key={key} className="whitespace-nowrap">
                                    <a href={value} className="relative p-3 my-3 flex items-center space-x-3 justify-start rounded-lg group hover:bg-slate-200 min-w-48 hover:text-slate-700 text-white hover:stroke-[#0d5898] stroke-white ">
                                        <svg width="18px" height="18px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.23,47.35l-0.12,0-0.37-.1V29.34H9.21a1.5,1.5,0,0,1-1.29-2.26l15-25.57a0.7,0.7,0,0,1,1.3.34l0.41,16.61H38.4a1.5,1.5,0,0,1,1.29,2.27c-1.75,2.91-5.73,9.51-9.28,15.38C24.19,46.39,23.6,47.35,23.23,47.35Zm0-44.43L8.77,27.58a0.5,0.5,0,0,0,.43.75H23.74v16.8c2.35-3.8,9-14.72,15.09-24.93a0.49,0.49,0,0,0,0-.5,0.49,0.49,0,0,0-.44-0.25H23.68Z"></path>
                                        </svg>
                                        <span className="text-sm font-bold">{key}</span>
                                    </a>
                                </div>
                            )
                            )    
                                
    );
}
