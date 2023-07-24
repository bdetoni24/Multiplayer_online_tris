-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2023 at 03:49 PM
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
-- Table structure for table `history_match`
--

CREATE TABLE `history_match` (
  `history_match_id` int(11) NOT NULL COMMENT 'History match primary key',
  `match_id` int(11) DEFAULT NULL COMMENT 'Referes to the match',
  `status_cell1` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell2` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell3` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell4` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell5` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell6` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell7` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell8` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet',
  `status_cell9` int(11) DEFAULT NULL COMMENT 'This parameter shows witch player clicked it, if it''s null means that the cell isn''t being clicked yet'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Represents the state of the Tris table during an ongoing gam';

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
  `points_p2` int(11) NOT NULL DEFAULT 0 COMMENT 'Player 2''s points'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Represents created matches in the system.';

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`match_id`, `player1_id`, `player2_id`, `history_match_id`, `points_p1`, `points_p2`) VALUES
(-1, NULL, NULL, NULL, 0, 0),
(1, NULL, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL COMMENT 'Player''s primary key',
  `nickname` text NOT NULL COMMENT 'Player''s nickname',
  `password` text NOT NULL COMMENT 'it''s the user password',
  `match_id` int(11) DEFAULT NULL COMMENT 'This parameter shows in witch match the player are in. If the parameter is empty means the player isn''t in a match yet.',
  `is_online` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'this value check if the player wants to join an online match'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Represents registered players in the system. Each player has';

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`player_id`, `nickname`, `password`, `match_id`, `is_online`) VALUES
(1, 'admin', '1234', NULL, 0),
(3, 'admin', '1234', NULL, 0),
(8, 'fff', '1234', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history_match`
--
ALTER TABLE `history_match`
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
  ADD KEY `player2_id` (`player2_id`);

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
-- AUTO_INCREMENT for table `history_match`
--
ALTER TABLE `history_match`
  MODIFY `history_match_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'History match primary key';

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique match ID', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Player''s primary key', AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history_match`
--
ALTER TABLE `history_match`
  ADD CONSTRAINT `match_id` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell1` FOREIGN KEY (`status_cell1`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell2` FOREIGN KEY (`status_cell2`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell3` FOREIGN KEY (`status_cell3`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell4` FOREIGN KEY (`status_cell4`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell5` FOREIGN KEY (`status_cell5`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell6` FOREIGN KEY (`status_cell6`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell7` FOREIGN KEY (`status_cell7`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell8` FOREIGN KEY (`status_cell8`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `status_cell9` FOREIGN KEY (`status_cell9`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `history_match_id` FOREIGN KEY (`history_match_id`) REFERENCES `history_match` (`history_match_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `player1_id` FOREIGN KEY (`player1_id`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `player2_id` FOREIGN KEY (`player2_id`) REFERENCES `players` (`player_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
