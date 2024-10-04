
import {  useState, Fragment, type FormEvent, useEffect } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useContabilidadStore } from "../stores/ContabilidadState";

export default function EstadoResultados({accountId, initialDate, finalDate}) {

    const setContabilidadState = useContabilidadStore((state) => state.setContabilidadState);
    
    const [estadoResultados, setEstadoResultados] = useState(null);
    const [status, setStatus] = useState("INITIAL");
    // INITIAL , LOADING , LOADED, ERROR
    
      useEffect(() => {
        const fetchCuentas = async () => {
          try {
            const response = await fetch(`${END_POINT_BACKEND}/balanceGeneraEstados/${accountId}/${initialDate}/${finalDate}`);
            if (response.ok) {
              const data = await response.json();
              setEstadoResultados(data);
            }
            setStatus("LOADED");
          } catch (err) {
            setStatus("ERROR");
          }
        };
    
        // Llamada a la función para realizar la solicitud una vez que el componente se monta
        fetchCuentas();
      }, []);

return(
  <Fragment>
    <div className="flex justify-center mt-16">
      <span className="mb-3 text-xl text-[#062237] font-bold"> Estado de Resultados </span>
    </div>
    
    { status == "LOADED" && (
        <>
        <div className="flex mx-24">
            <div className="py-2 grow">
                  <div className="flex mt-4 bg-[#0d5898] text-white p-2">
                            <div className="basis-6/12">
                              
                            </div>
                            <div className="basis-3/12 text-right">
                              Mensual
                            </div>
                            
                            <div className="basis-3/12 text-right">
                             Anual
                            </div>
                            
                        </div>
                <div className="flex mb-4 bg-[#0d5898] text-white p-2">
                            <div className="basis-5/12">
                              Concepto
                            </div>
                            <div className="basis-1/12 text-right">
                              
                            </div>
                            <div className="basis-2/12 text-right">
                              Importe
                            </div>
                            <div className="basis-1/12 text-right">
                            %
                            </div>
                            <div className="basis-2/12 text-right">
                            Importe
                            </div>
                            <div className="basis-1/12 text-right">
                            %
                            </div>
                        </div>
                <ul>
                {estadoResultados.body.registro.map( (estado_resultado, index) => (
                    <li key={index}> 
                    <div className="flex my-4">
                            <div className="basis-5/12">
                            {estado_resultado.nombre_cuenta} 
                            </div>
                            <div className="basis-1/12  text-right">
                              (+/-)
                            </div>  
                            <div className="basis-2/12 text-right">
                            {(Math.round(estado_resultado.importe_mensual * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>
                            <div className="basis-1/12 text-right">
                            {(Math.round(estado_resultado.porcentaje_mensual * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>
                            <div className="basis-2/12 text-right">
                            {(Math.round(estado_resultado.importe_anual * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>
                            <div className="basis-1/12 text-right">
                            {(Math.round(estado_resultado.porcentaje_anual * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>
                        </div>
                </li>
                    
                ))}
                </ul>
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
               
               
               