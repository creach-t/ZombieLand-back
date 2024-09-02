import sequelize from '../database/dbClientSequelize.js';
import { Activity, Booking, User, Category } from '../models/index.js';

async function seedDatabase() {
    try {
        const users = await User.bulkCreate([
            { user_id: 1, first_name: 'Alice', last_name: 'Martin', email: 'alice.martin@example.com', password: 'password123', role: 'user', created_at: '2024-08-15 10:20:30' },
            { user_id: 2, first_name: 'Bob', last_name: 'Dupont', email: 'bob.dupont@example.com', password: 'securepass456', role: 'user', created_at: '2024-08-16 14:50:12' },
            { user_id: 3, first_name: 'Charlotte', last_name: 'Dubois', email: 'charlotte.dubois@example.com', password: 'zombie789', role: 'user', created_at: '2024-08-17 09:35:50' },
            { user_id: 4, first_name: 'David', last_name: 'Leroy', email: 'david.leroy@example.com', password: 'undead321', role: 'user', created_at: '2024-08-18 12:25:30' },
            { user_id: 5, first_name: 'Elise', last_name: 'Moreau', email: 'elise.moreau@example.com', password: 'brains654', role: 'user', created_at: '2024-08-19 11:15:20' },
            { user_id: 6, first_name: 'François', last_name: 'Petit', email: 'francois.petit@example.com', password: 'walkingdead987', role: 'user', created_at: '2024-08-20 15:45:10' },
            { user_id: 7, first_name: 'Gabrielle', last_name: 'Roux', email: 'gabrielle.roux@example.com', password: 'escape1234', role: 'user', created_at: '2024-08-21 08:05:00' },
            { user_id: 8, first_name: 'Hugo', last_name: 'Schmitt', email: 'hugo.schmitt@example.com', password: 'scream567', role: 'user', created_at: '2024-08-22 17:30:45' },
            { user_id: 9, first_name: 'Inès', last_name: 'Bernard', email: 'ines.bernard@example.com', password: 'darknight678', role: 'user', created_at: '2024-08-23 13:15:25' },
            { user_id: 10, first_name: 'Julien', last_name: 'Dubois', email: 'julien.dubois@example.com', password: 'survivor890', role: 'user', created_at: '2024-08-24 09:45:15' }
        ]);
        
        const bookings = await Booking.bulkCreate([
            { booking_id: 1, date: '2024-09-01', status: 'confirmed', nb_tickets: 3, client_id: 1 },
            { booking_id: 2, date: '2024-09-02', status: 'canceled', nb_tickets: 4, client_id: 2 },
            { booking_id: 3, date: '2024-09-03', status: 'pending', nb_tickets: 2, client_id: 3 },
            { booking_id: 4, date: '2024-09-04', status: 'confirmed', nb_tickets: 5, client_id: 4 },
            { booking_id: 5, date: '2024-09-05', status: 'confirmed', nb_tickets: 1, client_id: 5 },
            { booking_id: 6, date: '2024-09-06', status: 'confirmed', nb_tickets: 3, client_id: 6 },
            { booking_id: 7, date: '2024-09-07', status: 'pending', nb_tickets: 2, client_id: 7 },
            { booking_id: 8, date: '2024-09-08', status: 'canceled', nb_tickets: 4, client_id: 8 },
            { booking_id: 9, date: '2024-09-09', status: 'confirmed', nb_tickets: 2, client_id: 9 },
            { booking_id: 10, date: '2024-09-10', status: 'confirmed', nb_tickets: 5, client_id: 10 },
            { booking_id: 11, date: '2024-09-11', status: 'pending', nb_tickets: 1, client_id: 3 },
            { booking_id: 12, date: '2024-09-12', status: 'canceled', nb_tickets: 3, client_id: 1 },
            { booking_id: 13, date: '2024-09-13', status: 'confirmed', nb_tickets: 4, client_id: 5 },
            { booking_id: 14, date: '2024-09-14', status: 'confirmed', nb_tickets: 2, client_id: 6 },
            { booking_id: 15, date: '2024-09-15', status: 'confirmed', nb_tickets: 3, client_id: 7 }
        ]);
        
        const activities = await Activity.bulkCreate([
            { activity_id: 0, name: 'Haunted House', description: 'Plongez dans l\'horreur surnaturelle de la Haunted House, où des esprits vengeurs et des zombies enragés hantent chaque pièce. Explorez les couloirs sombres et les salles abandonnées, mais méfiez-vous des surprises qui vous guettent. Pouvez-vous échapper aux griffes des morts-vivants ou serez-vous piégé dans ce manoir maudit à jamais ?', minimal_age: 10, capacity: 6 },
            { activity_id: 1, name: 'Zombie City', description: 'Bienvenue à Zombie City, l\'ultime épreuve de survie urbaine. La ville est en ruines, envahie par des hordes de zombies affamés. Votre mission : échapper à ce cauchemar en trouvant des indices, en décryptant des énigmes, et en évitant les pièges mortels qui se cachent à chaque coin de rue. Dans ce labyrinthe de bâtiments abandonnés, d’égouts obscurs, et de ruelles sinistres, le temps est votre pire ennemi. Vous avez 60 minutes pour trouver la sortie… ou devenir une proie de plus pour les morts-vivants.', minimal_age: 12, capacity: 16 },
            { activity_id: 2, name: 'Escape Room', description: 'Vous êtes enfermé dans un laboratoire abandonné où des expériences horribles ont été menées sur des sujets humains. Avec seulement 60 minutes pour vous échapper, trouvez des indices et résolvez des énigmes pour éviter de devenir la prochaine victime des créatures qui rôdent dans l\'ombre. Vivez une aventure immersive pleine de suspense et de frissons.', minimal_age: 12, capacity: 4 },
            { activity_id: 3, name: 'Zombie Forest', description: 'Entrez dans la Zombie Forest, un bois dense et brumeux infesté de zombies affamés. Suivez le chemin sinueux, mais faites attention à chaque pas. Les arbres semblent prendre vie, et les zombies surgissent de l\'obscurité. Saurez-vous traverser cette forêt maudite indemne ou serez-vous pris au piège dans ce cauchemar sylvestre ?', minimal_age: 14, capacity: 6 },
            { activity_id: 4, name: 'Damned Path', description: 'Affrontez le Damned Path, un parcours sinistre semé d\'embûches et de pièges mortels. Ce chemin maudit est rempli de zombies et d\'autres créatures terrifiantes prêtes à vous attraper à chaque coin de rue. Courez, sautez et rampez pour échapper à leurs griffes et atteindre la sécurité. Un seul faux pas, et vous pourriez rejoindre les damnés pour l\'éternité.', minimal_age: 8, capacity: 12 },
            { activity_id: 5, name: 'Bloody Escape', description: 'Essayez de survivre à Bloody Escape, un parcours intense de survie où vous devez naviguer dans une série de chambres effrayantes et étroites, chacune plus terrifiante que la précédente. Les murs sont tachés de sang et des zombies assoiffés de chair fraîche vous traquent sans relâche. Pouvez-vous trouver la sortie avant qu\'ils ne vous rattrapent ?', minimal_age: 8, capacity: 6 },
            { activity_id: 6, name: 'Zombie Apocalypse', description: 'Bienvenue dans Zombie Apocalypse, un champ de bataille post-apocalyptique où vous devez affronter des hordes de zombies. Munissez-vous d\'armes et de stratégies pour combattre ces morts-vivants en quête de chair humaine. Seuls les plus courageux et les plus astucieux survivront à cette apocalypse terrifiante. Saurez-vous relever le défi et sortir victorieux ?', minimal_age: 16, capacity: 4 },
            { activity_id: 7, name: 'Infected Lab', description: 'Pénétrez dans l\'Infected Lab, un laboratoire clandestin où une épidémie zombie a éclaté. Le virus s\'est propagé, infectant tous les scientifiques et transformant l\'endroit en un véritable enfer sur terre. Explorez les salles de recherches, évitez les expériences échappées et trouvez un remède avant qu\'il ne soit trop tard. Mais attention, chaque recoin du laboratoire est rempli de dangers !', minimal_age: 14, capacity: 4 },
            { activity_id: 8, name: 'Dead Zone', description: 'Plongez dans la Dead Zone, un territoire désolé où les zombies errent librement à la recherche de proies. Dans ce paysage apocalyptique, vous devrez utiliser votre ingéniosité et votre courage pour naviguer à travers les ruines et échapper aux zombies qui infestent la zone. Trouvez des abris, cherchez des provisions, et surtout, ne laissez pas les morts-vivants vous attraper !', minimal_age: 10, capacity: 16 },
            { activity_id: 9, name: 'Pandemic Panic', description: 'La pandémie zombie a plongé le monde dans le chaos, et c\'est à vous de trouver un moyen de survivre. Dans Pandemic Panic, vous devrez naviguer à travers une ville dévastée par le virus zombie, en évitant les foules de zombies et en cherchant des ressources vitales. Pouvez-vous trouver un refuge sûr avant que la panique ne s\'empare de vous ?', minimal_age: 14, capacity: 8 },
            { activity_id: 10, name: 'Terror\'s Tower', description: 'Montez dans la Terror\'s Tower, une tour vertigineuse où chaque étage réserve une nouvelle horreur. Des zombies déchaînés et d\'autres créatures terrifiantes attendent de vous attraper à chaque tournant. Évitez les pièges et trouvez votre chemin à travers cette tour cauchemardesque pour atteindre la sortie au sommet. Aurez-vous le courage de gravir chaque étage, ou tomberez-vous dans l\'abîme de la terreur ?', minimal_age: 8, capacity: 48 },
            { activity_id: 11, name: 'Horror Carnival', description: 'Entrez dans le Horror Carnival, un carnaval sinistre où les clowns zombies et les manèges hantés vous attendent. Des attractions délirantes et terrifiantes, des jeux macabres et des zombies assoiffés de sang sont au rendez-vous. Saurez-vous survivre à cette fête cauchemardesque et trouver la sortie avant que le carnaval ne ferme ses portes pour toujours ?', minimal_age: 8, capacity: 32 }
        ]);
        
        const categories = await Category.bulkCreate([
            { category_id: 0, name: 'Infernal Thrills' },
            { category_id: 1, name: 'Nightmare Terror' },
            { category_id: 2, name: 'Deadly Trials' },
            { category_id: 3, name: 'Extreme Survival' }
        ]);

    } catch (error) {
        console.error(`Une erreur est survenue pendant la création des données`, error);
    } finally {
        await sequelize.close();
    };
};

seedDatabase();