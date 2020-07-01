import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'
import './styles.css';

interface IDropZone {
    onChangeImg: (file: File) => void;
}

const DropZone: React.FC<IDropZone> = ({ onChangeImg }) => {
    const [fileUrlUploaded, setFileUrlUploaded] = useState('')
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const urlFile = URL.createObjectURL(file);
        setFileUrlUploaded(urlFile)
        onChangeImg(file);
        console.log("file >>> ", urlFile)
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {
                !fileUrlUploaded ?
                    isDragActive ? <><FiUpload />
                        <p><FiUpload />Solte sua imagem aqui ...</p></> :
                        <p><FiUpload />Arraste sua imagem para essa caixa, ou clique para seleciona-la</p>
                    : <img src={fileUrlUploaded} />
            }
        </div>
    )
}

export default DropZone;