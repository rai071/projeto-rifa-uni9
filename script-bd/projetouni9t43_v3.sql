/*
 Navicat Premium Data Transfer

 Source Server         : Mysql_locaweb
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : projetouni9t43.mysql.dbaas.com.br:3306
 Source Schema         : projetouni9t43

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 20/05/2021 22:45:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_grupo_nomes
-- ----------------------------
DROP TABLE IF EXISTS `tbl_grupo_nomes`;
CREATE TABLE `tbl_grupo_nomes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(35) COLLATE latin1_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='Tabela dos Grupos de nomes os o usuário que vai criar as rifa seleciona o grupo para adicionar os nomes a sua rifa';

-- ----------------------------
-- Records of tbl_grupo_nomes
-- ----------------------------
BEGIN;
INSERT INTO `tbl_grupo_nomes` VALUES (1, 'Naruto', '2021-03-30 21:06:10');
INSERT INTO `tbl_grupo_nomes` VALUES (2, 'Vingadores', '2021-03-30 21:06:20');
INSERT INTO `tbl_grupo_nomes` VALUES (3, 'Liga da Justiça', '2021-03-30 21:06:30');
INSERT INTO `tbl_grupo_nomes` VALUES (4, 'Carros Antigos', '2021-03-30 21:06:40');
COMMIT;

-- ----------------------------
-- Table structure for tbl_grupos_por_rifa
-- ----------------------------
DROP TABLE IF EXISTS `tbl_grupos_por_rifa`;
CREATE TABLE `tbl_grupos_por_rifa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rifa_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='Tabela dos Grupos de nomes os o usuário que vai criar as rifa seleciona o grupo para adicionar os nomes a sua rifa';

-- ----------------------------
-- Records of tbl_grupos_por_rifa
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tbl_nomes
-- ----------------------------
DROP TABLE IF EXISTS `tbl_nomes`;
CREATE TABLE `tbl_nomes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `nome` varchar(35) COLLATE latin1_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='Tabelas de Grupos de nomes por Grupos, é dessa tabela que os grupos/nomes são transferidos para a rifa do usuário conforme ele seleciona';

-- ----------------------------
-- Records of tbl_nomes
-- ----------------------------
BEGIN;
INSERT INTO `tbl_nomes` VALUES (1, 1, 'Naruto Uzumaki', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (2, 1, 'Sasuke Uchiha', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (3, 1, 'Sakura Haruno', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (4, 1, 'Kakashi Hatake', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (5, 1, 'Jiraiya', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (6, 1, 'Sai Yamanaka', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (7, 1, 'Yamato', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (8, 1, 'Kiba Inuzuka', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (9, 1, 'Akamaru', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (10, 1, 'Hinata Hy?ga', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (11, 1, 'Shino Aburame', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (12, 1, 'Kurenai Y?hi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (13, 1, 'Neji Hy?ga', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (14, 1, 'Tenten', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (15, 1, 'Rock Lee', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (16, 1, 'Might Guy', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (17, 1, 'Ino Yamanaka', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (18, 1, 'Shikamaru Nara', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (19, 1, 'Ch?ji Akimichi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (20, 1, 'Asuma Sarutobi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (21, 1, 'Suigetsu H?zuki', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (22, 1, 'Karin Uzumaki', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (23, 1, 'Juugo', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (24, 1, 'Orochimaru', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (25, 1, 'Kabuto Yakushi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (26, 1, 'Madara Uchiha', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (27, 1, 'Tobi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (28, 1, 'Pain', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (29, 1, 'Konan', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (30, 1, 'Zetsu', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (31, 1, 'Deidara Tsukuri', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (32, 1, 'Sasori', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (33, 1, 'Itachi Uchiha', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (34, 1, 'Kisame Hoshigaki', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (35, 1, 'Kakuzu', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (36, 1, 'Hidan', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (37, 1, 'Konohagakure no Sato', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (38, 1, 'Hashirama Senju', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (39, 1, 'Tobirama Senju', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (40, 1, 'Hiruzen Sarutobi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (41, 1, 'Minato Namikaze', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (42, 1, 'Tsunade Senju', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (43, 1, 'Kakashi Hatake', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (44, 1, 'Shukaku', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (45, 1, 'Matatabi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (46, 1, 'Isobu', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (47, 1, 'Son Goku', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (48, 1, 'Koku?', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (49, 1, 'Saiken', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (50, 1, 'Ch?mei', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (51, 1, 'Gy?ki', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (52, 1, 'Kurama', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (53, 1, 'Shinj?', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (54, 2, 'Thor', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (55, 2, 'Homem de Ferro', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (56, 2, 'Homem Formiga', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (57, 2, 'Homem Aranha', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (58, 2, 'Hulk', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (59, 2, 'Capitão América', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (60, 2, 'Gavião Arqueiro', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (61, 2, 'Mercúrio', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (62, 2, 'Feiticeira Escarlate', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (63, 2, 'Pantera Negra', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (64, 2, 'Visão', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (65, 2, 'Viúva Negra', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (66, 2, 'Capitã Marvel', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (67, 2, 'Dr. Estranho', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (68, 3, 'Lanterna Verde', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (69, 3, 'Flash', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (70, 3, 'Caçador de Marte', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (71, 3, 'Aquaman', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (72, 3, 'Batman', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (73, 3, 'Superman', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (74, 3, 'Mulher Maravilha', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (75, 3, 'Arqueiro Verde', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (76, 3, 'Eléktron', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (77, 3, 'Gavião Negro', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (78, 3, 'Canário Negro', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (79, 4, 'Volkswagen Fusca', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (80, 4, 'VW Kombi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (81, 4, ' VW Gol GTI', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (82, 4, 'Ford Maverick', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (83, 4, 'Ford Escort Xr3', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (84, 4, 'Chevrolet Opala', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (85, 4, 'Chevrolet Chevette', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (86, 4, 'Chevrolet Kadett Gsi', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (87, 4, 'Chevrolet Monza ', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (88, 4, 'Chevrolet Kadett ', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (89, 4, 'Honda Civic Si ', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (90, 4, 'VW Santana', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (91, 4, 'Fiat Tempra ', '2021-03-30 21:07:34');
INSERT INTO `tbl_nomes` VALUES (92, 4, 'Fiat 147', '2021-03-30 21:07:34');
COMMIT;

-- ----------------------------
-- Table structure for tbl_nomes_por_rifa
-- ----------------------------
DROP TABLE IF EXISTS `tbl_nomes_por_rifa`;
CREATE TABLE `tbl_nomes_por_rifa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `rifa_id` int(11) DEFAULT NULL,
  `nome_numero` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `email_amigo` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `pago` int(1) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='Tabela com nomes e numero e dados de quem assinou as rifas';

-- ----------------------------
-- Records of tbl_nomes_por_rifa
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tbl_user_rifas
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user_rifas`;
CREATE TABLE `tbl_user_rifas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `rifa_name` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `rifa_token` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `active` int(1) DEFAULT '1',
  `winner_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='Tabela com as rifas, associada ao usuário que a criou.';

-- ----------------------------
-- Records of tbl_user_rifas
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `user_email` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `user_password` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `user_token` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unico` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='Tabela com os Usuários que criaram rifas no site';

-- ----------------------------
-- Records of tbl_users
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Procedure structure for Proc_add_group_rifa_to_user
-- ----------------------------
DROP PROCEDURE IF EXISTS `Proc_add_group_rifa_to_user`;
delimiter ;;
CREATE PROCEDURE `Proc_add_group_rifa_to_user`(_user_id int, _group_id int, _rifa_id int)
BEGIN

 /*
 Autor: Luiz Pirocudo
 date: 02/04/2021
 desc: Insert names groups users
 */

	-- Insert Without duplicates
	INSERT INTO  tbl_nomes_por_rifa
	(
		user_id
		,group_id
		,rifa_id
		,nome_numero
		,createdAt
	)
	SELECT _user_id,_group_id,_rifa_id,N.nome,NOW()
	FROM tbl_nomes N
	WHERE N.group_id=_group_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for Proc_meus_nomes_assinados
-- ----------------------------
DROP PROCEDURE IF EXISTS `Proc_meus_nomes_assinados`;
delimiter ;;
CREATE PROCEDURE `Proc_meus_nomes_assinados`(_email varchar(200))
BEGIN
	SELECT
	nomerifa.nome_numero, 
	nomerifa.pago, 
	rifas.rifa_name, 
	tbl_users.user_name, 
	tbl_grupo_nomes.nome 
	FROM tbl_nomes_por_rifa 
	AS nomerifa
	INNER JOIN tbl_user_rifas 
	AS rifas 
	ON nomerifa.rifa_id = rifas.id
	INNER JOIN tbl_users 
	ON tbl_users.id = nomerifa.user_id
	INNER JOIN tbl_grupo_nomes 
	ON nomerifa.group_id = tbl_grupo_nomes.id
	WHERE nomerifa.email_amigo = _email;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
