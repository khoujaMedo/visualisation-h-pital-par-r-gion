const width = 800;
const height = 700;

const svg = d3.select('svg').attr("width", width).attr("height", height);

// Données hospitalières COMPLÈTES
const hospitalData = [
  // Tanger-Tetouan-Al Hoceima
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Mohamed V", categorie: "HP" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "C. d'oncologie d'Al Hoceima", categorie: "CRO" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Imzouren", categorie: "HPr" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Targuist", categorie: "HPr" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Mohamed V", categorie: "HP" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Ksar El Kebir", categorie: "HPr" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Lalla Meriem", categorie: "HP" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Abou Kacem Zahraoui", categorie: "HP" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Assilah", categorie: "HPr" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Mohammed Vi", categorie: "HPr" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Arrazi", categorie: "HPsyR" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Mohamed V", categorie: "HR" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Al Kortobi", categorie: "HR" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Duc De Tovar", categorie: "HR" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Centre d'oncologie", categorie: "HIR" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Hôpital mère enfant Mohamed VI", categorie: "HIR" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Hôpital psychiatrique Mohamed VI", categorie: "CPU" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Hôpital des spécialité Mohamed VI", categorie: "HIR" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Hôpital.Civil", categorie: "HP" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Errazi", categorie: "HPsyP" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Ben Karrich", categorie: "HP" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Hassan II", categorie: "HPr" },
  { region: "Tanger-Tétouan-Al Hoceïma", etablissement: "Mohammed VI", categorie: "HP" },

  // Oriental
  { region: "Oriental", etablissement: "Edderak", categorie: "HP" },
  { region: "Oriental", etablissement: "Saidia", categorie: "HPr" },
  { region: "Oriental", etablissement: "Driouch", categorie: "HP" },
  { region: "Oriental", etablissement: "Hassan II", categorie: "HP" },
  { region: "Oriental", etablissement: "Guercif", categorie: "HP" },
  { region: "Oriental", etablissement: "Jrada", categorie: "HP" },
  { region: "Oriental", etablissement: "Mohammed Vi", categorie: "HPr" },
  { region: "Oriental", etablissement: "Hassani", categorie: "HP" },
  { region: "Oriental", etablissement: "Zaio", categorie: "HPr" },
  { region: "Oriental", etablissement: "Al Farabi", categorie: "HR" },
  { region: "Oriental", etablissement: "Hôpital Psychiatrique", categorie: "CPU" },
  { region: "Oriental", etablissement: "Hôpital des Spécialitéss", categorie: "HIR" },
  { region: "Oriental", etablissement: "Hôpital Mère-Enfant", categorie: "HIR" },
  { region: "Oriental", etablissement: "Centre d'oncoligie Hassan II", categorie: "HIR" },
  { region: "Oriental", etablissement: "HPr Laayoune Sidi Mellouk", categorie: "HPr" },
  { region: "Oriental", etablissement: "Taourirt", categorie: "HP" },

  // Fès-Meknès
  { region: "Fès-Meknès", etablissement: "Sidi Said", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Mohamed V", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Pagnon", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Moulay Ismail", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Centre d'oncologie", categorie: "CRO" },
  { region: "Fès-Meknès", etablissement: "Marche Verte", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "S. Ahmed B. Driss Missouri", categorie: "HPr" },
  { region: "Fès-Meknès", etablissement: "Prince My Hassan", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Al Ghassani", categorie: "HR" },
  { region: "Fès-Meknès", etablissement: "Ibn Al Baitar", categorie: "HR" },
  { region: "Fès-Meknès", etablissement: "Hôpital d'Oncologie", categorie: "HIR" },
  { region: "Fès-Meknès", etablissement: "Hôpital des spécialités", categorie: "HIR" },
  { region: "Fès-Meknès", etablissement: "Hôpital Mère-Enfant", categorie: "HIR" },
  { region: "Fès-Meknès", etablissement: "Omar Drissi", categorie: "HIR" },
  { region: "Fès-Meknès", etablissement: "Ibn Al Khatib", categorie: "HR" },
  { region: "Fès-Meknès", etablissement: "Ibn Al Hassan", categorie: "CPU" },
  { region: "Fès-Meknès", etablissement: "20 Aout (Azrou)", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Mohamed V", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Hassan II", categorie: "HPr" },
  { region: "Fès-Meknès", etablissement: "Taounate", categorie: "HP" },
  { region: "Fès-Meknès", etablissement: "Ibn Baja", categorie: "HP" },

  // Rabat-Salé-Kénitra
  { region: "Rabat-Salé-Kénitra", etablissement: "Al Idrissi", categorie: "HP" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Zoubir Skirej", categorie: "HPr" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Khémisset", categorie: "HP" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Roummani", categorie: "HPr" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Tiflet", categorie: "HPr" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Ibn Sina", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Hôpital Des Spécialités", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Maternité Souissi", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Hôpital D'enfants", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Maternité Orangers", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Med Ben Abdellah", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "My Youssef", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Moulay Youssef (Ancien hôpital de Rabat)", categorie: "HR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "El Ayachi", categorie: "HIR" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Moulay Abdellah (Hôp.préféctoral)", categorie: "HP" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Arrazi", categorie: "CPU" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Jorf Elmelha", categorie: "HPr" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Sidi Kacem", categorie: "HP" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Sidi Slimane", categorie: "HP" },
  { region: "Rabat-Salé-Kénitra", etablissement: "Princesse Lalla Aicha (Ancien Sidi Lahcen)", categorie: "HP" },

  // Béni Mellal-Khénifra
  { region: "Béni Mellal-Khénifra", etablissement: "Haut Atlas Central", categorie: "HP" },
  { region: "Béni Mellal-Khénifra", etablissement: "Demnate", categorie: "HPr" },
  { region: "Béni Mellal-Khénifra", etablissement: "Beni Mellal", categorie: "HR" },
  { region: "Béni Mellal-Khénifra", etablissement: "Moulay Ismail", categorie: "HPr" },
  { region: "Béni Mellal-Khénifra", etablissement: "Beni Mellal", categorie: "CRO" },
  { region: "Béni Mellal-Khénifra", etablissement: "Fquih Ben Salah", categorie: "HP" },
  { region: "Béni Mellal-Khénifra", etablissement: "Souk Sebt", categorie: "HPr" },
  { region: "Béni Mellal-Khénifra", etablissement: "Khenifra", categorie: "HP" },
  { region: "Béni Mellal-Khénifra", etablissement: "M'Rirt", categorie: "HPr" },
  { region: "Béni Mellal-Khénifra", etablissement: "Mohamed VI", categorie: "HPr" },
  { region: "Béni Mellal-Khénifra", etablissement: "Hassan II", categorie: "HP" },
  { region: "Béni Mellal-Khénifra", etablissement: "Oued.Zem", categorie: "HPr" },

  // Casablanca-Settat
  { region: "Casablanca-Settat", etablissement: "Benslimane (Hassan II)", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Berrchid", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Errazi", categorie: "HPsyP" },
  { region: "Casablanca-Settat", etablissement: "Azemmour", categorie: "HPr" },
  { region: "Casablanca-Settat", etablissement: "Mohamed V", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Mediouna", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Tit Mellil", categorie: "HPsyP" },
  { region: "Casablanca-Settat", etablissement: "My Abdellah", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Bouskoura", categorie: "HPr" },
  { region: "Casablanca-Settat", etablissement: "Prince My Hassan", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Ben Ahmed", categorie: "HPr" },
  { region: "Casablanca-Settat", etablissement: "Hassan II", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Sidi Bennour", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Zmamra", categorie: "HPr" },
  { region: "Casablanca-Settat", etablissement: "20 Aout 1953", categorie: "HIR" },
  { region: "Casablanca-Settat", etablissement: "Ibn Rochd", categorie: "HIR" },
  { region: "Casablanca-Settat", etablissement: "Hôpital D'enfants", categorie: "HIR" },
  { region: "Casablanca-Settat", etablissement: "My Youssef", categorie: "HR" },
  { region: "Casablanca-Settat", etablissement: "Mohamed Baouafi", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Mohamed V", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "El Hassani", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Centre de Léprologie", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Mohamed Sekkat", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Al Mansour", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "HPr Sidi Moumen", categorie: "HPr" },
  { region: "Casablanca-Settat", etablissement: "Ben Msick", categorie: "HP" },
  { region: "Casablanca-Settat", etablissement: "Sidi Othmane", categorie: "HP" },

  // Marrakech-Safi
  { region: "Marrakech-Safi", etablissement: "Mohammed VI", categorie: "HP" },
  { region: "Marrakech-Safi", etablissement: "Mohamed Vi", categorie: "HP" },
  { region: "Marrakech-Safi", etablissement: "Assalama", categorie: "HP" },
  { region: "Marrakech-Safi", etablissement: "Hôpital psychiatrique", categorie: "HPsyP" },
  { region: "Marrakech-Safi", etablissement: "Princesse Lalla Khadija", categorie: "HPr" },
  { region: "Marrakech-Safi", etablissement: "Sidi Med Ben Abdellah", categorie: "HP" },
  { region: "Marrakech-Safi", etablissement: "Ibn Tofeil", categorie: "HIR" },
  { region: "Marrakech-Safi", etablissement: "Ibn Nafis", categorie: "CPU" },
  { region: "Marrakech-Safi", etablissement: "Hopital Mère-Enfant", categorie: "HIR" },
  { region: "Marrakech-Safi", etablissement: "Centre d'Hématologie Oncologie", categorie: "HIR" },
  { region: "Marrakech-Safi", etablissement: "Arrazi", categorie: "HIR" },
  { region: "Marrakech-Safi", etablissement: "Ibn Zohr", categorie: "HR" },
  { region: "Marrakech-Safi", etablissement: "El Antaki", categorie: "HR" },
  { region: "Marrakech-Safi", etablissement: "Mhamid", categorie: "HPr" },
  { region: "Marrakech-Safi", etablissement: "Charifa", categorie: "HPr" },
  { region: "Marrakech-Safi", etablissement: "Saada", categorie: "HPsyR" },
  { region: "Marrakech-Safi", etablissement: "Benguerir", categorie: "HP" },
  { region: "Marrakech-Safi", etablissement: "Mohamed V", categorie: "HP" },
  { region: "Marrakech-Safi", etablissement: "Aisha", categorie: "HPr" },
  { region: "Marrakech-Safi", etablissement: "Lalla Hasna", categorie: "HP" },

  // Drâa-Tafilalet
  { region: "Drâa-Tafilalet", etablissement: "Sghiri Houmman I Ben Maati", categorie: "HPr" },
  { region: "Drâa-Tafilalet", etablissement: "My Ali Cherif", categorie: "HR" },
  { region: "Drâa-Tafilalet", etablissement: "Hôpital Amir Soultan Ibn Abdelaziz", categorie: "HP" },
  { region: "Drâa-Tafilalet", etablissement: "20 Aout (Goulmima)", categorie: "HPr" },
  { region: "Drâa-Tafilalet", etablissement: "Midelt", categorie: "HP" },
  { region: "Drâa-Tafilalet", etablissement: "HPr Rich", categorie: "HPr" },
  { region: "Drâa-Tafilalet", etablissement: "Sidi Hssain Bencer", categorie: "HP" },
  { region: "Drâa-Tafilalet", etablissement: "Bougafer", categorie: "HP" },
  { region: "Drâa-Tafilalet", etablissement: "HPr Kalaat M'gouna", categorie: "HPr" },
  { region: "Drâa-Tafilalet", etablissement: "Tinghir", categorie: "HP" },
  { region: "Drâa-Tafilalet", etablissement: "Ed-Derrak", categorie: "HP" },

  // Souss-Massa
  { region: "Souss-Massa", etablissement: "Hassan II", categorie: "HR" },
  { region: "Souss-Massa", etablissement: "C. d'Oncologie d'Agadir", categorie: "CRO" },
  { region: "Souss-Massa", etablissement: "Mokhtar Soussi", categorie: "HP" },
  { region: "Souss-Massa", etablissement: "Inezgane", categorie: "HP" },
  { region: "Souss-Massa", etablissement: "Oulad Teima", categorie: "HPr" },
  { region: "Souss-Massa", etablissement: "Mokhtar Es-Soussi", categorie: "HP" },
  { region: "Souss-Massa", etablissement: "Tata", categorie: "HP" },
  { region: "Souss-Massa", etablissement: "Hassan 1er", categorie: "HP" },
  { region: "Souss-Massa", etablissement: "Houmman El Fatouaki", categorie: "HP" },

  // Guelmim-Oued Noun
  { region: "Guelmim-Oued Noun", etablissement: "Assa", categorie: "HP" },
  { region: "Guelmim-Oued Noun", etablissement: "Bouizakarne", categorie: "HPr" },
  { region: "Guelmim-Oued Noun", etablissement: "Guelmim", categorie: "HR" },
  { region: "Guelmim-Oued Noun", etablissement: "Sidi Ifni", categorie: "HP" },
  { region: "Guelmim-Oued Noun", etablissement: "Tan Tan", categorie: "HP" },

  // Laâyoune-Sakia El Hamra
  { region: "Laâyoune-Sakia El Hamra", etablissement: "Boujdour", categorie: "HP" },
  { region: "Laâyoune-Sakia El Hamra", etablissement: "Es-semara", categorie: "HP" },
  { region: "Laâyoune-Sakia El Hamra", etablissement: "My Hassan Ben El Mehdi", categorie: "HR" },
  { region: "Laâyoune-Sakia El Hamra", etablissement: "Hassan II", categorie: "HR" },
  { region: "Laâyoune-Sakia El Hamra", etablissement: "Laayoune", categorie: "CRO" },

  // Dakhla-Oued Ed-Dahab
  { region: "Dakhla-Oued Ed-Dahab", etablissement: "Dakhla", categorie: "HR" }
];

// Mapping des noms de régions
const regionNameMapping = {
  "Tanger-Tétouan-Al Hoceïma": "Tanger-Tétouan-Al Hoceïma",
  "L'Oriental": "Oriental",
  "Oriental": "Oriental",
  "Fès-Meknès": "Fès-Meknès",
  "Rabat-Salé-Kénitra": "Rabat-Salé-Kénitra",
  "Béni Mellal-Khénifra": "Béni Mellal-Khénifra",
  "Casablanca-Settat": "Casablanca-Settat",
  "Marrakech-Safi": "Marrakech-Safi",
  "Drâa-Tafilalet": "Drâa-Tafilalet",
  "Souss-Massa": "Souss-Massa",
  "Guelmim-Oued Noun": "Guelmim-Oued Noun",
  "Laâyoune-Sakia El Hamra": "Laâyoune-Sakia El Hamra",
  "Dakhla-Oued Ed-Dahab": "Dakhla-Oued Ed-Dahab"
};

// Légende des catégories
const categoryLegend = {
  "HP": "Hôpital Provincial/Préfectoral",
  "HR": "Hôpital Régional",
  "HIR": "Hospital Interrégional",
  "HPr": "Hôpital de Proximité",
  "HPsyP": "Hôpital Psychiatrique Provincial",
  "CRO": "Centre Régional d'Oncologie",
  "HPsyR": "Hôpital Psychiatrique Régional",
  "CPU": "Centre Psychiatrique Universitaire"
};

// Fonction pour trouver le nom de région correspondant
function findMatchingRegion(regionNameFromMap) {
  console.log(`Recherche pour: "${regionNameFromMap}"`);

  // Vérifier d'abord le mapping direct
  if (regionNameMapping[regionNameFromMap]) {
    return regionNameMapping[regionNameFromMap];
  }

  // Nettoyer le nom
  const cleanName = regionNameFromMap
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .trim();

  // Chercher dans les données
  for (const hospital of hospitalData) {
    const cleanDataName = hospital.region
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s]/g, '')
      .trim();

    if (cleanDataName === cleanName) {
      return hospital.region;
    }
  }

  // Correspondance partielle
  const partialMatches = {
    'oriental': 'Oriental',
    'loriental': 'Oriental',
    'guelmim': 'Guelmim-Oued Noun',
    'laayoune': 'Laâyoune-Sakia El Hamra',
    'dakhla': 'Dakhla-Oued Ed-Dahab',
    'tanger': 'Tanger-Tétouan-Al Hoceïma',
    'fes': 'Fès-Meknès',
    'meknes': 'Fès-Meknès',
    'rabat': 'Rabat-Salé-Kénitra',
    'casablanca': 'Casablanca-Settat',
    'marrakech': 'Marrakech-Safi',
    'souss': 'Souss-Massa'
  };

  for (const [key, value] of Object.entries(partialMatches)) {
    if (cleanName.includes(key)) {
      return value;
    }
  }

  return null;
}

// Fonction pour calculer les statistiques par région
function getRegionStats(regionName) {
  const matchingRegion = findMatchingRegion(regionName);
  if (!matchingRegion) {
    return null;
  }

  const regionHospitals = hospitalData.filter(h => h.region === matchingRegion);
  const totalHospitals = regionHospitals.length;

  if (totalHospitals === 0) {
    return null;
  }

  // Compter par catégorie
  const categoryCount = {};
  regionHospitals.forEach(hospital => {
    categoryCount[hospital.categorie] = (categoryCount[hospital.categorie] || 0) + 1;
  });

  return {
    total: totalHospitals,
    categories: categoryCount,
    hospitals: regionHospitals,
    regionName: matchingRegion
  };
}

// Fonction pour afficher les informations de la région
function showRegionInfo(regionName, regionStats) {
  const infoPanel = d3.select('#region-info');
  infoPanel.html('');

  if (!regionStats) {
    infoPanel.append('div')
      .attr('class', 'no-data')
      .html(`
        <h3>❌ Aucune donnée disponible</h3>
        <p>Pour la région: <strong>${regionName}</strong></p>
        <div class="debug-info">
          <strong>Information technique:</strong><br>
          La région "${regionName}" n'a pas été trouvée dans la base de données.
        </div>
      `);
    return;
  }

  // Titre de la région
  infoPanel.append('h3').text(regionName);

  // Statistiques en grille
  const statsGrid = infoPanel.append('div').attr('class', 'stats-grid');

  statsGrid.append('div')
    .attr('class', 'stat-card')
    .html(`
      <div class="stat-number">${regionStats.total}</div>
      <div class="stat-label">Total Établissements</div>
    `);

  const categoryTypes = Object.keys(regionStats.categories).length;
  statsGrid.append('div')
    .attr('class', 'stat-card')
    .html(`
      <div class="stat-number">${categoryTypes}</div>
      <div class="stat-label">Types de Catégories</div>
    `);

  // Détails par catégorie
  const statsDiv = infoPanel.append('div').attr('class', 'hospital-stats');
  statsDiv.append('h4').text('Répartition par Catégorie');

  Object.entries(regionStats.categories).forEach(([category, count]) => {
    statsDiv.append('div')
      .attr('class', 'stat-item')
      .html(`
        <strong>${categoryLegend[category] || category}</strong>
        <span style="float: right; font-weight: bold; color: #339af0;">${count}</span>
        <div style="font-size: 0.8em; color: #666; margin-top: 5px;">Code: ${category}</div>
      `);
  });

  // Liste des hôpitaux
  const hospitalsDiv = infoPanel.append('div').attr('class', 'hospital-list');
  hospitalsDiv.append('h4').text(`Liste des Établissements (${regionStats.total})`);

  regionStats.hospitals.forEach(hospital => {
    hospitalsDiv.append('div')
      .attr('class', 'hospital-item')
      .html(`
        <div style="display: flex; justify-content: between; align-items: start;">
          <div style="flex: 1;">
            <strong>${hospital.etablissement}</strong>
          </div>
          <span class="category-badge">${hospital.categorie}</span>
        </div>
        <div style="font-size: 0.8em; color: #666; margin-top: 5px;">
          ${categoryLegend[hospital.categorie] || ''}
        </div>
      `);
  });
}

// Chargement de la carte
d3.json('https://cdn.jsdelivr.net/npm/morocco-map/data/regions.json')
  .then(data => {
    const regions = topojson.feature(data, data.objects.regions);

    const projection = d3.geoMercator().fitSize([width, height], regions);
    const pathGenerator = d3.geoPath().projection(projection);

    // Créer les paths pour chaque région
    const regionPaths = svg.selectAll('path')
      .data(regions.features)
      .enter().append('path')
      .attr('class', 'region')
      .attr('d', pathGenerator)
      .on('mouseover', function (d, i) {
        d3.select(this).classed('active', true);
      })
      .on('mouseout', function (d, i) {
        if (!d3.select(this).classed('selected')) {
          d3.select(this).classed('active', false);
        }
      })
      .on('click', function (d, i) {
        // Retirer la sélection précédente
        svg.selectAll('.region').classed('selected', false);

        // Sélectionner la nouvelle région
        d3.select(this).classed('selected', true);

        const regionNameAr = d.properties['name:ar'];
        const regionNameEn = d.properties['name:en'];
        const regionNameFr = d.properties['name:fr'];

        // Essayer d'abord avec le nom anglais, puis français
        let regionStats = getRegionStats(regionNameEn);
        if (!regionStats) {
          regionStats = getRegionStats(regionNameFr);
        }

        showRegionInfo(regionNameAr, regionStats);
      });

    // Ajouter la légende
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(20, 20)`);

    legend.append('rect')
      .attr('width', 220)
      .attr('height', 140)
      .attr('fill', 'white')
      .attr('stroke', '#dee2e6')
      .attr('rx', 8)
      .style('opacity', 0.95);

    legend.append('text')
      .attr('x', 15)
      .attr('y', 25)
      .text('Légende Interactive')
      .style('font-weight', 'bold')
      .style('font-size', '14px');

    // Éléments de légende
    const legendItems = [
      { color: '#e9ecef', text: 'Région normale' },
      { color: '#4dabf7', text: 'Survol' },
      { color: '#228be6', text: 'Sélectionnée' }
    ];

    legendItems.forEach((item, i) => {
      legend.append('rect')
        .attr('x', 15)
        .attr('y', 40 + i * 25)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', item.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      legend.append('text')
        .attr('x', 35)
        .attr('y', 52 + i * 25)
        .text(item.text)
        .style('font-size', '12px');
    });

    legend.append('text')
      .attr('x', 15)
      .attr('y', 125)
      .text('Cliquez pour voir les détails')
      .style('font-size', '11px')
      .style('fill', '#6c757d');
  })
  .catch(error => {
    console.error('Erreur lors du chargement de la carte:', error);
    d3.select('#region-info').html(`
      <div class="no-data">
        <h3>❌ Erreur de chargement</h3>
        <p>Impossible de charger la carte. Vérifiez votre connexion internet.</p>
      </div>
    `);
  });