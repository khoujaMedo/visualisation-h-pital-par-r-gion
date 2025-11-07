const width = 800;
const height = 700;

const svg = d3.select('#map-svg').attr("width", width).attr("height", height);
const treemapSvg = d3.select('#treemap-svg');
const resumeSvg = d3.select('#resume-svg').attr("width", 400).attr("height", 600);

// Variables globales pour le scatterplot
let scatterplotData = [];
let allRegions = [];
let allCategories = [];







// Fonction pour préparer les données du scatterplot
// Fonction pour préparer les données du scatterplot - VERSION AMÉLIORÉE
function prepareScatterplotData() {
  // Simuler des données temporelles (années fictives pour la démonstration)
  const years = [2018, 2019, 2020, 2021, 2022];
  
  scatterplotData = [];
  
  // Pour chaque région et catégorie, créer des données temporelles
  hospitalData.forEach(hospital => {
    const region = hospital.region;
    const category = hospital.categorie;
    
    if (!allRegions.includes(region)) {
      allRegions.push(region);
    }
    
    if (!allCategories.includes(category)) {
      allCategories.push(category);
    }
  });

  // Générer des données simulées plus réalistes
  allRegions.forEach(region => {
    allCategories.forEach(category => {
      const regionHospitals = hospitalData.filter(h => h.region === region && h.categorie === category);
      const baseCount = regionHospitals.length;
      
      if (baseCount > 0) {
        const series = years.map((year, index) => {
          // Simulation d'une croissance/évolution plus réaliste
          const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, ou +1
          const count = Math.max(1, baseCount + variation + index); // Minimum 1 établissement
          return {
            year: year,
            count: count,
            region: region,
            category: category,
            hospitalName: `${region} - ${category}`
          };
        });
        
        scatterplotData.push({
          region: region,
          category: category,
          series: series,
          color: categoryColors[category] || '#ccc'
        });
      }
    });
  });
}

// Initialisation du Connected Scatterplot
function initScatterplot() {
  prepareScatterplotData();
  
  // Mettre à jour les sélecteurs
  const regionSelect = d3.select('#region-select');
  const categorySelect = d3.select('#category-select');
  
  // Ajouter les options des régions
  regionSelect.selectAll('option')
    .data(['all', ...allRegions])
    .enter()
    .append('option')
    .attr('value', d => d)
    .text(d => d === 'all' ? 'Toutes les régions' : d);
  
  // Ajouter les options des catégories
  categorySelect.selectAll('option')
    .data(['all', ...allCategories])
    .enter()
    .append('option')
    .attr('value', d => d)
    .text(d => d === 'all' ? 'Toutes catégories' : (categoryLegend[d] || d));
  
  // Événements de changement
  regionSelect.on('change', updateScatterplot);
  categorySelect.on('change', updateScatterplot);
  
  // Initialiser le scatterplot
  updateScatterplot();
}

