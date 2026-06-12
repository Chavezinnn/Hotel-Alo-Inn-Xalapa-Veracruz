// ==========================================
// 1. VARIABLES GLOBALES (Siempre van al inicio)
// ==========================================
let currentSlideIndex = 0;
let slideImages = [];

// ==========================================
// 2. BASE DE DATOS DE LAS HABITACIONES
// ==========================================
const roomData = {
    sencilla: {
        title: "Habitación Sencilla",
        price: "$570 MXN",
        capacity: "1-2 Personas",
        description: "Espacio de diseño acogedor pensado para estancias individuales o de pareja. Ofrece una atmósfera de total tranquilidad con excelente iluminación, escritorio funcional y acabados limpios que garantizan un descanso reparador durante tu visita.",
        features: ["1 Cama Matrimonial", "Ventilación Natural", "Smart TV HD", "Baño Privado Integrado"],
        images: [
            "img/Galeriasencilla1.jpg", 
            "img/Galeriasencilla2.jpg",
            "img/Galeriasencilla3.jpg",
            "img/Galeriasencilla.jpg",
        ],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Sencilla."
    },
    doble: {
        title: "Habitación Doble",
        price: "$780 MXN",
        capacity: "2-4 Personas",
        description: "Amplia habitación configurada meticulosamente para viajes familiares o de negocios. Cuenta con una distribución optimizada de los espacios, mobiliario contemporáneo y todo el confort necesario para múltiples huéspedes.",
        features: ["2 Camas Matrimoniales", "Espacio para equipaje", "Smart TV con cable", "Baño Confortable"],
      images: [
            "img/Galeriadoble1.jpg", 
            "img/Galeriadoble2.jpg",
            "img/Galeriadoble4.jpg",
            "img/Galeriadoble3.jpg",
            
        ],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Doble."
    },
    triple: {
        title: "Habitación Triple",
        price: "$980 MXN",
        capacity: "3-6 Personas",
        description: "Nuestra alternativa de máxima comodidad para grupos grandes o familias numerosas. Diseñada bajo un concepto que integra amplitud, privacidad y servicios de primer nivel para coordinar una estancia perfecta en el hotel.",
        features: ["3 Camas Matrimoniales", "Área de descanso extendida", "Múltiples accesos Wi-Fi", "Ventilación Premium"],
        images: [
            "img/Galeriatriple1.jpg", 
            "img/Galeriatriple2.jpg",
            "img/Galeriatriple.jpg",
        ],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Triple."
    },
    cuadruple: {
        title: "Habitación Cuádruple",
        price: "$1,180 MXN",
        capacity: "4-8 Personas",
        description: "La opción ideal en capacidad y confort. Un espacio de proporciones masivas ideado para delegaciones o familias extendidas que no desean comprometer comodidad por espacio. Totalmente equipada con los servicios del hotel.",
        features: ["4 Camas Matrimoniales", "Máximo metraje cuadrado", "Distribución simétrica", "Vistas exteriores"],
        images: ["img/Galeriacuadruple1.jpg", 
            "img/Galeriacuadruple2.jpg",
          ],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Cuádruple."
    }
};

// ==========================================
// 3. DETECTAR LA HABITACIÓN ACTUAL
// ==========================================
const pageName = window.location.pathname.split('/').pop();
let roomType = 'sencilla'; 

if (pageName.includes('triple')) {
    roomType = 'triple';
} else if (pageName.includes('doble')) {
    roomType = 'doble';
} else if (pageName.includes('cuadruple')) {
    roomType = 'cuadruple';
} else if (pageName.includes('sencilla')) {
    roomType = 'sencilla';
} else {
    const urlParams = new URLSearchParams(window.location.search);
    roomType = urlParams.get('tipo') || 'sencilla';
}

const currentData = roomData[roomType];

// ==========================================
// 4. INYECTAR DATOS EN EL HTML
// ==========================================
if (currentData) {
   const miElemento = document.getElementById('elemento');
if (miElemento) {
    miElemento.innerText = "Hola"; // Solo se ejecuta si encuentra el elemento
} 
    const subtitleEl = document.getElementById('room-subtitle');
    if (subtitleEl) subtitleEl.innerText = currentData.title;

    document.getElementById('room-price').innerText = currentData.price;
    document.getElementById('room-capacity').innerText = currentData.capacity;
    document.getElementById('room-description').innerText = currentData.description;
    
    const reserveBtn = document.getElementById('wa-reserve-btn');
    if (reserveBtn) {
        reserveBtn.href = `https://wa.me/522282358579?text=${encodeURIComponent(currentData.waMsg)}`;
    }
    
    // Guardar las imágenes de la habitación en la variable global
    slideImages = currentData.images;
    
    // Cargar la primera imagen
    document.getElementById('active-slide-img').src = slideImages[0];

    // Cargar las características
    const featuresContainer = document.getElementById('room-features-list');
    if (featuresContainer) {
        featuresContainer.innerHTML = ""; // Limpiar antes de llenar
        currentData.features.forEach(feat => {
            const li = document.createElement('li');
            li.innerHTML = `<span>▪</span> ${feat}`;
            featuresContainer.appendChild(li);
        });
    }

    // Generar los puntitos (Dots) dinámicos
    const dotsContainer = document.getElementById('slider-dots-container');
    if (dotsContainer) {
        dotsContainer.innerHTML = ""; // Limpiar antes de llenar
        slideImages.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active'); 
            dot.onclick = () => jumpToSlide(idx); 
            dotsContainer.appendChild(dot);
        });
    }
}

// ==========================================
// 5. FUNCIONES DEL SLIDER / CARRUSEL
// ==========================================
function updateSliderUI() {
    const imgEl = document.getElementById('active-slide-img');
    if (!imgEl) return;
    
    imgEl.style.opacity = '0.3';
    
    setTimeout(() => {
        imgEl.src = slideImages[currentSlideIndex];
        imgEl.style.opacity = '1'; 
    }, 150);

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slideImages.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slideImages.length - 1;
    
    updateSliderUI();
}

function jumpToSlide(index) {
    currentSlideIndex = index;
    updateSliderUI();
}