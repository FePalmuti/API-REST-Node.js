function update() {
    $.ajax({
        method: "GET",
        url: "/books",
        success: function(books) {
            var $data = $("#data");
            $data.empty();
            $.each(books, (i, book) => {
                $data.append("<tr><td>"+book["id"]+"</td><td>"+book["bookName"]+"</td><td>"+book["author"]+"</td></tr>");
            });
        },
        error: function(jqXHR) {
            alert("Error code: "+jqXHR.status);
        }
    });
}

function errorType(errorCode) {
    if(errorCode === 409) {
        return "Database conflict!";
    }
}

window.onload = update();

$("#add").on("click", function() {
    var id = $("#id").val();
    var bookName = $("#book-name").val();
    var author = $("#author").val();
    // Clear input fields
    $("#id").val("");
    $("#book-name").val("");
    $("#author").val("");
    $.ajax({
        method: "POST",
        url: "/books",
        data: {id:id, bookName:bookName, author:author},
        success: function(newBook) {
            update();
        },
        error: function(jqXHR) {
            alert(errorType(jqXHR.status));
        }
    });
});
