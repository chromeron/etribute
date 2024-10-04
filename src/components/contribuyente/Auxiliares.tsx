
import { useState, Fragment, useEffect, type FormEvent } from "react";
import { END_POINT_BACKEND } from "../../constants";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useContabilidadStore } from "../stores/ContabilidadState";

export default function Auxiliares({accountId, initialDate, finalDate}) {
  
  const setContabilidadState = useContabilidadStore((state) => state.setContabilidadState);
  
  const [cuentas, setCuentas] = useState([]);
  const [cuentaList, setCuentaList] = useState([]);
  const [tableHeader, setTableHeader] = useState(null);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState("");
  const [status, setStatus] = useState("INITIAL");
  const [message, setMessage] = useState("Selecciona año y mes a consultar");
  const { handleSubmit, formState: { errors } } = useForm();

  const contribuyente = JSON.parse(localStorage.getItem("contribuyenteActivo"));

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const response = await fetch(`${END_POINT_BACKEND}/auxiliar/${accountId}/${initialDate}/${finalDate}`);
        if (response.ok) {
          const data = await response.json();
          const cuentas = data.cuentas.map(item => ({
            value: item.cuenta,
            label: item.concepto
          }));
          setCuentas(cuentas);
        } else if (response.status === 204) {
          throw new Error('No contiene valores');
        }
      } catch (error) {
        console.error('Hubo un problema con la solicitud: ', error);
      }
    };

    // Llamada a la función para realizar la solicitud una vez que el componente se monta
    fetchCuentas();
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    if (!cuentaSeleccionada) {
      setStatus("ERROR")
    } else {
      try {
        const response = await fetch(END_POINT_BACKEND + "/auxiliarTable/" + cuentaSeleccionada+"/"+initialDate+"/"+finalDate);
        if (response.ok) {
          const data = await response.json();
          setCuentaList(data.body)
          setTableHeader(data.header)
        }
        setStatus("LOADED");
      } catch (err) {
        setMessage("Error al consultar documentos XML al portal del SAT, intente de nuevo");
        setStatus("ERROR");
      }
    }
  }
    

return(
  <Fragment>
    <div className="flex justify-center mt-16">
                <span className="mb-3 text-xl text-[#062237] font-bold"> Auxiliares </span>
            </div>
               
    
    <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-row  space-x-10   items-center  text-center  justify-between mx-24">
        <div className="basis-1/6">
                Cuenta: 
            </div>
            <div className="basis-4/6">
                <Select options={cuentas} isClearable={false} placeholder={'Selecciona el tipo de cuenta'} onChange={selectedOption => setCuentaSeleccionada(selectedOption.value)} />
            </div>
            <div className="basis-1/6">
                <button type="submit" className="transition duration-200 bg-[#0d5898] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                    <span className="inline-block mr-2">Consultar</span>
                </button>
            </div>
            
        </div>
    </form>
    
    
    { status == "LOADED" && (
        <>
        <div className="flex mx-24 mt-10">
            <div className="py-2 grow text-sm">
              <div className="flex my-4  bg-[#0d5898] text-white p-2 rounded">
                <div className="basis-2/12 ">
                    Cuenta
                </div>
                <div className="basis-6/12">
                  Nombre
                </div>
                <div className="basis-1/12 text-right">
                  Saldo Inicial
                </div>
                <div className="basis-1/12 text-right">
                  Debe
                </div>
                <div className="basis-1/12 text-right">
                  Haber
                </div>
                <div className="basis-1/12 text-right">
                  Saldo Final
                </div>
              </div>
              <ul>
                    <li> 
                      <div className="flex my-4">
                        <div className="basis-2/12 ">
                          {tableHeader.cuenta}
                        </div>
                        <div className="basis-6/12">
                          {tableHeader.nombre}
                        </div>
                        <div className="basis-1/12 text-right">
                        {(Math.round(tableHeader.saldoInicial * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                        <div className="basis-1/12 text-right">
                        {(Math.round(tableHeader.debe * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                        <div className="basis-1/12 text-right">
                          {(Math.round(tableHeader.haber * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                        <div className="basis-1/12 text-right">
                          {(Math.round(tableHeader.saldoFinal * 100) / 100).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                          }) ?? "$ 0.00"}
                        </div>
                      </div>
                    </li>
              </ul>
            </div>
        </div>
        <div className="flex mx-24 mt-10">
            <div className="py-2 grow text-sm">
              <div className="flex my-4 bg-[#0d5898] text-white p-2 rounded">
                <div className="basis-2/12 ">
                    Fecha
                </div>
                <div className="basis-2/12">
                Póliza
                </div>
                <div className="basis-2/12">
                Referencia
                </div>
                <div className="basis-3/12">
                Descripción
                </div>
                <div className="basis-1/12 text-right">
                Debe
                </div>
                <div className="basis-1/12 text-right">
                Haber
                </div>
                <div className="basis-1/12 text-right">
                Saldo Final
                </div>
              </div>
              <ul>
                {cuentaList.map( (cuenta, index) => (
                    <li key={index}> 
                    <div className="flex my-4">
                            <div className="basis-2/12 ">
                                {cuenta.fecha} 
                            </div>
                            <div className="basis-2/12">
                            {cuenta.poliza} 
                            </div>
                            <div className="basis-2/12">
                            {cuenta.referencia}
                            </div>
                            <div className="basis-3/12">
                            {cuenta.descripcion}
                            </div>
                            <div className="basis-1/12 text-right">
                              {(Math.round(cuenta.debe * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>
                            <div className="basis-1/12 text-right">
                              {(Math.round(cuenta.haber * 100) / 100).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                              }) ?? "$ 0.00"}
                            </div>
                            <div className="basis-1/12 text-right">
                              {(Math.round(cuenta.total * 100) / 100).toLocaleString('es-MX', {
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
    )}
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
               
               
               