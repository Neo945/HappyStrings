import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import lookup from "./fetchData/lookup";
import { styled } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import BookModal from "./bookModal";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}`;
}

const useStyle = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "50px",
    width: "fit-content",
    padding: "0px 20px",
    borderRadius: "50px",
    fontSize: "1em",
    color: "#ffffff",
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CartBooks(props) {
  const classes = useStyle();
  return (
    <Grid item xs={3} md={3}>
      <Item style={{ position: "relative", height: "400px" }}>
        <div
          onClick={props.handleOpen}
          style={{
            width: "100%",
            height: "60%",
            background: `url(${"https://picsum.photos/200/300"}) no-repeat center center`,
            backgroundSize: "cover",
          }}
        />
        <Typography variant="h5" style={{ marginTop: "10px" }} align="left">
          {props.item.title}
        </Typography>
        <Typography variant="h6" style={{ marginTop: "10px" }} align="left">
          {`₹${props.item.price}`}
        </Typography>
        <Box position="absolute" bottom="10px" width="90%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button className={classes.submit} variant="contained">
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Item>
    </Grid>
  );
}

function filterValue(books, language, cat, value, setBooks) {
  let filteredBooks = books.filter((book) => {
    return language.includes(book.language);
  });
  if (filteredBooks.length === 0) {
    filteredBooks = books;
  }
  filteredBooks = filteredBooks.filter((book) => {
    return cat.includes(book.category);
  });
  if (filteredBooks.length === 0) {
    filteredBooks = books;
  }
  filteredBooks = filteredBooks.filter((book) => {
    return value[0] <= book.price < value[1];
  });
  if (filteredBooks.length === 0) {
    filteredBooks = books;
  }
  setBooks(filteredBooks);
}

export default function SearchPage(props) {
  const [value, setValue] = useState([100, 1000]);
  const [language, setLanguage] = useState([]);
  const [books, setBooks] = useState([]);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    lookup(
      "GET",
      null,
      `/book/search/1?search=${url.searchParams
        .get("str")
        .split(" ")
        .join("+")}`,
    ).then((data) => {
      setBooks(data[0].books);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterValue(books, language, cat, newValue, setBooks);
  };
  return (
    <div>
      <Box height="70px" />
      <Typography
        variant="h4"
        style={{
          margin: "1.5%",
        }}
      >
        Cart
      </Typography>
      <Box display="flex" justifyContent="center">
        <Box width="25vw" display="flex" justifyContent="center">
          <Paper style={{ width: "80%" }}>
            <p style={{ marginLeft: "15px" }}>Filters</p>

            <hr />

            <Typography style={{ marginLeft: "7px" }}>Categories</Typography>
            <FormGroup style={{ marginLeft: "10px" }}>
              {["Fiction", "Non-fiction", "Children", "Fantasy", "Others"].map(
                (item, i) => (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={item}
                    key={i}
                    onChange={() => {
                      if (cat.includes(item)) {
                        setCat(cat.filter((cat) => cat !== item));
                        filterValue(
                          books,
                          language,
                          cat.filter((cat) => cat !== item),
                          value,
                          setBooks,
                        );
                      } else {
                        setCat([...cat, item]);
                        filterValue(
                          books,
                          language,
                          [...cat, item],
                          value,
                          setBooks,
                        );
                      }
                    }}
                  />
                ),
              )}
            </FormGroup>

            <hr />

            <Typography style={{ marginLeft: "7px" }}>Languages</Typography>
            <FormGroup style={{ marginLeft: "10px" }}>
              {[
                "English",
                "Hindi",
                "Marathi",
                "Gujarati",
                "Sanskrit",
                "Others",
              ].map((item, i) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={item}
                  key={i}
                  onChange={() => {
                    if (language.includes(item)) {
                      setLanguage(language.filter((lang) => lang !== item));
                      filterValue(
                        books,
                        language.filter((lang) => lang !== item),
                        cat,
                        value,
                        setBooks,
                      );
                    } else {
                      setLanguage([...language, item]);
                      filterValue(
                        books,
                        [...language, item],
                        cat,
                        value,
                        setBooks,
                      );
                    }
                  }}
                />
              ))}
            </FormGroup>

            <hr />

            <Typography style={{ marginLeft: "7px" }}>Price</Typography>
            <Box sx={{ width: 250 }}>
              <Slider
                style={{ marginLeft: "10px", color: "#9A9A9A" }}
                getAriaLabel={() => "Price range"}
                value={value}
                min={100}
                max={5000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
          </Paper>
        </Box>
        <div
          style={{
            height: `${window.innerHeight - 170}px`,
            width: "75%",
            overflowY: "scroll",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{
              width: "70vw",
            }}
          >
            {books.map((item, i) => (
              <BookModal
                modalBody={(props) => {
                  return (
                    <>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {"props.item.title"}
                      </Typography>
                      <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                      ></Typography>
                    </>
                  );
                }}
                component={CartBooks}
                item={item}
                key={i}
              />
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
