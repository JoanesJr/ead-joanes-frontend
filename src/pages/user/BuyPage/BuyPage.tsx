import { Divider, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { CardCourse } from "../../../shared/components";
import { Environment } from "../../../shared/environment";
import { CourseService, UserService } from "../../../shared/services/api";
import { LocalStorage } from "../../../shared/services/localStorage";


export const BuyPage = () => {
  const theme = useTheme();
  const [coursesUser, setCoursesUser] = useState([]);
  const [courses, setCourses] = useState<any>([]);
  const [coursesNotUser, setCoursesNotUser] = useState([]);
  const [userId, setUserId] = useState<any>(null);


  useEffect(() => {


    const getUserId = () => {
      const username = LocalStorage.getItem("JSF_U_N_I");
      const obj = {
        email: username,
      };
      UserService.getByEmail(obj)
        .then((data) => {
          setUserId(data.id);
        })
        .catch((err) => {
          // console.log("deu ruim email")
        });
    }

    const getCoursesUser = () => {

      if (userId) {
        UserService.getById(userId)
          .then((data) => {
            let controll = [];
            for (let c of data.courses) {
              if (c.active) {
                controll.push(c);
              }
            }

            setCoursesUser(controll);
          })
          .catch((err) => {
            //  console.log(err);
          });
      }

    }

    const getAllActiveCourses = () => {
      CourseService.getAllActives().then(data => {
        setCourses(data);
      })
    }



    const differenceCourses = (name: string) => {
      let controlled = false;
      for (let c of coursesUser) {
        if (c.title === name) {
          controlled = true;
        }
      }

      return !controlled;
    }

    const getCoursesNotUser = () => {
      // console.log(courses);
      // console.log(coursesUser)
      const difference = courses.filter(x => differenceCourses(x.title));

      setCoursesNotUser(difference);
    }



    getUserId();
    getCoursesUser();
    getAllActiveCourses();
    getCoursesNotUser();
  }, [coursesUser, courses, coursesNotUser, userId]);

  return (
    <Grid container spacing={2} margin={5}>
      <Grid container item>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
          <Typography variant="h4" sx={{ color: 'secondary.light' }}>Cursos</Typography>
          <Divider color="text.main" />
        </Grid>
      </Grid>

      <Grid
        container
        item
        marginTop={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {coursesNotUser.length > 0 && coursesNotUser.map((course) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={course.id}>
            <CardCourse
              title={course.title}
              description={course.description}
              file={course.file}
              id={course.id}
              type='buy'
              value={course.value}
              paymendLink="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=1148638071-d5888754-9f83-4cef-8e41-18ba698bb338"
            />
          </Grid>
        ))}
        {courses.length == 0 && (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
            ml: -8
          }}>
            <Typography sx={{
              wordWrap: 'break-word'
            }} variant="h4">Você não possui cursos atribuidos</Typography>
          </Grid>
        )}
        <Grid container item xs={12} sm={12} md={12} lg={6} xl={6}>

        </Grid>
      </Grid>
    </Grid>
  );
}