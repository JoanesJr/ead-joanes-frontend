import { Box, Typography, Card, CardActions, CardContent, CardMedia, Button, Zoom, Fade, Grow, Badge, Paper, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Environment } from "../../environment";
import { CompletedClassService } from "../../services/api/completedClass/CompletedClass";
import { UserService } from "../../services/api";
import LinearProgress from '@mui/material/LinearProgress';
import { LocalStorage } from "../../services/localStorage";

interface ICardCourse {
  title: string,
  description: string,
  file: string,
  id: number | string,
  type?: 'buy' | 'buied',
  value?: number,
  paymendLink?: string
}

export const CardCourse = ({ title, description, file, id, type = 'buied', value, paymendLink }: ICardCourse) => {
  const navigate = useNavigate();
  const [image, setImage] = useState("https://images.tcdn.com.br/img/img_prod/852394/curso_online_meu_primeiro_huawei_iniciacao_para_roteador_de_borda_huawei_297_1_8178f580feb2beae96a9365e3ab6ff85.png")
  const [percent, setPercent] = useState(0);
  const [controll, setControll] = useState({});

  useEffect(() => {
    if (file) {
      const pathUrl = `${Environment.URL_BASE}/getFile${file.replace(".", "")}`;
      setImage(pathUrl);
      // image = pathUrl;
    }

    const email = LocalStorage.getItem("JSF_U_N_I");
    const obj = {
      email
    }
    UserService.getByEmail(obj).then(user => {
      CompletedClassService.getCoursePercent(id, user.id).then(data => {
        setControll(data);
        let percentConcluided = 0;
        if (data.totalClass != 0) {
          percentConcluided = (100 * data.viewedClass / data.totalClass)
        }

        setPercent(Math.floor(percentConcluided));
      }).catch(err => {

      })
    })

  }, [image, file, percent, controll]);



  const cardSX = {
    boxShadow: 10,
    borderRadious: 55,
    maxWidth: { xs: 250, md: 325 },
    "&:hover": {
      boxShadow: 55
    },
  };


  return (
    <Box>
      {type === 'buy' && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mr: 5,
          mb: -3,
          zIndex: 99

        }}>
          <Paper elevation={15} sx={{
            borderRadius: '50%',
          }}>
            <Typography variant="h4" sx={{
              p: 1,
              fontWeight: 'bolder',
              borderRadius: '50%',
              color: 'primary.dark',
              boxShadow: 20,
              //  width: '100%'
            }}> R$ {value}</Typography>
          </Paper>



        </Box>
      )}

      <Grow in={true} >

        <Card sx={cardSX} elevation={3} onClick={() => navigate(`/cursos/${id}`)}>

          <CardMedia sx={{ height: 300, maxWidth: { xs: 250, md: 325 } }} image={image} title={title} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ color: 'secondary.main' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'secondary.main' }}>
              {description}
            </Typography>
            {type === 'buied' && (
              <Box>
                <LinearProgress variant="determinate" value={percent} sx={{ color: 'primary.light', backgroundColor: 'black' }} />
                <Typography variant="body2" sx={{ color: 'primary.light' }}>{percent} %</Typography>
              </Box>
            )}

          </CardContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <CardActions>
              {type === 'buy' && (
                <>
                  <Link href={paymendLink} target="_blank">
                    <Button size="medium" sx={{ fontWeight: 'bolder', color: 'secondary.main' }}>
                      Comprar Curso
                    </Button>
                  </Link>
                </>
              )}

              {type === 'buied' && (
                <Button size="medium" sx={{ fontWeight: 'bolder', color: 'secondary.main' }}>Abrir Curso</Button>
              )}

            </CardActions>
          </Box>
        </Card>


      </Grow>
    </Box>
  );
}