//  Ingreos y Egresos
const ingresos = [
    new Ingreso('salario', 2200.00),
    new Ingreso('Venta Coche', 2500)
];

const egresos = [
    new Egreso('Renta', 2000),
    new Egreso('Ropa', 400)
];
// funciones a cargar al iniciar la web app
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

let totalIngresos = () => {
    let totalIngreso = 0;
    for (ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};
let totalEgresos = () => {
    totalEgreso = 0;
    for (egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
};

// funcion para generar cambio en el Presupuesto Disponible
let cargarCabecero = () => {
    let presupuestoTotal = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalIngresos() / totalEgresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuestoTotal);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
};
const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
};
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
};
const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};
const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda( ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;

};

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);

    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
};
const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML
};
const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();

};

// agregar un dato en el formulario
const agregarDato = () => {
    let forma = document.getElementById('forma');
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    // si los valores son distintos de NULL
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            // el uso de + convierte cualquier cadena en tipo number
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
};