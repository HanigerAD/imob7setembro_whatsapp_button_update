-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 10/10/2022 às 17:20
-- Versão do servidor: 5.7.39-0ubuntu0.18.04.2-log
-- Versão do PHP: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `xbcopu_imob7`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agenciador`
--

CREATE TABLE `agenciador` (
  `codigo` int(6) NOT NULL,
  `nome` text NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `imagem` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `agenciador`
--

INSERT INTO `agenciador` (`codigo`, `nome`, `telefone`, `imagem`) VALUES
(3, 'Rafael Lucena (Testes)', '51993186141', NULL),
(7, 'Dilmar Munhoz Larreia', '5199775979', NULL),
(8, 'Marcelo Jardim', '51997115206', NULL),
(9, 'Rafael Silveira', '5198498470', NULL),
(10, 'Luzia Morais', '51992719904', NULL),
(11, 'Jose Luis Bringhenti', '51999775978', NULL),
(12, 'Nadielen Souza', '51998878680', NULL),
(13, 'Douglas Narciso ', '51985045009', NULL),
(14, 'Cheila Tolotti', '51996350478', NULL),
(15, 'Martim', '51999660561', NULL),
(16, 'Zaira Antonelli', '51996191898', NULL),
(17, 'Rafael Luz', '51998156394', NULL),
(18, 'Tatiane Marinho', '21979941049', NULL),
(19, 'Imobiliária 7 Setembro  ', '5134804066', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `bairro`
--

CREATE TABLE `bairro` (
  `codigo` int(8) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `municipio` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `bairro`
--

INSERT INTO `bairro` (`codigo`, `descricao`, `municipio`) VALUES
(1, 'Altos da Alegria ', 3),
(2, 'Alegria', 3),
(3, 'Alvorada ', 3),
(4, 'Centro ', 12),
(5, 'Vila Garcia', 7),
(6, 'Alto dos Olivos', 6),
(7, 'Altos Doradilho	', 6),
(8, 'BR 116	', 6),
(9, 'Douradilho', 6),
(10, 'Passo Grande	', 6),
(11, 'Serrinha', 6),
(12, 'Travessa Altino Feijo	', 6),
(13, 'Parque da Matriz	', 21),
(14, 'Olaria', 13),
(15, 'Ouro Verde	', 13),
(16, 'Centro ', 14),
(17, 'Capão Novo	', 4),
(18, 'Centro ', 4),
(19, 'Guarani', 4),
(20, 'Vale dos Portos	', 15),
(21, 'Centro ', 1),
(22, 'Centro Novo', 1),
(23, 'Itaí', 1),
(24, 'Medianeira	', 1),
(25, 'Parque Eldorado	', 1),
(26, 'Sans Souci	', 1),
(27, 'Bom Fim ', 3),
(28, 'Califórnia City	', 3),
(29, 'Cel. Nassuca ', 3),
(30, 'Centro ', 3),
(31, 'Colina', 3),
(32, 'Alvorada - (Baln. Alvorada, Baln. São Geraldo)', 3),
(33, 'Bom Fim - (S. Francisco,Indl. S. Francisco,Nova Guaíba,Vera Cruz,Bom Fim)', 3),
(34, 'Cel. Nassuca - (Cel. Nassuca, Vila Nova)', 3),
(35, 'Centro - (Centro, Engenho)', 3),
(36, 'Colina - (Moradas da Colina, N. Sra. de Fátima, Parte da Ramada)', 3),
(37, 'Columbia City - (Columbia City, Bom Fim Velho,Ramada,Pq. do Noli)', 3),
(38, 'Ermo - (Ermo,Jd. Panorama,Jd. Bela VIsta,Pq. das Laranjeiras)', 3),
(39, 'Florida - (Bal. Florida,Parte da Vila Elza,Lot. Neiva)', 3),
(40, 'Jardim dos Lagos - (Jd. dos Lagos I,Jd. dos Lagos II,Jd. dos Lagos III)', 3),
(41, 'Jardim Iolanda - (V. Iolanda,V. Jardim)	', 3),
(42, 'Matias', 3),
(43, 'Parque 35 - (Pq. 35,Chác. das Paineiras)', 3),
(44, 'Passo Fundo	', 3),
(45, 'Pedras Brancas - (V. Pedras Brancas)	', 3),
(46, 'Petim ', 3),
(47, 'Santa Rita - (Jd. Santa Rita, Cohab, Indl. Takeda, Ipê,Mato Alto)', 3),
(48, 'São Jorge	', 3),
(49, 'Atlântida Sul	', 16),
(50, 'Alto Petrópolis	', 2),
(51, 'Bom Fim (Porto Alegre)	', 2),
(52, 'Bom Jesus	', 2),
(53, 'Centro ', 2),
(54, 'Cristo Redentor	', 2),
(55, 'Santana', 2),
(56, 'Rincão da Venda Velha	', 17),
(57, 'Cerro Grande	', 18),
(58, 'Centro ', 19),
(59, 'Centro', 20),
(60, 'Estrada do Mar	', 20);

-- --------------------------------------------------------

--
-- Estrutura para tabela `banner`
--

CREATE TABLE `banner` (
  `codigo` int(6) NOT NULL,
  `imagem` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `banner`
--

INSERT INTO `banner` (`codigo`, `imagem`) VALUES
(203, 'e884f78d-0d33-4f4f-b769-9aadf799dbf5.jpg'),
(204, 'ca3750c4-36c4-407c-ba32-28147c417160.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `blog`
--

CREATE TABLE `blog` (
  `codigo` int(6) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `texto` text NOT NULL,
  `keywords` text NOT NULL,
  `data_cadastro` datetime NOT NULL,
  `usuario` int(6) NOT NULL,
  `imagem` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria_imovel`
