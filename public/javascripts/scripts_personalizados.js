
//Pinta e seleciona as celulas do novo aluno
$(".ckDia").parent().on('click', function(event) {
	if($(event.currentTarget).find('.ckDia').prop( "checked")){
		$(event.currentTarget).removeClass('success');
		$(event.currentTarget).addClass('danger');
		$(event.currentTarget).find('.ckDia').prop('checked', false);
	}else{
		$(event.currentTarget).removeClass('danger');
		$(event.currentTarget).addClass('success');
		$(event.currentTarget).find('.ckDia').prop('checked', true);
	}
});

//UpdateButton Function
$(".updateButton").on('click', function(event) {
    var id = $(event.currentTarget).data("id");
    window.location = "../home/"+id;
//Atribui o valor do ID ao botao  $(event.currentTarget).val(id);

	}
);


//Ativador de menu
$(document).on("ready",function(){
	url = window.location.pathname;
	console.log(url);
	$("a[href*='"+window.location.pathname+"']").parent().addClass('active');

})
