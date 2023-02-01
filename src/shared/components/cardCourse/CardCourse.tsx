import { Box, Typography, Card, CardActions, CardContent, CardMedia, Button, Zoom, Fade, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Environment } from "../../environment";

interface ICardCourse {
    title: string,
    description: string,
    file: string,
    id: number | string
}

export const CardCourse = ({title, description, file, id} :ICardCourse) => {
  const navigate = useNavigate();
  const [image, setImage] = useState( "https://images.tcdn.com.br/img/img_prod/852394/curso_online_meu_primeiro_huawei_iniciacao_para_roteador_de_borda_huawei_297_1_8178f580feb2beae96a9365e3ab6ff85.png")

  useEffect( () => {
    if (file) {
      const pathUrl = `${Environment.URL_BASE}/getFile${file.replace(".", "")}`;
      setImage(pathUrl);
      // image = pathUrl;
    }

  }, [image, file]);

  

     const cardSX = {
       boxShadow: 10,
       borderRadious: 55,
       maxWidth: 345,
       "&:hover": {
         boxShadow: 55
       },
     };


    return (
      <Grow in={true}>
        <Card sx={cardSX} elevation={3} onClick={() => navigate(`/cursos/${id}`)}>
          <CardMedia sx={{ height: 300 }} image={image} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <CardActions>
              <Button size="medium">Abrir Curso</Button>
            </CardActions>
          </Box>
        </Card>
      </Grow>
    );
}