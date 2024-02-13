import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

interface FileUploaderProps {
    fileExtension: string;
    onUploadSuccess: (imageUrl: string) => void;
  }

export default function MyDropzone<FileUploaderProps>({ fileExtension, onUploadSuccess }) {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileLink, setfileLink] = useState("");

    const onDrop = async (acceptedFiles: string | any[]) => {
        if (acceptedFiles.length === 1 && acceptedFiles[0].name.endsWith(`.${fileExtension}`)) {
            // Aquí puedes realizar cualquier acción con el archivo subido, como enviarlo a un servidor
            console.log('Archivo subido:', acceptedFiles[0]);
            const file = acceptedFiles[0];

            // const formData = new FormData();
            // formData.append('file', file);
           
            
              const formData = new FormData();
              formData.append("key", "test/image/test.pdf");
              formData.append("content-type", fileExtension);
            try{
              const response = await fetch("/api/aws/upload", {
                method: "POST",
                body: formData,
              });
              if (response.ok){
                const result = await response.json();
                const {fileLink, signedUrl} = result.uploadUrl;
                console.log(signedUrl);
                const aws_response = await fetch(signedUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/"+fileExtension,
                      },
                    body: file,
                  });
                  if (!aws_response.ok){
                    alert("Error al subir archivo");
                  } 
                
                setfileLink(fileLink);
                // Deshabilitar el componente después de subir un archivo
                     setFileUploaded(true);
              }
              //const result = await response.json();
              
            }  catch(err){
              alert("Ocurrió un error al intentar subir la imagen");
              //console.log(err)
            }
            // try {
            //     // Enviar la solicitud POST al servidor
            //     const response = await fetch('URL_DEL_SERVIDOR', {
            //     method: 'POST',
            //     body: formData,
            //     });

            //     if (response.ok) {
            //      // Obtener la URL de la imagen subida desde la respuesta del servidor
                    // const { imageUrl } = await response.json();

                    // // Llamar a la función proporcionada por el componente padre con la URL de la imagen
                    // onUploadSuccess(imageUrl);

                    // // Deshabilitar el componente después de subir un archivo
                     //setFileUploaded(true);
            //     } else {
            //     console.error('Error al subir el archivo al servidor.');
            //     }
            // Deshabilitar el componente después de subir un archivo
          } else {
            alert(`Por favor, sube un archivo con extensión ".${fileExtension}".`);
          }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        disabled: fileUploaded, // Deshabilitar si ya se ha subido un archivo
    });

    return (
        <div {...getRootProps()} className="relative h-48 rounded-lg border-dashed border-2 border-blue-200 bg-gray-100 flex justify-center items-center">
        <input {...getInputProps()} />
            {fileUploaded ? 
                <div className='flex flex-row justify-center items-center'>
                    <div>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5"/>
                            <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <a href={fileLink} target='blank'> Click para ver Archivo</a>
                    </div>
                </div>
                : (
                <p>Click aquí o arrastra y suelta tu archivo</p>
                )}
        </div>
    )
}