const express = require('express');
const app = express();

app.use(express.json());

const books = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  }
]

// home page
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to our bookstore api",
  });
})
// get all book details
app.get('/books', (req, res) => {
  res.status(200).json(books);
})

/**
 * get single book details
 * @param id
 */
app.get('/book/:id', (req, res) => {
  const bookDetail = books.find((bookitem) => bookitem.id === req.params.id);
  if (bookDetail) {
    res.status(200).json(bookDetail);
  } else {
    res.status(404).json({
      message: "Book not found! Please try with a different Book ID",
    })
  }
})

app.post('/add', (req, res) => {
  const newBook = {
    id: Math.floor(Math.random() * 1000).toString(),
    title: `Book ${Math.floor(Math.random() * 1000)}`,
  };
  books.push(newBook);
  res.status(201).json({
    data: newBook,
    message: "Book has been added sucessfully!"
  });
})

app.put('/update/:id', (req, res) => {
  const findCurrentBook = books.find((bookItem) => bookItem.id === req.params.id);
  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
      message: `Book with ID ${req.params.id} updated successfully`,
      data: findCurrentBook,
    })
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
})

app.delete('/delete/:id', (req, res) => {
  const findIndexOfCurrentBook = books.findIndex((bookItem) => bookItem.id === req.params.id);
  if (findIndexOfCurrentBook !== -1) {
    const deletedBook = books.splice(findIndexOfCurrentBook, 1);
    res.status(200).json({
      message: `Book with ID ${req.params.id} deleted successfully`,
      data: deletedBook[0],
    })
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is now running at port ${PORT}`);
})