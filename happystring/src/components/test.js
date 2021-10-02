import { Box, Typography } from "@material-ui/core";

const books = [
  {
    title: "The Lord of the Rings",
    id: 1,
  },
  {
    title: "The Hobbit",
    id: 2,
  },
  {
    title: "The Catcher in the Rye",
    id: 3,
  },
  {
    title: "The Hunger Games",
    id: 4,
  },
  {
    title: "The Fault in Our Stars",
    id: 5,
  },
];

function getSearch(str, cls, fun) {
  const divList = [];
  for (const i of books) {
    if (i.title.toLowerCase().includes(str.toLowerCase())) {
      divList.push(
        <Box
          key={i.id}
          display="flex"
          onClick={(e) => {
            e.preventDefault();
            fun(i.title);
          }}
        >
          <div className={cls} />
          <Typography
            style={{ margin: "5px" }}
          >{`${i.title} by ${i.aurthor}`}</Typography>
        </Box>,
      );
    }
  }
  return divList;
}

export default getSearch;
