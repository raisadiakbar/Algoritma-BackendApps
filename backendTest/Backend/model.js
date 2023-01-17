const Sequelize = require('sequelize')

// Connect to the SQL database
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

// Define the Book and Member models
const Book = sequelize.define('book', {
  code: { type: Sequelize.STRING },
  title: { type: Sequelize.STRING },
  author: { type: Sequelize.STRING },
  stock: { type: Sequelize.INTEGER }
})
const Member = sequelize.define('member', {
  code: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING }
})

// Define the Borrowing model
const Borrowing = sequelize.define('borrowing', {
  bookCode: { type: Sequelize.STRING },
  memberCode: { type: Sequelize.STRING },
  borrowedAt: { type: Sequelize.DATE },
  returnedAt: { type: Sequelize.DATE }
})

// Set up the associations
Book.hasMany(Borrowing)
Member.hasMany(Borrowing)


