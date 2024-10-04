
import {  useState, Fragment, useEffect, type FormEvent } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useForm } from "react-hook-form";
import { useContabilidadStore } from "../stores/ContabilidadState";

export default function BalanceGeneral({accountId, initialDate, finalDate}) {

  const setContabilidadState = useContabilidadStore((state) => state.setContabilidadState);

      const [status, setStatus] = useState("INITIAL");
      const [balanceGeneral, setBalanceGeneral] = useState(null);
    
      useEffect(() => {
        const fetchCuentas = async () => {
          try {
            const response = await fetch(`${END_POINT_BACKEND}/balanceGeneral/${accountId}/${initialDate}/${finalDate}`);
            if (response.ok) {
              const data = await response.json();
              setBalanceGeneral(data);
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
                <span className=" text-xl text-[#062237] font-bold"> Balance general </span>
            </div>
    
    
    { status == "LOADED" && (
        <>

        <div className="flex gap-4 text-sm">
          <div className="basis-1/12"></div>
          <div className=" basis-5/12 grow">
            <div className="flex flex-wrap mt-10">
              <div className="bg-white w-full text-lg font-semibold">
                Activo
              </div>

              <div className="py-2 w-full">
                <div className="flex my-4 bg-[#0d5898] text-white p-2 ">
                  <div className="basis-1/12">
                    id
                  </div>
                  <div className="basis-8/12 grow">
                    Concepto
                  </div>
                  <div className="basis-3/12 text-right mr-2">
                    Cantidad
                  </div>
                </div>
              </div>
              <div className="w-full">
                <ul>
                  {balanceGeneral.Activo_Circulante.map((poliza, index) => (
                    <li  key={index}>
                      <div className="flex my-2">
                        <div className="basis-1/12">
                          {poliza.cuenta_id}
                        </div>
                        <div className="basis-8/12 grow">
                        {poliza.descripcion}
                        </div>
                        <div className="basis-3/12 w-full text-right mr-2">
                        {(Math.round(poliza.total * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white w-full mt-8 text-lg  font-semibold">
                Activo fijo
              </div>
              <div className="w-full">
                <ul>
                  {balanceGeneral.Activo_Fijo.map((poliza, index) => (
                    <li  key={index}>
                      <div className="flex my-2">
                        <div className="basis-1/12">
                          {poliza.cuenta_id}
                        </div>
                        <div className="basis-8/12 grow">
                        {poliza.descripcion}
                        </div>
                        <div className="basis-3/12 w-full text-right mr-2">
                        {(Math.round(poliza.total * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>


              <div className="bg-white w-full mt-8 text-lg  font-semibold">
                Activo diferido
              </div>
              <div className="w-full">
                <ul>
                  {balanceGeneral.Activo_Diferido.map((poliza, index) => (
                    <li  key={index}>
                      <div className="flex my-2">
                        <div className="basis-1/12">
                          {poliza.cuenta_id}
                        </div>
                        <div className="basis-8/12 grow">
                        {poliza.descripcion}
                        </div>
                        <div className="basis-3/12 w-full text-right mr-2">
                        {(Math.round(poliza.total * 100) / 100).toLocaleString('es-MX', {
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
          </div>
          <div className=" basis-5/12 grow">
            <div className="flex flex-wrap mt-10">
              <div className="bg-white w-full text-lg  font-semibold">
                Pasivo
              </div>
              
              <div className="py-2 grow w-full">
                <div className="flex my-4 bg-[#0d5898] text-white p-2 ">
                  <div className="basis-1/12 w-full">
                    id
                  </div>
                  <div className="basis-8/12 w-full">
                    Concepto
                  </div>
                  <div className="basis-3/12 w-full text-right mr-2">
                    Cantidad
                  </div>
                </div>
              </div>
              <div className="w-full">
                <ul>
                  {balanceGeneral.Pasivo_Circulante.map((poliza, index) => (
                    <li  key={index}>
                      <div className="flex my-2">
                        <div className="basis-1/12">
                          {poliza.cuenta_id}
                        </div>
                        <div className="basis-8/12 grow">
                        {poliza.descripcion}
                        </div>
                        <div className="basis-3/12 w-full text-right mr-2">
                        {(Math.round(poliza.total * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white w-full mt-8 text-lg  font-semibold">
                Pasivo a largo plazo
              </div>
              {/* <div className="w-full">
                <ul>
                  {balanceGeneral.map((poliza, index) => (
                    <li  key={index}>
                      <div className="flex my-2">
                        <div className="basis-1/12">
                          {poliza.id}
                        </div>
                        <div className="basis-8/12 grow">
                        {poliza.descripcion}
                        </div>
                        <div className="basis-3/12 w-full text-right mr-2">
                        {poliza.cantidad}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}


              <div className="bg-white w-full mt-8 text-lg  font-semibold">
                Capital contable
              </div>
              <div className="w-full">
                <ul>
                  {balanceGeneral.Capital_Contable.map((poliza, index) => (
                    <li  key={index}>
                      <div className="flex my-2">
                        <div className="basis-1/12">
                          {poliza.cuenta_id}
                        </div>
                        <div className="basis-8/12 grow">
                        {poliza.descripcion}
                        </div>
                        <div className="basis-3/12 w-full text-right mr-2">
                        {(Math.round(poliza.total * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                      <div className="flex my-2">
                        <div className="basis-1/12">
                          
                        </div>
                        <div className="basis-8/12 grow font-bold">
                          Total Capital Contable
                        </div>
                        <div className="basis-3/12 w-full text-right mr-2">
                        {(Math.round(balanceGeneral.Totales.Total_Capital_Diferido * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                      </div>
              </div>

            </div>
          </div>
          <div className=" basis-1/12 "></div>
        </div>

        
        
        <div className="flex mt-8 gap-4">
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
</>
) }
</Fragment>);
}
               
               
               