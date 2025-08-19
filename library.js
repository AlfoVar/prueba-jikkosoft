class Book {
    constructor(isbn, title, author) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.available = true;
        this.loanedTo = null;
        this.returnDate = null;
    }

    toString() {
        const state = this.available 
            ? "available" 
            : `Prestado a ${this.loanedTo.name} (devolver antes de ${this.returnDate.toLocaleDateString()})`;
        return `${this.title} por ${this.author} (${this.isbn}) - ${state}`;
    }
}

class Member {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.booksBorrowed = [];
    }

    takeBook(book) {
        if (book.available) {
            book.available = false;
            book.loanedTo = this;
            book.returnDate = new Date();
            book.returnDate.setDate(book.returnDate.getDate() + 14);
            this.booksBorrowed.push(book);
            console.log(`${this.name} ha tomado prestado '${book.title}'`);
            return true;
        } else {
            console.log(`El libro '${book.title}' no está disponible.`);
            return false;
        }
    }

    returnBook(book) {
        if (this.booksBorrowed.includes(book)) {
            book.available = true;
            book.loanedTo = null;
            book.returnDate = null;
            this.booksBorrowed = this.booksBorrowed.filter(l => l !== book);
            console.log(`${this.name} ha devuelto '${book.title}'`);
            return true;
        } else {
            console.log(`${this.name} no tiene prestado el libro '${book.title}'`);
            return false;
        }
    }

    toString() {
        return `Miembro: ${this.name} (${this.email}) - ${this.booksBorrowed.length} libros prestados`;
    }
}

class Library {
    constructor(name) {
        this.name = name;
        this.books = new Map();
        this.members = new Map();
    }

    addBook(book) {
        if (!this.books.has(book.isbn)) {
            this.books.set(book.isbn, book);
            console.log(`Libro '${book.title}' agregado a la biblioteca.`);
        } else {
            console.log(`El libro con ISBN ${book.isbn} ya existe.`);
        }
    }

    registerMember(member) {
        if (!this.members.has(member.id)) {
            this.members.set(member.id, member);
            console.log(`Miembro '${member.name}' registrado.`);
        } else {
            console.log(`El miembro con ID ${member.id} ya está registrado.`);
        }
    }

    searchBook(title) {
        const results = [];
        for (const book of this.books.values()) {
            if (book.title.toLowerCase().includes(title.toLowerCase())) {
                results.push(book);
            }
        }
        return results;
    }

    toString() {
        return `Biblioteca: ${this.name} - ${this.books.size} libros, ${this.members.size} miembros`;
    }
}

// Ejecución directa
if (require.main === module) {
    const library = new Library("Biblioteca Central");

    const book1 = new Book("978-0123456789", "El nombre del viento", "Patrick Rothfuss");
    const book2 = new Book("978-9876543210", "1984", "George Orwell");

    const member1 = new Member(1, "Ana Pérez", "ana@example.com");
    const member2 = new Member(2, "Luis Gómez", "luis@example.com");

    library.addBook(book1);
    library.addBook(book2);
    library.registerMember(member1);
    library.registerMember(member2);

    member1.takeBook(book1);
    member2.takeBook(book1);

    const results = library.searchBook("1984");
    results.forEach(book => console.log(book));

    member1.returnBook(book1);
    member1.returnBook(book1);

    console.log(library.toString());
}

module.exports = { Book, Member, Library };