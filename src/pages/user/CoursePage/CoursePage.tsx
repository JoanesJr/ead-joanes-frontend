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
  let percent = "70%"

  if (xlDown) {
    percent = "70%";
  }
  if (lgDown) {
    percent = "60%";
  }
  if (mdDown) {
    percent = "80%";
  }
  if (smDown) {
    percent = "70%";
  }
  if (xsDown) {
    percent = "90%";
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
                // setFile("https://www.youtube.com/watch?v=fD0kN7SemRI");
            }
        }).catch( err => {
            // console.log(err);
        })
        }

        getData();
    }, [sections, state, actualClass, actualSection]);
    return (
      <Box>
        <NestedList sections={sections} idCourse={id}>
          <Box>
            {actualClass && (
              <>
                <Grid
                  container
                    sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "initial", flexDirection: "collumn" }}
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
                    justifyContent="space-beetwen"
                    alignItems="flex-start"
                    sx={{ height: "50%", width: "80%" }}
                  >
                    {actualClass && (
                      <>
                      <IFrame title={actualClass.title} file={file} percent={percent} />
                      
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