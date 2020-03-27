let orm = new ORM("php/");

let BOOK_LIST = {};
let MEMBER_LIST = {};

function addMember(name) {
    orm.create_member(name, function (data) {
        orm.select_all("adherent", updateMemberList);
    });
}

function addBook(name) {
    orm.create_book(name, function () {
        orm.select_available_books(updateAvailableBookList);
    });
}

function updateMemberList(data) {
    if (data != undefined) {
        MEMBER_LIST = {}
        for (let e of data) {
            MEMBER_LIST[e.idAdherent] = new Member(e.idAdherent, e.nomAdherent);
        }
    }

    listeAdherents.innerText = "";
    for (let key in MEMBER_LIST) {
        let member = MEMBER_LIST[key];
        orm.select_borrowed_book_by_id(member.id, function (data) {
            let count_of_borrowed_books = Object.keys(data).length;
            // console.log(count_of_borrowed_books);
            let li = member.create_li_element(count_of_borrowed_books);
            listeAdherents.appendChild(li);
        });
    }
}

function updateAvailableBookList(data) {
    listeLivresDisponibles.innerText = "";
    for (let book_data of data) {
        let book = new Book(book_data.idLivre, book_data.titreLivre);
        BOOK_LIST[book_data.idLivre] = book;
        let li = book.create_li_element();
        listeLivresDisponibles.appendChild(li);
    }
}

function updateBorrowedBookList(data) {
    listeLivresEmpruntes.innerText = "";
    for (let book_data of data) {
        let book = new Book(book_data.idLivre, book_data.titreLivre);
        BOOK_LIST[book_data.idLivre] = book;
        let li = book.create_li_element();
        listeLivresEmpruntes.appendChild(li);
    }
    orm.select_all("adherent", updateMemberList);
}

let listeAdherents = document.getElementById("listeAdherents");
let listeLivresDisponibles = document.getElementById("listeLivresDisponibles");
let listeLivresEmpruntes = document.getElementById("listeLivresEmpruntes");
let addMemberButton = document.getElementById("ajouterAdherent");
let addBookButton = document.getElementById("ajouterLivre");

listeAdherents.addEventListener("click", function (e) {
    let member = MEMBER_LIST[e.target.id.replace("member", "")];
    orm.select_borrowed_book_by_id(member.id, function (data) {
        s = member.get_count_of_borrowed_book_string(Object.keys(data).length);
        if (s === 0) {
            alert(member.name + " n'a emprunté aucun livre :(");
            return;
        }
        let msg = member.name + " a " + s + " en ce moment :\n";

        for (let book of data) {
            msg += "\n - " + book.titreLivre;
        }
        alert(msg);
    });

});

listeLivresDisponibles.addEventListener("click", function (e) {
    let book = BOOK_LIST[e.target.id.replace("book", "")];
    book.borrow();
});

listeLivresEmpruntes.addEventListener("click", function (e) {
    let book = BOOK_LIST[e.target.id.replace("book", "")];
    book.return();
});

addMemberButton.addEventListener("click", function () {
    let name = document.getElementById("nomAdherent");
    addMember(name.value);
});

addBookButton.addEventListener("click", function () {
    let name = document.getElementById("titreLivre");
    addBook(name.value);
});

orm.select_available_books(updateAvailableBookList);
orm.select_borrowed_books(updateBorrowedBookList);