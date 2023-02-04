import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IFrame, NestedList, VideoPlayer } from "../../../shared/components";
import { Environment } from "../../../shared/environment";
import { CourseService } from "../../../shared/services/api";
import { ClassService } from "../../../shared/services/api";

const objData = {
  username: "joanesdejesusjr@gmail.com",
  password: "def75315901",
};


export const CoursePage = () => {
    const [sections, setSections] = useState([]);
    const [actualSection, setActualSection] = useState();
    const [actualClass, setActualClass] = useState<any>();
    const [file, setFile] = useState("https://www.youtube.com/watch?v=fD0kN7SemRI");
    const { id = "1" } = useParams<"id">();
    const { state } = useLocation();
    const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
  let width = 1100;
  let height = 500;

  if (xlDown) {
    width = 700;
    height = 500;
  }
  if (lgDown) {
    width = 600;
    height = 500;
  }
  if (mdDown) {
    width = 11000;
    height = 500;
  }
  if (smDown) {
    width = 900;
    height = 500;
  }
  if (xsDown) {
    width = 900;
    height = 500;
  }



    useEffect( () => {
        const getData = () => {
            CourseService.getById(id).then( (data) => {
            setSections(data.sections)

            if (state) {
                const section = sections.filter( section => section.id == state.sectionId)[0];
                const classy = section.class.filter( classy => classy.id == state.classId )[0];
                // classy.type = 'url';
                setActualSection(section);
                setActualClass(classy);
            }

            if (actualClass.file ) {
              if(actualClass.type == "file") {
                const pathUrl = `${Environment.URL_BASE}/getFile${actualClass.file.replace(".", "")}`
                setFile(pathUrl);
              } else {
                setFile(actualClass.file);
              }     
            } else {
                setFile("https://www.youtube.com/watch?v=fD0kN7SemRI");
            }
        }).catch( err => {
            console.log(err);
        })
        }

        getData();
        console.log(file)
    }, [sections, state, actualClass, actualSection]);
    return (
      <Box>
        <NestedList sections={sections} idCourse={id}>
          <Box>
            {actualClass && (
              <>
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  //   sx={{ height: "100vh" }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h4">{actualClass.title}</Typography>
                    <Typography variant="body1" sx={{marginTop: 2}}>
                      {actualClass.description}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ height: "70vh", width: "70vw", marginTop: 3 }}
                  >
                    {actualClass && (
                      <>
                      <IFrame title={actualClass.title} file={file} />
                      
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </NestedList>
      </Box>
    );
}