// Mise à jour du Connected Scatterplot
// Mise à jour du Connected Scatterplot - VERSION CORRIGÉE
function updateScatterplot() {
  const selectedRegion = d3.select('#region-select').property('value');
  const selectedCategory = d3.select('#category-select').property('value');
  
  // Filtrer les données
  let filteredData = scatterplotData;
  
  if (selectedRegion !== 'all') {
    filteredData = filteredData.filter(d => d.region === selectedRegion);
  }
  
  if (selectedCategory !== 'all') {
    filteredData = filteredData.filter(d => d.category === selectedCategory);
  }
  
  // Dimensions réduites
  const container = d3.select('.scatterplot-container');
  const width = container.node().getBoundingClientRect().width - 40;
  const height = 350; // Hauteur réduite
  const margin = { top: 40, right: 100, bottom: 50, left: 70 }; // Marges ajustées
  
  const svg = d3.select('#scatterplot-svg')
    .attr('width', width)
    .attr('height', height);
  
  // Effacer le contenu précédent
  svg.html('');
  
  if (filteredData.length === 0) {
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#6c757d')
      .text('Aucune donnée disponible pour les filtres sélectionnés');
    return;
  }
  
  // Échelles avec domaine correct
  const xScale = d3.scaleLinear()
    .domain(d3.extent(scatterplotData.flatMap(d => d.series).map(d => d.year)))
    .range([margin.left, width - margin.right])
    .nice();
  
  // CORRECTION : Utiliser les données filtrées pour l'échelle Y
  const allCounts = filteredData.flatMap(d => d.series.map(s => s.count));
  const yMax = d3.max(allCounts) || 1; // Éviter 0 comme maximum
  
  const yScale = d3.scaleLinear()
    .domain([0, yMax * 1.1]) // Ajouter un peu d'espace en haut
    .range([height - margin.bottom, margin.top]);
  
  // Lignes de grille
  const xGrid = d3.axisBottom(xScale)
    .ticks(5)
    .tickSize(-height + margin.top + margin.bottom)
    .tickFormat('');
  
  const yGrid = d3.axisLeft(yScale)
    .ticks(Math.min(6, yMax)) // Adapter le nombre de ticks au maximum
    .tickSize(-width + margin.left + margin.right)
    .tickFormat('');
  
  svg.append('g')
    .attr('class', 'grid-line')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xGrid);
  
  svg.append('g')
    .attr('class', 'grid-line')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yGrid);
  
  // Axes avec ticks adaptés
  const xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickFormat(d => d);
  
  // CORRECTION : Afficher des nombres entiers sur l'axe Y
  const yAxis = d3.axisLeft(yScale)
    .ticks(Math.min(6, yMax))
    .tickFormat(d => Number.isInteger(d) ? d : ''); // Afficher seulement les entiers
  
  svg.append('g')
    .attr('class', 'barchart-axis')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis);
  
  svg.append('g')
    .attr('class', 'barchart-axis')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis);
  
  // Labels des axes
  svg.append('text')
    .attr('class', 'axis-label')
    .attr('x', width / 2)
    .attr('y', height - 15)
    .attr('text-anchor', 'middle')
    .style('font-size', '11px')
    .text('Année');
  
  svg.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .style('font-size', '11px')
    .text('Nombre d\'établissements');
  
  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "scatterplot-tooltip")
    .style("opacity", 0);
  
  // Lignes de connexion
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count))
    .curve(d3.curveMonotoneX);
  
  const paths = svg.selectAll('.scatterplot-path')
    .data(filteredData)
    .enter().append('path')
    .attr('class', 'scatterplot-path')
    .attr('d', d => line(d.series))
    .attr('stroke', d => d.color)
    .attr('stroke-width', 2)
    .style('opacity', 0.8)
    .on('mouseover', function(event, d) {
      d3.select(this)
        .style('stroke-width', 3)
        .style('opacity', 1);
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .style('stroke-width', 2)
        .style('opacity', 0.8);
    });
  
  // Points de données - taille réduite
  const points = svg.selectAll('.scatterplot-point-group')
    .data(filteredData)
    .enter().append('g')
    .attr('class', 'scatterplot-point-group');
  
  points.selectAll('.scatterplot-point')
    .data(d => d.series.map(point => ({ ...point, region: d.region, category: d.category, color: d.color })))
    .enter().append('circle')
    .attr('class', 'scatterplot-point')
    .attr('cx', d => xScale(d.year))
    .attr('cy', d => yScale(d.count))
    .attr('r', 3) // Points plus petits
    .attr('fill', d => d.color)
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .on('mouseover', function(event, d) {
      tooltip.style('opacity', 1)
        .html(`
          <strong>${d.region}</strong><br>
          Catégorie: ${categoryLegend[d.category] || d.category}<br>
          Année: ${d.year}<br>
          Nombre: ${d.count} établissement${d.count > 1 ? 's' : ''}
        `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 15) + 'px');
      
      d3.select(this)
        .attr('r', 4.5) // Légère augmentation au survol
        .style('stroke-width', 2);
    })
    .on('mouseout', function() {
      tooltip.style('opacity', 0);
      d3.select(this)
        .attr('r', 3)
        .style('stroke-width', 1.5);
    });
  
  // Légende compacte
  const legendData = [...new Set(filteredData.map(d => d.category))];
  const legend = svg.append('g')
    .attr('transform', `translate(${width - margin.right + 5}, ${margin.top})`);
  
  legend.append('text')
    .attr('y', -5)
    .style('font-size', '10px')
    .style('font-weight', 'bold')
    .style('fill', '#666')
    .text('Catégories:');
  
  legend.selectAll('.legend-item')
    .data(legendData)
    .enter().append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(0, ${i * 16})`) // Espacement réduit
    .each(function(category) {
      const item = d3.select(this);
      
      item.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', categoryColors[category] || '#ccc');
      
      item.append('text')
        .attr('x', 15)
        .attr('y', 9)
        .style('font-size', '9px')
        .style('fill', '#666')
        .text(category); // Afficher seulement le code de catégorie
    });
  
  // Titre plus petit
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '12px')
    .text('Évolution des Établissements Hospitaliers');
  
  // Statistiques résumées
  if (filteredData.length > 0) {
    const totalPoints = filteredData.reduce((sum, d) => sum + d.series.length, 0);
    const statsText = svg.append('text')
      .attr('x', margin.left)
      .attr('y', 20)
      .style('font-size', '10px')
      .style('fill', '#666')
      .text(`${filteredData.length} série${filteredData.length > 1 ? 's' : ''} • ${totalPoints} point${totalPoints > 1 ? 's' : ''}`);
  }
}

// Appeler l'initialisation dans la fonction principale
// Modifiez la partie chargement des données :
d3.csv('hospitals.csv').then(data => {
  hospitalData = data;
  console.log('Données CSV chargées:', hospitalData.length, 'entrées');
  initMap();
  initTreemap();
  initResumeViz();
  initScatterplot(); // AJOUTER CETTE LIGNE
}).catch(error => {
  console.error('Erreur chargement CSV:', error);
  // ... gestion d'erreur existante
});


/*
// Chargement des données depuis CSV
let hospitalData = [];
d3.csv('hospitals.csv').then(data => {
  hospitalData = data;
  console.log('Données CSV chargées:', hospitalData.length, 'entrées');
  initMap();
  initTreemap();
  initResumeViz();
}).catch(error => {
  console.error('Erreur chargement CSV:', error);
  d3.select('#region-info').html(`
    <div class="no-data">
      <h3> Erreur de chargement CSV</h3>
      <p>Vérifiez que hospitals.csv est présent.</p>
    </div>
  `);
});
*/
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

// Échelle de couleurs pour les catégories
const categoryColors = {
  "HP": "#4dabf7",
  "HR": "#f0932b",
  "HIR": "#eb4d4b",
  "HPr": "#6ab04c",
  "HPsyP": "#a55eea",
  "CRO": "#fd79a8",
  "HPsyR": "#f1c40f",
  "CPU": "#e17055"
};

// Fonction pour trouver le nom de région correspondant
function findMatchingRegion(regionNameFromMap) {
  console.log(`Recherche pour: "${regionNameFromMap}"`);

  if (regionNameMapping[regionNameFromMap]) {
    return regionNameMapping[regionNameFromMap];
  }

  const cleanName = regionNameFromMap
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .trim();

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
        <h3> Aucune donnée disponible</h3>
        <p>Pour la région: <strong>${regionName}</strong></p>
        <div class="debug-info">
          <strong>Information technique:</strong><br>
          La région "${regionName}" n'a pas été trouvée dans la base de données.
        </div>
      `);
    updateResumeViz(null);
    return;
  }

  infoPanel.append('h3').text(regionName);

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

  const hospitalsDiv = infoPanel.append('div').attr('class', 'hospital-list');
  hospitalsDiv.append('h4').text(`Liste des Établissements (${regionStats.total})`);

  regionStats.hospitals.forEach(hospital => {
    hospitalsDiv.append('div')
      .attr('class', 'hospital-item')
      .html(`
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
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

  updateResumeViz(regionStats);
}

// Initialisation de la carte
function initMap() {
  d3.json('https://cdn.jsdelivr.net/npm/morocco-map/data/regions.json')
    .then(data => {
      const regions = topojson.feature(data, data.objects.regions);

      const projection = d3.geoMercator().fitSize([width, height], regions);
      const pathGenerator = d3.geoPath().projection(projection);

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
          svg.selectAll('.region').classed('selected', false);
          d3.select(this).classed('selected', true);

          const regionNameAr = d.properties['name:ar'];
          const regionNameEn = d.properties['name:en'];
          const regionNameFr = d.properties['name:fr'];

          let regionStats = getRegionStats(regionNameEn);
          if (!regionStats) {
            regionStats = getRegionStats(regionNameFr);
          }

          showRegionInfo(regionNameAr, regionStats);
        });

      // Légende de la carte
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
          <h3> Erreur de chargement</h3>
          <p>Impossible de charger la carte. Vérifiez votre connexion internet.</p>
        </div>
      `);
    });
}

