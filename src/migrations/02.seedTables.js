import sequelize from '../database/dbClientSequelize.js';
import Scrypt from '../utils/scrypt.js';
import {
  Activity,
  Booking,
  User,
  Category,
  Price,
  Review,
  Message,
} from '../models/index.js';

function createHashedPassword(password) {
  return Scrypt.hash(password);
}

async function seedDatabase() {
  try {
    const hashedPassword = await createHashedPassword('Password123');
    const hashedPassword2 = await createHashedPassword('Coucou1');

    const users = await User.bulkCreate([
      {
        first_name: 'Alice',
        last_name: 'Martin',
        email: 'alice.martin@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-15 10:20:30',
      },
      {
        first_name: 'Bob',
        last_name: 'Dupont',
        email: 'bob.dupont@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-16 14:50:12',
      },
      {
        first_name: 'Charlotte',
        last_name: 'Dubois',
        email: 'charlotte.dubois@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-17 09:35:50',
      },
      {
        first_name: 'David',
        last_name: 'Leroy',
        email: 'david.leroy@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-18 12:25:30',
      },
      {
        first_name: 'Elise',
        last_name: 'Moreau',
        email: 'elise.moreau@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-19 11:15:20',
      },
      {
        first_name: 'François',
        last_name: 'Petit',
        email: 'francois.petit@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-20 15:45:10',
      },
      {
        first_name: 'Gabrielle',
        last_name: 'Roux',
        email: 'gabrielle.roux@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-21 08:05:00',
      },
      {
        first_name: 'Hugo',
        last_name: 'Schmitt',
        email: 'hugo.schmitt@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-22 17:30:45',
      },
      {
        first_name: 'Inès',
        last_name: 'Bernard',
        email: 'ines.bernard@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-23 13:15:25',
      },
      {
        first_name: 'Julien',
        last_name: 'Dubois',
        email: 'julien.dubois@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-08-24 09:45:15',
      },
      {
        first_name: 'Admin',
        last_name: 'Parc',
        email: 'admin@zombieland.fr',
        password:
          'c15df46f39e02b6590fd25ff798d9508cc7b5c0e40b191e969f805cdd111725bb5d93c9ab194e0beaa5a5b3571d0f4edb00a210ee81dccb6e9fe448c8825769f.2f31dbbd1b7f63653d9a077b377672ef',
        role: 'admin',
        created_at: '2024-08-24 09:45:15',
      },
      {
        first_name: 'Sébastien',
        last_name: 'MESA',
        email: 'coucou@test.com',
        password: hashedPassword2,
        role: 'user',
        created_at: '2024-09-10 09:45:15',
      },
    ]);

    const bookings = await Booking.bulkCreate([
      {
        date: '2024-09-01',
        status: 'confirmed',
        nb_tickets: 3,
        client_id: 1,
      },
      {
        date: '2024-09-02',
        status: 'canceled',
        nb_tickets: 4,
        client_id: 2,
      },
      {
        date: '2024-09-03',
        status: 'pending',
        nb_tickets: 2,
        client_id: 3,
      },
      {
        date: '2024-09-04',
        status: 'confirmed',
        nb_tickets: 5,
        client_id: 4,
      },
      {
        date: '2024-09-05',
        status: 'confirmed',
        nb_tickets: 1,
        client_id: 5,
      },
      {
        date: '2024-09-06',
        status: 'confirmed',
        nb_tickets: 3,
        client_id: 6,
      },
      {
        date: '2024-09-07',
        status: 'pending',
        nb_tickets: 2,
        client_id: 7,
      },
      {
        date: '2024-09-08',
        status: 'canceled',
        nb_tickets: 4,
        client_id: 8,
      },
      {
        date: '2024-09-09',
        status: 'confirmed',
        nb_tickets: 2,
        client_id: 9,
      },
      {
        date: '2024-09-10',
        status: 'confirmed',
        nb_tickets: 5,
        client_id: 10,
      },
      {
        date: '2024-09-11',
        status: 'pending',
        nb_tickets: 1,
        client_id: 3,
      },
      {
        date: '2024-09-12',
        status: 'canceled',
        nb_tickets: 3,
        client_id: 1,
      },
      {
        date: '2024-09-13',
        status: 'confirmed',
        nb_tickets: 4,
        client_id: 5,
      },
      {
        date: '2024-09-14',
        status: 'confirmed',
        nb_tickets: 2,
        client_id: 6,
      },
      {
        date: '2024-09-15',
        status: 'confirmed',
        nb_tickets: 3,
        client_id: 7,
      },
    ]);

    const activities = await Activity.bulkCreate([
      {
        name: 'Escape Room',
        description:
          "Plongez dans l'antre des zombies où chaque minute compte. Trouvez des indices et résolvez des énigmes pour vous échapper avant que les zombies ne se réveillent. Une aventure immersive remplie de suspense et de frissons vous attend, mettant à l'épreuve votre esprit et votre courage. Oserez-vous tenter l'expérience ?",
        description_short: 'Échappez-vous avant le réveil des zombies !',
        minimal_age: 13,
        capacity: 8,
        x: 30,
        y: 40,
        slug: 'escape-room',
      },
      {
        name: 'Haunted House',
        description:
          "Entrez dans la maison hantée la plus terrifiante que vous n'ayez jamais visitée. Chaque pièce réserve une surprise, chaque couloir cache une menace. Des spectres aux rires maléfiques aux esprits errants, affrontez vos plus grandes peurs dans un labyrinthe d'horreur. Survivrez-vous à cette aventure glaçante ?",
        description_short: 'Explorez la maison hantée la plus terrifiante !',
        minimal_age: 16,
        capacity: 15,
        x: 82,
        y: 38,
        slug: 'haunted-house',
      },
      {
        name: 'Bloody Escape',
        description:
          "Vous avez été piégé dans une maison où le sang coule à flots. Avec le temps qui s'égrène rapidement, trouvez la sortie avant que le cauchemar ne vous engloutisse. Relevez le défi dans une course contre la montre pleine de surprises terrifiantes et d'énigmes sanglantes à résoudre. Ferez-vous partie des rares à survivre ?",
        description_short:
          "Échappez-vous d'une maison remplie de terreur sanglante !",
        minimal_age: 14,
        capacity: 10,
        x: 82,
        y: 23,
        slug: 'bloody-escape',
      },
      {
        name: 'Horror Carnival',
        description:
          "Entrez dans le Carnaval de l'Horreur, un parc d'attractions où le rire se transforme en cri. Chaque manège vous plonge dans des frayeurs inimaginables, des clowns maléfiques aux illusions terrifiantes. Survivrez-vous aux attractions ou serez-vous la prochaine victime de ce carnaval diabolique ?",
        description_short: "Affrontez vos peurs au Carnaval de l'Horreur !",
        minimal_age: 15,
        capacity: 12,
        x: 65,
        y: 29,
        slug: 'horror-carnival',
      },
      {
        name: 'Zombie City',
        description:
          "Zombie City vous plonge dans une épreuve ultime de survie en pleine ville envahie par des hordes de zombies affamés. Trouvez des indices, déjouez les pièges et échappez-vous des ruelles sombres et des égouts avant qu'il ne soit trop tard. Une heure pour sauver votre vie ou devenir une proie de plus pour les morts-vivants.",
        description_short:
          'Survivez à une ville envahie par des zombies affamés !',
        minimal_age: 18,
        capacity: 60,
        x: 36,
        y: 90,
        slug: 'zombie-city',
      },
      {
        name: 'Damned Path',
        description:
          "Le Chemin Maudit vous entraîne dans une aventure à travers une forêt sombre et inquiétante, où chaque pas peut être le dernier. Des créatures cauchemardesques rôdent dans l'ombre, prêtes à attaquer. Trouvez votre chemin ou devenez une légende terrifiante de plus de ce sentier maudit.",
        description_short: "Affrontez les dangers d'un sentier maudit !",
        minimal_age: 17,
        capacity: 20,
        x: 27,
        y: 63,
        slug: 'damned-path',
      },
      {
        name: 'Zombie Apocalypse',
        description:
          "Préparez-vous pour l'Apocalypse Zombie ! Vous devez naviguer à travers des terrains infestés de zombies tout en cherchant des provisions et des armes pour survivre. Une expérience de survie intense qui mettra vos nerfs à rude épreuve. Serez-vous prêt à tout pour rester en vie ?",
        description_short: "Survivez à l'Apocalypse Zombie !",
        minimal_age: 16,
        capacity: 30,
        x: 30,
        y: 20,
        slug: 'zombie-apocalypse',
      },
      {
        name: 'Infected Lab',
        description:
          "Bienvenue dans le laboratoire infecté, un lieu sinistre où des expériences scientifiques ont mal tourné. Explorez les couloirs sombres et les salles abandonnées, mais faites attention : des créatures mutantes et des pièges mortels vous attendent à chaque coin. Trouvez l'antidote avant qu'il ne soit trop tard.",
        description_short: 'Évitez les pièges dans le laboratoire infecté !',
        minimal_age: 15,
        capacity: 25,
        x: 19,
        y: 85,
        slug: 'infected-lab',
      },
      {
        name: 'Zombie Forest',
        description:
          'Dans la Forêt des Zombies, les arbres ne sont pas les seuls à surveiller. Des morts-vivants se cachent derrière chaque tronc et attendent leur prochaine victime. Avec seulement une lampe torche, traversez cette forêt sombre et menaçante. Trouverez-vous la sortie ou finirez-vous comme eux ?',
        description_short: 'Traversez une forêt sombre infestée de zombies !',
        minimal_age: 16,
        capacity: 35,
        x: 50,
        y: 20,
        slug: 'zombie-forest',
      },
      {
        name: 'Pandemic Panic',
        description:
          "Encore une épreuve d'évasion, mais cette fois, les zombies sont plus proches que jamais. Vous avez un temps limité pour découvrir les indices, déchiffrer les codes et ouvrir les portes avant que les zombies n'envahissent la pièce. Chaque seconde compte dans cette course contre la montre.",
        description_short: "Échappez-vous avant que les zombies n'entrent !",
        minimal_age: 14,
        capacity: 45,
        x: 72,
        y: 75,
        slug: 'pandemic-panic',
      },
      {
        name: 'Dead Zone',
        description:
          "Entrez dans la Dead Zone, une zone interdite où la mort et le danger sont omniprésents. Le terrain est jonché de pièges mortels, et les créatures qui rôdent sont toujours à l'affût. Trouvez votre chemin à travers cette terre désolée sans devenir une nouvelle victime. Seuls les plus braves survivront.",
        description_short: 'Survivez dans la zone interdite de la Dead Zone.',
        minimal_age: 18,
        capacity: 40,
        x: 60,
        y: 60,
        slug: 'dead-zone',
      },
      {
        name: "Terror's Tower",
        description:
          "Montez la Tour de la Terreur, où chaque étage présente de nouveaux défis et des frayeurs encore plus grandes. Du sous-sol sombre aux hauteurs vertigineuses, chaque niveau vous confronte à vos pires cauchemars. Arriverez-vous au sommet ou succomberez-vous à la peur avant d'atteindre la fin ?",
        description_short:
          'Grimpez la Tour de la Terreur et défiez vos peurs !',
        minimal_age: 17,
        capacity: 50,
        x: 50,
        y: 50,
        slug: 'terrors-tower',
      },
    ]);

    const categories = await Category.bulkCreate([
      { name: 'Infernal Thrills' },
      { name: 'Nightmare Terror' },
      { name: 'Deadly Trials' },
      { name: 'Extreme Survival' },
    ]);

    const prices = await Price.bulkCreate([{ price: 66.66, is_active: true }]);

    // Add associations using direct IDs or helper methods
    // For example, you can use setCategories on each activity
    await activities[0].setCategories([1]);
    await activities[1].setCategories([4]);
    await activities[2].setCategories([3]);
    await activities[3].setCategories([1]);
    await activities[4].setCategories([2]);
    await activities[5].setCategories([2]);
    await activities[6].setCategories([4]);
    await activities[7].setCategories([3]);
    await activities[8].setCategories([1]);
    await activities[9].setCategories([2]);
    await activities[10].setCategories([1]);
    await activities[11].setCategories([2]);

    // Création des reviews (avis) pour toutes les activités
    const reviews = await Review.bulkCreate([
      // Reviews pour 'Escape Room'
      {
        content: 'Incroyablement stressant, mais amusant !',
        rating: 5,
        client_id: 1, // Alice
        activity_id: 1, // Escape Room
        status: 'approved',
      },
      {
        content: "Très immersif, on se sent vraiment dans l'action.",
        rating: 4,
        client_id: 2, // Bob
        activity_id: 1, // Escape Room
        status: 'approved',
      },
      {
        content: 'Pas assez de frissons pour moi.',
        rating: 3,
        client_id: 3, // Charlotte
        activity_id: 1, // Escape Room
        status: 'pending',
      },

      // Reviews pour 'Haunted House'
      {
        content: 'Vraiment terrifiant !',
        rating: 5,
        client_id: 4, // David
        activity_id: 2, // Haunted House
        status: 'approved',
      },
      {
        content: 'Les acteurs étaient incroyables !',
        rating: 4,
        client_id: 5, // Elise
        activity_id: 2, // Haunted House
        status: 'approved',
      },
      {
        content: 'Trop court à mon goût.',
        rating: 3,
        client_id: 6, // François
        activity_id: 2, // Haunted House
        status: 'pending',
      },

      // Reviews pour 'Bloody Escape'
      {
        content: "Sanglant et effrayant, tout ce que j'aime !",
        rating: 5,
        client_id: 7, // Gabrielle
        activity_id: 3, // Bloody Escape
        status: 'approved',
      },
      {
        content: 'Beaucoup de détails, très immersif.',
        rating: 4,
        client_id: 8, // Hugo
        activity_id: 3, // Bloody Escape
        status: 'approved',
      },
      {
        content: "Trop de bruit, ça gâche l'ambiance.",
        rating: 3,
        client_id: 9, // Inès
        activity_id: 3, // Bloody Escape
        status: 'pending',
      },

      // Reviews pour 'Horror Carnival'
      {
        content: 'Le meilleur carnaval de ma vie !',
        rating: 5,
        client_id: 10, // Julien
        activity_id: 4, // Horror Carnival
        status: 'approved',
      },
      {
        content: 'Les clowns étaient vraiment effrayants.',
        rating: 4,
        client_id: 1, // Alice
        activity_id: 4, // Horror Carnival
        status: 'approved',
      },
      {
        content: "Pas aussi effrayant que je l'espérais.",
        rating: 3,
        client_id: 2, // Bob
        activity_id: 4, // Horror Carnival
        status: 'pending',
      },

      // Reviews pour 'Zombie City'
      {
        content: 'Une expérience de survie intense !',
        rating: 5,
        client_id: 3, // Charlotte
        activity_id: 5, // Zombie City
        status: 'approved',
      },
      {
        content: "J'ai vraiment ressenti la pression.",
        rating: 4,
        client_id: 4, // David
        activity_id: 5, // Zombie City
        status: 'approved',
      },
      {
        content: 'Trop intense pour moi.',
        rating: 3,
        client_id: 5, // Elise
        activity_id: 5, // Zombie City
        status: 'pending',
      },

      // Reviews pour 'Damned Path'
      {
        content: 'Un parcours effrayant dans les bois.',
        rating: 5,
        client_id: 6, // François
        activity_id: 6, // Damned Path
        status: 'approved',
      },
      {
        content: 'On se sent vraiment perdu.',
        rating: 4,
        client_id: 7, // Gabrielle
        activity_id: 6, // Damned Path
        status: 'approved',
      },
      {
        content: 'Un peu long, mais ça vaut le coup.',
        rating: 3,
        client_id: 8, // Hugo
        activity_id: 6, // Damned Path
        status: 'pending',
      },

      // Reviews pour 'Zombie Apocalypse'
      {
        content: "L'apocalypse en temps réel, c'était génial !",
        rating: 5,
        client_id: 9, // Inès
        activity_id: 7, // Zombie Apocalypse
        status: 'pending',
      },
      {
        content: 'Très réaliste, on y croit vraiment.',
        rating: 4,
        client_id: 10, // Julien
        activity_id: 7, // Zombie Apocalypse
        status: 'approved',
      },
      {
        content: 'Les zombies étaient trop lents.',
        rating: 3,
        client_id: 1, // Alice
        activity_id: 7, // Zombie Apocalypse
        status: 'approved',
      },

      // Reviews pour 'Infected Lab'
      {
        content: "Les mutants m'ont donné des cauchemars.",
        rating: 5,
        client_id: 2, // Bob
        activity_id: 8, // Infected Lab
        status: 'approved',
      },
      {
        content: "L'ambiance est vraiment stressante.",
        rating: 4,
        client_id: 3, // Charlotte
        activity_id: 8, // Infected Lab
        status: 'pending',
      },
      {
        content: 'Les pièges étaient trop faciles.',
        rating: 3,
        client_id: 4, // David
        activity_id: 8, // Infected Lab
        status: 'pending',
      },

      // Reviews pour 'Zombie Forest'
      {
        content: 'Une forêt pleine de zombies, génial !',
        rating: 5,
        client_id: 5, // Elise
        activity_id: 9, // Zombie Forest
        status: 'approved',
      },
      {
        content: 'Un peu trop prévisible.',
        rating: 4,
        client_id: 6, // François
        activity_id: 9, // Zombie Forest
        status: 'pending',
      },
      {
        content: 'Manque de suspense.',
        rating: 3,
        client_id: 7, // Gabrielle
        activity_id: 9, // Zombie Forest
        status: 'approved',
      },

      // Reviews pour 'Pandemic Panic'
      {
        content: 'Une course contre la montre palpitante.',
        rating: 5,
        client_id: 8, // Hugo
        activity_id: 10, // Pandemic Panic
        status: 'approved',
      },
      {
        content: "Très bien fait, mais j'aurais aimé plus de temps.",
        rating: 4,
        client_id: 9, // Inès
        activity_id: 10, // Pandemic Panic
        status: 'pending',
      },
      {
        content: 'Le timer était trop rapide.',
        rating: 3,
        client_id: 10, // Julien
        activity_id: 10, // Pandemic Panic
        status: 'pending',
      },

      // Reviews pour 'Dead Zone'
      {
        content: 'Une zone interdite où tout peut arriver !',
        rating: 5,
        client_id: 1, // Alice
        activity_id: 11, // Dead Zone
        status: 'approved',
      },
      {
        content: 'Des pièges à chaque coin de rue.',
        rating: 4,
        client_id: 2, // Bob
        activity_id: 11, // Dead Zone
        status: 'approved',
      },
      {
        content: 'Un peu trop dangereux à mon goût.',
        rating: 3,
        client_id: 3, // Charlotte
        activity_id: 11, // Dead Zone
        status: 'pending',
      },
    ]);

    const messages = await Message.bulkCreate([
      {
        message: 'Salut, ça va ?',
        sender_id: 12, // Alice
        receiver_id: 11, // Bob
      },
      {
        message: 'Oui, et toi ?',
        sender_id: 11, // Bob
        receiver_id: 12,
      },
      {
        message: 'Ça va bien, merci !',
        sender_id: 12, // Alice
        receiver_id: 11, // Bob
      },
      {
        message: 'Tu as prévu quelque chose ce week-end ?',
        sender_id: 11, // Bob
        receiver_id: 12, // Alice
      },
      {
        message:
          'Je vais à la salle d\'évasion "Bloody Escape". Tu veux venir ?',
        sender_id: 12, // Alice
        receiver_id: 11, // Bob
      },
      {
        message: "Ça a l'air génial, je suis partant !",
        sender_id: 11, // Bob
        receiver_id: 12, // Alice
      },
      {
        message: 'Super, je réserve pour nous deux !',
        sender_id: 12, // Alice
        receiver_id: 11, // Bob
      },
      {
        message: "Merci, j'ai hâte !",
        sender_id: 11, // Bob
        receiver_id: 12, // Alice
      },
    ]);
  } catch (error) {
    console.error(
      `Une erreur est survenue pendant la création des données`,
      error
    );
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
