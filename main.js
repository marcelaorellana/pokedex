$(document).ready(function($) {
	var paginacion = 0;
		$.ajax({
			url : 'https://pokeapi.co/api/v2/pokemon/',
			type : 'GET',
			datatype : 'json',
			data : {'limit': '21'}
		})
		.done(function(respuesta){
			console.log("successe");
			//console.log(respuesta);
			nombresPK(respuesta);
		})
		.fail(function(){
			console.log("error");
		})


		function nombresPK(dato){

			dato.results.forEach(function(val){
				
				var nombre = val.name;
				var urlPK = val.url;

				var pokeNombre = $("<p>").text(nombre);
		        	        

				$.ajax({
					url : urlPK,
					type : 'GET',
					datatype : 'json'
					
				})
				.done(function(respuesta){
					console.log("successe");
					console.log(respuesta);
					imagenPK(respuesta);
				})
				.fail(function(){
					console.log("error");
				})

				function imagenPK(datos){

					var idPK = datos.id;
					var nombrePokemon = datos.name;
					var tipo = datos.types;
					var abilidades = datos.abilities;
					var tipoCadena = "";
					var tipoHabilidad = "";
					for(i=0; i<tipo.length; i++){
            			//console.log(tipo[i].type.name);
            			//tipoCadena += "<p>" + tipo[i].type.name + "</p>";
            			tipoCadena += "<li><p>" + tipo[i].type.name + "</p></li>";
            		}
            		for(i=0; i<tipo.length; i++){
            			//console.log(abilidades[i].ability.name);
            			tipoHabilidad += "<li><p>" + abilidades[i].ability.name + "</p></li>";
            		}
					var foto = $("<img>").attr("src","http://pokeapi.co/media/img/" + idPK + ".png");
					var spacioFoto =$("<div>");
					var cadaPK = $("<div>");
					spacioFoto.attr("class", "spacioFoto");
					cadaPK.attr("class", "cajas");
					cadaPK.attr('data-toggle', 'modal');
					cadaPK.attr('data-target', '#myModal' + idPK);
					spacioFoto.append(foto);
					cadaPK.append(spacioFoto);
					cadaPK.append(pokeNombre);
					var modalPK = $('<div class="modal fade" id="myModal' + idPK + '" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h1 class="modal-title">' + nombrePokemon + '</h1></div><div class="modal-body"> <img src="http://pokeapi.co/media/img/'+idPK+ '.png" alt="" class="imagModal"> <div class="tipoClass"><h3>Tipo de Pokemón</h3><ul>'+ tipoCadena + '</ul></div> <div class="abilidadClass"><h3>Habilidades</h3><ul>'+ tipoHabilidad + '</ul></div></div> </div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');
					$(".modal").on("shown.bs.modal", function () {
                	if ($(".modal-backdrop").length > 1) {
                    	$(".modal-backdrop").not(':first').remove();
                    	$("body").attr('style', 'padding-right: 0'); 
                	}
            		});
            		
					cadaPK.append(modalPK);
					$(".lista").append(cadaPK);
										
				}
				
			});			
		}
		$(".siguiente").on("click", function(e){
					$(".lista").empty();
					paginacion += 20;
					$.ajax({
						url : 'https://pokeapi.co/api/v2/pokemon/',
						type : 'GET',
						datatype : 'json',
						data : {'offset':paginacion}
					})
					.done(function(respuesta){
						console.log("successe");
						//console.log(respuesta);
						nombresPK(respuesta);
					})
					.fail(function(){
						console.log("error");
					})
				});

		$(".antes").on("click", function(e){
					$(".lista").empty();
					if(paginacion > 0){
						paginacion -= 20;
					}
					$.ajax({
						url : 'https://pokeapi.co/api/v2/pokemon/',
						type : 'GET',
						datatype : 'json',
						data : {'offset':paginacion}
					})
					.done(function(respuesta){
						console.log("successe");
						//console.log(respuesta);
						nombresPK(respuesta);
					})
					.fail(function(){
						console.log("error");
					})
				});

});