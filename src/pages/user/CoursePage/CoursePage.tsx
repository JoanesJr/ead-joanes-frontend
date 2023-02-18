import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IFrame, NestedList, VideoPlayer } from "../../../shared/components";
import { Environment } from "../../../shared/environment";
import { CourseService } from "../../../shared/services/api";
import { ClassService } from "../../../shared/services/api";
import ReactVideoPlayer from "../../../shared/components/ReactVideoPlayer/ReactVideoPlayer";

const objData = {
  username: "joanesdejesusjr@gmail.com",
  password: "def75315901",
};


export const CoursePage = () => {
    const [sections, setSections] = useState([]);
    const [actualSection, setActualSection] = useState();
    const [actualClass, setActualClass] = useState<any>();
    const [file, setFile] = useState("");
    const { id = "1" } = useParams<"id">();
    const { state } = useLocation();
    const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
  let percent: any = 1500
  let percent2 = "100%"

  if (xlDown) {
    percent = 1000;
  }
  if (lgDown) {
    percent = 1000;
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
                // console.log(pathUrl);
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
                    sx={{ height: "80vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "initial", flexDirection: "collumn" }}
                >

                  <Grid
                    item

                    xs={12}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{ height: "50%", width: "80%", mt: 18}}
                  >
                    {/* {(actualClass && actualClass.type == 'url') && (
                      <>
                      <IFrame title={actualClass.title} file={file} percentWidth={percent} percentHeight={percent2} />
                      
                      </>
                    )} */}

                    {actualClass && (
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: {  md: 900, lg: 1100, xl: 1500},
                        height: { md: 300, lg: 300, xl: 500},
                      }}>
                        <ReactVideoPlayer title={actualClass.title} src={file} type={actualClass.type} />
                      </Box>
                      
                    )}

                  </Grid>
                  {/* <Grid item xs={12} sx={{mt: 10}}>

                    <Typography variant="h4">Descrição</Typography>
                    
                    <Typography variant="caption" sx={{width: '70%'}}>
                      {actualClass.description}
                    </Typography>
                  </Grid> */}
                </Grid>
              </>
            )}
          </Box>
        </NestedList>
      </Box>
    );
}