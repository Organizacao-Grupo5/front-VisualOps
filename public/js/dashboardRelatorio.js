const relatoriosCalendarioDiv = document.getElementById('relatorios_calendario');
const inputIpv4Nome = document.getElementById('input_name_our_ipv4');
const inputSemana = document.getElementById('input_semana');
const chkDiario = document.getElementById('chk_diario');
const chkSemanal = document.getElementById('chk_semanal');
const chkMensal = document.getElementById('chk_mensal');
const chkProprio = document.getElementById('chk_proprio');
const chkTime = document.getElementById('chk_time');
const chkTodosComponente = document.getElementById('chk_todos_componente');
const chkCPU = document.getElementById('chk_cpu');
const chkGPU = document.getElementById('chk_gpu');
const chkHDD = document.getElementById('chk_hdd');
const chkRAM = document.getElementById('chk_ram');
const chkApp = document.getElementById('chk_app');

const checkboxes = [chkCPU, chkGPU, chkHDD, chkRAM, chkApp];

chkTodosComponente.addEventListener("change", () => {
    if (chkTodosComponente.checked) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkboxes.every(checkbox => checkbox.checked)) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            chkTodosComponente.checked = true;
        } else {
            chkTodosComponente.checked = false;
        }
    });
});