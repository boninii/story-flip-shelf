import { Book } from "./types";

export const mock_books: Book[] = [
  {
    id: "1",
    title: "O Alquimista",
    author: "Paulo Coelho",
    synopsis:
      "Um jovem pastor andaluz viaja do sul da Espanha até o Egito, em busca de um tesouro escondido junto às Pirâmides. O que começa como uma jornada em busca de riquezas materiais se transforma em uma descoberta sobre os tesouros ocultos dentro de nós mesmos.",
    price: 39.9,
    cover_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "Ficção",
    pages: [
      "Capítulo 1\n\nO rapaz chamava-se Santiago. Chegava a uma velha igreja abandonada quando já escurecia. O teto desmoronara havia muito tempo, e um enorme sicômoro crescera no lugar onde antes existira a sacristia.",
      "Ele decidiu que ia passar a noite ali. Deitou-se no chão de pedra da antiga sacristia, acomodando-se entre as ovelhas. Precisava chegar a Tarifa no dia seguinte.",
      "Quando o sol começou a subir, o rapaz levou as ovelhas na direção do sol. 'Elas nunca precisam tomar nenhuma decisão', pensou. 'Talvez por isso ficam sempre perto de mim.'",
      "A única coisa que o preocupava era que a loja ficava numa subida, e o padre ficaria furioso com a gente que entrava no santuário com ovelhas.",
      "— Preciso vender alguma lã — disse ao comerciante.\n\nA loja estava cheia e o mercador pediu ao pastor que esperasse até o final da tarde.",
      "Santiago sentou-se no batente da loja, tirou um livro da mochila e começou a ler. 'Preciso deixar de carregar tantos livros', pensou, enquanto virava as páginas.",
    ],
    rating: 4.7,
  },
  {
    id: "2",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    synopsis:
      "Bentinho e Capitu crescem juntos e se apaixonam. Mas ciúmes, desconfianças e uma possível traição transformam essa história de amor em um dos maiores enigmas da literatura brasileira.",
    price: 29.9,
    cover_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    category: "Romance",
    pages: [
      "Capítulo I — Do Título\n\nUma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu.",
      "Cumprimentou-me, sentou-se ao pé de mim, falou da Lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus.",
      "Sucedeu, porém, que, como eu ia cansado, fechei os olhos três ou quatro vezes; tanto bastou para que ele interrompesse a leitura e metesse os versos no bolso.",
      "— Continue, disse eu acordando.\n— Já acabei, murmurou ele.\n— São muito bonitos.",
    ],
    rating: 4.8,
  },
  {
    id: "3",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    synopsis:
      "Na Terra-média, o hobbit Frodo Bolseiro herda um anel misterioso de seu tio Bilbo. Quando descobre que se trata do Um Anel, forjado pelo Senhor do Escuro Sauron, Frodo embarca numa jornada épica para destruí-lo.",
    price: 69.9,
    cover_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
    category: "Fantasia",
    pages: [
      "Quando o Sr. Bilbo Bolseiro de Bolsão anunciou que em breve celebraria seu centésimo décimo primeiro aniversário com uma festa de especial magnificência, houve muita agitação em Hobbiton.",
      "Bilbo era muito rico e muito peculiar, e fora o espanto do Condado por sessenta anos, desde a sua marcante desaparição e retorno inesperado.",
      "As riquezas que trouxera de suas viagens se tornaram uma lenda local, e era crença popular que a Colina de Bolsão estava cheia de túneis abarrotados de tesouros.",
    ],
    rating: 4.9,
  },
  {
    id: "4",
    title: "It: A Coisa",
    author: "Stephen King",
    synopsis:
      "Em Derry, no Maine, sete crianças enfrentam uma entidade maligna que se alimenta do medo. Décadas depois, elas precisam retornar para enfrentar a criatura mais uma vez.",
    price: 59.9,
    cover_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    category: "Terror",
    pages: [
      "O terror, que não terminaria por outros vinte e oito anos — se é que realmente terminou —, começou, até onde sei e posso dizer, com um barco feito de uma folha de jornal flutuando pela sarjeta de uma rua inundada de chuva.",
      "O barco deslizou rapidamente pela água escura. Um garotinho de capa amarela corria atrás dele.",
      "Georgie! — gritou Bill Denbrough da porta da frente. Sua voz abafada soava pastosa, como sempre ficava quando ele estava resfriado.",
    ],
    rating: 4.6,
  },
  {
    id: "5",
    title: "O Poder do Hábito",
    author: "Charles Duhigg",
    synopsis:
      "Descubra por que fazemos o que fazemos na vida e nos negócios. Charles Duhigg explora a ciência por trás da criação e transformação de hábitos.",
    price: 44.9,
    cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    category: "Autoajuda",
    pages: [
      "No outono de 1993, um homem que transformaria a ciência dos hábitos entrou num laboratório no MIT. Ele era pesquisador e se interessava por como os ratos aprendem a percorrer labirintos.",
      "Os experimentos revelaram que os gânglios basais — uma estrutura do tamanho de uma bola de golfe no centro do cérebro — eram fundamentais para lembrar padrões e agir com base neles.",
    ],
    rating: 4.4,
  },
  {
    id: "6",
    title: "Pai Rico, Pai Pobre",
    author: "Robert Kiyosaki",
    synopsis:
      "A história de dois pais — um rico e um pobre — e como suas atitudes sobre dinheiro moldaram a vida do autor. Uma leitura essencial sobre educação financeira.",
    price: 34.9,
    cover_url: "https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=400&h=600&fit=crop",
    category: "Negócios",
    pages: [
      "Eu tive dois pais, um rico e um pobre. Um era altamente instruído e inteligente; tinha Ph.D. e completara quatro anos de trabalho de graduação em menos de dois anos.",
      "O outro pai não completara sequer o segundo grau. Ambos os homens foram bem-sucedidos em suas carreiras, trabalhando arduamente durante toda a vida.",
    ],
    rating: 4.3,
  },
  {
    id: "7",
    title: "Cosmos",
    author: "Carl Sagan",
    synopsis:
      "Uma viagem deslumbrante pelo universo, da menor partícula subatômica às maiores galáxias. Carl Sagan nos guia numa exploração apaixonada pelo cosmos.",
    price: 54.9,
    cover_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop",
    category: "Ciência",
    pages: [
      "O Cosmos é tudo o que é, ou que foi, ou que jamais será. Nossas mais tênues contemplações do Cosmos nos fazem arrepiar — sentimos como um formigamento nos enche a espinha.",
      "O tamanho e a idade do Cosmos estão além da compreensão humana normal. Perdido em algum lugar entre a imensidão e a eternidade está o nosso minúsculo lar planetário.",
    ],
    rating: 4.8,
  },
  {
    id: "8",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    synopsis:
      "Uma narrativa provocadora sobre como o Homo sapiens se tornou a espécie dominante da Terra, da revolução cognitiva à revolução científica.",
    price: 49.9,
    cover_url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
    category: "História",
    pages: [
      "Há cerca de 13,5 bilhões de anos, matéria, energia, tempo e espaço passaram a existir no que é conhecido como o Big Bang.",
      "A história a seguir é sobre essas três revoluções e como elas moldaram os seres humanos e o mundo ao redor deles.",
    ],
    rating: 4.7,
  },
];
