import { type FormEvent, useState, Fragment } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import type { APIRoute } from "astro";
import { setCookie } from 'typescript-cookie'


export default function Form() {
    const [responseMessage, setResponseMessage] = useState("");
  
    async function submit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      //const email = formData.get("email");
      const user_name = formData.get("email");
      const password = formData.get("password");
      const json = btoa(user_name+":"+password);
      console.log(json);

      
      const response = await fetch(END_POINT_BACKEND+"/login/"+json);

      if (response.ok){
        setResponseMessage("");
        const data = await response.json();

        setCookie("Authorization", data.token);
        setCookie("User", data.user_id);
        setCookie("Type", data.user_type);
        console.log(document.cookie);
        window.location.href = "/dashboard"
      }else{
        const data = await response.json();
        console.log(data);
        if (data.message) {
          setResponseMessage(data.message);
        }
      }
      
    }

return(
  <Fragment>
    {responseMessage && <p className="w-full bg-red-500 text-white p-1 rounded mb-2">{responseMessage}</p>}
    <form onSubmit={submit}>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Correo</label>
      <input type="text" name="email" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Contraseña</label>
      <input type="password" name="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          <span className="inline-block mr-2">Iniciar sesión</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
      </button>
  </form>
  </Fragment>);
}
               