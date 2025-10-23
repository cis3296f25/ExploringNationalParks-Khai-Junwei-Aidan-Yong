/**
 * Simple Birdwatching page component.
 * Provides a placeholder page reachable at /Birdwatching.
 */
import React, { useEffect, useState } from 'react'
import { FetchBirds } from './ParkPlan/Functions/FetchBirds'
import { FetchParks } from './ParkPlan/Functions/FetchParks'
import birdData from './data/birdData'

const Birdwatching = () => {
  const [birds, setBirds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [parks, setParks] = useState([])
  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        // Load parks for selector
        const parksJson = await FetchParks()
        if (mounted && parksJson && parksJson.data) setParks(parksJson.data)

        // Try to fetch species from API; if nothing useful, fall back to static birdData
        const data = await FetchBirds()
        if (mounted) {
          if (data && data.length > 0) setBirds(data)
          else {
            // combine all static lists
            const combined = Object.values(birdData).flat()
            setBirds(combined)
          }
        }
      } catch (err) {
        console.error(err)
        if (mounted) setError(err.message || 'Failed to load birds')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  async function onParkChange(e) {
    const parkCode = e.target.value
    const parkObj = parks.find(p => p.parkCode === parkCode)
    setSelectedPark(parkObj || null)
    setLoading(true)
    setError(null)
    try {
      const data = await FetchBirds(parkObj)
      if (data && data.length > 0) setBirds(data)
      else {
        // use static data for the selected park if available
        const code = parkObj ? parkObj.parkCode : ''
        if (code && birdData[code]) setBirds(birdData[code])
        else if (!code) setBirds(Object.values(birdData).flat())
        else setBirds([])
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to load birds for park')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="birdwatching-page main-component">
      <h1>Birdwatching</h1>
      <p>Discover birdwatching spots, species, and tips for visiting national parks.</p>

      <div className="park-selector">
        <label htmlFor="parkSelect">Filter by park: </label>
        <select id="parkSelect" onChange={onParkChange} value={selectedPark ? selectedPark.parkCode : ''}>
          <option value="">All parks</option>
          {parks.map(p => (
            <option key={p.id || p.parkCode} value={p.parkCode}>{p.fullName}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading bird species...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="bird-list">
          {birds.length === 0 && <p>No bird species found.</p>}
          <ul>
            {birds.map((b) => (
              <li key={b.id || b.scientificName || Math.random()}>
                <strong>{b.commonNames || b.common_name || b.comName || b.scientificName}</strong>
                {b.scientificName && b.scientificName !== (b.commonNames || b.common_name || b.comName) && (
                  <span> — <em>{b.scientificName}</em></span>
                )}
                {b.description && <p>{b.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Birdwatching
