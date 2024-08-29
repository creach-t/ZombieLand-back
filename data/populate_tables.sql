BEGIN;

INSERT INTO "user" ("user_id", "first_name", "last_name", "email", "password", "created_at") VALUES

(1, 'Alice', 'Martin', 'alice.martin@example.com', 'password123', '2024-08-15 10:20:30'),
(2, 'Bob', 'Dupont', 'bob.dupont@example.com', 'securepass456', '2024-08-16 14:50:12'),
(3, 'Charlotte', 'Dubois', 'charlotte.dubois@example.com', 'zombie789', '2024-08-17 09:35:50'),
(4, 'David', 'Leroy', 'david.leroy@example.com', 'undead321', '2024-08-18 12:25:30'),
(5, 'Elise', 'Moreau', 'elise.moreau@example.com', 'brains654', '2024-08-19 11:15:20'),
(6, 'François', 'Petit', 'francois.petit@example.com', 'walkingdead987', '2024-08-20 15:45:10'),
(7, 'Gabrielle', 'Roux', 'gabrielle.roux@example.com', 'escape1234', '2024-08-21 08:05:00'),
(8, 'Hugo', 'Schmitt', 'hugo.schmitt@example.com', 'scream567', '2024-08-22 17:30:45'),
(9, 'Inès', 'Bernard', 'ines.bernard@example.com', 'darknight678', '2024-08-23 13:15:25'),
(10, 'Julien', 'Dubois', 'julien.dubois@example.com', 'survivor890', '2024-08-24 09:45:15');

INSERT INTO "booking" ("booking_id", "date", "status", "nb_tickets", "user_id") VALUES

(1, '2024-09-01', 'confirmed', 3, 1),
(2, '2024-09-02', 'canceled', 4, 2),
(3, '2024-09-03', 'pending', 2, 3),
(4, '2024-09-04', 'confirmed', 5, 4),
(5, '2024-09-05', 'confirmed', 1, 5),
(6, '2024-09-06', 'confirmed', 3, 6),
(7, '2024-09-07', 'pending', 2, 7),
(8, '2024-09-08', 'canceled', 4, 8),
(9, '2024-09-09', 'confirmed', 2, 9),
(10, '2024-09-10', 'confirmed', 5, 10),
(11, '2024-09-11', 'pending', 1, 3),
(12, '2024-09-12', 'canceled', 3, 1),
(13, '2024-09-13', 'confirmed', 4, 5),
(14, '2024-09-14', 'confirmed', 2, 6),
(15, '2024-09-15', 'confirmed', 3, 7);

INSERT INTO "activity" ("activity_id", "name", "description", "minimal_age", "capacity") VALUES

