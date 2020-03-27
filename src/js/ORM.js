class ORM {
    constructor(path) {
        this.path = path;
    }

    build_parameters(parameter_dict) {
        if (parameter_dict === undefined) return "";
        let result = "?";
        for (let key in parameter_dict) {
            result += key + "=" + parameter_dict[key] + "&";
        }
        return result;
    }

    get(route, callback, end_callback, parameter_dict, async=true) {
        let params = this.build_parameters(parameter_dict);
        let rq = new XMLHttpRequest();
        rq.open("GET", this.path + route + params, true);
        rq.addEventListener("load", function () {
            callback(rq, end_callback);
        });
        rq.send(null);
    }

    create_book(book_name, end_callback) {
        let route = "addBook.php";
        this.get(route, this.handle_callback, end_callback, {"titreLivre": book_name});
    }

    create_member(member_name, end_callback) {
        let route = "addMember.php";
        this.get(route, this.handle_callback, end_callback, {"nomAdherent": member_name});
    }

    select_all(object_name, end_callback) {
        let route = "selectAll.php";
        this.get(route, this.handle_callback, end_callback, {"objet": object_name});
    }

    handle_callback(rq, end_callback) {
        if (end_callback) {
            let data;
            try {
                data = JSON.parse(rq.responseText);
            }
            catch (e) {
                data = "nope";
            }
            end_callback(data);
        }
    }

    delete_borrowing(member_id, book_id) {

    }

    select_borrowed_book_by_id(member_id, end_callback) {
        let route = "selectBorrowingById.php";
        this.get(route, this.handle_callback, end_callback, {"id": member_id});
    }

    select_available_books(end_callback) {
        let route = "selectAvailableBook.php";
        this.get(route, this.handle_callback, end_callback);
    }

    select_borrowed_books(end_callback) {
        let route = "selectBorrowedBook.php";
        this.get(route, this.handle_callback, end_callback);
    }
}