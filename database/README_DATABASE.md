# Tris Game Database

This repository contains the database used for the Tris game implemented with React. The database was created using MySQL through XAMPP.

## Database Structure

The `database_tris` database contains the following tables:

### Table `history_match`

The `history_match` table represents the state of the Tris game during an ongoing match. It has the following structure:

| Column           | Type     | Description                                                      |
|-------------------|----------|------------------------------------------------------------------|
| history_match_id  | int      | Primary key for the `history_match` table                        |
| match_id          | int      | Reference to the ongoing match                                    |
| status_cell1      | int      | Indicates which player clicked cell 1 (null if not clicked yet)   |
| status_cell2      | int      | Indicates which player clicked cell 2 (null if not clicked yet)   |
| status_cell3      | int      | Indicates which player clicked cell 3 (null if not clicked yet)   |
| status_cell4      | int      | Indicates which player clicked cell 4 (null if not clicked yet)   |
| status_cell5      | int      | Indicates which player clicked cell 5 (null if not clicked yet)   |
| status_cell6      | int      | Indicates which player clicked cell 6 (null if not clicked yet)   |
| status_cell7      | int      | Indicates which player clicked cell 7 (null if not clicked yet)   |
| status_cell8      | int      | Indicates which player clicked cell 8 (null if not clicked yet)   |
| status_cell9      | int      | Indicates which player clicked cell 9 (null if not clicked yet)   |

### Table `matches`

The `matches` table represents the created matches in the system. It has the following structure:

| Column           | Type     | Description                                                  |
|-------------------|----------|--------------------------------------------------------------|
| match_id          | int      | Unique ID for the match                                       |
| player1_id        | int      | ID of Player 1 (foreign key with UPDATE and DELETE actions)   |
| player2_id        | int      | ID of Player 2 (foreign key with UPDATE and DELETE actions)   |
| history_match_id  | int      | ID of the match history (foreign key with UPDATE and DELETE actions)   |
| points_p1         | int      | Points of Player 1                                            |
| points_p2         | int      | Points of Player 2                                            |

### Table `players`

The `players` table represents the registered players in the system. Each player has a unique registration. It has the following structure:

| Column           | Type     | Description                                            |
|-------------------|----------|--------------------------------------------------------|
| player_id         | int      | Primary key for the `players` table                     |
| nickname          | text     | Player's nickname                                      |
| match_id          | int      | ID of the match the player is involved in (optional, foreign key with UPDATE and DELETE actions) |

## System Requirements

- MySQL (tested with version 10.4.28-MariaDB)
- XAMPP or an equivalent MySQL server
- PHP (tested with version 8.2.4)

## Installation

1. Import the provided SQL file into a MySQL database.
2. Ensure that you configure the database connections correctly in your project.
