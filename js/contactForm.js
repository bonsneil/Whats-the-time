$(document).ready(function () {
    $("#submit_btn").click(function () {
    $.ajaxSetup({ cache: false });
	
        console.log("Clicked");
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function () {
            $(this).css('border-color', '');
            if (!$.trim($(this).val())) { //if this field is empty 
                $(this).css('border-color', 'red'); //change border color to red   
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('border-color', 'red'); //change border color to red   
                proceed = false; //set do not proceed flag				
            }
        });

        if (proceed) //everything looks good! proceed...
        {

            var d = new Date();
            //get input field values data to be sent to server
            post_data = {
                'user_name': $('input[name=userName]').val(),
                'user_email': $('input[name=userEmail]').val(),
                'msg': $('textarea[name=userMessage]').val(),
                'date_sent': d.getTime()
            };

            //Ajax post data to server
            $.post('contact_me.php', post_data, function (response) {
                if (response.type == 'error') { //load json data from server and output message     
                    output = '<div class="error">' + response.text + '</div>';
                } else {
                    output = '<div class="success">' + response.text + '</div>';
                    //reset values in all input fields
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val('');
                    $("#contact_form #contact_body").slideUp(); //hide form after success
                }
                $("#contact_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function () {
        $(this).css('border-color', '');
        $("#result").slideUp();
    });
});
