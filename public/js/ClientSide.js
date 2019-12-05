function add() {
    var id = $("#id").val();
    var bookName = $("#book-name").val();
    var author = $("#author").val();
    // Clear input fields
    $("#id").val("");
    $("#book-name").val("");
    $("#author").val("");
    $.ajax({
        type: "POST",
        url: "/books",
        data: {id:id, bookName:bookName, author:author},
        success: function(newBook) {
            showAll();
            alert("Book added!");
        },
        error: function(jqXHR) {
            alert(errorType(jqXHR.status));
        }
    });
}

function find() {
    var bookName = $("#searched-book-name").val();
    // Clear input fields
    $("#searched-book-name").val("");
    $.ajax({
        type: "GET",
        url: "/books/"+bookName,
        success: function(books) {
            var $data = $("#data");
            $data.empty();
            $data.append(""+
                "<tr>"+
                    "<th>BOOK NAME</th>"+
                    "<th>AUTHOR</th>"+
                    "<th></th>"+
                    "<th></th>"+
                "</tr>"
            );
            $.each(books, (i, book) => {
                $data.append(""+
                    "<tr>"+
                        "<td>"+book["bookName"]+"</td>"+
                        "<td>"+book["author"]+"</td>"+
                        "<td><button type='button' id='remove"+book["id"]+"' onclick='remove(this.id)' class='btn btn-default'>"+
                                "<span class='glyphicon glyphicon-trash'</span>"+
                            "</button></td>"+
                        "<td><button type='button' id='update"+book["id"]+"' onclick='update(this.id)' class='btn btn-default'>"+
                                "<span class='glyphicon glyphicon-pencil'</span>"+
                            "</button></td>"+
                    "</tr>"
                );
            });
        },
        error: function(jqXHR) {
            alert(errorType(jqXHR.status));
        }
    });
}

function showAll() {
    $.ajax({
        type: "GET",
        url: "/books",
        success: function(books) {
            var $data = $("#data");
            $data.empty();
            $data.append(""+
                "<tr>"+
                    "<th>BOOK NAME</th>"+
                    "<th>AUTHOR</th>"+
                    "<th></th>"+
                    "<th></th>"+
                "</tr>"
            );
            $.each(books, (i, book) => {
                $data.append(""+
                    "<tr>"+
                        "<td>"+book["bookName"]+"</td>"+
                        "<td>"+book["author"]+"</td>"+
                        "<td><button type='button' id='remove"+book["id"]+"' onclick='remove(this.id)' class='btn btn-default'>"+
                                "<span class='glyphicon glyphicon-trash'</span>"+
                            "</button></td>"+
                        "<td><button type='button' id='update"+book["id"]+"' onclick='update(this.id)' class='btn btn-default'>"+
                                "<span class='glyphicon glyphicon-pencil'</span>"+
                            "</button></td>"+
                    "</tr>"
                );
            });
        },
        error: function(jqXHR) {
            alert(errorType(jqXHR.status));
        }
    });
}

function remove(buttonId) {
    // "remove123" --> "123"
    var bookId = buttonId.substring(6);
    $.ajax({
        type: "DELETE",
        url: "/books/"+bookId,
        success: function() {
            showAll();
            alert("Book removed!");
        },
        error: function(jqXHR) {
            alert(errorType(jqXHR.status));
        }
    });
}

function update(buttonId) {
    // "update123" --> "123"
    var bookId = buttonId.substring(6);
    var newBookName = prompt("New book name:", "");
    var newAuthor = prompt("New author:", "");
    $.ajax({
        type: "PUT",
        url: "/books/"+bookId,
        data: {newBookName:newBookName, newAuthor:newAuthor},
        success: function() {
            showAll();
            alert("Book updated!");
        },
        error: function(jqXHR) {
            alert(errorType(jqXHR.status));
        }
    });
}

function errorType(errorCode) {
    if(errorCode === 400) {
        return "Bad request!";
    }
}

window.onload = showAll();

$("#add").on("click", function() {
    add();
});

$("#show-all").on("click", function() {
    showAll();
});

$("#find").on("click", function() {
    find();
});
//
