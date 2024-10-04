
import {  useState, Fragment, type FormEvent, useEffect } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useForm, Controller} from "react-hook-form";
import Select from "react-select";
import { useContribuyenteStore } from "../stores/contribuyentesStore";
import Auxiliares from "./Auxiliares";
import EstadoResultados from "./EstadoResultados";
import BalanzaComprobacion from "./BalanzaComprobacion"
import Polizas from "./Polizas";
import BalanceGeneral from "./BalanceGeneral";
import { useContabilidadStore } from "../stores/ContabilidadState";

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export default function Reportes() {

    const currentYear = new Date().getFullYear();
    const yearsList = [];

    for (let i = 0; i < 5; i++) {
        yearsList.push({ value: currentYear - i, label: String(currentYear - i) });
    }

    const monthsList = [
        { value: 0, label: 'Enero' },
        { value: 1, label: 'Febrero' },
        { value: 2, label: 'Marzo' },
        { value: 3, label: 'Abril' },
        { value: 4, label: 'Mayo' },
        { value: 5, label: 'Junio' },
        { value: 6, label: 'Julio' },
        { value: 7, label: 'Agosto' },
        { value: 8, label: 'Septiembre' },
        { value: 9, label: 'Octubre' },
        { value: 10, label: 'Noviembre' },
        { value: 11, label: 'Diciembre' }
    ];

    const contribuyenteActivo = useContribuyenteStore((state) => state.contribuyenteActivo);
    const contabilidadState = useContabilidadStore((state) => state.stateFlag);
    const setContabilidadState = useContabilidadStore((state) => state.setContabilidadState);
    const contribuyente = JSON.parse(localStorage.getItem("contribuyenteActivo"));
    const { handleSubmit, register, control, formState: { errors } } = useForm();
    
    const [initialDate, setInitialDate]                 = useState(null);
    const [finalDate, setFinalDate]                     = useState(null);
    const [contribuyentesComponent, setContribuyentesComponent]  = useState(null);
   // const [status, setStatus]                           = useState(contabilidadState);
    // INITIAL , LOADING , POLIZAS, AUXILIARES, B_COMPROBACION, B_GENERAL, ESTADO_RESULTADOS, ERROR

    useEffect(() =>{
        setFinalDate(null)
        setInitialDate(null)
        setContabilidadState("INITIAL")
    },[contribuyenteActivo])

    const submit = async (formData: any) => {

        console.log(formData);

        setInitialDate(formatDate(new Date(formData.yearSelected.value, formData.monthSelectedOption.value, 1)));
        setFinalDate(formatDate(new Date(formData.yearSelected.value, formData.monthSelectedOption.value+1, 0)));

        console.log(contribuyente);
        const buldUrlsContribuyentes = [
            {description:"Polizas", link_description:"Ver Polizas", status: "POLIZAS"},
            {description:"Auxiliares", link_description: "Ver auxiliares", status: "AUXILIARES"},
            {description:"Balanza de comprobación", link_description: "Ver balanza de comprobacion", status: "B_COMPROBACION"},
            {description:"Estados financieros", link_description: "Ver balanza general", status: "B_GENERAL"},
            {description:"Estado de resultados", link_description: "Ver estado de resultados", status: "ESTADO_RESULTADOS"}
        ];
       

        setContribuyentesComponent(buldUrlsContribuyentes);

        setContabilidadState("LOADED")
      }

  
return(
  <Fragment>
    <div className="bg-slate-200 rounded pb-4">
        <div className="flex justify-center">
            <span className="pt-5 pb-6 text-md text-slate-500 font-bold"> Selecciona año y mes a consultar </span>
        </div>
                
        
        <form  onSubmit={handleSubmit(submit)}>
            <div className="flex flex-row  space-x-10   items-center  text-center  justify-between mx-24">
                <div className="basis-1/3">
                <Controller
                    name="yearSelected"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                        {...field}
                        options={yearsList}
                        placeholder="Selecciona una opción"
                        isSearchable={false}
                        isClearable={true}
                        />
                    )}
                    /> 
                    {errors.yearSelected && <span>* Año es obligatorio</span>}
                </div>
                <div className="basis-1/3">
                <Controller
                        name="monthSelectedOption"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                        <Select
                            {...field}
                            options={monthsList}
                            placeholder="Selecciona una mes"
                            isSearchable={false}
                            isClearable={true}
                        />
                        )}
                    />
                    {errors.monthSelectedOption && <span>* Mes es obligatorio</span>}
                </div>
                <div className="basis-1/3">
                    <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                        <span className="inline-block mr-2">Consultar periodo</span>
                    </button>
                </div>
                
            </div>
        </form>
    </div>
    
    { contabilidadState == "LOADING" && (
        <div className="flex justify-center py-20">
            <img src="/public/loader.gif" alt="loader" />
        </div>      
        ) }
    { contabilidadState == "ERROR" && (
        <div className="flex justify-center py-20">
            <h1></h1>
        </div>
        ) }
    { contabilidadState == "LOADED" && (
        <div className="pt-12">
        {contribuyentesComponent.map((contribuyente) => (
            <div key={contribuyente.status} className="flex items-center">
                <div className="p-2 w-1/6">
                </div>
                <div className="p-2 w-2/6">
                    {contribuyente.description}
                </div>
                <div className="p-2 w-2/6">
                <button onClick={() => setContabilidadState(contribuyente.status)} className="bg-[#0d5898] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold flex items-center justify-center">
                        <span className="pr-1">{contribuyente.link_description}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-right stroke-white mx-1" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                        </svg>
                    </button>
                </div>
                <div className="p-2 w-1/6">
                </div>
            </div>
        ))}
        
        <div className="flex items-center mt-20">
            <div className="p-2 w-1/6">
            </div>
            <div className="p-2 w-2/6">
                <a href={`/contribuyente/${contribuyente.account_id}/cargar/estado_cuenta`} className=" bg-[#0d5898] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold flex items-center justify-center">
                
                    <span className="mr-2">Cargar estado de cuenta bancario</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-right stroke-white mx-1" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                    </svg>
                </a>
            </div>
            <div className="p-2 w-2/6">
            
            </div>
            <div className="p-2 w-2/6">
                
            </div>
            <div className="p-2 w-1/6">
            </div>
        </div>
    </div>
) }

{ contabilidadState == "POLIZAS" && (
            <Polizas initialDate={initialDate} finalDate={finalDate} />
        ) }
{ contabilidadState == "AUXILIARES" && (
            <Auxiliares accountId={contribuyente.account_id} initialDate={initialDate} finalDate={finalDate} />
        ) }
{ contabilidadState == "B_COMPROBACION" && (
            <BalanzaComprobacion accountId={contribuyente.account_id} initialDate={initialDate} finalDate={finalDate} />
        ) }
{ contabilidadState == "B_GENERAL" && (
            <BalanceGeneral accountId={contribuyente.account_id} initialDate={initialDate} finalDate={finalDate} />
        ) }
{ contabilidadState == "ESTADO_RESULTADOS" && (
            <EstadoResultados accountId={contribuyente.account_id} initialDate={initialDate} finalDate={finalDate} />
        ) }

</Fragment>);
}
               
               
               