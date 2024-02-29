import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import { useContribuyenteStore } from "./stores/contribuyentesStore";

export default function menuContribuyente() {
    
    const contribuyentes = useContribuyenteStore((state) => state.contribuyentes);
    const fetchContribuyente = useContribuyenteStore((state) => state.fetchContribuyentes);
    const filterContribuyentesByAccountId = useContribuyenteStore((state) => state.filterContribuyentesByAccountId);
    
    const [contribuyentesList, setContribuyentesList] = useState<{ value: string; label: string; }[]>([]);
    const [selectedOption, setSelectedOption] = useState<any>("");

    const urlContribuyentes: { [key: string]: string } = { 
        "Contabilidad": `/contribuyente/${selectedOption.value}/contabilidad/`,
        "Planeacion": `/contribuyente/${selectedOption.value}/planeacion/`,
        "Sat-docs": `/contribuyente/${selectedOption.value}/sat-docs/`,
        "Analisis": `/contribuyente/${selectedOption.value}/analisis/`
    }

    const keyValueContribuyentes = Object.entries(urlContribuyentes);

   

    useEffect(() => {
        fetchContribuyente();
        const data = localStorage.getItem('contribuyenteActivo');
        if (data){
          const parsedData = JSON.parse(data)
          setSelectedOption({ value: parsedData.account_id, label: parsedData.account_name });
        }
        
    }, []);

    useEffect(() => {
      
        const arrayList = contribuyentes.map((item: { account_id: string; account_name: string; }) => ({
            value: item.account_id,
            label: item.account_name
        }));
        setContribuyentesList(arrayList);


    }, [contribuyentes]);

    const handleChange = (selectedOption: any) => {
      console.log(selectedOption);
        setSelectedOption(selectedOption);
        filterContribuyentesByAccountId(selectedOption);
    };

    return (
        <>
            <div className="whitespace-nowrap relative p-3 items-center justify-center h-14">
            <Select options={contribuyentesList} isClearable={false} placeholder={'Contribuyente...'} value={selectedOption} onChange={(selection) => handleChange(selection)}/>
                
            </div>
            {
                selectedOption  && (
                    <>
                        {
                            keyValueContribuyentes.map(([key, value]) => (
                                <div key={key} className="whitespace-nowrap">
                                    <a href={value} className="relative p-3 my-3 flex items-center space-x-3 justify-start rounded-lg group hover:bg-slate-200 min-w-48">
                                        <svg width="18px" height="18px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                            <path d="M23.23,47.35l-0.12,0-0.37-.1V29.34H9.21a1.5,1.5,0,0,1-1.29-2.26l15-25.57a0.7,0.7,0,0,1,1.3.34l0.41,16.61H38.4a1.5,1.5,0,0,1,1.29,2.27c-1.75,2.91-5.73,9.51-9.28,15.38C24.19,46.39,23.6,47.35,23.23,47.35Zm0-44.43L8.77,27.58a0.5,0.5,0,0,0,.43.75H23.74v16.8c2.35-3.8,9-14.72,15.09-24.93a0.49,0.49,0,0,0,0-.5,0.49,0.49,0,0,0-.44-0.25H23.68Z"></path>
                                        </svg>
                                        <span className="text-slate-700 text-sm font-bold">{key}</span>
                                    </a>
                                </div>
                            ))
                        }
                    </>
                )
            }
        </>
    );
}
