// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI tasks

class UI {
    static displayBooks() {
        const storedBooks = Store;
        console.log(storedBooks);
        const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.getElementById("book-list");

        const row = document.createElement("tr");

        row.innerHTML = `
        
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-small delete">x</a></td>
        `;

        list.appendChild(row);
    } 

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.getElementById("book-form");
        container.insertBefore(div, form)

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(book) {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add a Book
document.getElementById("book-form").addEventListener("submit", (e) => {
    // Prevent the Default
    e.preventDefault();

    // Get the Form Values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    // Validation 
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill all fields', 'danger');
    } else {

        console.log("entrou 2");
         // Instantiate a new book
         const book = new Book(title, author, isbn);

         // Add book to UI
        UI.addBookToList(book);

        // Add book to Store
        Store.addBook(book);
        
        // Show success message
        UI.showAlert("Book added", "success");

         // Clear the fields
         UI.clearFields();
    }
});
    // Event: Remove a Book
    document.getElementById("book-list").addEventListener("click", (e) => {
        UI.deleteBook(e.target);
        
    // Remove book from UI
        UI.deleteBook(e.target);
        
    // Remove book from Store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
        UI.showAlert("Book deleted", "success");
})