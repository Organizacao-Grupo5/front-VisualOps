async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('ipv4_1').value = data.ip;
    } catch (error) {
        document.getElementById('ipv4_1').value = 'Erro ao obter o IP';
        console.error('Erro:', error);
    }
}

document.getElementById('autoFillSwitch').addEventListener('change', function() {
    const ipv4Input = document.getElementById('ipv4_1');
    if (this.checked) {
        getIP();
    } else {
        ipv4Input.value = '';
    }
});
