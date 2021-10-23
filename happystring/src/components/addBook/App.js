import React, { useEffect } from "react";
import "./App.css";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  makeStyles,
} from "@material-ui/core";
import { addbookElements } from "./checkoutElements";
import NavigateNextSharpIcon from "@material-ui/icons/NavigateNextSharp";
import { DropzoneArea } from "material-ui-dropzone";
import Autocomplete from "@material-ui/lab/Autocomplete";
import lookup from "../fetchData/lookup";

const useStyles = makeStyles((theme) => {
  return {
    submit: {
      margin: theme.spacing(3, 0, 2),
      height: "50px",
      width: "207px",
      borderRadius: "50px",
      fontSize: "20px",
      color: "#ffffff",
      backgroundColor: theme.palette.action.selected,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  };
});

function getAuthorId(author, authors) {
  let authorId = null;
  authors.forEach((author) => {
    if (author.name === author) {
      authorId = author.id;
    }
  });
  return authorId;
}

function App(props) {
  const [author, setAuthor] = React.useState([]);
  const classes = useStyles();
  const margin = { margin: "0 6px" };
  useEffect(() => {
    lookup("GET", null, "/book/all/author").then((res) => {
      setAuthor(res[0].author);
    });
  }, []);
  return (
    <div className="App">
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          style={{
            maxWidth: 450,
            margin: "0 auto",
            padding: "133px 50px",
          }}
        >
          <DropzoneArea
            acceptedFiles={["image/*", "video/*", "application/*"]}
            showFileNames
            dropzoneText="IMAGE"
            showAlerts={false}
            filesLimit={1}
          />
        </Card>

        <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
          <CardContent>
            <Typography variant="h5">Add Book</Typography>
            <form
              enctype="multipart/form-data"
              onSubmit={(event) => {
                event.preventDefault();
                const input = document.querySelector('input[type="file"]');
                const formData = new FormData(event.target);
                formData.append("image", input.files[0]);
                const id = getAuthorId(formData.get("author"), author);
                formData.set("author", id ? id : formData.get("author"));
                formData.append("shop","617305fb6d8c46804a7adb6b");
                fetch("http://localhost:5000/api/book/create", {
                  method: "POST",
                  body: formData,
                  credentials: "include",
                  mode: "cors",
                }).then((res) => {
                  console.log(res);
                });
              }}
            >
              <Typography
                align="center"
                variant="subtitle1"
                color="textSecondary"
              >
                Add New Book to our Database
              </Typography>
              <Grid container spacing={1}>
                {addbookElements.map((input, i) => (
                  <Grid xs={input.xs} sm={input.sm} key={i} item>
                    <TextField {...input} />
                  </Grid>
                ))}
                <Grid xs={12} sm={12} item>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={author}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Author"
                          variant="outlined"
                          name="author"
                        />
                      );
                    }}
                  />
                </Grid>
                                <Grid xs={12} sm={12} item>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['Tamil','English', 'Hindi', 'Marathi', 'Gujarati', 'Sanskrit', 'Other']}
                    fullWidth
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Language"
                          variant="outlined"
                          name="language"
                        />
                      );
                    }}
                  />
                </Grid>
                                <Grid xs={12} sm={12} item>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[
                    'Fiction',
                    'Non-Fiction',
                    'Children',
                    'Others',
                    'Fantasy',
                    'Mystery',
                    'Thriller',
                    'Self-Help',
                    'Science',
                    'Education',
                    'Personal'
                ]}
                    fullWidth
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Category"
                          variant="outlined"
                          name="category"
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid xs={12} item align="center">
                  <Button
                    style={{ width: 170, ...margin }}
                    endIcon={<NavigateNextSharpIcon />}
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            <br />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default App;
