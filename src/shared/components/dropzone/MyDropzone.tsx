import {
  Box,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IMyDropzone {
  type?: "video" | "image" | "file";
  onFileUploaded?: (file: File) => void;
  onFileString?: (file: string) => void;
  onFileUploadAttchment?: (files: File[]) => void
}

export const MyDropzone = ({
  type = "image",
  onFileUploaded,
  onFileString,
  onFileUploadAttchment = null
}: IMyDropzone) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (type != 'file') {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);
  
        setSelectedFileUrl(fileUrl);
        onFileString(fileUrl);
        onFileUploaded(file);
      } else {
        const file = acceptedFiles;

        onFileUploadAttchment(file);
      }
      
      // Do something with the files
    },
    [onFileUploaded]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      height={70}
      display="flex"
      borderRadius={5}
      justifyContent="center"
      alignItems="center"
      component={Paper}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {type === "video" && (
        <>
          {selectedFileUrl ? (
            <Typography variant="body1">Video selecionado</Typography>
          ) : (
            <Typography variant="body1">Arraste aqui</Typography>
          )}
        </>
      )}

      {type === "image" && (
        <>
          {selectedFileUrl ? (
            <Typography variant="body1">Imagem selecionado</Typography>
          ) : (
            <Typography variant="body1">Arraste aqui</Typography>
          )}
        </>
      )}
      {type === "file" && (
        <>
          {selectedFileUrl ? (
            <Typography variant="body1">Anexos selecionados</Typography>
          ) : (
            <Typography variant="body1">Arraste aqui</Typography>
          )}
        </>
      )}
    </Box>
  );
};
