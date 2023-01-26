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
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";

interface IMyDropzone {
  type?: "video" | "image";
  onFileUploaded: (file: File) => void;
  onFileString: (file: string) => void;
}

export const MyDropzone = ({
  type = "image",
  onFileUploaded,
  onFileString,
}: IMyDropzone) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileString(fileUrl);
      onFileUploaded(file);
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
            <video width="320" height="240">
              <source src={selectedFileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Typography variant="body1">Arraste aqui</Typography>
          )}
        </>
      )}
    </Box>
  );
};
