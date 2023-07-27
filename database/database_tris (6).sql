-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2023 at 04:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_tris`
--

-- --------------------------------------------------------

--
-- Table structure for table `history_game`
--

CREATE TABLE `history_game` (
  `history_match_id` int(11) NOT NULL COMMENT 'History match primary key',
  `match_id` int(11) DEFAULT NULL COMMENT 'Referes to the match',
  `status_cell1` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell2` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell3` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell4` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell5` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell6` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell7` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell8` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell9` int(11) DEFAULT 0 COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Represents the state of the Tris table during an ongoing gam';

--
-- Dumping data for table `history_game`
--

INSERT INTO `history_game` (`history_match_id`, `match_id`, `status_cell1`, `status_cell2`, `status_cell3`, `status_cell4`, `status_cell5`, `status_cell6`, `status_cell7`, `status_cell8`, `status_cell9`) VALUES
(12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL COMMENT 'Unique match ID',
  `player1_id` int(11) DEFAULT NULL COMMENT 'Foreign key of player 1''s id',
  `player2_id` int(11) DEFAULT NULL COMMENT 'Foreign key of player 2''s id',
  `history_match_id` int(11) DEFAULT NULL COMMENT 'Foreign key of an history match to store the table''s status',
  `points_p1` int(11) NOT NULL DEFAULT 0 COMMENT 'Player 1''s points',
  `points_p2` int(11) NOT NULL DEFAULT 0 COMMENT 'Player 2''s points',
  `is_end_match` tinyint(1) NOT NULL DEFAULT 0,
  `is_end_game` tinyint(1) NOT NULL DEFAULT 0,
  `play_again` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'attribute that allow a regame in the match',
  `player_id_turn` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Represents created matches in the system.';

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`match_id`, `player1_id`, `player2_id`, `history_match_id`, `points_p1`, `points_p2`, `is_end_match`, `is_end_game`, `play_again`, `player_id_turn`) VALUES
(46, 192, 193, NULL, 0, 0, 0, 0, 0, 192),
(48, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL),
(49, 198, 199, NULL, 0, 0, 0, 0, 0, 198),
(50, 200, 201, NULL, 0, 0, 0, 0, 0, 200),
(51, 221, 222, 12, 0, 0, 0, 0, 0, 222),
(52, 223, NULL, 13, 0, 0, 0, 0, 0, 225),
(53, 226, 225, 14, 0, 0, 0, 0, 0, 226),
(54, 227, NULL, 15, 0, 0, 0, 0, 0, 227),
(55, 229, 230, 16, 0, 0, 0, 0, 0, 229),
(56, NULL, NULL, 17, 0, 0, 0, 0, 0, NULL),
(57, NULL, NULL, 18, 0, 0, 0, 0, 0, NULL),
(58, NULL, NULL, 19, 0, 0, 0, 0, 0, NULL),
(59, NULL, NULL, 20, 0, 0, 0, 0, 0, NULL),
(60, NULL, NULL, 21, 0, 0, 0, 0, 0, NULL),
(61, NULL, NULL, 22, 0, 0, 0, 0, 0, NULL),
(62, NULL, NULL, 23, 0, 0, 0, 0, 0, NULL),
(63, NULL, NULL, 24, 0, 0, 0, 0, 0, NULL),
(64, NULL, NULL, 25, 0, 0, 0, 0, 0, NULL),
(65, NULL, NULL, 26, 0, 0, 0, 0, 0, NULL),
(66, NULL, NULL, 27, 0, 0, 0, 0, 0, NULL),
(67, NULL, NULL, 28, 0, 0, 0, 0, 0, NULL),
(68, NULL, NULL, 29, 0, 0, 0, 0, 0, NULL),
(69, NULL, NULL, 30, 0, 0, 0, 0, 0, NULL),
(70, NULL, NULL, 31, 0, 0, 0, 0, 0, NULL),
(71, NULL, NULL, 32, 0, 0, 0, 0, 0, NULL),
(72, 263, 264, 33, 0, 0, 0, 0, 0, 264);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL COMMENT 'Player''s primary key',
  `nickname` text NOT NULL COMMENT 'Player''s nickname',
  `password` text NOT NULL COMMENT 'it''s the user password',
  `match_id` int(11) DEFAULT NULL COMMENT 'This parameter shows in witch match the player are in. If the parameter is empty means the player isn''t in a match yet.',
  `party_id` int(11) DEFAULT NULL,
  `is_online` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'this value check if the player wants to join an online match',
  `last_online` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'value to check if the player is online in recent seconds'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Represents registered players in the system. Each player has';

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`player_id`, `nickname`, `password`, `match_id`, `party_id`, `is_online`, `last_online`) VALUES
(1, 'admin', '1234', NULL, NULL, 0, '2023-07-26 13:42:19'),
(188, 'bernardo1', '1234', NULL, NULL, 0, '2023-07-27 06:32:29'),
(191, 'bernardo2', '1234', NULL, NULL, 0, '2023-07-27 06:35:28'),
(192, '231', '1234', 46, NULL, 0, '2023-07-27 06:42:08'),
(193, '4334', '1234', 46, NULL, 0, '2023-07-27 06:42:35'),
(194, '4556633', '1234', NULL, NULL, 0, '2023-07-27 07:06:47'),
(195, '3434', '1234', NULL, NULL, 1, '2023-07-27 07:06:51'),
(198, '4444', '1234', 49, NULL, 0, '2023-07-27 07:08:48'),
(199, '5555', '1234', 49, NULL, 0, '2023-07-27 07:08:56'),
(200, '66666', '1234', 50, NULL, 0, '2023-07-27 07:11:19'),
(201, '777', '1234', 50, NULL, 0, '2023-07-27 07:11:25'),
(202, '999', '1234', NULL, NULL, 0, '2023-07-27 07:46:46'),
(203, '888', '1234', NULL, NULL, 0, '2023-07-27 07:47:55'),
(204, '12334', '1234', NULL, NULL, 1, '2023-07-27 07:47:38'),
(205, 'csdsvf', '1234', NULL, NULL, 0, '2023-07-27 07:48:03'),
(207, 'fbdfb', '1234', NULL, NULL, 1, '2023-07-27 07:55:17'),
(209, '464564', '1234', NULL, NULL, 1, '2023-07-27 08:02:20'),
(210, '8989', '1234', NULL, NULL, 0, '2023-07-27 08:07:10'),
(211, '67676', '1234', NULL, NULL, 0, '2023-07-27 08:11:15'),
(212, '433434', '1234', NULL, NULL, 0, '2023-07-27 08:04:17'),
(213, 'eeee', '1234', NULL, NULL, 0, '2023-07-27 08:07:30'),
(214, 'rrrr', '1234', NULL, NULL, 0, '2023-07-27 08:10:49'),
(215, '99989797', '1234', NULL, NULL, 0, '2023-07-27 08:15:56'),
(216, 'gggggg', '1234', NULL, NULL, 0, '2023-07-27 08:16:41'),
(217, 'kkkkkk', '1234', NULL, NULL, 0, '2023-07-27 08:11:27'),
(218, 'hhhhh', '1234', NULL, NULL, 0, '2023-07-27 08:25:27'),
(219, 'hghfhh', '1234', NULL, NULL, 0, '2023-07-27 08:25:30'),
(220, 'lllkjlj', '1234', NULL, NULL, 0, '2023-07-27 08:25:47'),
(221, 'aaaaa', '1234', 51, NULL, 0, '2023-07-27 08:29:36'),
(222, 'ssssss', '1234', 51, NULL, 0, '2023-07-27 08:29:40'),
(223, 'kkkll', '1234', 52, NULL, 0, '2023-07-27 08:34:32'),
(225, 'oopopo', '1234', 53, NULL, 0, '2023-07-27 08:54:56'),
(226, 'yeyeyey', '1234', 53, NULL, 0, '2023-07-27 08:53:26'),
(227, 'wewewew', '1234', 54, NULL, 0, '2023-07-27 08:55:59'),
(229, 'gigi', '1234', 55, NULL, 0, '2023-07-27 08:57:08'),
(230, 'kilo', '1234', 55, NULL, 0, '2023-07-27 08:57:16'),
(231, 'bernardoBest', '1234', NULL, NULL, 0, '2023-07-27 09:02:31'),
(263, 'ululul', '1234', 72, NULL, 0, '2023-07-27 13:42:30'),
(264, 'hjhjhj', '1234', 72, NULL, 0, '2023-07-27 13:42:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history_game`
--
ALTER TABLE `history_game`
  ADD PRIMARY KEY (`history_match_id`),
  ADD KEY `status_cell1` (`status_cell1`),
  ADD KEY `status_cell2` (`status_cell2`),
  ADD KEY `status_cell3` (`status_cell3`),
  ADD KEY `status_cell4` (`status_cell4`),
  ADD KEY `status_cell5` (`status_cell5`),
  ADD KEY `status_cell6` (`status_cell6`),
  ADD KEY `status_cell7` (`status_cell7`),
  ADD KEY `status_cell8` (`status_cell8`),
  ADD KEY `status_cell9` (`status_cell9`),
  ADD KEY `match_id` (`match_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `history_match_id` (`history_match_id`),
  ADD KEY `player1_id` (`player1_id`),
  ADD KEY `player2_id` (`player2_id`),
  ADD KEY `player_id_turn` (`player_id_turn`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`player_id`),
  ADD KEY `match_id` (`match_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history_game`
--
ALTER TABLE `history_game`
  MODIFY `history_match_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'History match primary key', AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique match ID', AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Player''s primary key', AUTO_INCREMENT=265;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history_game`
--
ALTER TABLE `history_game`
  ADD CONSTRAINT `match_id` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `history_match_id` FOREIGN KEY (`history_match_id`) REFERENCES `history_game` (`history_match_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `player1_id` FOREIGN KEY (`player1_id`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `player2_id` FOREIGN KEY (`player2_id`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `player_id_turn` FOREIGN KEY (`player_id_turn`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
