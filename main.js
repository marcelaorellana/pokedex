$(document).ready(function($) {

		$.ajax({
			url : 'http://pokeapi.co/api/v2/pokemon/',
			type : 'GET',
			datatype : 'json',
			data : {'limit': '20'}
		})
		.done(function(respuesta){
			console.log("successe");
			console.log(respuesta);
			nombresPK(respuesta);
		})
		.fail(function(){
			console.log("error");
		})


		function nombresPK(dato){

			dato.results.forEach(function(val){
				
				var nombre = val.name;
				var urlPK = val.url;

				$.ajax({
					url : urlPK,
					type : 'GET',
					datatype : 'json'
					
				})
				.done(function(respuesta){
					console.log("successe");
					console.log(respuesta);
					
				})
				.fail(function(){
					console.log("error");
				})

				console.log(nombre);
				var numero1 = val.url.charAt(33);
				var numero2 = val.url.charAt(34);
				if(numero2 == "/"){
		        	var num = numero1;
		        }else{
		        	var num = numero1.concat(numero2);
        		}
				console.log(num);

				//$(".lista").append("<div id='pokeId" + num + "'></div>")
				var foto = $("<img>").attr("src","http://pokeapi.co/media/img/" + num + ".png");
				var pokeNombre = $("<p>").text(nombre);
		        $(".lista").append(foto);
		        $('.lista').append(pokeNombre);
			});

			
		}

		

});