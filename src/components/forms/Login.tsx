import {  useState, Fragment } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { setCookie } from 'typescript-cookie'
import { useForm } from "react-hook-form";


export default function Form() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [responseMessage, setResponseMessage] = useState("");
  
    const submit = async (formData: any) => {
      console.log(formData)
      const user_name = formData.email;
      const password = formData.password;
      const json = btoa(user_name+":"+password);
      console.log(json);

      
      const response = await fetch(END_POINT_BACKEND+"/login/"+json);

      if (!response.ok){
        setResponseMessage("Usuario o contraseña incorrectas, intenta de nuevo");
      } else{

        setResponseMessage("");
        const data = await response.json();

        setCookie("Authorization", data.token);
        setCookie("User", data.user_id);
        setCookie("Type", data.user_type);
        console.log(document.cookie);
        window.location.href = "/dashboard" 
      }
      
    }

return(
  <Fragment>
    {responseMessage && <p className="w-full bg-red-400 text-white p-3 rounded mb-2">{responseMessage}</p>}
    <form onSubmit={handleSubmit(submit)}>
      <div className="my-3">
        <label className="font-semibold text-sm text-gray-600 pb-1 block">Correo</label>
        <input type="text" {...register("email", {required: true})} className="border rounded-lg px-3 py-2 text-sm w-full" />
        {errors.email?.type === "required" && (
          <span className="text-xs text-red-400">* Email es requerido</span>
        )}
      </div>

      <div className="mt-3 mb-8">
        <label className="font-semibold text-sm text-gray-600 pb-1 block">Contraseña</label>
        <input type="text" {...register("password", {required: true})} className="border rounded-lg px-3 py-2 text-sm w-full" />
        {errors.password?.type === "required" && (
          <span className="text-xs text-red-400">* Password es requerido</span>
        )}
      </div>

      
      
      <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          <span className="inline-block mr-2">Iniciar sesión</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
      </button>
  </form>
  </Fragment>);
}
               