$(document).ready(function($) {

		$.ajax({
			url : 'http://pokeapi.co/api/v2/pokemon/',
			type : 'GET',
			datatype : 'json',
			data : {'limit': '10'}
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
            			tipoCadena += "<p>" + tipo[i].type.name + "</p>";
            		}
            		for(i=0; i<tipo.length; i++){
            			console.log(abilidades[i].ability.name);
            			tipoHabilidad += "<p>" + abilidades[i].ability.name + "</p>";
            		}
					var foto = $("<img>").attr("src","http://pokeapi.co/media/img/" + idPK + ".png");
					var cadaPK = $("<div>");
					cadaPK.attr('data-toggle', 'modal');
					cadaPK.attr('data-target', '#myModal' + idPK);
					cadaPK.append(foto);
					cadaPK.append(pokeNombre);
					var modalPK = $('<div class="modal fade" id="myModal' + idPK + '" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">' + nombrePokemon + '</h4></div><div class="modal-body"> <img src="http://pokeapi.co/media/img/'+idPK+ '.png" alt=""> <div class="tipoClass">'+ tipoCadena + '</div> </div><div class="abilidadClass">'+ tipoHabilidad + '</div> </div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');
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

		

});