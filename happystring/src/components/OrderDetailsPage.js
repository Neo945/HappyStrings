// import React from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   IconButton,
//   makeStyles,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   MuiThemeProvider,
// } from "@material-ui/core";
// import { styled } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";
// import BookModal from "./components/bookModal";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormGroup from "@material-ui/core/FormGroup";
// import Link from "@material-ui/core/Link";
// import Slider from "@material-ui/core/Slider";

import React from "react";
// import './App.css';
import {
  Typography,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
// import {bookElements, addbookElements} from './checkoutElements'
import Book from "./props";

class OrderDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  handleChange(files) {
    this.setState({
      files: files,
    });
  }

  render() {
    // const margin = { margin: "0 6px" };
    return (
      <>
        <Box height="40px" />
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
                width: "300px",
                height: "300px",
                marginLeft: "auto",
              }}
            >
              <img src="https://cdn4.buysellads.net/uu/1/97758/1633132110-1633110694-158338930.jpg"></img>
              {/* <DropzoneArea
                acceptedFiles={["image/", "video/", "application/*"]}
                onChange={this.handleChange.bind(this)}
                showFileNames
                dropzoneText="Upload Your Book Here"
                showAlerts={false}
                filesLimit={20}
              /> */}
            </Card>

            <Card
              style={{
                width: "550px",
                height: "480px",
                marginRight: "auto",
                marginLeft: "20px",
                padding: "20px 5px",
              }}
            >
              <CardContent>
                <div>
                  <Book
                    name="Shakespeare"
                    price="450"
                    description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, molestiae. A mollitia culpa minima vitae illum. Deserunt natus quidem et."
                    highlights="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque esse ab animi quibusdam officia maiores facilis consectetur sequi alias voluptate, qui cupiditate laboriosam minima illo."
                  />
                </div>
              </CardContent>
            </Card>
          </Box>
        </div>
      </>
    );
  }
}

export default OrderDetailsPage;
