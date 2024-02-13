import { type FormEvent, useState, Fragment, useRef, useEffect } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useContribuyenteStore } from "../stores/contribuyentesStore";
import Select from "react-select"

let user = document.cookie.replace(/(?:(?:^|.*;\s*)User\s*\=\s*([^;]*).*$)|^.*$/, "$1");

//typescript interface for regimens 
interface regimens{
    value: string;
    label: string;    
}

export default function Form() {
    const [responseErrorMessage, setResponseErrorMessage] = useState("");
    const [responseSuccessMessage, setResponseSuccessMessage] = useState("");
    const [regimenes, setRegimenes] = useState<{ [key: string]: string }[]>([]);
    const addContribuyente =  useContribuyenteStore((state) => state.addContribuyente);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(END_POINT_BACKEND+'/regimens'); // Replace with your URL
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }

          const jsonData = await response.json();
          const json = jsonData as { regimen_id: string; descripcion: string }[];

          const arrayList = json.map(item => {
            return {
              value: item.regimen_id,
              label: item.descripcion
            };
          });
          console.log(arrayList);
          setRegimenes(arrayList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the fetch function
    },[]) // Empty dependency array: fetch only on initial render
    
    async function submit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      

      const formData = new FormData(e.target as HTMLFormElement);
      const json = JSON.stringify(Object.fromEntries(formData));
      const headers = new Headers()
      headers.set('Content-Type','application/json')
      
      const response = await fetch(END_POINT_BACKEND+"/accounts", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Object.fromEntries(formData))
      });

      const data = await response.json();
      
      if (response.ok){
        
        addContribuyente(data);
        setResponseSuccessMessage("Contribuyente añadido");
        setResponseErrorMessage("");

            window.setTimeout(function(){

              setResponseSuccessMessage("");
              setResponseErrorMessage("");
      
          }, 4000);

      }else{
        setResponseSuccessMessage("");
        setResponseErrorMessage("Erro al registra contribuyente, intente de nuevo" );
      }

      
    }

    

return(
  <Fragment>
    {responseErrorMessage && <p className="w-full bg-red-500 text-white p-1 rounded mb-2">{responseErrorMessage}</p>}
    {responseSuccessMessage && <p className="w-full bg-green-700 text-white p-1 rounded mb-2">{responseSuccessMessage}</p>}
    <form onSubmit={submit} className="w-full gap-10">
      <input type="text" name="account_name" className="placeholder:italic placeholder:text-slate-400 border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="Nombre del contribuyente"/>
      <input type="text" name="rfc" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="RFC"/>
      <Select name="regimen" options={regimenes} isClearable={true} placeholder={'Selecciona Régimen fiscal'} />
      <input type="hidden" name="cer" value="urlDeArchivoCER" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
      <input type="hidden" name="key_value" value="urlDeArchivoKEY" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <input type="hidden" name="e_firma" value="password_e_firma" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <input type="hidden" name="user_id" value={user} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
      <h2 className="text-gray-600 text-lg font-semibold pb-4 pt-8">Ingresa los archivos de tu e-Firma</h2>
      <div className="flex flex-row space-x-8">
        
        <div className="w-1/2 py-3">
          <div className="relative h-48 rounded-lg border-dashed border-2 border-blue-200 bg-gray-100 flex justify-center items-center">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-upload" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <path d="M12 11v6" />
                  <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
                </svg>
                <span className="block text-gray-400 font-normal text-center">Seleccionar <br/>archivo .Cer</span>
              </div>
            </div>
            <input type="file" className="h-full w-full opacity-0" name="" />
          </div>
        </div>
        
        <div className="w-1/2 py-3">
          <div className="relative h-48 rounded-lg border-dashed border-2 border-blue-200 bg-gray-100 flex justify-center items-center">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-upload" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <path d="M12 11v6" />
                  <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
                </svg>
                <span className="block text-gray-400 font-normal">Archivo .Key</span>
              </div>
            </div>
            <input type="file" className="h-full w-full opacity-0" name="" />
          </div>
        </div>
      </div>
      <div className="text-right">
        <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-32 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center  w-full">
            <span className="inline-block mr-2">Registrar RFC</span>
        </button>
      </div>
        
  </form>
  </Fragment>);
}
               