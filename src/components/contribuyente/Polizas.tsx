import React, { useState, Fragment, useEffect} from "react";
import { END_POINT_BACKEND } from "../../constants";
import { useContabilidadStore } from "../stores/ContabilidadState";

const filterEmitidas = (facturas) => facturas.Emitidas ? facturas.Emitidas : [];
const filterRecibidas = (facturas) => facturas.Recibidas ? facturas.Recibidas : [];


export default function Polizas({initialDate, finalDate}) {

    const setContabilidadState = useContabilidadStore((state) => state.setContabilidadState);
    
    const [message, setMessage] = useState("Selecciona año y mes a consultar");
    const [facturasEmitidas, setFacturasEmitidas] = useState([]);
    const [facturasRecibidas, setFacturasRecibidas] = useState([]);
    const [linkBack, setLinkBack] = useState(null);
    const [status, setStatus] = useState("INITIAL");

    const contribuyente = JSON.parse(localStorage.getItem("contribuyenteActivo"));
    

    useEffect(() => {
        const fetchCuentas = async () => {
            setStatus('LOADING');
            
            const body = new URLSearchParams({
                rfc: contribuyente.rfc,
                initial_date: initialDate,
                final_date: finalDate
            });

            try {
                const response = await fetch(END_POINT_BACKEND + "/policy/", {
                    method: "POST",
                    body: body
                });

                if (response.status === 204) {
                    setMessage("No hay facturas en el periodo seleccionado");
                    setStatus("ERROR");
                    return;
                } 

                    const data = await response.json();
                    console.log("Emitidas");
                    console.log(data.Emitidas);
                    console.log("Recibidas");
                    console.log(data.Recibidas);
                    if (data.Emitidas){ setFacturasEmitidas(data.Emitidas);}
                    if (data.Recibidas){ setFacturasRecibidas(data.Recibidas);}
                    setStatus("LOADED");
                

                
            } catch (err) {
                setMessage("Error al consultar documentos XML al portal del SAT, intente de nuevo");
                setStatus("ERROR");
            }
        };

        fetchCuentas();
    }, []);

    return (
        <Fragment>
            <div className="flex justify-center mt-16">
                <span className="mb-3 text-xl text-[#062237] font-bold"> Facturas emitidas y recibidas</span>
            </div>

            {status === "LOADING" && (
                <div className="flex justify-center py-20">
                    <img src="https://e-tribute-client-files.s3.amazonaws.com/public/loader.gif" alt="loader" />
                </div>
            )}

            {status === "ERROR" && (
                <div className="flex justify-center p-10 rounded text-xl">
                    <h3 className="text-red-400 space-x-2">{message}</h3>
                </div>
            )}

            {status === "LOADED" && (
                <Fragment>
                    {/* Facturas Emitidas */}
                    <div className="flex mx-24 text-sm">
                        <div className="py-2 grow">
                            <details className="group ">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none bg-slate-100 p-6">
                                    <span> Facturas emitidas</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="p-2">
                                    <ul>
                                        {facturasEmitidas?.map((item, index) => (
                                            <li key={index}>
                                                <div className="flex my-4">
                                                    <div className="basis-2/12 ">
                                                        <a href={item.url_xml} target="_blank" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg shadow-sm hover:shadow-md font-semibold text-center">
                                                            Ver XML
                                                        </a>
                                                    </div>
                                                    <div className="basis-2/12">
                                                        {item.descripcion.fecha}
                                                    </div>
                                                    <div className="basis-4/12">
                                                        {item.descripcion.cliente}
                                                    </div>
                                                    <div className="basis-2/12 pr-4 text-right">
                                                        {(Math.round(item.descripcion.cantidad * 100) / 100).toLocaleString('es-MX', {
                                                            style: 'currency',
                                                            currency: 'MXN'
                                                        }) ?? "$ 0.00"}
                                                    </div>
                                                    <div className="basis-2/12 ">
                                                        <a href={item.url_pdf} aria-disabled="true" className="bg-blue-400 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg shadow-sm hover:shadow-md font-semibold text-center">
                                                            Ver Póliza
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </div>
                    </div>

                    {/* Facturas Recibidas */}
                    <div className="flex mx-24 text-sm">
                        <div className="py-2 grow">
                            <details className="group ">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none bg-slate-100 p-6">
                                    <span> Facturas recibidas</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="p-2">
                                    <ul>
                                        {facturasRecibidas?.map((item, index) => (
                                            <li key={index}>
                                                <div className="flex my-4">
                                                    <div className="basis-2/12">
                                                        <a href={item.url_xml} target="_blank" className="bg-blue-300 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg shadow-sm hover:shadow-md font-semibold text-center">
                                                            Ver XML
                                                        </a>
                                                    </div>
                                                    <div className="basis-2/12">
                                                        {item.descripcion.fecha}
                                                    </div>
                                                    <div className="basis-4/12">
                                                        {item.descripcion.cliente}
                                                    </div>
                                                    <div className="basis-2/12  text-right pr-">
                                                        {(Math.round(item.descripcion.cantidad * 100) / 100).toLocaleString('es-MX', {
                                                            style: 'currency',
                                                            currency: 'MXN'
                                                        }) ?? "$ 0.00"}
                                                    </div>
                                                    <div className="basis-2/12">
                                                        <a href={item.url_pdf} aria-disabled="true" className="bg-blue-400 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg shadow-sm hover:shadow-md font-semibold text-center">
                                                            Ver Póliza
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </div>
                    </div>
                </Fragment>
            )}
            {/* Link Back */}
            <div className="flex mx-24 mt-8">
                <div className="basis-2/6">
                    <button onClick={() => setContabilidadState("LOADED")} className=" bg-[#0d5898] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg shadow-sm hover:shadow-md font-semibold flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-left stroke-white mx-1" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" />
                        </svg>
                        <span className="mr-2">Regresar a menú contable</span>
                    </button>
                </div>
                <div className="basis-4/6"></div>
            </div>
        </Fragment>
    );
}
