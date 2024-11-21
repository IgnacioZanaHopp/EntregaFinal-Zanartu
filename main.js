document.addEventListener("DOMContentLoaded", function () {
    let numeros = JSON.parse(localStorage.getItem("numeros")) || [];

    // Función para actualizar los resultados en el DOM
    function actualizarSimulador() {
        let numero1 = parseFloat(document.getElementById("numero1").value);
        let numero2 = parseFloat(document.getElementById("numero2").value);

        if (!isNaN(numero1) && !isNaN(numero2)) {
            let simulador = {
                numero1: numero1,
                numero2: numero2,
                suma: function () {
                    return this.numero1 + this.numero2;
                },
                resta: function () {
                    return this.numero1 - this.numero2;
                },
                multiplicacion: function () {
                    return this.numero1 * this.numero2;
                },
                division: function () {
                    return this.numero2 !== 0 ? this.numero1 / this.numero2 : "Error: No se puede dividir entre 0";
                }
            };

            let resultadosDiv = document.getElementById("resultados");
            resultadosDiv.innerHTML = `
                <p>Suma: ${simulador.suma()}</p>
                <p>Resta: ${simulador.resta()}</p>
                <p>Multiplicación: ${simulador.multiplicacion()}</p>
                <p>División: ${simulador.division()}</p>
            `;

            let mayoresA10 = [numero1, numero2].filter(num => num > 10);
            resultadosDiv.innerHTML += `<p>Números mayores a 10: ${mayoresA10.join(", ")}</p>`;

            numeros.push(numero1, numero2);
            resultadosDiv.innerHTML += `<p>Números ingresados: ${numeros.join(", ")}</p>`;

            localStorage.setItem("numeros", JSON.stringify(numeros));

            actualizarGrafico(); // Actualizar el gráfico
        }
    }

    // Gráfico usando Chart.js
    function actualizarGrafico() {
        const ctx = document.getElementById("grafico").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Número 1", "Número 2"],
                datasets: [{
                    label: "Valores Ingresados",
                    data: numeros.slice(-2), // Solo los últimos dos números
                    backgroundColor: ["#3b4cca", "#ffcb05"]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    }

    // Función para obtener un Pokémon aleatorio
    function obtenerPokemon() {
        fetch("https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 100 + 1))
            .then(response => response.json())
            .then(data => {
                document.getElementById("pokemonName").textContent = `Nombre: ${data.name}`;
                document.getElementById("pokemonImage").src = data.sprites.front_default;
            })
            .catch(error => console.error("Error al obtener Pokémon:", error));
    }

    // Listeners
    document.getElementById("startBtn").addEventListener("click", () => {
        actualizarSimulador();
        obtenerPokemon(); // Mostrar Pokémon aleatorio
    });

    // Nuevo listener para cambiar Pokémon con un botón separado
    document.getElementById("changePokemonBtn").addEventListener("click", obtenerPokemon);

    // Cargar números de la sesión anterior
    if (numeros.length > 0) {
        document.getElementById("resultados").innerHTML += `<p>Números ingresados de la sesión anterior: ${numeros.join(", ")}</p>`;
    }
});
