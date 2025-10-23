/**
 * Static bird species data keyed by NPS parkCode.
 * This is a small fallback dataset so the Birdwatching page shows results even
 * if the NPS species endpoint doesn't return usable data.
 */
const birdData = {
  yose: [
    { commonName: 'Steller\'s Jay', scientificName: 'Cyanocitta stelleri', description: 'A bold, noisy jay found in coniferous forests.' },
    { commonName: 'Mountain Bluebird', scientificName: 'Sialia currucoides', description: 'Bright blue thrush-like bird of open country and meadows.' },
    { commonName: 'American Dipper', scientificName: 'Cinclus mexicanus', description: 'A unique, aquatic songbird often seen near fast-moving streams.' }
  ],
  yell: [
    { commonName: 'Common Raven', scientificName: 'Corvus corax', description: 'Large, all-black corvid; very adaptable.' },
    { commonName: 'Bald Eagle', scientificName: 'Haliaeetus leucocephalus', description: 'Large raptor associated with lakes and rivers.' },
    { commonName: 'Yellow-rumped Warbler', scientificName: 'Setophaga coronata', description: 'Small migratory warbler often found in mixed woodlands.' }
  ],
  grca: [
    { commonName: 'California Condor', scientificName: 'Gymnogyps californianus', description: 'Critically endangered scavenger reintroduced in parts of the west.' },
    { commonName: 'Pinyon Jay', scientificName: 'Gymnorhinus cyanocephalus', description: 'A social jay of pinyon-juniper woodlands.' },
    { commonName: 'Black-chinned Hummingbird', scientificName: 'Archilochus alexandri', description: 'Small hummingbird found in riparian and canyon habitats.' }
  ],
  zion: [
    { commonName: 'American Kestrel', scientificName: 'Falco sparverius', description: 'Small falcon often seen perched along canyon rims.' },
    { commonName: 'Elf Owl', scientificName: 'Micrathene whitneyi', description: 'Tiny nocturnal owl found in desert oases; rare but present.' },
    { commonName: 'Lark Bunting', scientificName: 'Calamospiza melanocorys', description: 'A grassland bird occasionally seen near open areas.' }
  ]
}

export default birdData
