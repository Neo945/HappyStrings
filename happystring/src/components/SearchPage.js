import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Checkbox,
  Typography,
  FormControlLabel,
  Slider,
} from "@material-ui/core";
import BookModal from "./bookModal";
import lookup from "./fetchData/lookup";
import { styled } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";

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
            background: `url(${props.item.book.image}) no-repeat center center`,
            backgroundSize: "cover",
          }}
        />
        <Typography variant="h5" style={{ marginTop: "10px" }} align="left">
          {props.item.book.title}
        </Typography>
        <Typography variant="h6" style={{ marginTop: "10px" }} align="left">
          {`₹${props.item.book.price}`}
        </Typography>
        <Box position="absolute" bottom="10px" width="90%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              className={classes.submit}
              variant="contained"
              onClick={() => {
                props.add(props.setCart, props.item);
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Item>
    </Grid>
  );
}

function filterValue(books, language, cat, value, setBooks) {
  if (language.length !== 0)
  {let filteredBooks = books.filter((book) => {
    // console.log(language.includes(book.language), book.language);
    return language.includes(book.language);
  });
  setBooks(filteredBooks);
  return;
}
  else if (cat.length !== 0){
let filteredBooks = books.filter((book) => {
    return cat.includes(book.category);
  });
  setBooks(filteredBooks);
  return;
  }
  
  else {
let filteredBooks = books.filter((book) => {
    console.log(value);
    // eslint-disable-next-line no-mixed-operators
    return value[0] <= book.price && book.price < value[1];
  });
  console.log(language,books, cat, value);
  setBooks(filteredBooks);
  }
}
export default function SearchPage(props) {
  const [value, setValue] = useState([100, 1000]);
  const [language, setLanguage] = useState([]);
  const [books, setBooks] = useState([]);
  const [cat, setCat] = useState([]);
  const [bookValue, setBookValue] = useState([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    let search;
    try {
      search = url.searchParams.get("str").split(" ").join("+");
    } catch (err) {
      search = "";
    }
    lookup("GET", null, `/book/search/1?search=${search}`).then((data) => {
      setBookValue(data[0].books);
      setBooks(data[0].books);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterValue(bookValue, language, cat, newValue, setBooks);
  };
  return (
    <div>
      <Box height="70px" />
      <Typography
        variant="h4"
        style={{
          marginLeft: "1.5%",
          marginTop: "1.5%",
        }}
      >
        {`Search results for "${(() => {
          const url = new URL(window.location.href);
          try {
            return url.searchParams.get("str").split(" ").join("+");
          } catch (err) {
            return "";
          }
        })()}"`}
      </Typography>
      <Typography
        style={{
          marginLeft: "1.5%",
        }}
        variant="div"
      >
        {books.length} books found
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
                          bookValue,
                          language,
                          cat.filter((cat) => cat !== item),
                          value,
                          setBooks,
                        );
                      } else {
                        setCat([...cat, item]);
                        filterValue(
                          bookValue,
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
                        bookValue,
                        language.filter((lang) => lang !== item),
                        cat,
                        value,
                        setBooks,
                      );
                    } else {
                      setLanguage([...language, item]);
                      filterValue(
                        bookValue,
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
                component={CartBooks}
                item={{ book: item }}
                add={props.add}
                setCart={props.setCart}
                key={i}
              />
            ))}
            <br />
            {books.length === 0 ? (
              <Typography
                component="h5"
                style={{
                  margin: "1.5%",
                }}
              >
                No string found
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
