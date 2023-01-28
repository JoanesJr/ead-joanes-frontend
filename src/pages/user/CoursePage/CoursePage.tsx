import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NestedList } from "../../../shared/components";
import { CourseService } from "../../../shared/services/api";

const objData = {
  username: "joanesdejesusjr@gmail.com",
  password: "def75315901",
};


export const CoursePage = () => {
    const [sections, setSections] = useState([]);
    const { id = "1" } = useParams<"id">();
    const courseService = new CourseService(objData);

    useEffect( () => {
        const getData = () => {
            courseService.getById(id).then( (data) => {
            setSections(data.sections)
        }).catch( err => {
            console.log(err);
        })
        }

        getData();
    }, [sections]);
    return (
      <Box>
        <NestedList sections={sections} idCourse={id}>
          <Box>
            <Typography>ashaisahish</Typography>
          </Box>
        </NestedList>
      </Box>
    );
}