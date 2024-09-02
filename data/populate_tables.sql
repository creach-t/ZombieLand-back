BEGIN;

INSERT INTO "user" ("user_id", "first_name", "last_name", "email", "password", "role", "created_at") VALUES
(1, 'Alice', 'Martin', 'alice.martin@example.com', 'password123', 'user', '2024-08-15 10:20:30'),
(2, 'Bob', 'Dupont', 'bob.dupont@example.com', 'securepass456', 'user', '2024-08-16 14:50:12'),
(3, 'Charlotte', 'Dubois', 'charlotte.dubois@example.com', 'zombie789','user', '2024-08-17 09:35:50'),
(4, 'David', 'Leroy', 'david.leroy@example.com', 'undead321', 'user', '2024-08-18 12:25:30'),
(5, 'Elise', 'Moreau', 'elise.moreau@example.com', 'brains654', 'user', '2024-08-19 11:15:20'),
(6, 'François', 'Petit', 'francois.petit@example.com', 'walkingdead987', 'user', '2024-08-20 15:45:10'),
(7, 'Gabrielle', 'Roux', 'gabrielle.roux@example.com', 'escape1234', 'user', '2024-08-21 08:05:00'),
(8, 'Hugo', 'Schmitt', 'hugo.schmitt@example.com', 'scream567', 'user', '2024-08-22 17:30:45'),
(9, 'Inès', 'Bernard', 'ines.bernard@example.com', 'darknight678', 'user', '2024-08-23 13:15:25'),
(10, 'Julien', 'Dubois', 'julien.dubois@example.com', 'survivor890', 'user', '2024-08-24 09:45:15');

INSERT INTO "booking" ("booking_id", "date", "status", "nb_tickets", "client_id", "created_at") VALUES
(1, '2024-09-01 10:00:00', 'confirmed', 3, 1, '2024-09-01 10:00:00'),
(2, '2024-09-02 11:00:00', 'canceled', 4, 2, '2024-09-02 11:00:00'),
(3, '2024-09-03 12:00:00', 'pending', 2, 3, '2024-09-03 12:00:00'),
(4, '2024-09-04 13:00:00', 'confirmed', 5, 4, '2024-09-04 13:00:00'),
(5, '2024-09-05 14:00:00', 'confirmed', 1, 5, '2024-09-05 14:00:00'),
(6, '2024-09-06 15:00:00', 'confirmed', 3, 6, '2024-09-06 15:00:00'),
(7, '2024-09-07 16:00:00', 'pending', 2, 7, '2024-09-07 16:00:00'),
(8, '2024-09-08 17:00:00', 'canceled', 4, 8, '2024-09-08 17:00:00'),
(9, '2024-09-09 18:00:00', 'confirmed', 2, 9, '2024-09-09 18:00:00'),
(10, '2024-09-10 19:00:00', 'confirmed', 5, 10, '2024-09-10 19:00:00'),
(11, '2024-09-11 10:00:00', 'pending', 1, 3, '2024-09-11 10:00:00'),
(12, '2024-09-12 11:00:00', 'canceled', 3, 1, '2024-09-12 11:00:00'),
(13, '2024-09-13 12:00:00', 'confirmed', 4, 5, '2024-09-13 12:00:00'),
(14, '2024-09-14 13:00:00', 'confirmed', 2, 6, '2024-09-14 13:00:00'),
(15, '2024-09-15 14:00:00', 'confirmed', 3, 7, '2024-09-15 14:00:00');