(0, 'Haunted House', 'Plongez dans l''horreur surnaturelle de la Haunted House, où des esprits vengeurs et des zombies enragés hantent chaque pièce. Explorez les couloirs sombres et les salles abandonnées, mais méfiez-vous des surprises qui vous guettent. Pouvez-vous échapper aux griffes des morts-vivants ou serez-vous piégé dans ce manoir maudit à jamais ?', 10, 6);
(1, 'Zombie City', 'Bienvenue à Zombie City, l''ultime épreuve de survie urbaine. La ville est en ruines, envahie par des hordes de zombies affamés. Votre mission : échapper à ce cauchemar en trouvant des indices, en décryptant des énigmes, et en évitant les pièges mortels qui se cachent à chaque coin de rue.
Dans ce labyrinthe de bâtiments abandonnés, d’égouts obscurs, et de ruelles sinistres, le temps est votre pire ennemi. Vous avez 60 minutes pour trouver la sortie… ou devenir une proie de plus pour les morts-vivants.', 12, 16),
(2, 'Escape Room', 'Vous êtes enfermé dans un laboratoire abandonné où des expériences horribles ont été menées sur des sujets humains. Avec seulement 60 minutes pour vous échapper, trouvez des indices et résolvez des énigmes pour éviter de devenir la prochaine victime des créatures qui rôdent dans l''ombre. Vivez une aventure immersive pleine de suspense et de frissons.', 12, 4),
(3, 'Zombie Forest', 'Entrez dans la Zombie Forest, un bois dense et brumeux infesté de zombies affamés. Suivez le chemin sinueux, mais faites attention à chaque pas. Les arbres semblent prendre vie, et les zombies surgissent de l''obscurité. Saurez-vous traverser cette forêt maudite indemne ou serez-vous pris au piège dans ce cauchemar sylvestre ?', 14, 6),
(4, 'Damned Path', 'Affrontez le Damned Path, un parcours sinistre semé d''embûches et de pièges mortels. Ce chemin maudit est rempli de zombies et d''autres créatures terrifiantes prêtes à vous attraper à chaque coin de rue. Courez, sautez et rampez pour échapper à leurs griffes et atteindre la sécurité. Un seul faux pas, et vous pourriez rejoindre les damnés pour l''éternité.', 8, 12),
(5, 'Bloody Escape', 'Essayez de survivre à Bloody Escape, un parcours intense de survie où vous devez naviguer dans une série de chambres effrayantes et étroites, chacune plus terrifiante que la précédente. Les murs sont tachés de sang et des zombies assoiffés de chair fraîche vous traquent sans relâche. Pouvez-vous trouver la sortie avant qu''ils ne vous rattrapent ?', 8, 6),
(6, 'Zombie Apocalypse', 'Bienvenue dans Zombie Apocalypse, un champ de bataille post-apocalyptique où vous devez affronter des hordes de zombies. Munissez-vous d''armes et de stratégies pour combattre ces morts-vivants en quête de chair humaine. Seuls les plus courageux et les plus astucieux survivront à cette apocalypse terrifiante. Saurez-vous relever le défi et sortir victorieux ?', 16, 4),
(7, 'Infected Lab', 'Pénétrez dans l''Infected Lab, un laboratoire clandestin où une épidémie zombie a éclaté. Le virus s''est propagé, infectant tous les scientifiques et transformant l''endroit en un véritable enfer sur terre. Explorez les salles de recherches, évitez les expériences échappées et trouvez un remède avant qu''il ne soit trop tard. Mais attention, chaque recoin du laboratoire est rempli de dangers !', 14, 4),
(8, 'Dead Zone', 'Plongez dans la Dead Zone, un territoire désolé où les zombies errent librement à la recherche de proies. Dans ce paysage apocalyptique, vous devrez utiliser votre ingéniosité et votre courage pour naviguer à travers les ruines et échapper aux zombies qui infestent la zone. Trouvez des abris, cherchez des provisions, et surtout, ne laissez pas les morts-vivants vous attraper !', 10, 16),
(9, 'Pandemic Panic', 'La pandémie zombie a plongé le monde dans le chaos, et c''est à vous de trouver un moyen de survivre. Dans Pandemic Panic, vous devrez naviguer à travers une ville dévastée par le virus zombie, en évitant les foules de zombies et en cherchant des ressources vitales. Pouvez-vous trouver un refuge sûr avant que la panique ne s''empare de vous ?', 14, 8),
(10, 'Terror''s Tower', 'Montez dans la Terror''s Tower, une tour vertigineuse où chaque étage réserve une nouvelle horreur. Des zombies déchaînés et d''autres créatures terrifiantes attendent de vous attraper à chaque tournant. Évitez les pièges et trouvez votre chemin à travers cette tour cauchemardesque pour atteindre la sortie au sommet. Aurez-vous le courage de gravir chaque étage, ou tomberez-vous dans l''abîme de la terreur ?', 8, 48),
(11, 'Horror Carnival', 'Entrez dans le Horror Carnival, un carnaval sinistre où les clowns zombies et les manèges hantés vous attendent. Des attractions délirantes et terrifiantes, des jeux macabres et des zombies assoiffés de sang sont au rendez-vous. Saurez-vous survivre à cette fête cauchemardesque et trouver la sortie avant que le carnaval ne ferme ses portes pour toujours ?', 8, 32),

INSERT INTO "category" ("category_id", "name") VALUES

(0, 'Infernal Thrills')
(1, 'Nightmare Terror')
(2, 'Deadly Trials')
(3, 'Extreme Survival')

INSERT INTO "activity_has_category" ("activity_id", "category_id") VALUES

(0, 0)
(1, 2)
(2, 1)
(3, 3)
(4, 0)
(5, 3)
(6, 3)
(7, 2)
(8, 3)
(9, 1)
(10, 0)
(11, 1)

COMMIT;