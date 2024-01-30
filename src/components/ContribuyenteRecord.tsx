
export  const ContribuyenteRecord = ({contribuyente}) => {

    //console.log(key)

    return(
                <div className="flex px-5">
                    <div className="w-[60%]">
                            <span className="text-gray-600 font-bold uppercase text-xs">{contribuyente.account_name}</span>
                        </div>
                        <div className="w-[20%]">
                            <span className="text-gray-600 font-bold uppercase text-xs">{contribuyente.rfc}</span>
                        </div>
                        <div className="w-[20%] inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil-plus" width="14" height="14" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                                <path d="M13.5 6.5l4 4" />
                                <path d="M16 19h6" />
                                <path d="M19 16v6" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="14" height="14" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </div>                    
                </div>
            )
     
   }