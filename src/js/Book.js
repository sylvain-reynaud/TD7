class Book {
    constructor(id, name) {
        this.name = name;
        this.id = id;
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
        orm.create_borrowing(member_id, this.id);
        orm.select_available_books(updateAvailableBookList);
        orm.select_borrowed_books(updateBorrowedBookList);
    }

    return() {
        let id = this.id;
        orm.select_borrower(this.id, function (data) {
            let member = MEMBER_LIST[data[0].idAdherent];
            let choice = confirm("Livre prêté à " + member.name + "\nRetour de ce livre ?");
            if (choice) {
                orm.delete_borrowing(id);
                orm.select_available_books(updateAvailableBookList);
                orm.select_borrowed_books(updateBorrowedBookList);
            }
        });
    }
}