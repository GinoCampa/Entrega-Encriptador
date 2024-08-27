const textAreaEncriptador = document.querySelector(".textoIngreso");
const textAreaMensajeEncriptado = document.querySelector(".mensajeResultado");
const textoAviso = document.querySelector(".avisoEncriptador")

/* Validacion de texto
Solo permite el ingreso de letras en minuscula, sin acentos o caracteres especiales.
Caso contrario se debe avisar del error
*/

function validacionTexto(){
    let textoValidable =document.querySelector(".textoIngreso").value;
    //console.log (textoValidable);
    let patronValido = /^[a-zA-Z\s]*$/;  
    //El texto ingresado se visualiza enteramente en minusculas en pantalla por lo que se estan convirtiendo los caracteres mayusculas en minisculas.
    //Los valores invalidos son los caracteres especiales y las acentuaciones de cualquier tipo.
    if(!patronValido.test(textoValidable)){
        alert("Mensaje No Valido. No se permiten acentos ni caracteres especiales");
        return false;
    }
    else if((textoValidable==="")){
        alert("Mensaje vacio. Ingresar mensaje nuevamente. \nNo se permiten acentos ni caracteres especiales");
        return false;
    }
    
    return true;
}

/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/

function encriptarTexto(stringMensaje){
    let matrizEncriptacion = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    stringMensaje = stringMensaje.toLowerCase();
    for(let contador=0;contador<matrizEncriptacion.length;contador++){
        if(stringMensaje.includes(matrizEncriptacion[contador][0])){
            stringMensaje = stringMensaje.replaceAll(matrizEncriptacion[contador][0],matrizEncriptacion[contador][1]);
        }
    }
    //console.log(stringMensaje);
    return stringMensaje;
}

function desencriptarTexto(stringMensaje){
    let matrizDesencriptacion = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    stringMensaje = stringMensaje.toLowerCase();

    for(let contador=0;contador<matrizDesencriptacion.length;contador++){
        if(stringMensaje.includes(matrizDesencriptacion[contador][1])){
            stringMensaje = stringMensaje.replaceAll(matrizDesencriptacion[contador][1],matrizDesencriptacion[contador][0]);
        }
    }
    console.log(stringMensaje);
    return stringMensaje;
}

/* En pantalla inicial se visualiza imagen de muñeco con mensajes de falta de mensajes encontrados. 
- En caso de encriptacion y desencriptacion exitosas, se muestra en sector de resultado el mensaje trabajado y su boton de copiar correspondiente. 
Ademas de limpiar valores de ingreso de texto.
En caso de fallo por mensaje invalido, se continuaran visualizandose las imagenes del sector de salida.
*/


function resetFallo(){
    document.querySelector(".imagenMuñeco").style.visibility = 'visible';
    document.querySelector(".faltaMensaje").style.visibility = 'visible';
    document.querySelector(".ingresarTexto").style.visibility = 'visible';
    document.querySelector(".botonCopiar").style.visibility = 'hidden';
    textAreaEncriptador.value = "";
    textAreaMensajeEncriptado.value = "";
}

function resetExito(){
    textAreaEncriptador.value = "";
    document.querySelector(".imagenMuñeco").style.visibility = 'hidden';
    document.querySelector(".faltaMensaje").style.visibility = 'hidden';
    document.querySelector(".ingresarTexto").style.visibility = 'hidden';
    document.querySelector(".botonCopiar").style.visibility = 'visible';
}


/* Botones de encriptar y desencriptar. 
Si el texto tiene caracteres invalidos o esta completamente vacio (Un unico espacio se considera como algo valido, solo que no devuelve un caracter o string con letras) 
realizara la accion correspondiente. 
Caso contrario dara un aviso de pantalla:
- Si el mensaje esta vacio
- Si el mensaje tiene caracteres invalidos (Acentos, caracteres especiales como el @ , . ?) */

function botonEncriptar(){
    let validar = validacionTexto();
    //console.log(validar);
    if(!validacionTexto()){
        resetFallo();
    }
    else{
        const textoEncriptado = encriptarTexto(textAreaEncriptador.value);
        textAreaMensajeEncriptado.value = textoEncriptado;
        resetExito();
    }

}

function botonDesencriptar(){
    let validar = validacionTexto();
    //console.log(validar);
    if(!validacionTexto()){
        resetFallo();
    }
    else{
        const textoDesencriptado = desencriptarTexto(textAreaEncriptador.value);
        textAreaMensajeEncriptado.value = textoDesencriptado;
        resetExito();
    }

}

// Una vez la encriptacion o desencriptacion de texto fue exitosa, se habilita la visualizacion y uso del boton copiar.
// Copia el texto de resultado, informando de copia exitosa por medio de alerta en pantalla y permite el uso de pegado en la seccion de ingreso de texto.

function botonCopiar(){
    let copiable = textAreaMensajeEncriptado;
    copiable.select();
    document.execCommand('copy');
    alert ("Texto Copiado");
}