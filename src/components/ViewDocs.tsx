import { Fragment, useEffect, useState } from "react";

import FileUpload from "./forms/FileUpload";
import { getCookie } from "typescript-cookie";
import { useContribuyenteStore } from "./stores/contribuyentesStore";


    

export default function tablaRfcConstribuyentes(){
    
    //const usuario =  JSON.parse(localStorage.getItem("contribuyenteActivo"));
    const [isAdmin, setIsAdmin] = useState(false);
    const [contribuyenteActivo, setContribuyenteActivo] = useState("");
    let contribuyenteActivoMenu = useContribuyenteStore((state) => state.contribuyenteActivo);


    useEffect(() => {
        const user_type = getCookie('Type');
        user_type == "A" ? setIsAdmin(true) : false;

        //console.log("Valor initial "+isAdmin);
        console.log(contribuyenteActivo);
        const data = localStorage.getItem('contribuyenteActivo');
        if (data){
          const parsedData = JSON.parse(data)
          setContribuyenteActivo(parsedData);
          console.log(contribuyenteActivo)
          //setSelectedOption({ value: parsedData.account_id, label: parsedData.account_name });
        }
    },[]);

    useEffect(() => {
        const user_type = getCookie('Type');
        user_type == "A" ? setIsAdmin(true) : false;
        
        //console.log("Valor "+isAdmin);
    },[]);

return(
    <Fragment> 
        <h1 className="pt-4 pl-5 text-white font-bold text-2xl ">SAT DOCS / { contribuyenteActivoMenu &&  (contribuyenteActivoMenu.account_name )}
        </h1>
		<div className="grid grid-cols-1 gap-4 mt-2 p-4">
		
            {isAdmin  &&
                <>
                    <div className="bg-white p-4 rounded-md drop-shadow-lg mr-5">
                
                    <div className="chart-container p-4 min-h-52" >
                        <div className="grid w-full">
                            <div className="flex mb-5">
                                Carga archivos PDF para {isAdmin}:
                            </div>
                            <div className="flex flex-row text-center">
                                <div className="p-5 bg-slate-100 basis-full">
                                    Constancia de situación fiscal
                                    <FileUpload fileExtension={"pdf"} ruta={"test/otro"} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Opinión de cumplimiento
                                    <FileUpload fileExtension={"pdf"} ruta={""} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Declaración mensual
                                    <FileUpload fileExtension={"pdf"} ruta={""} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                Delcaración anual
                                <FileUpload fileExtension={"pdf"} ruta={""} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Consulta de saldos a favor
                                    <FileUpload fileExtension={"pdf"} ruta={""} onUploadSuccess={true} />
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                </>
             }

            
                    <div className="bg-white p-4 rounded-md drop-shadow-lg mr-5">
                
                    <div className="chart-container p-4 min-h-52" >
                        <div className="grid w-full">
                            <div className="flex mb-5">
                                Visualización de archivos PDF:
                            </div>
                            <div className="flex flex-row text-center">
                                <div className="p-5 bg-slate-100 basis-full">
                                    Constancia de situación fiscal
                                    <div className="">
                                    </div>
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Opinión de cumplimiento
                                    <div className="">
                                    </div>
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Declaración mensual
                                    <div className="">
                                    </div>
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                Delcaración anual
                                    <div className="">
                                    </div>
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Consulta de saldos a favor
                                    <div className="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                
             </div>
             </Fragment>
            )
};