// Initialisation du Treemap - VERSION AMÉLIORÉE
function initTreemap() {
  // Agrégation des données par région pour le treemap
  const regionCounts = {};
  hospitalData.forEach(h => {
    regionCounts[h.region] = (regionCounts[h.region] || 0) + 1;
  });

  const treemapData = {
    name: "Racine",
    children: Object.entries(regionCounts).map(([region, count]) => ({
      name: region,
      value: count,
      region: region
    }))
  };

  // Dimensions dynamiques basées sur le conteneur
  const container = d3.select('.treemap-container');
  const width = container.node().getBoundingClientRect().width - 40;
  const height = 350;

  const treemapSvg = d3.select('#treemap-svg')
    .attr('width', width)
    .attr('height', height);

  // Effacer le contenu précédent
  treemapSvg.html('');

  const treemap = d3.treemap()
    .size([width, height])
    .tile(d3.treemapSquarify)
    .round(true)
    .padding(1);

  const root = d3.hierarchy(treemapData)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  treemap(root);

  // Échelle de couleurs améliorée
  const colorScale = d3.scaleOrdinal()
    .domain(Object.keys(regionCounts))
    .range(d3.schemeSet3);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "treemap-tooltip")
    .style("opacity", 0);

  // Création des groupes pour chaque feuille
  const leaf = treemapSvg.selectAll('g')
    .data(root.leaves())
    .enter().append('g')
    .attr('transform', d => `translate(${d.x0},${d.y0})`)
    .style('cursor', 'pointer')
    .on('click', function (event, d) {
      // Récupérer les stats de la région cliquée
      const regionStats = getRegionStats(d.data.region);
      if (regionStats) {
        // Mettre à jour l'affichage des informations
        showRegionInfo(d.data.region, regionStats);

        // Mettre en évidence la région sur la carte
        highlightRegionOnMap(d.data.region);
      }
    });

  // Rectangles du treemap
  leaf.append('rect')
    .attr('class', 'treemap-rect')
    .attr('width', d => Math.max(0, d.x1 - d.x0))
    .attr('height', d => Math.max(0, d.y1 - d.y0))
    .style('fill', d => colorScale(d.data.name))
    .style('opacity', 0.8)
    .on('mouseover', function (event, d) {
      d3.select(this)
        .style('opacity', 1)
        .style('stroke', '#333')
        .style('stroke-width', '2px');

      tooltip.style('opacity', 1)
        .html(`
          <strong>${d.data.name}</strong><br>
          Hôpitaux: ${d.data.value}<br>
          <em>Cliquez pour voir les détails</em>
        `)
        .style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 15) + 'px');
    })
    .on('mouseout', function (event, d) {
      d3.select(this)
        .style('opacity', 0.8)
        .style('stroke', 'none');

      tooltip.style('opacity', 0);
    });

  // Texte dans les rectangles - version améliorée
  leaf.append('text')
    .attr('class', 'treemap-text')
    .attr('x', d => (d.x1 - d.x0) / 2)
    .attr('y', d => (d.y1 - d.y0) / 2)
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .style('font-size', d => {
      const area = (d.x1 - d.x0) * (d.y1 - d.y0);
      const baseSize = Math.sqrt(area) / 15;
      return Math.max(8, Math.min(12, baseSize)) + 'px';
    })
    .style('fill', 'white')
    .style('font-weight', 'bold')
    .style('pointer-events', 'none')
    .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.7)')
    .text(d => {
      const rectWidth = d.x1 - d.x0;
      const rectHeight = d.y1 - d.y0;

      if (rectWidth > 60 && rectHeight > 25) {
        return `${d.data.value}`;
      }
      return '';
    });

  // Labels des régions (noms courts)
  leaf.append('text')
    .attr('class', 'treemap-text')
    .attr('x', d => (d.x1 - d.x0) / 2)
    .attr('y', d => (d.y1 - d.y0) / 2 - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', d => {
      const area = (d.x1 - d.x0) * (d.y1 - d.y0);
      const baseSize = Math.sqrt(area) / 20;
      return Math.max(6, Math.min(10, baseSize)) + 'px';
    })
    .style('fill', 'white')
    .style('font-weight', 'bold')
    .style('pointer-events', 'none')
    .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.7)')
    .text(d => {
      const rectWidth = d.x1 - d.x0;
      const rectHeight = d.y1 - d.y0;

      if (rectWidth > 80 && rectHeight > 35) {
        const shortNames = {
          "Tanger-Tétouan-Al Hoceïma": "Tanger",
          "Oriental": "Oriental",
          "Fès-Meknès": "Fès-Meknès",
          "Rabat-Salé-Kénitra": "Rabat",
          "Béni Mellal-Khénifra": "Béni Mellal",
          "Casablanca-Settat": "Casablanca",
          "Marrakech-Safi": "Marrakech",
          "Drâa-Tafilalet": "Drâa-Tafilalet",
          "Souss-Massa": "Souss-Massa",
          "Guelmim-Oued Noun": "Guelmim",
          "Laâyoune-Sakia El Hamra": "Laâyoune",
          "Dakhla-Oued Ed-Dahab": "Dakhla"
        };
        return shortNames[d.data.name] || d.data.name.substring(0, 10);
      }
      return '';
    });

  // Titre du treemap
  treemapSvg.append('text')
    .attr('x', width / 2)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '14px')
    .style('fill', '#2c3e50')
    .text('Répartition des Hôpitaux par Région');

  // Légende interactive
  const legendData = Object.entries(regionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const legend = treemapSvg.append('g')
    .attr('transform', `translate(10, ${height - 80})`);

  legend.append('text')
    .attr('y', -5)
    .style('font-size', '11px')
    .style('font-weight', 'bold')
    .style('fill', '#666')
    .text('Top 5 Régions:');

  legendData.forEach(([region, count], i) => {
    const legendItem = legend.append('g')
      .attr('transform', `translate(0, ${i * 15})`);

    legendItem.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', colorScale(region));

    legendItem.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .style('font-size', '10px')
      .style('fill', '#666')
      .text(`${region}: ${count} hôpitaux`);
  });
}

