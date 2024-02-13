import { Fragment, useEffect, useState } from "react";

import SelectContribuyente from "./SelectContribuyente";
import PanelBlanco from "./PanelBlanco.astro";
import FileUpload from "./forms/FileUpload";
import { getCookie } from "typescript-cookie";
export default function tablaRfcConstribuyentes(){
    
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user_type = getCookie('Type');
        user_type === "A" ? setIsAdmin(true) : false;

        console.log("Valor "+isAdmin);
    },[]);

    


return(
    <Fragment>
            {isAdmin  &&
                <>
                
                <SelectContribuyente nombre="account_id"/>
                <div className="bg-white p-4 rounded-md drop-shadow-lg mr-5">
                
                    <div className="chart-container p-4 min-h-52" >
                        <div className="grid w-full">
                            <div className="flex mb-5">
                                Carga archivos PDF para {isAdmin}:
                            </div>
                            <div className="flex flex-row text-center">
                                <div className="p-5 bg-slate-100 basis-full">
                                    Constancia de situación fiscal
                                    <FileUpload fileExtension={"pdf"} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Opinión de cumplimiento
                                    <FileUpload fileExtension={"pdf"} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Declaración mensual
                                    <FileUpload fileExtension={"pdf"} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                Delcaración anual
                                <FileUpload fileExtension={"pdf"} onUploadSuccess={true} />
                                </div>
                                <div className="p-5 bg-slate-100 basis-full">
                                    Consulta de saldos a favor
                                    <FileUpload fileExtension={"pdf"} onUploadSuccess={true} />
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                </>
             }

            { isAdmin  &&
                <>
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
                </>
             }
             </Fragment>
            )
};