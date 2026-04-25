const URL = "./model/";

let model;
let modeloCargado = false;

// Cargar modelo
async function cargarModelo() {
    try {
        model = await tmImage.load(URL + "model.json", URL + "metadata.json");
        modeloCargado = true;
        console.log("Modelo cargado ✅");
    } catch (error) {
        console.error("Error cargando modelo:", error);
    }
}

cargarModelo();

// Analizar imagen
async function analizarImagen() {
    if (!modeloCargado) {
        alert("Espera unos segundos, el modelo está cargando...");
        return;
    }

    const input = document.getElementById("imageUpload");
    const file = input.files[0];

    if (!file) {
        alert("Sube una imagen primero");
        return;
    }

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
        const prediction = await model.predict(img);

        let mejorResultado = prediction.reduce((max, p) =>
            p.probability > max.probability ? p : max
        );

        document.getElementById("resultado").innerHTML =
            "🌱 Resultado: " + mejorResultado.className +
            "<br>Confianza: " + (mejorResultado.probability * 100).toFixed(2) + "%";
    };
}
