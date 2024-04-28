async function cadastrarEmpresa(NOME_FANTASIA, CNPJ, PLANO) {

    try {
        
        const response = await fetch("/empresa/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: NOME_FANTASIA,
                cnpj: CNPJ,
                fkPlano: PLANO
            }),
        });

        if (response.ok) {

            const dados = await response.json();
            console.log("REPONSTA : ", response);
        
            sessionStorage.setItem("fkEmpresa", dados.id);

            return response;
        } else {
            console.error("Erro ao criar o usuário.");

            throw new Error("Erro ao executar a criação da empresa!");
        }

    } catch (error) {
        console.log("Erro desconhecido na API ", error);

        throw error;
    }
};
