document.addEventListener("DOMContentLoaded", function() {
    // Desplazamiento suave al hacer clic en enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenir comportamiento predeterminado
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Función para mostrar las ofertas de manera interactiva
    document.querySelectorAll('.oferta-item a').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('¡Aprovecha esta oferta! Detalles enviados a tu correo.');
        });
    });

    // Agregar animación al hacer hover sobre los destinos
    document.querySelectorAll('.destino-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.05)';
            item.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Capturar clics en el menú, incluso si el usuario hace clic en el icono dentro del enlace
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado de los enlaces

            const href = this.getAttribute('href');
            if (href.startsWith("#")) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // Capturar clics en destinos, ofertas y consejos, incluso si el usuario hace clic en el ícono o el texto
    document.querySelectorAll('.destino-item a, .oferta-item a, .consejo-item a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado de los enlaces

            const anchor = e.target.closest('a'); // Asegura que el clic se detecta en el <a>
            if (!anchor) return;

            // Este mapa de secciones es necesario para la correcta asignación de las secciones
            const sectionMap = {
                "París": "destinos",
                "Tokio": "destinos",
                "Río de Janeiro": "destinos",
                "Escapada a las Islas Maldivas": "ofertas",
                "Safari en Sudáfrica": "ofertas",
                "Empacar Ligero": "consejos",
                "Viajar por Europa en Tren": "consejos"
            };

            for (const [key, sectionId] of Object.entries(sectionMap)) {
                if (anchor.textContent.includes(key)) {
                    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
                    break;
                }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador");
    const resultados = document.getElementById("resultados");

    if (!buscador || !resultados) {
        console.error("Los elementos de búsqueda no fueron encontrados en el DOM.");
        return;
    }

    const elementos = [
        { nombre: "París, Francia", link: "#destinos" },
        { nombre: "Tokio, Japón", link: "#destinos" },
        { nombre: "Río de Janeiro, Brasil", link: "#destinos" },
        { nombre: "Escapada a las Islas Maldivas", link: "#ofertas" },
        { nombre: "Aventura en Safari en Sudáfrica", link: "#ofertas" }
    ];

    // Mostrar sugerencias mientras se escribe
    buscador.addEventListener("input", function () {
        const query = buscador.value.toLowerCase().trim();
        resultados.innerHTML = "";
        if (query === "") {
            resultados.style.display = "none";
            return;
        }

        // Filtrar los elementos basados en la consulta
        const filtrados = elementos.filter(el => el.nombre.toLowerCase().includes(query));

        if (filtrados.length > 0) {
            filtrados.forEach(el => {
                const li = document.createElement("li");
                li.textContent = el.nombre;
                li.tabIndex = 0; // Asegura que el elemento sea accesible por teclado

                // Redirigir al hacer clic en un resultado
                li.addEventListener("click", function () {
                    window.location.hash = el.link; // Cambiar la ubicación de la página sin recargarla
                });

                // Redirigir al presionar "Enter" sobre un resultado
                li.addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        window.location.hash = el.link; // Cambiar la ubicación de la página sin recargarla
                    }
                });

                resultados.appendChild(li);
            });
            resultados.style.display = "block";
        } else {
            resultados.style.display = "none";
        }
    });

    // Cerrar resultados si se hace clic fuera del campo de búsqueda o resultados
    document.addEventListener("click", function (e) {
        if (!buscador.contains(e.target) && !resultados.contains(e.target)) {
            resultados.style.display = "none";
        }
    });

    // Redirigir al presionar "Enter" en el campo de búsqueda
    buscador.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevenir la acción por defecto de "Enter"
            const searchTerm = buscador.value.trim();
            if (searchTerm) {
                const encontrado = elementos.find(el => el.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
                if (encontrado) {
                    window.location.hash = encontrado.link; // Cambiar la ubicación sin recargar
                } else {
                    resultados.style.display = "none"; // No encontró resultados, oculta la lista
                }
            }
        }
    });
});