INSERT INTO "activity" ("activity_id", "name", "short_description", "description", "minimal_age", "capacity", "x", "y", "created_at") VALUES
(0, 'Haunted House', 'Plongez dans l''horreur surnaturelle de la Haunted House, où des esprits vengeurs et des zombies enragés hantent chaque pièce. Explorez les couloirs sombres et les salles abandonnées, mais méfiez-vous des surprises qui vous guettent. Pouvez-vous échapper aux griffes des morts-vivants ou serez-vous piégé dans ce manoir maudit à jamais ?', 10, 6, '2024-08-15 09:00:00'),
(1, 'Zombie City', 'Bienvenue à Zombie City, l''ultime épreuve de survie urbaine. La ville est en ruines, envahie par des hordes de zombies affamés. Votre mission : échapper à ce cauchemar en trouvant des indices, en décryptant des énigmes, et en évitant les pièges mortels qui se cachent à chaque coin de rue. Dans ce labyrinthe de bâtiments abandonnés, d’égouts obscurs, et de ruelles sinistres, le temps est votre pire ennemi. Vous avez 60 minutes pour trouver la sortie… ou devenir une proie de plus pour les morts-vivants.', 12, 16, '2024-08-16 09:00:00'),
(2, 'Escape Room', 'Vous êtes enfermé dans un laboratoire abandonné où des expériences horribles ont été menées sur des sujets humains. Avec seulement 60 minutes pour vous échapper, trouvez des indices et résolvez des énigmes pour éviter de devenir la prochaine victime des créatures qui rôdent dans l''ombre. Vivez une aventure immersive pleine de suspense et de frissons.', 12, 4, '2024-08-17 09:00:00'),
(3, 'Zombie Forest', 'Entrez dans la Zombie Forest, un bois dense et brumeux infesté de zombies affamés. Suivez le chemin sinueux, mais faites attention à chaque pas. Les arbres semblent prendre vie, et les zombies surgissent de l''obscurité. Saurez-vous traverser cette forêt maudite indemne ou serez-vous pris au piège dans ce cauchemar sylvestre ?', 14, 6, '2024-08-18 09:00:00'),
(4, 'Damned Path', 'Affrontez le Damned Path, un parcours sinistre semé d''embûches et de pièges mortels. Ce chemin maudit est rempli de zombies et d''autres créatures terrifiantes prêtes à vous attraper à chaque coin de rue. Courez, sautez et rampez pour échapper à leurs griffes et atteindre la sécurité. Un seul faux pas, et vous pourriez rejoindre les damnés pour l''éternité.', 8, 12, '2024-08-19 09:00:00'),
(5, 'Bloody Escape', 'Essayez de survivre à Bloody Escape, un parcours intense de survie où vous devez naviguer dans une série de chambres effrayantes et étroites, chacune plus terrifiante que la précédente. Les murs sont tachés de sang et des zombies assoiffés de chair fraîche vous traquent sans relâche. Pouvez-vous trouver la sortie avant qu''ils ne vous rattrapent ?', 8, 6, '2024-08-20 09:00:00'),
(6, 'Zombie Apocalypse', 'Bienvenue dans Zombie Apocalypse, un champ de bataille post-apocalyptique où vous devez affronter des hordes de zombies. Munissez-vous d''armes et de stratégies pour combattre ces morts-vivants en quête de chair humaine. Seuls les plus courageux et les plus astucieux survivront à cette apocalypse terrifiante. Saurez-vous relever le défi et sortir victorieux ?', 16, 4, '2024-08-21 09:00:00'),
(7, 'Infected Lab', 'Pénétrez dans l''Infected Lab, un laboratoire clandestin où une épidémie zombie a éclaté. Le virus s''est propagé, infectant tous les scientifiques et transformant l''endroit en un enfer vivant. Trouvez le remède avant que le temps ne s''écoule et que vous ne succombiez à la contamination. Attention, les zombies ne sont pas votre seule menace ici...', 10, 6, '2024-08-22 09:00:00'),
(8, 'Endless Nightmare', 'Préparez-vous à affronter l''Endless Nightmare, une aventure cauchemardesque sans fin. Piégé dans une boucle temporelle, vous revivez les mêmes horreurs encore et encore. Chaque tentative pour échapper à ce cycle infernal devient de plus en plus terrifiante. Pouvez-vous trouver la clé pour vous libérer ou êtes-vous condamné à revivre ce cauchemar pour toujours ?', 14, 8, '2024-08-23 09:00:00');

INSERT INTO "category" ("category_id", "name") VALUES
(0, 'Infernal Thrills'),
(1, 'Nightmare Terror'),
(2, 'Deadly Trials'),
(3, 'Extreme Survival');

TRUNCATE TABLE "activity_category" RESTART IDENTITY;
INSERT INTO "activity_category" ("activity_id", "category_id") VALUES
(0, 0),
(1, 3),
(2, 2),
(3, 0),
(4, 1),
(5, 1),
(6, 3),
(7, 2),
(8, 0);

SELECT setval('user_id_seq', (SELECT MAX("user_id") FROM "user"));
SELECT setval('booking_id_seq', (SELECT MAX("booking_id") FROM "booking"));
SELECT setval('activity_id_seq', (SELECT MAX("activity_id") FROM "activity"));
SELECT setval('category_id_seq', (SELECT MAX("category_id") FROM "category"));

COMMIT;