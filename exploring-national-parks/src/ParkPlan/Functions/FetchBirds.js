/**
 * Fetches species data from the NPS API filtered for birds.
 * @function FetchBirds
 * @param {string} [parkCode] - optional park code to restrict species to a park
 * @returns {Promise<Array>} list of species (bird) objects
 */
export const FetchBirds = async (parkCode) => {
  try {
    const apiKey = '0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb';
    // Use the species endpoint. Avoid filtering with q=bird because that can miss park-associated species.
    // Increase limit to return more species; optionally restrict by parkCode.
    let url = `https://developer.nps.gov/api/v1/species?api_key=${apiKey}&limit=200`;
    // parkCode can be either an object with .value or a string
    const code = parkCode && (parkCode.value || parkCode.parkCode || parkCode)
    if (code) {
      url += `&parkCode=${code}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    // json.data should be an array of species objects
    const all = json.data || [];

    // Heuristic: try to filter species that look like birds using common fields that may indicate class or common name.
    const birds = all.filter(s => {
      // some responses may include 'class' or 'taxon' fields; also check common names
      const nameFields = [s.commonNames, s.comName, s.common_name, s.scientificName, s.familyCommonName];
      const combined = nameFields.filter(Boolean).join(' ').toLowerCase();
      if (combined.includes('bird') || combined.includes('sparrow') || combined.includes('hawk') || combined.includes('eagle') || combined.includes('owl') || combined.includes('tern') || combined.includes('warbler')) return true;
      // taxonomy fields
      if (s.class === 'Aves' || (s.taxon && s.taxon.toLowerCase().includes('aves'))) return true;
      return false;
    });

    // If heuristic found results, return them; otherwise return all (so user still sees species list)
    return birds.length > 0 ? birds : all;
  } catch (error) {
    console.error('FetchBirds error:', error.message || error);
    return [];
  }
};

export default FetchBirds;
