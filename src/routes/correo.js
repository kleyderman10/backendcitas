import nodemailer from 'nodemailer'
import express from "express";
import { masks } from 'dateformat';
import jwt from 'jsonwebtoken';
const router=express.Router();
router.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, 'Clinica2020', (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded; 
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });
var tamanyo_password				=	9;			// definimos el tamaño que tendrá nuestro password
var caracteres_conseguidos			=	0;			// contador de los caracteres que hemos conseguido
var caracter_temporal				=	'';

var array_caracteres				=	new Array();// array para guardar los caracteres de forma temporal
	
	for(var i = 0; i < tamanyo_password; i++){		// inicializamos el array con el valor null
		array_caracteres[i]	=	null;
	}
 
var password_definitivo				=	'';
 
var numero_minimo_letras_minusculas	=	1;			// en ésta y las siguientes variables definimos cuántos 
var numero_minimo_letras_mayusculas	=	1;			// caracteres de cada tipo queremos en cada 
var numero_minimo_numeros			=	1;
var numero_minimo_simbolos			=	1;
 
var letras_minusculas_conseguidas 	=	0;
var	letras_mayusculas_conseguidas	=	0;
var	numeros_conseguidos				=	0;
var	simbolos_conseguidos			=	0;
 
 
// función que genera un número aleatorio entre los límites superior e inferior pasados por parámetro
function genera_aleatorio(i_numero_inferior, i_numero_superior) {
	var     i_aleatorio  =0;
	i_aleatorio  =   Math.floor((Math.random() * (i_numero_superior - i_numero_inferior + 1)) + i_numero_inferior);   Math.floor((Math.random() * (i_numero_superior - i_numero_inferior + 1)) + i_numero_inferior);
    return  i_aleatorio;
}
 
 
			// función que genera un tipo de caracter en base al tipo que se le pasa por parámetro (mayúscula, minúscula, número, símbolo o aleatorio)
function genera_caracter(tipo_de_caracter){
		// hemos creado una lista de caracteres específica, que además no tiene algunos caracteres como la "i" mayúscula ni la "l" minúscula para evitar errores de transcripción
		var lista_de_caracteres	=	'$+=?@_23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
		var caracter_generado	=	'';
		var valor_inferior		=	0;
		var valor_superior		=	0;

		switch (tipo_de_caracter){
			case 'minúscula':
				valor_inferior	=	38;
				valor_superior	=	61;
				break;
			case 'mayúscula':
				valor_inferior	=	14;
				valor_superior	=	37;
				break;
			case 'número':
				valor_inferior	=	6;
				valor_superior	=	13;
				break;
			case 'símbolo':	
				valor_inferior	=	0;
				valor_superior	=	5;
				break;
			case 'aleatorio':
				valor_inferior	=	0;
				valor_superior	=	61;

} // fin del switch

caracter_generado	=	lista_de_caracteres.charAt(genera_aleatorio(valor_inferior, valor_superior));
return caracter_generado;
} // fin de la función genera_caracter()
 
 
			// función que guarda en una posición vacía aleatoria el caracter pasado por parámetro
function guarda_caracter_en_posicion_aleatoria(caracter_pasado_por_parametro){
	var guardado_en_posicion_vacia	=	false;
	var posicion_en_array			=	0;
 
	while(guardado_en_posicion_vacia	!=	true){
	    posicion_en_array	=	genera_aleatorio(0, tamanyo_password-1);	// generamos un aleatorio en el rango del tamaño del password
        // el array ha sido inicializado con null en sus posiciones. Si es una posición vacía, guardamos el caracter
		if(array_caracteres[posicion_en_array] == null){
			array_caracteres[posicion_en_array]	=	caracter_pasado_por_parametro;
			guardado_en_posicion_vacia			=	true;
		}
	}
}
 
 
			// función que se inicia una vez que la página se ha cargado
