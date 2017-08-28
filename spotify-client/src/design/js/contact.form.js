$(() => {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[id='form']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: { required: true },
            // Specify that email should be validated
            // by the built-in "email" rule
            email: {
                required: true,
                email: true
            },
            subject: { required: true },
            message: {
                required: true,
                minlength: 5
            }
        },
        // Specify validation error messages
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            subject: "Please enter a subject",
            message: {
                required: "Please write a message",
                minlength: "Your message must be at least 5 characters long"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        //form.submit();
        submitHandler: function (form) {
            console.log(form);
            $.post("", {
                name1: name,
                email1: email,
                subject1: subject,
                message1: message
            }, function (data) {
                $("#returnmessage").append(data); // Append returned message to message paragraph.
                console.log(data)
                if (data == "Your Query has been received, We will contact you soon.") {
                    $("#form")[0].reset(); // To reset form fields on success.
                }
            });
        }
    });
});
/*
$(() => {
    $("#submit").click(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var subject = $("#subject").val();
        $("#returnmessage").empty(); // To empty previous error/success message.
        // Checking for blank fields.
        if (name == '' || email == '' || subject == '' || message == '') {
            alert("Please Fill Required Fields");
        } else {
            // Returns successful data submission message when the entered information is stored in database.
            $.post("", {
                name1: name,
                email1: email,
                subject1: subject,
                message1: message
            }, function (data) {
                $("#returnmessage").append(data); // Append returned message to message paragraph.
                console.log(data)
                if (data == "Your Query has been received, We will contact you soon.") {
                    $("#form")[0].reset(); // To reset form fields on success.
                }
            });
        }
    });
});*/