// Fonction pour mettre en évidence une région sur la carte
function highlightRegionOnMap(regionName) {
  console.log(`Région sélectionnée depuis le treemap: ${regionName}`);
  // Dans une version ultérieure, implémenter la synchronisation avec la carte
}

// Fonction pour générer le bar chart de résumé
function updateResumeViz(regionStats) {
  resumeSvg.html('');

  if (!regionStats || Object.keys(regionStats.categories).length === 0) {
    resumeSvg.append('text')
      .attr('x', 200)
      .attr('y', 300)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#6c757d')
      .text('Aucune région sélectionnée');
    return;
  }

  const margin = { top: 20, right: 30, bottom: 40, left: 100 };
  const chartWidth = 350;
  const chartHeight = 400;
  const barHeight = 25;
  const data = Object.entries(regionStats.categories).map(([cat, count]) => ({ cat, count, fullName: categoryLegend[cat] || cat }));

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.cat))
    .range([0, data.length * barHeight])
    .padding(0.1);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, chartWidth]);

  const tooltip = d3.select("body").append("div")
    .attr("class", "treemap-tooltip")
    .style("opacity", 0);

  const g = resumeSvg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.append('g')
    .attr('class', 'bar-axis')
    .attr('transform', `translate(0, ${yScale.bandwidth() / 2})`)
    .call(d3.axisLeft(yScale).tickSize(0))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('transform', 'rotate(-0)');

  g.append('g')
    .attr('class', 'bar-axis')
    .attr('transform', `translate(0, ${yScale.range()[1] + yScale.bandwidth()})`)
    .call(d3.axisBottom(xScale).ticks(5))
    .selectAll('text')
    .style('font-size', '10px');

  g.selectAll('.bar-rect')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar-rect')
    .attr('x', 0)
    .attr('y', d => yScale(d.cat))
    .attr('width', d => xScale(d.count))
    .attr('height', yScale.bandwidth())
    .attr('fill', d => categoryColors[d.cat] || '#ccc')
    .on('mouseover', function (event, d) {
      tooltip.style('opacity', 1)
        .html(`Catégorie: ${d.fullName}<br>Nombre: ${d.count}`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 20) + 'px');
      d3.select(this).style('opacity', 0.7);
    })
    .on('mouseout', function () {
      tooltip.style('opacity', 0);
      d3.select(this).style('opacity', 1);
    });

  g.selectAll('.bar-text')
    .data(data)
    .enter().append('text')
    .attr('class', 'bar-text')
    .attr('x', d => xScale(d.count) + 5)
    .attr('y', d => yScale(d.cat) + yScale.bandwidth() / 2)
    .text(d => d.count);

  const legend = resumeSvg.append('g')
    .attr('transform', `translate(10, 450)`);

  data.forEach((d, i) => {
    const item = legend.append('g')
      .attr('class', 'bar-legend-item')
      .attr('transform', `translate(0, ${i * 15})`);

    item.append('rect')
      .attr('class', 'bar-legend-color')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', categoryColors[d.cat] || '#ccc');

    item.append('text')
      .attr('x', 20)
      .attr('y', 10)
      .text(`${d.cat}: ${d.fullName}`)
      .style('font-size', '10px');
  });

  resumeSvg.append('text')
    .attr('x', 200)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '12px')
    .text(`Résumé: ${regionStats.regionName}`);
}

// Initialisation du SVG de résumé
function initResumeViz() {
  updateResumeViz(null);
}

// Gestion du redimensionnement
function handleResize() {
  initTreemap();
}

window.addEventListener('resize', handleResize);