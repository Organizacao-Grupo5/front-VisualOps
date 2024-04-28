async function selecionarPlano() {
    try {
        
        const response = await fetch("/plano/selecionar", {
            method: 'GET',
            headers: {
                'Content-Type': 'applicatino/json' 
            },
        });

        if (response.ok) {
            const dados = await response.json();
            console.log("RESPOSTA JSON: ", dados);

            return dados;
        } else {
            console.error("Erro ao selecionar os planos.");
        
            throw new Error("Erro ao selecionar os planos!");
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);
    
        throw error;
    }
};
