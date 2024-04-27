async function criarCargo(nomeCargo) {

    try {
        const response = await fetch("/cargo/criar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeJSON: nomeCargo
            }),
        })

        if (response.ok) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);
            
            return true;

        } else if (response.status == 409) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);
            
            return false;

        } else {
            console.error("Falha ao criar o cargo.");

            throw new Error("Houve um erro ao tentar criar o cargo!");
        
        }

    } catch (error) {
        console.log("#ERRO: ", error);

        throw error;

    }
};

async function selecionarCargo(nomeCargo) {

    try {
        const response = await fetch(`/cargo/selecionar/${nomeCargo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);

            return dados.idCargos;
        } else {
            console.error("Erro ao selecionar cargo.");

            throw new Error("Hoveu um erro ao tentar selecionar o cargo!")
        }

    } catch (error) {
        console.log("Erro desconhecido na API.", error);

        throw error;
    }
};