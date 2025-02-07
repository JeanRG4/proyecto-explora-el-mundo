/*
 * JavaScript para funcionalidades interactivas:
 * - Smooth scrolling para enlaces internos
 * - Menú responsive con toggle
 * - Alertas para ofertas
 * - Efecto hover en destinos
 * - Buscador con sugerencias dinámicas
 */

document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------
    // 1. Smooth scrolling para todos los enlaces internos
    // -------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // -------------------------------------------
    // 2. Menú responsive: Mostrar/Ocultar menú al hacer clic en el botón toggle
    // -------------------------------------------
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("header nav ul");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // -------------------------------------------
    // 3. Ofertas: Al hacer clic en un enlace de oferta se muestra una alerta
    // -------------------------------------------
    document.querySelectorAll(".oferta-item a").forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();
            alert("¡Aprovecha esta oferta! Detalles enviados a tu correo.");
        });
    });

    // -------------------------------------------
    // 4. Efecto hover en destinos: Escala el elemento al pasar el mouse
    // -------------------------------------------
    document.querySelectorAll(".destino-item").forEach(item => {
        item.addEventListener("mouseover", () => {
            item.style.transform = "scale(1.05)";
            item.style.transition = "all 0.3s ease";
        });
        item.addEventListener("mouseout", () => {
            item.style.transform = "scale(1)";
        });
    });

    // -------------------------------------------
    // 5. Smooth scrolling adicional para enlaces de navegación (opcional)
    // -------------------------------------------
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // -------------------------------------------
    // 6. Mapeo de enlaces en destinos, ofertas y consejos a secciones específicas
    // -------------------------------------------
    document.querySelectorAll(".destino-item a, .oferta-item a, .consejo-item a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const anchor = e.target.closest("a");
            if (!anchor) return;

            // Mapa para asignar secciones según el contenido del enlace
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
                    const targetSection = document.getElementById(sectionId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: "smooth" });
                    }
                    break;
                }
            }
        });
    });

    // -------------------------------------------
    // 7. Funcionalidad del Buscador con sugerencias dinámicas
    // -------------------------------------------
    const buscador = document.getElementById("buscador");
    const resultados = document.getElementById("resultados");

    if (buscador && resultados) {
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

            const filtrados = elementos.filter(el => el.nombre.toLowerCase().includes(query));
            if (filtrados.length > 0) {
                filtrados.forEach(el => {
                    const li = document.createElement("li");
                    li.textContent = el.nombre;
                    li.tabIndex = 0; // Para accesibilidad (navegable con el teclado)

                    // Redirigir al hacer clic en un resultado
                    li.addEventListener("click", function () {
                        window.location.hash = el.link;
                    });
                    // Redirigir al presionar "Enter" sobre un resultado
                    li.addEventListener("keydown", function (event) {
                        if (event.key === "Enter") {
                            window.location.hash = el.link;
                        }
                    });

                    resultados.appendChild(li);
                });
                resultados.style.display = "block";
            } else {
                resultados.style.display = "none";
            }
        });

        // Cerrar sugerencias si se hace clic fuera del campo o la lista
        document.addEventListener("click", function (e) {
            if (!buscador.contains(e.target) && !resultados.contains(e.target)) {
                resultados.style.display = "none";
            }
        });

        // Redirigir al presionar "Enter" en el campo de búsqueda
        buscador.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const searchTerm = buscador.value.trim();
                if (searchTerm) {
                    const encontrado = elementos.find(el => el.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
                    if (encontrado) {
                        window.location.hash = encontrado.link;
                    } else {
                        resultados.style.display = "none";
                    }
                }
            }
        });
    } else {
        console.error("Los elementos de búsqueda no fueron encontrados en el DOM.");
    }
});
