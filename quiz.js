$(document).ready(function(){
var perguntas = [{"numero" : 1, "pergunta": "What is the correct translation of the phrase: <br> 'The book is on the table'?",
                "alternativa1":"O livro está sobre a mesa",  "alternativa2":"O livro é sobre a mesa","alternativa3":"O livro está sob a mesa",
                "alternativa4":"O livro está no mesmo plano existencial que a mesa", "resposta": "O livro está sobre a mesa"},
                {"numero" : 2, "pergunta": "Passe a frase para o plural: <br> The book is on the table", "resposta": /\s*the\s*books\s*are\s*on\s*the\s*table\s*/},
                {"numero" : 3, "pergunta": "For my birthday, my father gave me a book, pants, shirt and a beautiful tie. <br> What I did not win?",
                "alternativa1":"Gravata",  "alternativa2":"Livro","alternativa3":"Bicicleta","alternativa4":"Calça", "resposta": "Bicicleta"},
                 {"numero":4, "pergunta": "I like _____ pizza. (complete com o verbo 'comer' na conjugação adequada)", resposta:/\s*to\s*eat\s*/},
                 {"numero": 5, "pergunta": "My day was terrific. Como foi o meu dia?","alternativa1":"Incrível",  "alternativa2":"Regular","alternativa3":"Ruim","alternativa4":"Terrível", "resposta": "Incrível" },
                 {"numero": 6, "pergunta":"Complete: There isn't ___ in the box. (nada)", "resposta": /\s*anything\s*/},
                 {"numero": 7, "pergunta": "Qual frase abaixo apresenta uma frase que está escrita corretamente na forma afirmativa do passado simples em inglês?","alternativa1":"She doesn't tell lies.", "alternativa2":"John and Mary was drinking coke.","alternativa3":"Nancy and Drew did not forgot their books.","alternativa4":"They paid the bill.", "resposta": "They paid the bill." },
                 {"numero": 8, "pergunta":"Qual o verbo auxiliar usado para indicar uma frase no passado simples na forma interrogativa?", "resposta":/\s*did\s*/},
                 {"numero": 9, "pergunta": "Na frase 'Ana is so tired', O verbo de ligação da frase é 'is'. Qual a tradução deste verbo de ligação no sentido da frase apresentada?",   "alternativa1":"É",  "alternativa2":"Está","alternativa3":"Estava","alternativa4":"Estará", "resposta": "Está" },
                 {"numero": 10, "pergunta":"O adjetivo 'tired', utilizado na frase anterior, representa o estado em que Ana se encontra.Qual é a tradução deste adjetivo?", "resposta":/\s*cansada\s*/}
];
var respostasUsuario =[];
var etapa = 0;
var main = document.getElementById("main");
var cont = 0;
var fim = false;

   	Selected = function(x){
		x.style.backgroundColor = "red"; 
    }

	Unselect = function(x){
		x.style.backgroundColor = "white"; 
	}


 	LoadPage = function (){
        $("main").children().fadeOut(200);
	   $("main").slideToggle(1000, "swing", function(){
            main.innerHTML = "";
            main.style.backgroundColor = "white";
        $("main").slideToggle(function(){ 
            if (etapa >= perguntas.length) {
                etapa  =0;
               Pontuacao();
           }else {
	       if (etapa % 2 == 0){
                      
	           main.innerHTML +="<b>" + perguntas[etapa]["numero"] + "</b><p>" +perguntas[etapa]["pergunta"]+ "</p> <br>";
	           for (i = 1; i < 5; i++){
                main.innerHTML += '<label><input type="radio" name = "alternativas" value = "' + perguntas[etapa]["alternativa" + i] + '" required>' + perguntas[etapa]["alternativa" + i] + '</input></label>';
               }
           }
           else{
		          main.innerHTML += "<p>" + "<b>" + perguntas[etapa]["numero"] + "</b>" + " . " + perguntas[etapa]["pergunta"] + "</p> <br>";
		          main.innerHTML += '<textarea id="campoResposta" height="200px"> </textarea>';
           }
	       main.innerHTML += '<button onmouseover= "Selected(this)" onmouseout="Unselect(this)" onclick="Enviar()"> Next! </button> ';
            $("main").children().fadeOut(1);
            $("main").children().fadeIn(200);
                
           }
	      
       } );

    });
    }

	Enviar = function(){
        var vazio = true; 
        if (etapa %2==0){
            var alt = document.getElementsByName("alternativas");
            for (i = 0; i <4; i++){
                if (alt[i].checked){
                    var vazio = false; 
                    respostasUsuario.push(alt[i].value); 	
                    if (alt[i].value == perguntas[etapa]["resposta"]){
                        main.style.backgroundColor = "#c0ff93";
                    }else{
                        main.style.backgroundColor = "#ff9393";
                    }
                }
            }
            if (vazio) {

                alert("Preencha todos os campos!");
            }
            else {
                $("main").children().fadeOut(200);
                etapa +=1; 
                setTimeout(
                LoadPage(), 500);
            }
        }
        
        
        else if (etapa %2 == 1){


            var resposta = document.getElementById("campoResposta").value.toLowerCase();

            if (resposta == "" || resposta == null){
                alert("Responda a pergunta!");
            } 
            else{
                if(perguntas[etapa]["resposta"].test(resposta)){
                    main.style.backgroundColor = "#c0ff93";
                }
                else {
                    main.style.backgroundColor = "#ff9393";
                }
                respostasUsuario.push(resposta);
                etapa +=1;
                setTimeout( LoadPage (), 500);
            }
        }
    }


	Pontuacao = function (){

	var pontos = 0;
    
	for (i = 0; i < respostasUsuario.length ; i++){        
	   if (i % 2 == 0){
        if (respostasUsuario[i] == perguntas[i]["resposta"]){
			pontos +=1; 
		}
       }
        else{
              if (perguntas[i]["resposta"].test(respostasUsuario[i])){
			pontos +=1; 
              }
        }
	}
    main.style.height="200px";
	main.innerHTML += "<p> Você acertou <b>" + pontos + "</b> de <b>" + perguntas.length + "</b: perguntas.";
   
	   setTimeout(function(){
        etapa = 0;
        respostasUsuario =[];
        main.innerHTML += '<button onmouseover= "Selected(this)" onmouseout="Unselect(this)" onclick="LoadPage()"> Try Again! </button>';}, 500); 	
    }
    });
