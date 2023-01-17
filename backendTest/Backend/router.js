const db = require('./model');
const router = require('express').Router();

// Borrow a book
router.post('/borrow', async (req, res) => {
  try {
    // Check if the member is eligible to borrow (e.g. not currently penalized and has not reached the borrowing limit)
    const member = await db.Member.findOne({ code: req.body.memberCode });
    if (!member) return res.status(404).send({ message: 'Member not found' });
    if (member.penalty) return res.status(400).send({ message: 'Member is currently penalized' });
    if (member.borrowedBooks.length >= 2) return res.status(400).send({ message: 'Member has reached the borrowing limit' });

    // Check if the book is available
    const book = await db.Book.findOne({ code: req.body.bookCode });
    if (!book) return res.status(404).send({ message: 'Book not found' });
    if (book.stock < 1) return res.status(400).send({ message: 'Book is not available' });

    // Update the book's stock and the member's borrowing history
    book.stock -= 1;
    member.borrowedBooks.push(book._id);
    await book.save();
    await member.save();

    res.send({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error borrowing book', error });
  }
});

// Return a book
router.put('/return', async (req, res) => {
  try {
    // Check if the returned book is a book that the member has borrowed
    const member = await db.Member.findOne({ code: req.body.memberCode });
    if (!member) return res.status(404).send({ message: 'Member not found' });
    const borrowedBookIndex = member.borrowedBooks.findIndex(bookId => bookId.toString() === req.body.bookId);
    if (borrowedBookIndex === -1) return res.status(400).send({ message: 'This book is not borrowed by this member' });

    // Check if the book is returned after more than 7 days, the member will be subject to a penalty.
    const borrowedDate = member.borrowedBooks[borrowedBookIndex].borrowedDate;
    const penalty = (Date.now() - borrowedDate.getTime()) > 7*24*60*60*1000;
    if (penalty) {
      member.penalty = true;
      member.penaltyStart = new Date();
    }
    // Remove the book from the member's borrowed books
    member.borrowedBooks.splice(borrowedBookIndex, 1);

    // Update the book stock

    const book = await db.Book.findById(req.body.bookId);
    book.stock += 1;

    // Save changes to the database
    await member.save();
    await book.save();

    res.send({ message: 'Book returned successfully', penalty });
  } catch (error) {
    res.status(500).send({ message: 'Error returning book', error });
    }
    });
    
    // Get all books
    router.get('/books', async (req, res) => {
    try {
    // Find all books in the database
    const books = await db.Book.find({});
    // Filter out books that are being borrowed
    const availableBooks = books.filter(book => {
    const borrowedBook = member.borrowedBooks.find(b => b.toString() === book._id.toString());
    return !borrowedBook;
    });
    res.send(availableBooks);
    } catch (error) {
    res.status(500).send({ message: 'Error getting books', error });
    }
    });
    
    // Get all members
    router.get('/members', async (req, res) => {
    try {
    // Find all members in the database
    const members = await db.Member.find({});
    res.send(members);
    } catch (error) {
    res.status(500).send({ message: 'Error getting members', error });
    }
    });
    
    module.exports = router;
    

    
