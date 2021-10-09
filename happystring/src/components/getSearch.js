import { Box, Typography } from "@material-ui/core";
import lookup from "./fetchData/lookup";

async function getSearch(search, str, cls, fun) {
  const divList = [];
  const books = await lookup("GET", null, `/book/search/1?search=${str}`);
  console.log(books);
  for (const i of books[0].books) {
    divList.push(
      <Box
        key={i.id}
        display="flex"
        alignItems="center"
        margin="10px"
        onClick={(e) => {
          e.preventDefault();
          fun(i.title);
        }}
      >
        <div className={cls} />
        <Typography
          style={{ margin: "10px" }}
        >{`${i.title} by ${i.author.name}`}</Typography>
      </Box>,
    );
  }
  return divList;
}

export default getSearch;
