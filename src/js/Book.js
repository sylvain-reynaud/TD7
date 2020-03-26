class Book {
    constructor(name) {
        this.name = name;
        this.id = Object.keys(BOOK_LIST).length;
        this.member = null;
    }

    is_borrowed() {
        return this.member != null;
    }

    create_li_element() {
        let li = document.createElement("li");
        li.id = "book" + this.id;
        li.innerHTML = this.id  + " - " + this.name;
        return li;
    }

    borrow(msg="") {
        let member_id = prompt(msg + "Prêt de \"" + this.name + "\".\nn° de l'emprunteur ?");
        if (member_id === null) return;
        else if (!MEMBER_LIST[member_id]) {
            return this.borrow("n° incorrect\n")
        }
        MEMBER_LIST[member_id].borrowed_books[this.id] = this;
        this.member = MEMBER_LIST[member_id];
        updateAvailableBookList();
        updateBorrowedBookList();
        updateMemberList();
    }

    return() {
        let choice = confirm("Livre prêté à " + this.member.name);
        if (choice) {
            delete this.member.borrowed_books[this.id];
            this.member = null;
            updateAvailableBookList();
            updateBorrowedBookList();
            updateMemberList();
        }
    }
}