function generar_contrasenya(){
	password_definitivo='';
        // generamos los distintos tipos de caracteres y los metemos en un password_temporal
	while (letras_minusculas_conseguidas < numero_minimo_letras_minusculas){
	caracter_temporal	=	genera_caracter('minúscula');
	guarda_caracter_en_posicion_aleatoria(caracter_temporal);
	letras_minusculas_conseguidas++;
	caracteres_conseguidos++;
    }

	while (letras_mayusculas_conseguidas < numero_minimo_letras_mayusculas){
		caracter_temporal	=	genera_caracter('mayúscula');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		letras_mayusculas_conseguidas++;
		caracteres_conseguidos++;
	}

	while (numeros_conseguidos < numero_minimo_numeros){
		caracter_temporal	=	genera_caracter('número');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		numeros_conseguidos++;
		caracteres_conseguidos++;
	}

	while (simbolos_conseguidos < numero_minimo_simbolos){
		caracter_temporal	=	genera_caracter('símbolo');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		simbolos_conseguidos++;
		caracteres_conseguidos++;
	}
	// si no hemos generado todos los caracteres que necesitamos, de forma aleatoria añadimos los que nos falten
	// hasta llegar al tamaño de password que nos interesa
	while (caracteres_conseguidos < tamanyo_password){
		caracter_temporal	=	genera_caracter('aleatorio');
		guarda_caracter_en_posicion_aleatoria(caracter_temporal);
		caracteres_conseguidos++;
	}

	// ahora pasamos el contenido del array a la variable password_definitivo
	for(var i=0; i < array_caracteres.length; i++){
				password_definitivo	=	password_definitivo + array_caracteres[i];
			}
	return password_definitivo;
			// indicamos los parámetros con los que hemos generado la contraseña
			/* document.write('Tamaño total de la contraseña: ' 	+ tamanyo_password + '<br>');
			document.write('Cantidad de minúsculas: '			+ numero_minimo_letras_minusculas + '<br>');
			document.write('Cantidad de mayúsculas: ' 			+ numero_minimo_letras_mayusculas + '<br>');
			document.write('Cantidad de números: ' 				+ numero_minimo_numeros + '<br>');
			document.write('Cantidad de símbolos: ' 			+ numero_minimo_simbolos + '<br>');
			document.write('El resto de caracteres hasta llegar al tamaño de la contraseña se completa con caracteres aleatorios.<br>');

			// y ahora simplemente lo mostramos por pantalla
			document.write('Password generado: <strong>' + password_definitivo + '</strong><br>');

			// e indicamos que al recargar la página se generará uno nuevo
			document.write('Pulse F5 para generar una nueva contraseña') */

}
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'soportesistemascba@gmail.com',
    pass: 'p0l1c1@2018'
  },
  tls:{
    ciphers:'SSLv3'
  }
});
router.post('/send/', (req, res) => {
    try {
	  var clave=generar_contrasenya();
	  config.close();
        config.connect()
        .then(()=>{
             config.request().query("EXEC SPKWEB_AFI '"+id+"','','','','','','','','','','','','','','','','"+clave+"',5 ",function(err,recordset){
                if (err) console.log(err);
                res.json(clave);
				config.close();         
            });
        })
      var fromName = 'Clinica Buenos Aires';
      var toEmail = req.body.toEmail;
      var subject = 'Recuperar Contraseña';
      var textBody = 'Tu contraseña se cambio por seguridad:'+ clave +'';
      var htmlBody = `<h2>Tu contraseña se cambio por seguridad</h2> 
      <h1>`+ clave +`</h1>
      <b>Clínica Buenos aires S.A.S</b>
      <div>Carrera 15 No. 14-36 Alfonso Lopez.</div>
      <div>5801616 - 5806494</div>
      <div><img src="https://docs.google.com/uc?export=download&amp;id=1mZNnNkkZBBMwrtz8fzlCr-9Tr44zBwHL&amp;revid=0B79L89EG1u07ek9PS0cyeXlvckVKM1ptdFRBbjNSK2FyQXNFPQ"><br></div>`;

      if (!subject || typeof subject !== 'string') {
        throw new TypeError('Subject was not defined')
        return
      }
      if (!toEmail || typeof toEmail !== 'string') {
        throw new TypeError('To Email was not defined')
        return
      }
  
      var mailOptions = {
        from: fromName + '<' + process.env.FROM_EMAIL + '>',
        to: toEmail,
        subject: subject,
        text: textBody,
        html: htmlBody
        
      }
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new TypeError(error.message)
        }
        console.log('Mensaje %s enviado: %s', info.messageId, info.response)
        password_definitivo='';
        res.json({
          message: 'Mensaje enviado exitosamente'
        })
      })
    } catch (error) {
      res.status(500)
      res.json({
        error: error.message
      })
      console.error('Ocurrió un error:')
      console.error(error.message)
    }
  })
module.exports=router;