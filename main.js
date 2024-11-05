
document.addEventListener("DOMContentLoaded", function() {
    let numeros = JSON.parse(localStorage.getItem("numeros")) || []; // Load saved numbers or initialize empty

    // Function to update results in the DOM
    function actualizarSimulador() {
        let numero1 = parseFloat(document.getElementById("numero1").value);
        let numero2 = parseFloat(document.getElementById("numero2").value);

        // Verify valid numbers before processing
        if (!isNaN(numero1) && !isNaN(numero2)) {
            let simulador = {
                numero1: numero1,
                numero2: numero2,
                suma: function() {
                    return this.numero1 + this.numero2;
                },
                resta: function() {
                    return this.numero1 - this.numero2;
                },
                multiplicacion: function() {
                    return this.numero1 * this.numero2;
                },
                division: function() {
                    return this.numero2 !== 0 ? (this.numero1 / this.numero2) : "Error: No se puede dividir entre 0";
                }
            };

            // Display results in HTML
            let resultadosDiv = document.getElementById("resultados");
            resultadosDiv.innerHTML = `
                <p>Suma: ${simulador.suma()}</p>
                <p>Resta: ${simulador.resta()}</p>
                <p>Multiplicación: ${simulador.multiplicacion()}</p>
                <p>División: ${simulador.division()}</p>
            `;

            // Filter numbers greater than 10 and display them
            let mayoresA10 = [numero1, numero2].filter(num => num > 10);
            resultadosDiv.innerHTML += `<p>Números mayores a 10: ${mayoresA10.join(', ')}</p>`;

            // Update and display all entered numbers
            numeros.push(numero1, numero2);
            resultadosDiv.innerHTML += `<p>Números ingresados: ${numeros.join(', ')}</p>`;

            // Save to Local Storage
            localStorage.setItem("numeros", JSON.stringify(numeros));
        }
    }

    // Add event listeners to buttons and inputs
    document.getElementById("startBtn").addEventListener("click", actualizarSimulador);
    document.getElementById("numero1").addEventListener("input", actualizarSimulador);
    document.getElementById("numero2").addEventListener("input", actualizarSimulador);

    // Load saved numbers from previous session if available
    if (numeros.length > 0) {
        document.getElementById("resultados").innerHTML += `<p>Números ingresados de la sesión anterior: ${numeros.join(', ')}</p>`;
    }
});
