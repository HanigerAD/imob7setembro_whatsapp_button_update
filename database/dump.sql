-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 28/09/2022 às 22:26
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
-- Current Database: `imob7`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `imob7` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `imob7`;

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
(202, 'e5f733a4-3c5f-4936-ae9b-f5ba61b72bce.jpeg');

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
(1, 'b4653163-2ba9-41f8-87a5-b69ca715cfb3.png', 'Imobiliaria 7 Setembro', 'Temos como foco realizar o sonho que é a conquista do imóvel desejado pelo seu cliente.\n\nA Imobiliária 7 de Setembro fundada em agosto de 1989, tem como foco de seu trabalho, não apenas a satisfação das necessidades, com a visão de ser referência no seu ramo de negócio em informações e soluções, mas também buscar atender a expectativa na realização do sonho que é a conquista do imóvel desejado pelo seu cliente. A equipe, composta por seus profissionais é dedicada a oferecer os melhores serviços aos clientes. Além disso, a Imobiliária 7 de Setembro também presta assessoria em todos os processos da compra e venda de imóveis e também na assessoria em áreas rurais de agropastoril e florestal.', 'Temos profissionais dedicados a oferecer os melhores serviços a nossos clientes.', '09:00', '17:00', '09:00', '12:00', NULL, 'Fechado', 'R. Dr. Lauro Azambuja, 288 - Centro, Guaíba - RS', 'atendimento@imobiliaria7setembro.com.br', '(51) 3480-4066');

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
(1, 3, '34a0df4f-f30a-4c82-a677-f1678b62a08e.pdf', 'Autorização.pdf'),
(2, 3, '4197c362-4ad4-42f3-8bb3-e6540aaf0311.jpeg', 'WhatsApp Image 2022-01-21 at 10.17.48.jpeg');

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
(1, 1, 1, '00791444-0e63-4d54-8e9f-926f7a0ac324.jpg'),
(2, 1, 2, '82b07da9-0b54-491c-af8e-ed3ff2223a19.jpg'),
(3, 2, 2, 'a083bb0d-196e-44ff-bf0a-b9b8b51ddd98.jpg'),
(4, 3, 2, 'dbaec44a-03b7-4303-af0c-2d51e466851b.jpg'),
(5, 4, 2, '507ff86f-043a-4c6e-aa24-dbed3ba2b29a.jpg'),
(6, 5, 2, '01033658-70e5-4bf1-82b9-f5671ba9e14b.jpg'),
(7, 6, 2, 'c71fd55a-ac95-4e96-809d-67a1bc159835.jpg'),
(8, 7, 2, '3ec9718d-74fd-4f32-b439-22e2800067d3.jpg'),
(9, 8, 2, '0a1b0b40-0c78-42d7-b389-4473cd882238.jpg'),
(10, 9, 2, '427bbffa-7a88-49e3-b984-840379ce2114.jpg'),
(11, 10, 2, '1e2ba100-219a-49d5-a3a4-c301e7c8238f.jpg'),
(12, 11, 2, '361c824c-2584-4272-a55e-c80207c5c8e0.jpg'),
(13, 12, 2, 'fce5669f-60f7-4334-a555-0390c1e832a7.jpg'),
(14, 13, 2, '2da18824-63ad-4625-90ec-7cd23577f324.jpg'),
(15, 1, 3, 'b0ab24ed-5f80-499d-a301-bd6a1840a79f.jpg'),
(16, 2, 3, 'c7ff2433-bec5-499c-944b-985b3330e679.jpg'),
(17, 3, 3, 'ca122749-33bc-4454-8ae3-529530e7b2ed.jpg'),
(18, 4, 3, 'f38bb873-c9b1-4129-a988-1fc6542c51db.jpg'),
(19, 5, 3, '281cba43-a6ca-4a66-9af0-ea13ce3ba2cf.jpg'),
(20, 6, 3, 'd86317df-46b8-4d0c-946b-53a7e8150e17.jpg'),
(21, 7, 3, '44b864c5-5fec-438d-a800-1f56d3e1dbe0.jpg'),
(22, 8, 3, 'e0d7fce7-5944-45ec-a596-ec9ee09d705c.jpg'),
(23, 9, 3, 'a075a7eb-f583-4ac9-8b26-a0b618eda4eb.jpg'),
(24, 10, 3, '898129db-7f4b-4cca-a6b0-0311487e6676.jpg'),
(25, 11, 3, '5d04385a-a92d-4ea0-a688-5b318cabf717.jpg'),
(26, 12, 3, 'fe506fe3-4013-4617-ae2e-f881c3ad0403.jpg'),
(27, 13, 3, '16533912-b8e1-4e13-8f24-37e755ddb467.jpg'),
(28, 14, 3, '3299ca8b-a3c2-4948-a937-1a465d6ded2f.jpg'),
(29, 15, 3, '839d690e-1e21-4d38-99fa-6038f2ba3adb.jpg'),
(30, 16, 3, '91656621-ecb7-4a57-b071-298017a5854c.jpg'),
(31, 17, 3, '59d7076e-3f8c-4199-adde-0ad1e4e4e572.jpg'),
(32, 18, 3, '9c1bd7a8-34c2-40ac-8a8b-bdfe082a390e.jpg'),
(33, 19, 3, '7bf6f6a9-7305-4101-911b-3fa1013000fa.jpg'),
(34, 20, 3, '10a81d72-187e-43d7-a079-bae43f420933.jpg'),
(35, 21, 3, 'd6b7ab59-389a-426a-bf38-0be4c54c0f3c.jpg');

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
(1, 'CASA PARA VENDA ALEGRIA GUAÍBA', '600000', 5, NULL, 1, 2, '213', '504', NULL, NULL, '<p>Casa para venda na Alegria. Possui 5 dormitórios, sala de estar, sala de jantar, cozinha, banheiro e garagem para 2 carros.</p><p>Terreno medindo 504,14m².&nbsp;</p>', NULL, 5, 0, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 3, 1, 19, 1, 1, 1, NULL, 3, 2, NULL, 'Spagiari', NULL, NULL, '-10', '10', 1, 1949, NULL),
(2, 'Imóvel á venda Alegria ', '600.000', 5, NULL, 1, 2, '213', '504', 1, 0, '<p>Imóvel á venda no bairro Alegria com ótima localização.</p><p> Possui 5 dormitórios, sala de estar, sala de jantar, cozinha, banheiro e garagem para 2 carros.</p><p>Terreno medindo 504,14m².&nbsp;</p>', NULL, 5, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 3, 1, 15, 2, 1, 1, NULL, 3, 2, '92727020', 'Av. Brasil ', 602, NULL, NULL, NULL, 1, 1949, NULL),
(3, 'Casa á venda Alegria ', '849.500', 2, 1, 2, 2, '155', '741', 1, 1, '<p><span style=\"color: rgb(122, 122, 122);\">- Cerca elétrica em toda extensão do terreno;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 3 Reservatórios de água de 500lt cada no sótão;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 3 Reservatórios de coleta na chuva de 1000lt cada (Cisterna);</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Garagem coberta para 3 carros;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Terreno com drenos de chuva;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Calhas para chuva na casa principal;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Cozinha planejada e coifa;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Móvel planejado na sala de estar;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Closet suíte;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Móveis dos banheiros;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Lareira;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Churrasqueira;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Salão de festas com 60m² c/ banheiro completo;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Sistema de água quente (gás) na cozinha e banheiros;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Sistema elétrico (CEEE) trifásico;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Forro de gesso na suíte, em um dos quartos, sala de estar (pé direito 4metros);</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 2 Ar condicionados nos quartos;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Terreno murado com grades na frente;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Portão eletrônico;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- 2 Toldos verticais retráteis nas aberturas da garagem;</span></p><p><span style=\"color: rgb(122, 122, 122);\">- Altura das paredes interna do imóvel 2m 75 cm</span></p>', NULL, 5, 1, 0, NULL, NULL, NULL, 0, 0, 1, 0, NULL, 3, 1, 15, 2, 1, 1, NULL, 3, 2, '92727320', 'Rua Dona Teresa Spagiari', 210, NULL, NULL, NULL, 1, 2275, NULL);

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
(42, 15, 1),
(43, 15, 2),
(44, 15, 3),
(45, 15, 4),
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
(71, 28, 1);

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
(1, 'Eduardo Pereira', 'eduardo.pereira@haniger.com.br', 'qwerty124124', 1),
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
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

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
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `estado_conservacao`
--
ALTER TABLE `estado_conservacao`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `foto_imovel`
--
ALTER TABLE `foto_imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `imovel`
--
ALTER TABLE `imovel`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `municipio`
--
ALTER TABLE `municipio`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `novos_imoveis`
--
ALTER TABLE `novos_imoveis`
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `parceiro`
--
ALTER TABLE `parceiro`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `codigo` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

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