--

CREATE TABLE `categoria_imovel` (
  `codigo` int(6) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `categoria_imovel`
--

INSERT INTO `categoria_imovel` (`codigo`, `descricao`) VALUES
(5, 'Casa'),
(6, 'Sobrado'),
(7, 'Apartamento'),
(8, 'Terreno'),
(9, 'Fazenda'),
(10, 'Sítio'),
(11, 'Chácara'),
(12, 'Prédio');

-- --------------------------------------------------------

--
-- Estrutura para tabela `configuracao_site`
--

CREATE TABLE `configuracao_site` (
  `codigo` int(6) NOT NULL,
  `logo` text NOT NULL,
  `titulo` text NOT NULL,
  `texto_institucional` text NOT NULL,
  `resumo_texto_institucional` text NOT NULL,
  `horario_abertura_semana` varchar(50) DEFAULT NULL,
  `horario_fechamento_semana` varchar(50) DEFAULT NULL,
  `horario_abertura_sabado` varchar(50) DEFAULT NULL,
  `horario_fechamento_sabado` varchar(50) DEFAULT NULL,
  `horario_fechamento_domingo` varchar(50) DEFAULT NULL,
  `horario_abertura_domingo` varchar(50) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefone` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `configuracao_site`
--

INSERT INTO `configuracao_site` (`codigo`, `logo`, `titulo`, `texto_institucional`, `resumo_texto_institucional`, `horario_abertura_semana`, `horario_fechamento_semana`, `horario_abertura_sabado`, `horario_fechamento_sabado`, `horario_fechamento_domingo`, `horario_abertura_domingo`, `endereco`, `email`, `telefone`) VALUES
(1, '4092dd0d-edf8-4bbc-95da-1c7b222685ac.png', 'Imobiliaria 7 Setembro', '<p>Temos como foco realizar o sonho que é a conquista do imóvel desejado pelo seu cliente. A Imobiliária 7 de Setembro fundada em agosto de 1989, tem como foco de seu trabalho, não apenas a satisfação das necessidades, com a visão de ser referência no seu ramo de negócio em informações e soluções, mas também buscar atender a expectativa na realização do sonho que é a conquista do imóvel desejado pelo seu cliente. A equipe, composta por seus profissionais é dedicada a oferecer os melhores serviços aos clientes. Além disso, a Imobiliária 7 de Setembro também presta assessoria em todos os processos da compra e venda de imóveis e também na assessoria em áreas rurais de agropastoril e florestal.</p>', '<p>Temos profissionais dedicados a oferecer os melhores serviços a nossos clientes.</p>', '09:00', '17:00', '09:00', '12:00', NULL, 'Fechado', 'R. Dr. Lauro Azambuja, 288 - Centro, Guaíba - RS', 'atendimento@imobiliaria7setembro.com.br', '(51) 3480-4066');

-- --------------------------------------------------------

--
-- Estrutura para tabela `documento_imovel`
--

CREATE TABLE `documento_imovel` (
  `codigo` int(6) NOT NULL,
  `imovel` int(6) NOT NULL,
  `documento` text NOT NULL,
  `nome_arquivo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `documento_imovel`
--

INSERT INTO `documento_imovel` (`codigo`, `imovel`, `documento`, `nome_arquivo`) VALUES
(3, 4, '23191a36-8786-4f13-b3a0-e0cdd400b327.jpg', 'Autorização.jpg'),
(4, 4, '8bfd9688-b636-42a8-9523-f98664f3f7eb.jpg', 'Matrícula (1).jpg'),
(5, 4, '10233fbc-dafd-49b1-9023-53c74f45448a.jpg', 'Matrícula (2).jpg'),
(6, 5, 'f446d4b6-c1c7-49e8-a7b4-d2258d994654.pdf', 'Autorização.pdf'),
(7, 5, '7ac5359a-c455-4dbd-8035-4bce3e474ac8.jpeg', 'WhatsApp Image 2022-01-21 at 10.17.48.jpeg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estado_conservacao`
--

CREATE TABLE `estado_conservacao` (
  `codigo` int(6) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estado_conservacao`
--

INSERT INTO `estado_conservacao` (`codigo`, `descricao`) VALUES
(1, 'Bom'),
(2, 'Excelente'),
(3, 'Modernizar'),
(4, 'Obra total');

-- --------------------------------------------------------

--
-- Estrutura para tabela `foto_imovel`
--

CREATE TABLE `foto_imovel` (
  `codigo` int(6) NOT NULL,
  `ordem` int(100) NOT NULL,
  `imovel` int(6) NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `foto_imovel`
--

INSERT INTO `foto_imovel` (`codigo`, `ordem`, `imovel`, `foto`) VALUES
(36, 1, 4, '84ffcd26-ff4f-4d87-b89a-229801db80a3.jpg'),
(37, 2, 4, '7a34355c-ebe7-430b-8e14-843437317ece.jpg'),
(38, 3, 4, '443e24e7-1876-4657-8a1a-47923778c2f3.jpg'),
(39, 4, 4, '7dbfb99e-d2ca-4a9d-b73d-52e9c5785927.jpg'),
(40, 5, 4, 'b5c22dd9-f92c-4846-b140-b829ad34363e.jpg'),
(41, 6, 4, '09cecc29-8fc5-45b8-a5f7-57012397130e.jpg'),
(42, 7, 4, 'ce07d8b5-7cc4-4463-9d21-570f7ee1934d.jpg'),
(43, 8, 4, '83ef5d97-b7ed-444a-82c1-ae003307d19c.jpg'),
(44, 9, 4, '2183328d-e0a3-4e96-b043-47543bc670d4.jpg'),
(45, 10, 4, 'c3677b4c-21f5-4bba-bad4-ae7dd85490a6.jpg'),
(46, 11, 4, '67c8ae4c-338b-4e9b-ba7e-c8d64f371489.jpg'),
(47, 12, 4, 'c405cef3-3fb3-40e9-ae0b-f393d4dbaba2.jpg'),
(48, 13, 4, '5a01c004-93ef-4c81-95a9-3b03d1959bfc.jpg'),
(49, 14, 4, '26323687-28f7-47f7-9b29-868a91b6d2ef.jpg'),
(50, 15, 4, '55f29f18-5500-44e7-bb06-4d0b87219c78.jpg'),
(51, 16, 4, '00bd97c3-b198-4a72-86e4-1b95f6ad5c73.jpg'),
(52, 17, 4, '8b1a762e-e536-4e64-95e5-989879946e07.jpg'),
(53, 18, 4, 'a61269bb-c27e-49cc-92f6-4c33a87c569d.jpg'),
(54, 19, 4, '5084b9ef-db64-4ca8-a131-1fdd0c6ad574.jpg'),
(55, 20, 4, 'a3178d19-3287-46c1-b436-0e85a7ef5cc0.jpg'),
(56, 1, 5, '7fad9775-36a3-4766-8ebc-21d48b551e74.jpg'),
(57, 2, 5, '5a057cd1-73b7-49a7-9c85-1379e380b8b1.jpg'),
(58, 3, 5, '3647e03b-afab-4185-bdf4-a0ce459c8068.jpg'),
(59, 4, 5, 'f18e3feb-ace3-45f9-8370-3cf19bb6a6dc.jpg'),
(60, 5, 5, 'edd556b7-25c8-4d02-839a-287e44e18b9f.jpg'),
(61, 6, 5, 'dc92902c-6c73-40a9-ae12-73c4c4e42080.jpg'),
(62, 7, 5, '218fe33f-1091-40c1-840b-e9899a003ce0.jpg'),
(63, 8, 5, 'e7344104-ceee-41f7-a08f-b24f9baf9f24.jpg'),
(64, 9, 5, 'd654834a-5403-42a4-b587-1bc5874bd5dd.jpg'),
(65, 10, 5, '9a5eccf3-521f-485a-8727-ffe460e33545.jpg'),
(66, 11, 5, '9799ed1f-a0fb-4aa8-98e4-1fd97f311e80.jpg'),
(67, 12, 5, 'b800ce35-14be-4600-9f97-8290475273e9.jpg'),
(68, 13, 5, '8c8ff538-3a31-46ca-9dc5-569da78ff2b9.jpg'),
(69, 14, 5, 'fcda16f9-8f4e-41c0-80b8-133a55d902cb.jpg'),
(70, 15, 5, '57141095-37f9-4c53-8b91-2e08e631399a.jpg'),
(71, 16, 5, '8c093a90-6a82-45ea-b58f-d09793cdd225.jpg'),
(72, 17, 5, '8118fb96-8cf1-43f8-9cf0-f2a482efc022.jpg'),
(73, 18, 5, 'f5dd678e-f317-4031-bb6e-9683439ee65f.jpg'),
(74, 19, 5, 'f3fb1991-2c6f-4a2c-9b53-9bf10d467c47.jpg'),
(75, 20, 5, '08f64144-c9b4-4f6f-9e16-0b5f372f7b17.jpg'),
(76, 21, 5, '7246a864-3aba-4f00-9e65-74fb1e9632cb.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imovel`
--

CREATE TABLE `imovel` (
  `codigo` int(6) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `valor` varchar(50) DEFAULT '0',
  `dormitorio` int(3) DEFAULT '0',
  `unidade_disponivel` int(4) DEFAULT '0',
  `banheiro` int(3) DEFAULT '0',
  `vaga` int(3) DEFAULT '0',
  `area_privativa` varchar(50) DEFAULT '0',
  `area_total` varchar(50) DEFAULT '0',
  `pavimento` int(3) DEFAULT '1',
  `financiavel` tinyint(1) DEFAULT '0',
  `descricao` text,
  `informacao_privada` text,
  `categoria` int(6) NOT NULL,
  `exibir` tinyint(1) DEFAULT '0',
  `reservado` tinyint(1) DEFAULT '0',
  `expiracao_reserva` date DEFAULT NULL,
  `hectare` int(6) DEFAULT NULL,
  `ano_construcao` int(12) DEFAULT NULL,
  `destaque` tinyint(1) DEFAULT '0',
  `super_destaque` tinyint(1) DEFAULT '0',
  `suite` int(6) DEFAULT NULL,
  `alugado` tinyint(1) DEFAULT '0',
  `valor_condominio` varchar(100) DEFAULT NULL,
  `perfil` int(6) NOT NULL,
  `zona` int(6) NOT NULL,
  `agenciador` int(6) NOT NULL,
  `estado_conservacao` int(6) NOT NULL,
  `tipo` int(6) NOT NULL,
  `transacao` int(6) NOT NULL,
  `exibir_valor` tinyint(1) DEFAULT '1',
  `municipio` int(6) NOT NULL,
  `bairro` int(6) NOT NULL,
  `cep` varchar(100) DEFAULT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` int(6) DEFAULT NULL,
  `complemento` text,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `situacao` int(6) NOT NULL,
  `codigo_interno` int(10) NOT NULL,
  `link_youtube` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `imovel`
--

INSERT INTO `imovel` (`codigo`, `titulo`, `valor`, `dormitorio`, `unidade_disponivel`, `banheiro`, `vaga`, `area_privativa`, `area_total`, `pavimento`, `financiavel`, `descricao`, `informacao_privada`, `categoria`, `exibir`, `reservado`, `expiracao_reserva`, `hectare`, `ano_construcao`, `destaque`, `super_destaque`, `suite`, `alugado`, `valor_condominio`, `perfil`, `zona`, `agenciador`, `estado_conservacao`, `tipo`, `transacao`, `exibir_valor`, `municipio`, `bairro`, `cep`, `logradouro`, `numero`, `complemento`, `latitude`, `longitude`, `situacao`, `codigo_interno`, `link_youtube`) VALUES
(4, 'Imóvel á venda Alegria ', '600000.00', 5, NULL, 1, 2, '213', '504', 1, 0, '<p>Casa á venda no bairro Alegria. Possui 5 dormitórios, sala de estar, sala de jantar, cozinha, banheiro e garagem para 2 carros.</p><p><br></p><p>Terreno medindo 504,14m².&nbsp;</p>', NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 3, 1, 15, 1, 1, 1, NULL, 3, 2, NULL, 'Av. Brasil ', 602, NULL, NULL, NULL, 1, 1949, 'https://www.youtube.com/watch?v=yXRQy-90vms'),
(5, 'Imóvel á venda Alegria ', '850000.00', 2, NULL, 2, 2, '155', '741', 1, 1, '<p><span style=\"color: rgb(122, 122, 122);\">- Cerca elétrica em toda extensão do terreno;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 3 Reservatórios de água de 500lt cada no sótão;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 3 Reservatórios de coleta na chuva de 1000lt cada (Cisterna);</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Garagem coberta para 3 carros;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Terreno com drenos de chuva;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Calhas para chuva na casa principal;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Cozinha planejada e coifa;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Móvel planejado na sala de estar;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Closet suite;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Móveis dos banheiros;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Lareira;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Churrasqueira;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Salão de festas com 60m² c/ banheiro completo;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Sistema de água quente (gás) na cozinha e banheiros;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Sistema elétrico (CEEE) trifásico;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Forro de gesso na suíte, em um dos quartos, sala de estar (pé direito 4metros);</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 2 Ar condicionados nos quartos;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Terreno murado e grades na frente;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Portão eletrônico;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 2 Toldos verticais retráteis nas aberturas da garagem;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Altura das paredes interna do imóvel 2m 75 cm</span></p>', NULL, 5, 1, 0, NULL, NULL, NULL, 0, 0, 1, 0, NULL, 3, 1, 15, 2, 1, 1, NULL, 3, 2, '92500-000', 'R. Tereza Spagiari', 210, NULL, NULL, NULL, 1, 2275, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `localidade`
--

CREATE TABLE `localidade` (
  `codigo` int(6) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `unidade_federativa` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `log`
--

CREATE TABLE `log` (
  `codigo` int(255) NOT NULL,
  `data` text,
  `tipo_log` tinyint(3) DEFAULT NULL,
  `nome_campo` text NOT NULL,
  `informacao_antiga` text,
  `nova_informacao` text,
  `codigo_agenciador` tinyint(255) NOT NULL,
  `codigo_imovel` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `mensagens`
--

CREATE TABLE `mensagens` (
  `codigo` int(6) NOT NULL,
  `nome_completo` text NOT NULL,
  `email` text,
  `telefone` text NOT NULL,
  `assunto` text NOT NULL,
  `mensagem` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `mensagens`
--

INSERT INTO `mensagens` (`codigo`, `nome_completo`, `email`, `telefone`, `assunto`, `mensagem`) VALUES
(1, 'Rodrigo', 'haniger@haniger.com.br', '5134916238', 'Teste', 'Teste');

-- --------------------------------------------------------

--
-- Estrutura para tabela `municipio`
--

CREATE TABLE `municipio` (
  `codigo` int(6) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `unidade_federativa` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `municipio`
--

INSERT INTO `municipio` (`codigo`, `descricao`, `unidade_federativa`) VALUES
(1, 'Eldorado do Sul ', 22),
(2, 'Porto Alegre', 22),
(3, 'Guaíba', 22),
(4, 'Capão da Canoa ', 22),
(5, 'Mariana Pimentel ', 22),
(6, 'Barra do Ribeiro ', 22),
(7, 'Arroio dos Ratos ', 22),
(8, 'Douradinho ', 22),
(9, 'Douradilho ', 22),
(10, 'Petim ', 22),
(11, 'Petim ', 22),
(12, 'Arambaré', 22),
(13, 'Camaquã', 22),
(14, 'Canoas', 22),
(15, 'Charqueadas', 22),
(16, 'Osório', 22),
(17, 'Sentinela do Sul	', 22),
(18, 'Tapes', 22),
(19, 'Tramandaí', 22),
(20, 'Xangri-lá	', 22),
(21, 'Cachoeirinha', 22);

-- --------------------------------------------------------

--
-- Estrutura para tabela `novos_imoveis`
--

CREATE TABLE `novos_imoveis` (
  `codigo` int(6) NOT NULL,
  `nome_completo` text NOT NULL,
  `email` text,
  `telefone` text NOT NULL,
  `endereco` text,
  `uf` text,
  `cidade` text,
  `bairro` text,
  `tipo` text,
  `area_privativa` text,
  `area_total` text,
  `vagas` text,
  `quartos` text,
  `condominio` text,
  `iptu` text,
  `finalidadde` text,
  `imovel_pago` text,
  `preco` text,
  `descricao` text,
  `data` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `parceiro`
--

CREATE TABLE `parceiro` (
  `codigo` int(11) NOT NULL,
  `nome` text,
  `imagem` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `parceiro`
--

INSERT INTO `parceiro` (`codigo`, `nome`, `imagem`) VALUES
(1, 'Banco do Brasil', '4486cf2e-1cb0-4ffe-85a5-823b6748145d.png'),
(2, 'Bradesco', 'b9f83736-96bc-403b-8923-c624a0992f01.png'),
(3, 'Itaú', 'fb71d85a-7c12-465e-9240-72232379599c.png'),
(4, 'HSBC', 'dc278f2d-b3e1-440d-8565-adab3d7d8926.png'),
(5, 'Caixa', 'aa9c22a2-fd8c-45e8-a11c-7cea43624b80.png'),
(6, 'Santander', '655154c3-5c78-47b3-a76d-60b74a29657b.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfil_imovel`
--

CREATE TABLE `perfil_imovel` (
  `codigo` int(6) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `perfil_imovel`
--

INSERT INTO `perfil_imovel` (`codigo`, `descricao`) VALUES
(1, 'Lançamento'),
(2, 'Novo'),
(3, 'Usado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `permissao`
--

CREATE TABLE `permissao` (
  `codigo` int(6) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `permissao`
--

INSERT INTO `permissao` (`codigo`, `descricao`) VALUES
(1, 'Gestão de imóveis'),
(2, 'Informações privadas'),
(3, 'Gestão de usuários'),
(4, 'Gestão de conteúdo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `permissao_usuario`
--

CREATE TABLE `permissao_usuario` (
  `codigo` int(6) NOT NULL,
  `usuario` int(6) NOT NULL,
  `permissao` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `permissao_usuario`
--

INSERT INTO `permissao_usuario` (`codigo`, `usuario`, `permissao`) VALUES
(46, 16, 1),
(47, 16, 2),
(48, 16, 3),
(49, 16, 4),
(51, 19, 3),
(54, 19, 1),
(55, 19, 4),
(56, 19, 2),
(57, 20, 1),
(58, 21, 1),
(59, 22, 1),
(60, 22, 2),
(61, 22, 3),
(62, 22, 4),
(63, 23, 1),
(64, 24, 1),
(65, 25, 1),
(66, 25, 2),
(67, 25, 3),
(68, 25, 4),
(69, 26, 1),
(70, 27, 1),
(71, 28, 1),
(79, 15, 2),
(80, 15, 3),
(81, 15, 4),
(82, 15, 1),
(95, 1, 1),
(96, 1, 2),
(97, 1, 3),
(98, 1, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `situacao`
--

CREATE TABLE `situacao` (
  `codigo` int(6) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `situacao`
--

INSERT INTO `situacao` (`codigo`, `descricao`) VALUES
(1, 'Ativo'),
(2, 'Inativo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `telefone_unidade`
--

CREATE TABLE `telefone_unidade` (
  `codigo` int(6) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `unidade` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipo_imovel`
--

CREATE TABLE `tipo_imovel` (
  `codigo` int(6) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `tipo_imovel`
--

INSERT INTO `tipo_imovel` (`codigo`, `descricao`) VALUES
(1, 'Residencial'),
(2, 'Comercial'),
(3, 'Terreno');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipo_unidade`
--

CREATE TABLE `tipo_unidade` (
  `codigo` int(6) NOT NULL,
  `descricao` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `tipo_unidade`
--

INSERT INTO `tipo_unidade` (`codigo`, `descricao`) VALUES
(1, 'Matriz'),
(2, 'Filial');

-- --------------------------------------------------------

--
-- Estrutura para tabela `transacao_imovel`
--

CREATE TABLE `transacao_imovel` (
  `codigo` int(6) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `transacao_imovel`
--

INSERT INTO `transacao_imovel` (`codigo`, `descricao`) VALUES
(1, 'Venda'),
(2, 'Aluguel'),
(3, 'Temporada');

-- --------------------------------------------------------

--
-- Estrutura para tabela `unidade`
--

CREATE TABLE `unidade` (
  `codigo` int(6) NOT NULL,
  `tipo` int(6) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cep` varchar(50) NOT NULL,
  `bairro` int(6) NOT NULL,
  `municipio` int(6) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` int(6) NOT NULL,
  `complemento` text,
  `latitude` varchar(50) NOT NULL,
  `longitude` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `unidade_federativa`
--

CREATE TABLE `unidade_federativa` (
  `codigo` int(6) NOT NULL,
  `descricao` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `unidade_federativa`
--

INSERT INTO `unidade_federativa` (`codigo`, `descricao`) VALUES
(2, 'AC'),
(3, 'AL'),
(4, 'AP'),
(5, 'AM'),
(6, 'BA'),
(7, 'CE'),
(8, 'DF'),
(9, 'ES'),
(10, 'GO'),
(11, 'MA'),
(12, 'MT'),
(13, 'MS'),
(14, 'MG'),
(15, 'PA'),
(16, 'PB'),
(17, 'PR'),
(18, 'PE'),
(19, 'PI'),
(20, 'RJ'),
(21, 'RN'),
(22, 'RS'),
(23, 'RO'),
(24, 'RR'),
(25, 'SC'),
(26, 'SP'),
(27, 'SE'),
(28, 'TO');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `codigo` int(6) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` text NOT NULL,
  `situacao` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`codigo`, `nome`, `email`, `senha`, `situacao`) VALUES
(1, 'Eduardo Pereira', 'eduardo.pereira@haniger.com.br', 'Qwerty124124', 2),
(15, 'Marcelo Jardim', 'marcelo@imobiliaria7setembro.com.br', 'marcelo7', 1),
(16, 'Lisiane Correa', 'lisianecorrea87@gmail.com', '94170771', 1),
(17, 'Roberta Garcia', 'rgarcia@teste.com', 'teste123', 2),
(18, 'Admin Site', 'admin@site.com', 'adminsite', 2),
(19, 'Luciano Santos (Testes)', 'luciano.ssj@gmail.com', 'qwer1234', 1),
(20, 'Rafael  Silveira', 'Locacao@imobiliaria7setembro.com.br', 'imob7@2021', 2),
(21, 'Rafael Silveira', 'rafaelsilveira.corretor@gmail.com', '092230', 1),
(22, 'Bringhenti', 'bringhenti@imobiliaria7setembro.com.br', '11753', 1),
(23, 'Luzia Morais', 'luzia@imobiliaria7setembro.com.br', '251959', 1),
(24, 'Locação', 'locacao@imobiliaria7setembro.com.br', 'imob7@2021', 1),
(25, 'Recepção', 'atendimento@imobiliaria7setembro.com.br', '34804066', 1),
(26, 'Rafael Luz ', 'rafaelluz@imobiliaria7setembro.com.br', 'leafar8479', 1),
(27, 'Nadielen ', 'nadielen@imobiliaria7setembro.com.br', 'nsr30119', 2),
(28, 'Nadielen Reis ', 'nadielen@imobiliaria7setembro.com.br', 'Nsr3001.', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `zona_imovel`
--

CREATE TABLE `zona_imovel` (
  `codigo` int(6) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `zona_imovel`
--

INSERT INTO `zona_imovel` (`codigo`, `descricao`) VALUES
(1, 'Urbana'),
(2, 'Rural');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agenciador`
--
ALTER TABLE `agenciador`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `bairro`
--
ALTER TABLE `bairro`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_municipio_bairro` (`municipio`);

--
-- Índices de tabela `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_blog_usuario` (`usuario`);

--
-- Índices de tabela `categoria_imovel`
--
ALTER TABLE `categoria_imovel`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `configuracao_site`
--
ALTER TABLE `configuracao_site`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `documento_imovel`
--
ALTER TABLE `documento_imovel`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_imovel_documento` (`imovel`);

--
-- Índices de tabela `estado_conservacao`
--
ALTER TABLE `estado_conservacao`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `foto_imovel`
--
ALTER TABLE `foto_imovel`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_imovel_foto` (`imovel`);

--
-- Índices de tabela `imovel`
--
ALTER TABLE `imovel`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_categoria_imovel` (`categoria`),
  ADD KEY `FK_tipo_imovel` (`tipo`),
  ADD KEY `FK_estado_conservacao_imovel` (`estado_conservacao`),
  ADD KEY `FK_perfil_imovel` (`perfil`),
  ADD KEY `FK_zona_imovel` (`zona`),
  ADD KEY `FK_agenciador_imovel` (`agenciador`),
  ADD KEY `FK_transacao_imovel` (`transacao`),
  ADD KEY `FK_municipio_imovel` (`municipio`),
  ADD KEY `FK_bairro_imovel` (`bairro`),
  ADD KEY `FK_situacao_imovel` (`situacao`);

--
-- Índices de tabela `localidade`
--
ALTER TABLE `localidade`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_unidade_federativa_localidade` (`unidade_federativa`);

--
-- Índices de tabela `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `mensagens`
--
ALTER TABLE `mensagens`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_unidade_federativa_municipio` (`unidade_federativa`);

--
-- Índices de tabela `novos_imoveis`
--
ALTER TABLE `novos_imoveis`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `parceiro`
--
ALTER TABLE `parceiro`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `perfil_imovel`
--
ALTER TABLE `perfil_imovel`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `permissao`
--
ALTER TABLE `permissao`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `permissao_usuario`
--
ALTER TABLE `permissao_usuario`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_usuario_permissao` (`usuario`),
  ADD KEY `FK_permissao_usuario` (`permissao`);

--
-- Índices de tabela `situacao`
--
ALTER TABLE `situacao`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `telefone_unidade`
--
ALTER TABLE `telefone_unidade`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_telefone_unidade` (`unidade`);

--
-- Índices de tabela `tipo_imovel`
--
ALTER TABLE `tipo_imovel`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `tipo_unidade`
--
ALTER TABLE `tipo_unidade`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `transacao_imovel`
--
ALTER TABLE `transacao_imovel`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `unidade`
--
ALTER TABLE `unidade`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_tipo_unidade` (`tipo`);

--
-- Índices de tabela `unidade_federativa`
--
ALTER TABLE `unidade_federativa`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_situacao_usuario` (`situacao`);

--
-- Índices de tabela `zona_imovel`
--
ALTER TABLE `zona_imovel`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agenciador`
--
ALTER TABLE `agenciador`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `bairro`
--
ALTER TABLE `bairro`
  MODIFY `codigo` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de tabela `banner`
--
ALTER TABLE `banner`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT de tabela `blog`
--
ALTER TABLE `blog`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `categoria_imovel`
--
ALTER TABLE `categoria_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `configuracao_site`
--
ALTER TABLE `configuracao_site`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `documento_imovel`
--
ALTER TABLE `documento_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `estado_conservacao`
--
ALTER TABLE `estado_conservacao`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `foto_imovel`
--
ALTER TABLE `foto_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de tabela `imovel`
--
ALTER TABLE `imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `localidade`
--
ALTER TABLE `localidade`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `log`
--
ALTER TABLE `log`
  MODIFY `codigo` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `mensagens`
--
ALTER TABLE `mensagens`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `municipio`
--
ALTER TABLE `municipio`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `novos_imoveis`
--
ALTER TABLE `novos_imoveis`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `parceiro`
--
ALTER TABLE `parceiro`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `perfil_imovel`
--
ALTER TABLE `perfil_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `permissao`
--
ALTER TABLE `permissao`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `permissao_usuario`
--
ALTER TABLE `permissao_usuario`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de tabela `situacao`
--
ALTER TABLE `situacao`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `telefone_unidade`
--
ALTER TABLE `telefone_unidade`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tipo_imovel`
--
ALTER TABLE `tipo_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tipo_unidade`
--
ALTER TABLE `tipo_unidade`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `transacao_imovel`
--
ALTER TABLE `transacao_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `unidade`
--
ALTER TABLE `unidade`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `unidade_federativa`
--
ALTER TABLE `unidade_federativa`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `zona_imovel`
--
ALTER TABLE `zona_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `bairro`
--
ALTER TABLE `bairro`
  ADD CONSTRAINT `FK_municipio_bairro` FOREIGN KEY (`municipio`) REFERENCES `municipio` (`codigo`);

--
-- Restrições para tabelas `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `FK_blog_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`codigo`);

--
-- Restrições para tabelas `documento_imovel`
--
ALTER TABLE `documento_imovel`
  ADD CONSTRAINT `FK_imovel_documento` FOREIGN KEY (`imovel`) REFERENCES `imovel` (`codigo`);

--
-- Restrições para tabelas `foto_imovel`
--
ALTER TABLE `foto_imovel`
  ADD CONSTRAINT `FK_imovel_foto` FOREIGN KEY (`imovel`) REFERENCES `imovel` (`codigo`);

--
-- Restrições para tabelas `imovel`
--
ALTER TABLE `imovel`
  ADD CONSTRAINT `FK_agenciador_imovel` FOREIGN KEY (`agenciador`) REFERENCES `agenciador` (`codigo`),
  ADD CONSTRAINT `FK_bairro_imovel` FOREIGN KEY (`bairro`) REFERENCES `bairro` (`codigo`),
  ADD CONSTRAINT `FK_categoria_imovel` FOREIGN KEY (`categoria`) REFERENCES `categoria_imovel` (`codigo`),
  ADD CONSTRAINT `FK_estado_conservacao_imovel` FOREIGN KEY (`estado_conservacao`) REFERENCES `estado_conservacao` (`codigo`),
  ADD CONSTRAINT `FK_municipio_imovel` FOREIGN KEY (`municipio`) REFERENCES `municipio` (`codigo`),
  ADD CONSTRAINT `FK_perfil_imovel` FOREIGN KEY (`perfil`) REFERENCES `perfil_imovel` (`codigo`),
  ADD CONSTRAINT `FK_situacao_imovel` FOREIGN KEY (`situacao`) REFERENCES `situacao` (`codigo`),
  ADD CONSTRAINT `FK_tipo_imovel` FOREIGN KEY (`tipo`) REFERENCES `tipo_imovel` (`codigo`),
  ADD CONSTRAINT `FK_transacao_imovel` FOREIGN KEY (`transacao`) REFERENCES `transacao_imovel` (`codigo`),
  ADD CONSTRAINT `FK_zona_imovel` FOREIGN KEY (`zona`) REFERENCES `zona_imovel` (`codigo`);

--
-- Restrições para tabelas `localidade`
--
ALTER TABLE `localidade`
  ADD CONSTRAINT `FK_unidade_federativa_localidade` FOREIGN KEY (`unidade_federativa`) REFERENCES `unidade_federativa` (`codigo`);

--
-- Restrições para tabelas `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `FK_unidade_federativa_municipio` FOREIGN KEY (`unidade_federativa`) REFERENCES `unidade_federativa` (`codigo`);

--
-- Restrições para tabelas `permissao_usuario`
--
ALTER TABLE `permissao_usuario`
  ADD CONSTRAINT `FK_permissao_usuario` FOREIGN KEY (`permissao`) REFERENCES `permissao` (`codigo`),
  ADD CONSTRAINT `FK_usuario_permissao` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`codigo`);

--
-- Restrições para tabelas `telefone_unidade`
--
ALTER TABLE `telefone_unidade`
  ADD CONSTRAINT `FK_telefone_unidade` FOREIGN KEY (`unidade`) REFERENCES `telefone_unidade` (`codigo`);

--
-- Restrições para tabelas `unidade`
--
ALTER TABLE `unidade`
  ADD CONSTRAINT `FK_tipo_unidade` FOREIGN KEY (`tipo`) REFERENCES `tipo_unidade` (`codigo`);

--
-- Restrições para tabelas `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_situacao_usuario` FOREIGN KEY (`situacao`) REFERENCES `situacao` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
