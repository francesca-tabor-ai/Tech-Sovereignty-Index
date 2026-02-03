import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { CountryData, getScoreCategory, getScoreCategoryColor } from '../types'

interface WorldMapProps {
  countries: CountryData[]
  onCountryClick: (country: CountryData) => void
  onCountryHover: (country: CountryData | null) => void
  highlightSovereignPrisons?: boolean
}

// Country code mapping from numeric to alpha-3
const countryCodeMap: Record<string, string> = {
  // North America & Caribbean
  '840': 'USA', '124': 'CAN', '484': 'MEX', '192': 'CUB', '214': 'DOM',
  '304': 'GRL',
  // Central America
  '591': 'PAN', '188': 'CRI', '320': 'GTM', '340': 'HND', '222': 'SLV', '558': 'NIC',
  // South America
  '076': 'BRA', '032': 'ARG', '152': 'CHL', '170': 'COL', '604': 'PER',
  '862': 'VEN', '218': 'ECU', '858': 'URY', '600': 'PRY', '068': 'BOL',
  // Europe
  '276': 'DEU', '250': 'FRA', '826': 'GBR', '380': 'ITA', '724': 'ESP',
  '528': 'NLD', '756': 'CHE', '616': 'POL', '578': 'NOR', '752': 'SWE',
  '040': 'AUT', '056': 'BEL', '208': 'DNK', '246': 'FIN', '300': 'GRC',
  '372': 'IRL', '442': 'LUX', '620': 'PRT', '203': 'CZE', '348': 'HUN',
  '233': 'EST', '428': 'LVA', '440': 'LTU', '705': 'SVN', '703': 'SVK',
  '642': 'ROU', '100': 'BGR', '191': 'HRV', '196': 'CYP', '470': 'MLT',
  '643': 'RUS',
  // Asia
  '156': 'CHN', '392': 'JPN', '410': 'KOR', '158': 'TWN', '356': 'IND',
  '376': 'ISR', '702': 'SGP', '682': 'SAU', '784': 'ARE', '360': 'IDN',
  '704': 'VNM',
  // Oceania
  '036': 'AUS', '554': 'NZL',
  // Africa
  '566': 'NGA', '710': 'ZAF', '818': 'EGY', '404': 'KEN', '231': 'ETH',
  '504': 'MAR', '012': 'DZA', '788': 'TUN', '288': 'GHA', '834': 'TZA',
  '180': 'COD', '024': 'AGO', '686': 'SEN', '384': 'CIV', '120': 'CMR',
  '800': 'UGA', '716': 'ZWE', '508': 'MOZ', '646': 'RWA'
}

// EU member states for aggregate display
const euMemberCodes = [
  'DEU', 'FRA', 'ITA', 'ESP', 'POL', 'NLD', 'BEL', 'SWE', 'AUT', 'DNK',
  'FIN', 'IRL', 'PRT', 'GRC', 'CZE', 'HUN', 'LUX', 'EST', 'LVA', 'LTU',
  'SVN', 'SVK', 'BGR', 'ROU', 'HRV', 'CYP', 'MLT'
]

export default function WorldMap({
  countries,
  onCountryClick,
  onCountryHover,
  highlightSovereignPrisons = false
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [worldData, setWorldData] = useState<any>(null)
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 })

  // Load world topology
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then(data => {
        setWorldData(data)
      })
      .catch(err => console.error('Failed to load world map:', err))
  }, [])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current?.parentElement) {
        const { width } = svgRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width: Math.min(width, 1200), height: Math.min(width * 0.55, 600) })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Render map
  useEffect(() => {
    if (!worldData || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const { width, height } = dimensions

    // Create projection
    const projection = d3.geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    // Convert TopoJSON to GeoJSON
    const countriesGeo = feature(worldData, worldData.objects.countries) as any

    // Create country lookup
    const countryLookup = new Map<string, CountryData>()
    countries.forEach(c => {
      countryLookup.set(c.code, c)
    })

    // Get EU data for EU member states
    const euData = countries.find(c => c.code === 'EU')

    // Draw countries
    svg.append('g')
      .selectAll('path')
      .data(countriesGeo.features)
      .enter()
      .append('path')
      .attr('d', path as any)
      .attr('fill', (d: any) => {
        const alpha3 = countryCodeMap[d.id]

        // Check if this is an EU member state
        if (alpha3 && euMemberCodes.includes(alpha3) && euData) {
          // Special handling - show individual country data if available, else EU
          const countryData = countryLookup.get(alpha3)
          if (countryData) {
            if (highlightSovereignPrisons && countryData.isSovereignPrison) {
              return '#EF4444'
            }
            return getScoreCategoryColor(getScoreCategory(countryData.overallScore))
          }
          // Fall back to EU aggregate
          if (highlightSovereignPrisons && euData.isSovereignPrison) {
            return '#EF4444'
          }
          return getScoreCategoryColor(getScoreCategory(euData.overallScore))
        }

        const countryData = alpha3 ? countryLookup.get(alpha3) : null
        if (!countryData) return '#e4e4e7' // No data

        if (highlightSovereignPrisons && countryData.isSovereignPrison) {
          return '#EF4444'
        }

        return getScoreCategoryColor(getScoreCategory(countryData.overallScore))
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .style('cursor', (d: any) => {
        const alpha3 = countryCodeMap[d.id]
        return (alpha3 && countryLookup.has(alpha3)) || (alpha3 && euMemberCodes.includes(alpha3))
          ? 'pointer'
          : 'default'
      })
      .on('mouseenter', function(_event: any, d: any) {
        const alpha3 = countryCodeMap[d.id]
        let countryData = alpha3 ? countryLookup.get(alpha3) : null

        // For EU members, show EU data if no individual data
        if (!countryData && alpha3 && euMemberCodes.includes(alpha3)) {
          countryData = euData || null
        }

        if (countryData) {
          d3.select(this)
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', 2)
          onCountryHover(countryData)
        }
      })
      .on('mouseleave', function() {
        d3.select(this)
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5)
        onCountryHover(null)
      })
      .on('click', (_event: any, d: any) => {
        const alpha3 = countryCodeMap[d.id]
        let countryData = alpha3 ? countryLookup.get(alpha3) : null

        // For EU members without individual data, navigate to EU
        if (!countryData && alpha3 && euMemberCodes.includes(alpha3)) {
          countryData = euData || null
        }

        if (countryData) {
          onCountryClick(countryData)
        }
      })

    // Add graticule
    const graticule = d3.geoGraticule()
    svg.insert('path', ':first-child')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#e4e4e7')
      .attr('stroke-width', 0.3)

  }, [worldData, countries, dimensions, highlightSovereignPrisons, onCountryClick, onCountryHover])

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}
