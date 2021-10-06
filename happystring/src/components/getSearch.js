import { Box, Typography } from "@material-ui/core";
import lookup from "./fetchData/lookup";

async function getSearch(search, str, cls, fun) {
  const divList = [];
  // if (str.includes(search)) {
  const books = await lookup("GET", null, `/book/search/1?search=${str}`);
  console.log(books);
  for (const i of books[0].books) {
    // if (i.title.toLowerCase().includes(str.toLowerCase())) {
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
    // }
  }
  // } else {
  //   const [data, _] = lookup("POST", null, `/book/search/1?${str}`);
  //   books = data;
  //   data.forEach((i) => {
  //     divList.push(
  //       <Box
  //         key={i.id}
  //         display="flex"
  //         alignItems="center"
  //         margin="10px"
  //         onClick={(e) => {
  //           e.preventDefault();
  //           fun(i.title);
  //         }}
  //       >
  //         <div className={cls} />
  //         <Typography
  //           style={{ margin: "10px" }}
  //         >{`${i.title} by ${i.author.name}`}</Typography>
  //       </Box>,
  //     );
  //   });
  // }
  return divList;
}

export default getSearch;
