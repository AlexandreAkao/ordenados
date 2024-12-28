export const categories = [
  "Mangá / anime famoso",
  "Esportes mais conhecidos",
  "Contos de fadas populares",
  "Personagens da ficção com quem você gostaria de ter um encontro",
  "Pessoas famosas que você gostaria de ser",
  "Lugares onde você gostaria de morar",
  "Poderes especiais que você gostaria de ter",
  "Filmes conhecidos",
  "Coisas que te dão medo",
  "Itens do dia a dia que poderiam ser boas armas",
  "Coisas que você não conseguiria perdoar",
  "Coisas nas quais você gostaria de ficar em imersão",
  "Coisas que você gostaria de fotografar",
  "Coisas que você ficaria olhando com admiração o dia inteiro",
  "Mentiras que você acreditaria",
  "Sabores de sorvete que poderiam ser deliciosos",
  "Coisas importantes na vida",
  "Habilidades importantes para ser líder",
  "Coisas que te fazem feliz",
  "Itens / armas que você gostaria de ter para lutar contra zumbis",
  "Atletas famosos",
  "Comidas famosas",
  "Personagens da ficção que você gostaria de ser",
  "Celebridades de filmes e séries mais conhecidas da atualidade",
  "Coisas que cheiram bem",
  "Coisas que você gostaria de ter como souvenir",
  "Coisas que você gostaria de fazer quando se aposentar",
  "Coisas difíceis de suportar",
  "Coisas importantes para fazer sucesso nas mídias sociais",
  "Habilidades essenciais para um comediante",
  "Coisas pesadas",
  "Canções famosas",
  "Figuras históricas populares",
  "Marcas mais valiosas",
  "Coisas que você desejava quando criança",
  "Coisas que você quer fazer logo quando acorda",
  "Coisas úteis em uma casa",
  "Sons que te fazem feliz",
  "Coisas que fazem você se sentir amado(a)",
  "Pense como um estudante do ensino médio: o que é legal?",
  "Presentes de aniversário mais comuns",
  "Vilões mais temíveis",
  "Países populares para viajar",
  "Coisas fofinhas",
  "Coisas que te fazem feliz quando feitas pelo seu amor",
  "Atividades difíceis de serem feitas sozinho(a)",
  "Animais nos quais você gostaria de montar",
  "Habilidades úteis para o trabalho",
  "Pense como uma criança: o que te faz feliz?",
  "Pense como um gato: os lugares mais confortáveis do mundo",
  "Tamanho de animais",
  "Lugares onde você vai com frequência",
  "Brinquedos mais conhecidos",
  "Palavras que você gostaria de ouvir",
  "Coisas leves",
  "Drinques populares",
  "Coisas que te deixam com sono",
  "Veículos mais comuns",
  "Frases estranhas se ditas por uma criança de 5 anos",
  "Pedidos de casamento que te fariam feliz",
  "Itens úteis quando você está perdido(a) no deserto",
  "Coisas que te surpreenderiam se saíssem do seu corpo",
  "Algo que te surpreenderia se fosse achado embaixo de uma pedra no parque",
  "Itens encontrados em um baú do tesouro que você gostaria de ter",
  "Momentos históricos que você visitaria se tivesse uma máquina do tempo",
  "Alimentos que fazem bem",
  "Coisas confiáveis por todo o sempre",
  "Tipos de festivais que você gostaria de participar",
  "Pense como um vilão: qual seria o personagem heróico que você menos gostaria de enfrentar?",
  "Pense como um cientista: o que você gostaria de descobrir?",
  "Itens úteis para levar a uma ilha deserta",
  "Melhores jogos de tabuleiro já lançados",
  "Piadas mais engraçadas",
  "Itens diferentões que você gostaria de ter",
  "Melhores nomes de golpes especiais para gritar",
  "Características de pessoas que você gostaria de ter em seu círculo de amizade",
  "Títulos de livros que te deixariam curioso para saber seu conteúdo",
  "Pense como um mago: qual seria o seu feitiço favorito?",
  "Pense como um cachorro: o que te faz feliz?",
  "Coisas que surpreenderiam se fossem ditas por um professor",
  "As coisas mais bonitas do mundo",
  "Coisas populares com crianças",
  "Os doces mais conhecidos",
  "Os nomes mais legais",
  "Amor verdadeiro ou apenas uma aventura?",
  "Coisas que você faz quando está de bom humor",
  "Pense como um herói: qual seria sua pose?",
  "Pense como um explorador: que lugares te deixam animado?",
  "Mundos imaginários que você gostaria de visitar",
  "Habilidades úteis em relacionamentos",
  "Personagens mais fortes da ficção",
  "Coisas que você ficaria feliz em encontrar no seu bolso ou bolsa",
  "Lugares onde mais acontecem encontros românticos",
  "Caretas engraçadas (faça-as)",
  "Um único prato pra comer até o fim da vida",
  "Ações e atitudes que exigem coragem",
  "Pense como um adolescente: o que seria algo ruim se acontecesse durante a aula?",
  "Se você tivesse um alter ego, o que gostaria que ele fosse?",
  "Personagens fictícios com os piores temperamentos",
  "Habilidades importantes para um streamer",
];

export const getRandomCategory = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};
