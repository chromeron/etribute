
import {  useState, Fragment, type FormEvent } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { getCookie } from "typescript-cookie";



function getFirstAndLastDayOfMonth(year, month) {
    // JavaScript months are zero-based, so January is 0 and December is 11
    const firstDay = formatDate(new Date(year, month, 1));
    const lastDay = formatDate(new Date(year, month + 1, 0)); // Setting day to 0 gets the last day of the previous month
  
    return {
      firstDay,
      lastDay
    };
  }

  

  //filter facturaEmitida from facturas object
  const filterEmitidas = (facturas) => facturas.Emitidas;
  const filterRecibidas = (facturas) => facturas.Recibidas;
    

  function formatDate(date) {
    const year = date.getFullYear();
    // Month is zero-based, so we add 1 to get the correct month
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export default function Polizas() {

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

    const { handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("Selecciona año y mes a consultar");
    const [facturasEmitidas, setFacturasEmitidas] = useState(null);
    const [facturasRecibidas, setFacturasRecibidas] = useState(null);

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [status, setStatus] = useState("INITIAL");
    // INITIAL , LOADING , LOADED, ERROR

    const handleChange = selectedOption => {
        setMonth(selectedOption.value);
        console.log(month);
      };

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        //e.preventDefault();
      
        setStatus('LOADING');
        const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);

        console.log(`first day of ${month}/${year} is ${firstDay}`);
        console.log(`last day of ${month}/${year} is ${lastDay}`);
        
        const contribuyente = JSON.parse(localStorage.getItem("contribuyenteActivo"));

        const payload = {
            rfc : contribuyente.rfc,
            cer_path : contribuyente.cer,
            key_path : contribuyente.key_value,
            clave : contribuyente.e_firma,
            initialDate : firstDay,
            finalDate : lastDay,
            token : getCookie("Authorization")
        }
        
        

        try{
            const response = await fetch(END_POINT_BACKEND+"/sat", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload),
            });

            if (response.status === 201 ){
                const response = await fetch(END_POINT_BACKEND+"/getFiles/test");
                
                if(response.ok){
                    const data = await response.json();
                    const facturasEmitidasFiltered = filterEmitidas(data);
                    const facturasRecibidasFiltered = filterRecibidas(data);

                    console.log(facturasEmitidasFiltered);
                    console.log(facturasRecibidasFiltered);
                    
                    setFacturasEmitidas(facturasEmitidasFiltered);
                    setFacturasRecibidas(facturasRecibidasFiltered);
                    console.log(data);
                }
                
                // console.log("facturasEmitidasFiltered");
                // console.log(facturasEmitidasFiltered);
                
                
              setStatus("LOADED");
            }else if (!response.ok){
              setMessage("Otro Erro al consultar documentos XML al portal del SAT, intente de nuevo");
              setStatus("ERROR");
            }
        }catch(err){
            
            setMessage("Error al consultar documentos XML al portal del SAT, intente de nuevo" );
            setStatus("ERROR");
        }
  
  
        console.log(status);
        if (status !="ERROR"){
            console.log("201 STATUS");
        }
        
      }
  
    

return(
  <Fragment>
    <div className="flex justify-center">
        <span className="pt-5 pb-12 text-xl text-[#062237] font-bold"> Selecciona año y mes a consultar </span>
    </div>
               
    
    <form  onSubmit={handleSubmit(submit)}>
        <div className="flex flex-row  space-x-10   items-center  text-center  justify-between mx-24">
            <div className="basis-1/3">
                <Select options={yearsList} isClearable={true} placeholder={'Selecciona año'} onChange={selectedOption => setYear(selectedOption.value)} />
            </div>
            <div className="basis-1/3">
                <Select name="monthSelected" options={monthsList} isClearable={true} placeholder={'Selecciona mes'} onChange={selectedOption => setMonth(String(selectedOption.value))}  />
            </div>
            <div className="basis-1/3">
                <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                    <span className="inline-block mr-2">Consultar</span>
                </button>
            </div>
            
        </div>
    </form>
    
    { status == "LOADING" && (
        <div className="flex justify-center py-20">
            <img src="https://e-tribute-client-files.s3.amazonaws.com/public/loader.gif" alt="loader" />
        </div>      
        ) }
    { status == "ERROR" && (
        <div className="flex justify-center py-20">
            <h1>{message}</h1>
        </div>
        ) }
    { status == "LOADED" && (
        <>
        {/* <div className="flex">
            <div className="basis-1/3">
                <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                    <span className="inline-block mr-2">Generar todas</span>
                </button>
            </div>
        </div> */}
        <div className="flex mx-24 mt-20">
            <div className="py-2 grow">
                <details className="group ">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none bg-slate-100 p-6">
                        <span> Facturas emitidas</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <div className="p-2">
                        <ul>
                            {facturasEmitidas.map((item, index) =>  (
                                
                                <li key={index}> 
                                    <div className="flex my-4">
                                            <div className="basis-2/12 ">
                                                <a href={item.url} target="_blank" className="bg-blue-300 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                                                    Ver XML
                                                    </a>
                                            </div>
                                            <div className="basis-2/12">
                                            {item.descripcion.fecha} 
                                            </div>
                                            <div className="basis-4/12">
                                            {item.descripcion.cliente}
                                            </div>
                                            <div className="basis-2/12">
                                            {item.descripcion.cantidad} 
                                            </div>
                                            <div className="basis-2/12 ">
                                                <a href="" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                                                    Generar Póliza
                                                </a>
                                            </div>
                                        </div>
                                </li>
                            
                            )) }
                            
                        </ul>
                    </div>
                </details>
            </div>
        </div>
        <div className="flex mx-24">
            <div className="py-2 grow">
                <details className="group ">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none bg-slate-100 p-6">
                        <span> Facturas recibidas</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <div className="p-2">
                    
                    <ul>
                    {facturasRecibidas.map((item, index) =>  (
                    
                        <li key={index}> 
                            <div className="flex my-4">
                                <div className="basis-2/12 ">
                                    <a href={item.url} target="_blank" className="bg-blue-300 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                                        Ver XML
                                        </a>
                                </div>
                                <div className="basis-2/12">
                                {item.descripcion.fecha} 
                                </div>
                                <div className="basis-4/12">
                                {item.descripcion.cliente}
                                </div>
                                <div className="basis-2/12">
                                {item.descripcion.cantidad} 
                                </div>
                                <div className="basis-2/12">
                                    <a href=""  className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 px-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                                        Generar Póliza</a>
                                </div>
                            </div>
                        </li>
                    
                    )) }
                    </ul>
                    
                    </div>
                </details>
            </div>
        </div>
        <div className="flex mx-24 mt-8">
            <div className="basis-2/3">
            </div>
            
            <div className="basis-1/3">
                <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center">
                    <span className="inline-block mr-2">
                        Generar Auxiliares  
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-right stroke-white" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5"  fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                            </svg>
                            </span>
                </button>
            </div>
            
        </div>
</>
) }
</Fragment>);
}
               
               
               