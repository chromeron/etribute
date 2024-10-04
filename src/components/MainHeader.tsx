import { getCookie } from 'typescript-cookie'
import { useEffect, useState } from "react";
import Select from "react-select";
import { useContribuyenteStore } from "./stores/contribuyentesStore";

export default function MainHeader() {

    const usuario = getCookie("UserName");
    const contribuyentes = useContribuyenteStore((state) => state.contribuyentes);
    const fetchContribuyente = useContribuyenteStore((state) => state.fetchContribuyentes);
    const filterContribuyentesByAccountId = useContribuyenteStore((state) => state.filterContribuyentesByAccountId);
    
    const [contribuyentesList, setContribuyentesList] = useState<{ value: string; label: string; }[]>([]);
    const [selectedOption, setSelectedOption] = useState<any>("");

   

    useEffect(() => {
        fetchContribuyente();
        const data = localStorage.getItem('contribuyenteActivo');
        if (data){
          const parsedData = JSON.parse(data)
          setSelectedOption({ value: parsedData.account_id, label: parsedData.rfc });
        }
        
    }, []);

    useEffect(() => {
      
        const arrayList = contribuyentes.map((item: { account_id: string; rfc: string; }) => ({
            value: item.account_id,
            label: item.rfc
        }));
        setContribuyentesList(arrayList);


    }, [contribuyentes]);

    const handleChange = (selectedOption: any) => {
      console.log(selectedOption);
        setSelectedOption(selectedOption);
        filterContribuyentesByAccountId(selectedOption);
    };

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        width: 250, // Specify width
        height: 30, 
      }),
      menu: (provided, state) => ({
        ...provided,
        overflowY: 'auto', // Enable vertical scroll if content exceeds height
      }),
    };

  return(
    <header className="p-2 flex items-center fixed top-0 w-full justify-between z-10 shadow-sm text-lg text-blue-100 bg-[#062237]">
      <div id="panelIcon" className="flex flex-grow basis-0   mx-1 pl-1">
        <button id="collapse">  
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-sidebar-left-collapse" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#DBEAFE" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M9 4v16" />
            <path d="M15 10l-2 2l2 2" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-sidebar-left-expand hidden" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#DBEAFE" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M9 4v16" />
            <path d="M14 10l2 2l-2 2" />
          </svg>
        </button> 
      </div>

      <div className="flex flex-grow basis-0 justify-center">
          <img src="https://e-tribute-client-files.s3.amazonaws.com/public/home/favicon.jpeg" width="28" height="28" className="mx-1" /> 
          <span>eTribute</span> 
      </div>

      <div className="flex flex-grow justify-end basis-0  text-[#0d5898]">
        <div className='flex'>
        <Select options={contribuyentesList} 
                isClearable={false} 
                placeholder={'Contribuyente...'} 
                value={selectedOption} 
                styles={customStyles}
                onChange={(selection) => handleChange(selection)}/>
          <div  className='flex place-items-center px-1 ml-4 text-white'>
            <span className="px-2 text-sm">{usuario}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle stroke-white" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg> 
          </div>
          

        </div>
             
      </div>
  </header>  
          )
   
 }



  

 
//   document.addEventListener('astro:page-load', () => {
//     const panelButton = document.getElementById('collapse');
//     panelButton.addEventListener('click', () => {
//     const sidebar = document.getElementById('sidebar');
//     const mainContent = document.getElementById('mainContainer');
//     const labels = sidebar?.querySelectorAll('span');
//     //const buttons = sidebar?.querySelectorAll('button');

//     if (sidebar?.classList.contains('w-60')) {
//           //sidebar?.classList.remove("-translate-x-60") 
//           //sidebar?.classList.add("-translate-x-none") 
//           sidebar?.classList.remove( 'w-60', 'min-w-48');
//           sidebar?.classList.add('w-16');
//           mainContent?.classList.remove ('md\:pl-64');
//           mainContent?.classList.add ('sm\:pl-24');

//         } else {
//           //sidebar?.classList.add("-translate-x-60");
//           //sidebar?.classList.remove("-translate-x-none");  
//             sidebar?.classList.remove('w-16');
//             sidebar?.classList.add('w-60','min-w-48');
//             mainContent?.classList.add ('md\:pl-64');
//         }

        
//         labels?.forEach(label => label.classList.toggle('opacity-0'));
//   });
  
//   const iconSideBar = document.getElementById('panelIcon');
//   const toggleMenuIcons = iconSideBar?.querySelectorAll('svg');


//   iconSideBar?.addEventListener('click',() => (
//     toggleMenuIcons?.forEach(toggleMenuIcon => toggleMenuIcon.classList.toggle('hidden') )
//   ))
// });
