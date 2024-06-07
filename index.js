const player1 = {
    nome: 'mario',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: 'luigi',
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // o método floor arredonda o número
}

async function getRandomBlock() {
    let random = Math.random();
    let result;
    switch (true) {
        case random < 0.33:
            result = 'RETA';
            break;
        case random < 0.66:
            result = 'CURVA';
            break;
        default:
            result = 'CONFRONTO';
            break;
    }
    return result; // Retorna o resultado
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName}🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round < 6; round++) {
        console.log(`🏁Rodada ${round}`);
        // Sortear bloco
        let block = await getRandomBlock();
        console.log('Bloco:', block);
        // Rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
        // Teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === 'RETA') {
            totalTestSkill1 = diceResult1 + character1.velocidade;
            totalTestSkill2 = diceResult2 + character2.velocidade;
            await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);
        } else if (block === 'CURVA') {
            totalTestSkill1 = diceResult1 + character1.manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.manobrabilidade;
            await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);
        } else if (block === 'CONFRONTO') {
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;
            console.log(`${character1.nome} confrontou com ${character2.nome}!!!!!`);
            await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
            await logRollResult(character2.nome, "poder", diceResult2, character2.poder);

            if (powerResult1 > powerResult2) {
                character2.pontos = Math.max(0, character2.pontos - 1);
            } else if (powerResult1 < powerResult2) {
                character1.pontos = Math.max(0, character1.pontos - 1);
            } else {
                console.log("Confronto empatado");
            }
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`O vencedor é ${character1.nome}, marcou 1 ponto`);
            character1.pontos++;
        } else if (totalTestSkill1 < totalTestSkill2) {
            console.log(`O vencedor é ${character2.nome}, marcou 1 ponto`);
            character2.pontos++;
        }
    }

    console.log(`Pontuação Final:\n${character1.nome}: ${character1.pontos} pontos\n${character2.nome}: ${character2.pontos} pontos`);
}

(async function main() {
    console.log(`🏁🛑 CORRIDA ENTRE ${player1.nome.toUpperCase()} E ${player2.nome.toUpperCase()} COMEÇANDO...\n`);
    await playRaceEngine(player1, player2);
})();
