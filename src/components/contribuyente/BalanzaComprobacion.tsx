
import {  useState, Fragment, useEffect, type FormEvent } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { getCookie } from "typescript-cookie";
import { useContabilidadStore } from "../stores/ContabilidadState";

export default function BalanzaComprobacion({accountId, initialDate, finalDate}) {

  const setContabilidadState = useContabilidadStore((state) => state.setContabilidadState);
  
  const [cuentas, setCuentas] = useState([]);
  const [balanceList, setBalanceList] = useState([]);
  const [sumas, setSumas] = useState(null);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState("");
  const [month, setMonth] = useState("");
  const [linkBack, setLinkBack] = useState(null);
  const [status, setStatus] = useState("INITIAL");
  const [message, setMessage] = useState("Selecciona año y mes a consultar");
  const { handleSubmit, formState: { errors } } = useForm();

  const contribuyente = JSON.parse(localStorage.getItem("contribuyenteActivo"));

  useEffect(() => {
    const fetchCuentas = async () => {
      setStatus('LOADING');
      try {
        const response = await fetch(`${END_POINT_BACKEND}/balance/${accountId}/${initialDate}/${finalDate}`);
        if (response.ok) {
          const data = await response.json();
          setBalanceList(data.balanza)
          setSumas(data.sumas)
          setStatus("LOADED");
        }
        
      } catch (err) {
        setMessage("Error al consultar documentos XML al portal del SAT, intente de nuevo");
        setStatus("ERROR");
      }
    };

    // Llamada a la función para realizar la solicitud una vez que el componente se monta
    fetchCuentas();
  }, []);

  

    

return(
  <Fragment>
    <div className="flex justify-center mt-16">
                <span className="mb-3 text-xl text-[#062237] font-bold"> Balanza de comprobación </span>
            </div>
               
            {status === "LOADING" && (
                <div className="flex justify-center py-20">
                    <img src="https://e-tribute-client-files.s3.amazonaws.com/public/loader.gif" alt="loader" />
                </div>
            )}
    
    { status == "LOADED" && (
        <>
        <div className="flex mx-12  text-xs">
            <div className="grow">
            <div className="flex bg-[#0d5898] text-white p-2 space-x-2">
              <div className="basis-1/12 ">
                  
              </div>
              <div className="basis-5/12">
              
              </div>
              <div className="basis-2/12 text-center">
                Saldo Inicial
              </div>
              <div className="basis-2/12 text-center">
                Movimientos
              </div>
              <div className="basis-2/12 text-center">
                Saldo Final
              </div>
            </div>
            <div className="flex bg-[#0d5898] text-white p-2 space-x-2">
              <div className="basis-1/12 ">
                  Cuenta
              </div>
              <div className="basis-4/12">
              Nombre
              </div>
              <div className="basis-2/12 text-center">
              Deudor
              </div>
              <div className="basis-2/12 text-center">
              Acreedor
              </div>
              <div className="basis-2/12 text-center">
              Debe
              </div>
              <div className="basis-2/12 text-center">
              Haber
              </div>
              <div className="basis-2/12 text-center">
              Deudor
              </div>
              <div className="basis-2/12 text-center">
              Acreedor
              </div>
            </div>
                <ul>
                {balanceList.map( (balance, index) => (
                    <li key={index}> 
                    <div className="flex my-4 space-x-2 mx-2">
                            
                           
                            <div className="basis-1/12 ">
                              {balance.cuenta } 
                            </div>
                            <div className="basis-4/12">
                            {balance.nombre} 
                            </div>
                            <div className="basis-2/12 text-right">
                              {(Math.round(balance.deudor_inicial * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>

                            <div className="basis-2/12 text-right">
                              {(Math.round(balance.acredor_inicial * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>

                            <div className="basis-2/12 text-right">
                            {(Math.round(balance.debe)).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                            }) ?? "$ 0.00"}
                            </div>

                            <div className="basis-2/12 text-right">
                            {(Math.round(balance.haber * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                            }) ?? "$ 0.00"}
                            </div>

                            <div className="basis-2/12 text-right">
                            {(Math.round(balance.acredor_final * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                            }) ?? "$ 0.00"}
                            </div>

                            <div className="basis-2/12 text-right">
                              {(Math.round(balance.deudor_final * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>
                        </div>
                </li>
                    
                ))}
                </ul>
                <div className="flex py-3 text-right space-x-2 p-2 font-bold">
                  
                  <div className="basis-5/12"></div>
                  <div className="basis-2/12">
                    {}
                    {(Math.round(sumas.deudorInicial_total * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                  </div>
                  <div className="basis-2/12">
                    {(Math.round(sumas.acredorinical_total * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                  </div>
                  <div className="basis-2/12">
                    {(Math.round(sumas.debe_total * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                  </div>
                  <div className="basis-2/12">
                    {(Math.round(sumas.haber_total * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                  </div>
                  <div className="basis-2/12">
                    {(Math.round(sumas.deudorFinal_total * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                  </div>
                  <div className="basis-2/12">
                     {(Math.round(sumas.acredorFinal_total * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                  </div>
                </div>
            </div>
        </div>  
      </>
    ) }
    <div className="flex mx-24 mt-8">
            <div className="basis-2/6">
            <button onClick={() => setContabilidadState("LOADED")} className=" bg-[#0d5898] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-left stroke-white mx-1" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" />
                </svg>
                    <span className="mr-2">Regresar a menú contable</span>
                </button>
            </div>
            
            <div className="basis-4/6">
            </div>
            
        </div>
</Fragment>);
}
               
               
               