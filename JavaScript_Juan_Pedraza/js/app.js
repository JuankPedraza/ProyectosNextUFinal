
var calculadora = {

  pantalla_calculadora: document.getElementById("display"),
  valorPantalla: "0",
  operacion_calc: "",
  auxTeclaIgual: false,
  primerNumero: 0,
  segundoNumero: 0,
  ultimoNumero: 0,
  resultado: 0,

  init: (function () {
    this.asignacionEventosaFuncion();
    this.asignacionEventosBotones(".tecla");
  }),


  asignacionEventosaFuncion: function () {

    document.getElementById('0').addEventListener("click", function () { calculadora.ingresoNumero("0"); });
    document.getElementById('1').addEventListener("click", function () { calculadora.ingresoNumero("1"); });
    document.getElementById('2').addEventListener("click", function () { calculadora.ingresoNumero("2"); });
    document.getElementById('3').addEventListener("click", function () { calculadora.ingresoNumero("3"); });
    document.getElementById('4').addEventListener("click", function () { calculadora.ingresoNumero("4"); });
    document.getElementById('5').addEventListener("click", function () { calculadora.ingresoNumero("5"); });
    document.getElementById('6').addEventListener("click", function () { calculadora.ingresoNumero("6"); });
    document.getElementById('7').addEventListener("click", function () { calculadora.ingresoNumero("7"); });
    document.getElementById('8').addEventListener("click", function () { calculadora.ingresoNumero("8"); });
    document.getElementById('9').addEventListener("click", function () { calculadora.ingresoNumero("9"); });
    document.getElementById('on').addEventListener("click", function () { calculadora.borrarNumero(""); });
    document.getElementById('punto').addEventListener("click", function () { calculadora.validarPunto(""); });
    document.getElementById('sign').addEventListener("click", function () { calculadora.validarSigno(""); });
    document.getElementById('mas').addEventListener("click", function () { calculadora.ingresoOperacion("+"); });
    document.getElementById('menos').addEventListener("click", function () { calculadora.ingresoOperacion("-"); });
    document.getElementById('por').addEventListener("click", function () { calculadora.ingresoOperacion("*"); });
    document.getElementById('dividido').addEventListener("click", function () { calculadora.ingresoOperacion("/"); });
    document.getElementById('igual').addEventListener("click", function () { calculadora.resultadoOperacion(""); });

  },

  asignacionEventosBotones: function (selector) {

    var boton = document.querySelectorAll(selector);
    for (var i = 0; i < boton.length; i++) {
      boton[i].onmousedown = this.eventoReducirBotones;
      boton[i].onmouseup = this.eventoTamañoOriginalBoton;
    }
  },


  eventoReducirBotones: function (event) {
    calculadora.reducirBoton(event.target);
  },


  eventoTamañoOriginalBoton: function (event) {
    calculadora.tamañoOriginalBoton(event.target);
  },


  reducirBoton: function (elemento) {

    var boton_calculadora = elemento.id;
    if (boton_calculadora == "1" || boton_calculadora == "2" || boton_calculadora == "3" || boton_calculadora == "0" ||
      boton_calculadora == "punto" || boton_calculadora == "igual") {
      elemento.style.width = "70px";
      elemento.style.height = "62.91px";
    } else if (boton_calculadora == "mas") {
      elemento.style.width = "88%";
      elemento.style.height = "95%";
    } else {
      elemento.style.width = "70px";
      elemento.style.height = "62.91px";
    }
  },


  tamañoOriginalBoton: function (elemento) {

    var boton_calculadora = elemento.id;
    if (boton_calculadora == "1" || boton_calculadora == "2" || boton_calculadora == "3" || boton_calculadora == "0" ||
      boton_calculadora == "punto" || boton_calculadora == "igual") {
      elemento.style.width = "29%";
      elemento.style.height = "62.91px";
    } else if (boton_calculadora == "mas") {
      elemento.style.width = "90%";
      elemento.style.height = "100%";
    } else {
      elemento.style.width = "22%";
      elemento.style.height = "62.91px";
    }
  },


  ingresoNumero: function (valor) {

    if (this.valorPantalla.length < 8) {
      if (this.valorPantalla == "0") {
        this.valorPantalla = "";
        this.valorPantalla = this.valorPantalla + valor;
      } else {
        this.valorPantalla = this.valorPantalla + valor;
      }
      this.updatePantalla();
    }
  },


  ingresoOperacion: function (operacion) {

    this.primerNumero = parseFloat(this.valorPantalla);
    this.valorPantalla = "";
    this.operacion_calc = operacion;
    this.auxTeclaIgual = false;
    this.updatePantalla();

  },


  borrarNumero: function (valor) {

    if (this.valorPantalla.length < 12) {
      this.valorPantalla = "0";
      this.operacion = "";
      this.primerNumero = 0;
      this.segundoNumero = 0;
      this.resultado = 0;
      this.operacion_calc = "";
      this.auxTeclaIgual = false;
      this.ultimoNumero = 0;
      this.valorPantalla = this.valorPantalla + valor;
      this.updatePantalla();
    }
  },


  validarPunto: function () {

    if (this.valorPantalla.indexOf(".") == -1) {
      if (this.valorPantalla == "") {
        this.valorPantalla = this.valorPantalla + "0.";
      } else {
        this.valorPantalla = this.valorPantalla + ".";
      }
      this.updatePantalla();
    }
  },


  validarSigno: function () {

    if (this.valorPantalla != 0) {
      var auxiliar;
      if (this.valorPantalla.charAt(0) == "-") {
        auxiliar = this.valorPantalla.slice(1);
      } else {
        auxiliar = "-" + this.valorPantalla;
      }
      this.valorPantalla = "";
      this.valorPantalla = auxiliar;
      this.updatePantalla();
    }
  },


  aplicarOperacion: function (primerNumero, segundoNumero, operacion_calc) {

    switch (operacion_calc) {
      case "+":
        this.resultado = eval(primerNumero + segundoNumero);
        break;
      case "-":
        this.resultado = eval(primerNumero - segundoNumero);
        break;
      case "*":
        this.resultado = eval(primerNumero * segundoNumero);
        break;
      case "/":
        this.resultado = eval(primerNumero / segundoNumero);
        break;
    }
  },


  resultadoOperacion: function () {

    if (!this.auxTeclaIgual) {
      this.segundoNumero = parseFloat(this.valorPantalla);
      this.ultimoNumero = this.segundoNumero;
      this.aplicarOperacion(this.primerNumero, this.segundoNumero, this.operacion_calc);

    } else {
      this.aplicarOperacion(this.primerNumero, this.ultimoNumero, this.operacion_calc);
    }

    this.primerNumero = this.resultado;
    this.valorPantalla = "";

    if (this.resultado.toString().length < 9) {
      this.valorPantalla = this.resultado.toString();
    } else {
      this.valorPantalla = this.resultado.toString().slice(0, 8) + "...";
    }

    this.auxTeclaIgual = true;
    this.updatePantalla();
  },


  updatePantalla: function () {
    this.pantalla_calculadora.innerHTML = this.valorPantalla;
  }

};

calculadora.init();