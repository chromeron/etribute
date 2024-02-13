import { Fragment, useEffect, useState } from "react";
import  { END_POINT_BACKEND } from "../constants";
import Select from "react-select";
import { setCookie } from 'typescript-cookie'

export default function selectContribuyente({nombre}){
    
   const [contribuyentesList, setContribuyentesList] = useState<{ [key: number]: string }[]>([]);
   const [selectedOption, setSelectedOption] = useState(null);

   useEffect(() => {
    // Dentro de useEffect, puedes realizar operaciones asíncronas
    const fetchData = async () => {
      try {
        // Simular una llamada asíncrona a una API o cualquier operación asíncrona
        const response = await fetch(END_POINT_BACKEND+'/accounts');
        const data = await response.json();
        const arrayList = data.map((item: { account_id: number; account_name: string; }) => {
             return {
                 value: item.account_id,
                 label: item.account_name
               };
             });
        setContribuyentesList(arrayList);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llamar a la función para obtener datos cuando el componente se monte
    fetchData();
  }, []);

  const handleChange = (selectedOption: { value: any; }) => {
    // Almacenar el valor seleccionado en el estado
    setSelectedOption(selectedOption);
    console.log(selectedOption.value);
    // Establecer la cookie con el valor seleccionado
    //setCookie('Contribuyente', selectedOption.value);
  };

    
          
    

return(
  <Fragment>
    <Select id="contribuyentes" name={nombre} options={contribuyentesList} isClearable={true} placeholder={'Selecciona cliente'} value={selectedOption} onChange={handleChange}/>
      
  </Fragment>);
}