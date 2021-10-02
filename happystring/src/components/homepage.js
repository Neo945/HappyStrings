import { Box, Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import BookModal from "./bookModal";
import background from "./static/Background.png";
import background2 from "./static/background2.png";
import mobile from "./static/mobile.png";
import book from "./static/book.jpg";

const useStyle = makeStyles((theme) => ({
  "@global": {
    "#root": {
      overflow: "scroll",
      overflowX: "hidden",
      backgroundColor: "#121212",
      color: theme.palette.text.primary,
    },
  },
  background: {
    background: `url(${background}) no-repeat center`,
    backgroundSize: "cover",
  },
  background2: {
    background: `url(${background2}) no-repeat center`,
    backgroundSize: "cover",
  },
  image: {
    width: "50vw",
    height: "50vw",
    transform: "translate(-15%,-5%)",
    pointerEvents: "none",
  },
  text: {
    fontSize: "50px",
    fontWeight: "bold",
    width: "465px",
  },
  button: {
    height: "50px",
    width: "207px",
    borderRadius: "50px",
    fontSize: "20px",
    color: "#000000",
    backgroundColor: "white",
  },
  text2: {
    fontSize: "1.55m",
    fontWeight: "bold",
  },
  book: {
    height: "360px",
    width: "300px",
    display: "inline-block",
    margin: "10px",
    backgroundColor: "transparent",
    position: "relative",
    background: `url(${book}) no-repeat center`,
    backgroundSize: "contain",
  },
  bottomtxt: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "120px",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const HomePageBook = (props) => {
  const classes = useStyle();
  return (
    <Paper className={classes.book} onClick={props.handleOpen}>
      <Paper className={classes.bottomtxt}>
        <Typography
          style={{
            width: "50%",
            height: "100%",
            whiteSpace: "pre-wrap",
            display: "flex",
            alignItems: "center",
          }}
        >
          How to win friends and Influence people
        </Typography>
        <Typography style={{ width: "20%" }}>₹169.95</Typography>
      </Paper>
    </Paper>
  );
};
export default function HomePage() {
  const classes = useStyle();
  return (
    <Paper className="homepage" width="100%">
      <div className="homepage" style={{ width: "100vw", height: "375vh" }}>
        <Box width="110px" />
        <Box
          width="100%"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.background}
          position="relative"
        >
          <img src={mobile} alt="mobile" className={classes.image} />
          <Box position="absolute" style={{ transform: "translate(50%,80%)" }}>
            <Typography className={classes.text}>
              Buy books anytime, anywhere free.
            </Typography>
            <Button variant="contained" className={classes.button}>
              LOGIN
            </Button>
          </Box>
          <div
            style={{
              position: "absolute",
              background:
                "linear-gradient(rgba(15, 15, 15, 0),rgba(18,18,18,0.1))",
              bottom: 0,
              height: "100px",
              width: "100%",
              margin: 0,
              padding: 0,
            }}
          ></div>
        </Box>
        <Box
          width="100%"
          height="130vh"
          style={{
            background: `#111111`,
          }}
        >
          {["Trending", "New Books"].map((text, index) => (
            <Box
              maxWidth="sm"
              key={index}
              style={{ marginRight: "5%", marginLeft: "5%" }}
            >
              <Typography className={classes.text2}>{text}</Typography>
              <div
                style={{
                  height: "400px",
                  whiteSpace: "nowrap",
                  overflowX: "scroll",
                  margin: "50px",
                }}
                className="hs trending"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <BookModal key={i} component={HomePageBook} />
                ))}
              </div>
            </Box>
          ))}
        </Box>
        <Box
          width="100%"
          height="100vh"
          display="flex"
          justifyContent="space-evenly"
          flexDirection="column"
          alignItems="flex-start"
          className={classes.background2}
          position="relative"
        >
          <div style={{ marginLeft: "50px" }}>
            <Typography className={classes.text2}>Something-Topic</Typography>
            <Typography /*className={}*/>Some Text</Typography>
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Typography className={classes.text2}>Something-Topic</Typography>
            <Typography /*className={}*/>Some Text</Typography>
          </div>
        </Box>
        <Box width="100%" height="10vh" style={{ background: "#121212" }} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100%"
          height="50vh"
          style={{ background: "#000000" }}
        >
          <Box
            width="100%"
            height="50%"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            {[1, 2, 3].map((i) => (
              <Box key={i} height="100px">
                <Typography className={classes.text2}>ABOUT</Typography>
                <Typography>Contact Us</Typography>
                <Typography>About Us</Typography>
                <Typography>Careers</Typography>
              </Box>
            ))}
          </Box>
          <Typography className={classes.text2}>© Copyright</Typography>
        </Box>
      </div>
    </Paper>
  );
}
