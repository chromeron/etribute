import { type FormEvent, useState, Fragment, useEffect } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useContribuyenteStore } from "../stores/contribuyentesStore";
import Select from "react-select"
import { getCookie } from "typescript-cookie";
import FileUpload from "./FileUpload";

const user = getCookie('User');

//typescript interface for regimens 
// interface regimens{
//     value: string;
//     label: string;    
// }

export default function Form() {


  const [responseErrorMessage, setResponseErrorMessage] = useState("");
    const [responseSuccessMessage, setResponseSuccessMessage] = useState("");
    const [regimenes, setRegimenes] = useState<{ [key: string]: string }[]>([]);
    const [fileCer, setFileCer] = useState("");
    const [fileKey, setFileKey] = useState("");
    const addContribuyente =  useContribuyenteStore((state) => state.addContribuyente);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(END_POINT_BACKEND+'/regimens'); 
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
      formData.append( 'cer', fileCer );
      formData.append( 'key_value', fileKey );
      formData.append( 'user_id', user );

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

    const handleCerUploadSuccess = (data: string) => {
      // Handle uploaded data in the parent component
      setFileCer(data);
    };

    const handleKeyUploadSuccess = (data: string) => {
      setFileKey(data);
    };


    const ruta = `contribuyente/files/${user}`

    

return(
  <Fragment>
    {responseErrorMessage && <p className="w-full bg-red-500 text-white p-1 rounded mb-2">{responseErrorMessage}</p>}
    {responseSuccessMessage && <p className="w-full bg-green-700 text-white p-1 rounded mb-2">{responseSuccessMessage}</p>}
    <form onSubmit={submit} className="w-full gap-10">
      <input type="text" name="account_name" className="placeholder:italic placeholder:text-slate-400 border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="Nombre del contribuyente"/>
      <input type="text" name="rfc" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="RFC"/>
      <Select name="regimen" options={regimenes} isClearable={true} placeholder={'Selecciona Régimen fiscal'} />
      <input type="password" name="e_firma" className="border rounded-lg px-3 py-2 mt-5 mb-5 text-sm w-full" placeholder="Contraseña e-Firma"/>
      <h2 className="text-gray-600 text-lg font-semibold pb-4 pt-8">Ingresa los archivos de tu e-Firma</h2>
      <div className="flex flex-row space-x-8">
        
        <div className="w-1/2 py-3 place-items-center">
          <FileUpload fileExtension={"cer"} ruta={ruta} onUploadSuccess={handleCerUploadSuccess} />
        </div>
        <div className="w-1/2 py-3">
          <FileUpload fileExtension={"key"} ruta={ruta} onUploadSuccess={handleKeyUploadSuccess} />
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
               