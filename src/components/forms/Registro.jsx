import { useState, Fragment } from "react";
import  { END_POINT_BACKEND } from "../../constants";
import { useForm } from "react-hook-form";

export default function Form() {
    const [responseMessage, setResponseMessage] = useState({
      error: "",
      success: ""
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Utiliza watch para observar los valores de los campos de contraseña
    const password = watch("user_password");
    const confirmPassword = watch("user_password_confirmation");
  
    const submit = async (formData) => {
      
      const response = await fetch(END_POINT_BACKEND+"/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });


      if (!response.ok){
        const error = "Erro al crear cuenta, intente de nuevo" 
        setResponseMessage((prevState) => ({ ...prevState, error }));
      }

      const success = "Usuario nuevo creado, serás redirigido para iniciar su sesión" 
      setResponseMessage((prevState) => ({ ...prevState, success}));
      window.setTimeout(function(){
        window.location.href = "/";
      }, 5000);
      
    }

return(
  <Fragment>
    {responseMessage.error && <p className="w-full bg-red-500 text-white p-3 rounded-md mb-2">{responseMessage.error}</p>}
    {responseMessage.success && <p className="w-full bg-green-500 text-white p-1 rounded mb-2">{responseMessage.success}</p>}
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex">
        <div className="w-1/2">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
          Nombres 
          </label>
        </div>
        <div className="w-1/2 text-red-400 text-right">
          {errors.user_name?.type === "required" && (
            <span className="text-xs">* Nombre(s) es requerido</span>
          )}
        </div>
      </div>
      <input type="text" {...register("user_name", {required: true, maxLength: 80})} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
      
      <div className="flex flex-wrap ">
        <div className="w-1/2 pr-4 mb-6">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Apellido Paterno</label>
          <input type="text" {...register("user_lastname", {required: true, maxLength: 80})} className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full" />
          {errors.user_lastname?.type === "required" && (
            <span className="text-xs text-red-400">* Apellido paterno es requerido</span>
          )}
        </div>
        <div className="w-1/2 pl-4 mb-3">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Apellido Materno</label>
          <input type="text" {...register("user_maternal_lastname", {required: true, maxLength: 80})} className="border rounded-lg px-3 py-2 mt-1 mb-1s text-sm w-full" />
          {errors.user_maternal_lastname?.type === "required" && (
            <span className="text-xs text-red-400">* Apellido materno es requerido</span>
          )}
        </div>
      </div>
      
  

      <div className="flex flex-wrap ">
        <div className="w-1/2 pr-4 mb-6">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Ciudad</label>
          <input type="text" {...register("user_city", {required: true})} className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full" />
          {errors.user_city?.type === "required" && (
            <span className="text-xs text-red-400">* Ciudad es requerido</span>
          )}
        </div>
        <div className="w-1/2 pl-4 mb-3">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Teléfono</label>
          <input type="text"  {...register("user_phone", {required: true})} className="border rounded-lg px-3 py-2 mt-1 mb-1s text-sm w-full" />
          {errors.user_phone?.type === "required" && (
            <span className="text-xs text-red-400">* Teléfono requerido</span>
          )}
        </div>
      </div>
      
      <div className="flex">
        <div className="w-1/2">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Correo 
          </label>
        </div>
        <div className="w-1/2 text-red-400 text-right">
          {errors.user_mail?.type === "required" && (
            <span className="text-xs">* Correo es requerido</span>
          )}
          {errors.user_mail?.type === "pattern" && (
            <span className="text-xs">* El formato del correo es incorrecto</span>
          )}
        </div>
      </div>
      <input type="text" {...register("user_mail", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

      <div className="flex flex-wrap ">
        <div className="w-1/2 pr-4 mb-6">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
          <input type="text" {...register("user_password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
})} className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full" />
          {errors.user_password?.type === "required" && (
            <span className="text-xs text-red-400">* Password es requerido</span>
          )}
          {errors.user_password?.type === "pattern" && (
            <span className="text-xs text-red-400">* La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números</span>
          )}
        </div>
        <div className="w-1/2 pl-4 mb-3 ">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirmar password</label>
          <input type="text"  {...register("user_password_confirmation", {required: true})} className="border rounded-lg px-3 py-2 mt-1 mb-1s text-sm w-full" />
          {errors.user_password_confirmation?.type === "required" && (
            <p className="text-xs text-red-400">* Confirmar password es requerido</p>
          )}
          {password !== confirmPassword && <span className="text-xs">* Las contraseñas no coinciden</span>}
        </div>
      </div>
    
      <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          <span className="inline-block mr-2">Crear cuenta</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
      </button>
  </form>
  </Fragment>);
}
               