function Book(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
}

function Member(name) {
    this.name = name;
    this.borrowedBooks = [];
}

Member.prototype.borrowBook = function(book) {
    if (this.borrowedBooks.length >= 3) {
        console.log(`${this.name} cannot borrow more than 3 books.`);
        return;
    }
    if (!book.isAvailable) {
        console.log(`The book "${book.title}" is already borrowed.`);
        return;
    }
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} borrowed "${book.title}".`);
};

function PremiumMember(name) {
    Member.call(this, name);
    this.specialCollectionAccess = true;
}

PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

PremiumMember.prototype.borrowBook = function(book) {
    if (this.borrowedBooks.length >= 5) {
        console.log(`${this.name} cannot borrow more than 5 books.`);
        return;
    }
    Member.prototype.borrowBook.call(this, book);
};

const book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford");
const book2 = new Book("Clean Code", "Robert C. Martin");
const book3 = new Book("You Don't Know JS", "Kyle Simpson");
const book4 = new Book("The Pragmatic Programmer", "Andrew Hunt");
const book5 = new Book("Eloquent JavaScript", "Marijn Haverbeke");
const book6 = new Book("Design Patterns", "Erich Gamma");

const regularMember = new Member("Alice");
const premiumMember = new PremiumMember("Bob");

const borrowForAlice = regularMember.borrowBook.bind(regularMember);
borrowForAlice(book1);
borrowForAlice(book2);
borrowForAlice(book3);
borrowForAlice(book4);

premiumMember.borrowBook(book5);
premiumMember.borrowBook(book6);
premiumMember.borrowBook(book1);

console.log(regularMember);
console.log(premiumMember);
