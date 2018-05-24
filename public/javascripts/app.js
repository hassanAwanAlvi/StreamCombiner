$(document).ready(function(){

    $("#save").click(function(){
        $('#form').attr("action", "/save");
        $('#form').submit();
    });


});