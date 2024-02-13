import { type FormEvent, useState, Fragment } from "react";
import  { END_POINT_BACKEND } from "../../constants";

export default function Form() {
    const [responseMessage, setResponseMessage] = useState({
      error: "",
      success: ""
    });
  
    async function submit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const json = JSON.stringify(Object.fromEntries(formData));
      const headers = new Headers()
      headers.set('Content-Type','application/json')
      
      const response = await fetch(END_POINT_BACKEND+"/eTribute/createUser", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Object.fromEntries(formData))
      });

      const data = await response.json();

      if (response.ok){
        const success = "Usuario nuevo creado, serás redirigido para iniciar su sesión" 
        setResponseMessage((prevState) => ({ ...prevState, success}));
        window.setTimeout(function(){

          // Move to a new location or you can do something else
          window.location.href = "/inicio";
  
      }, 5000);
      }else{
        const error = "Erro al crear cuenta, intente de nuevo" 
        setResponseMessage((prevState) => ({ ...prevState, error }));
      }
      
    }

return(
  <Fragment>
    {responseMessage.error && <p className="w-full bg-red-500 text-white p-3 rounded-md mb-2">{responseMessage.error}</p>}
    {responseMessage.success && <p className="w-full bg-green-500 text-white p-1 rounded mb-2">{responseMessage.success}</p>}
    <form onSubmit={submit}>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Nombres</label>
      <input type="text" name="user_name" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Apellido Paterno</label>
      <input type="text" name="user_lastname" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Apellido Materno</label>
      <input type="text" name="user_maternal_lastname" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Ciudad</label>
      <input type="text" name="user_city" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Teléfono</label>
      <input type="text" name="user_phone" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Correo</label>
      <input type="text" name="user_mail" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
      <input type="text" name="user_password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirmar Password</label>
      <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          <span className="inline-block mr-2">Crear cuenta</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
      </button>
  </form>
  </Fragment>);
}
               