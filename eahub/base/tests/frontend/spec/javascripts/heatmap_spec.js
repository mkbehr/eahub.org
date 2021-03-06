describe('Heatmap', function() {
  let mapIndividuals, mapGroups, mapModules, isIE
  beforeEach(function() {
    isIE = false
    mapModules = {
      locationCluster: LocationCluster,
      locationClusters: LocationClusters,
      marker: Marker,
      profile: Profile
    }
    mapIndividuals = new Heatmap('individuals', locationsMock, mapModules, externalModulesMock, htmlElementsMock, isIE)
    mapGroups = new Heatmap('groups', locationsMock, mapModules, externalModulesMock, htmlElementsMock, isIE)
  })
  afterEach(function() {
    mapIndividuals = null
    mapGroups = null
  })
  describe('setup', function() {
    it('renders groups if type is groups', function() {
      mapGroups.setup()

      mapGroups.locationClusters.list.forEach(function(cluster) {
        cluster.profiles.forEach(function(profile) {
          expect(profile.type).toBe('groups')
        })
      })
    })
    it('renders individuals if type is individuals', function() {
      mapIndividuals.setup()

      mapIndividuals.locationClusters.list.forEach(function(cluster) {
        cluster.profiles.forEach(function(profile) {
          expect(profile.type).toBe('individuals')
        })
      })
    })
    it('sets the selector to individuals if queryStringMap is individuals', function() {
      mapIndividuals.setup()

      expect(mapIndividuals.selectorInd.checked).toBe(true)
    })
    it('sets the selector to groups if queryStringMap is groups', function() {
      mapGroups.setup()

      expect(mapGroups.selectorGroups.checked).toBe(true)
    })
  })
  describe('render', function() {
    var klaipedaCluster, londonCluster

    beforeEach(function() {
      mapGroups.setup()
      mapIndividuals.setup()
      klaipedaMarker = mapGroups.locationClusters.list.filter(cluster => cluster.location.lat == klaipedaLatLng.lat && cluster.location.lng == klaipedaLatLng.lng)[0].markers[0]
      londonMarker = mapIndividuals.locationClusters.list.filter(cluster => cluster.location.lat == londonLatLng.lat && cluster.location.lng == londonLatLng.lng)[0].markers[0]
    })
    afterEach(function() {
      mapGroups, mapIndividuals, klaipedaMarker, londonMarker = null
    })
    it('renders location clusters with number of profiles in that location', function() {
      expect(klaipedaMarker.googleMarker.label.text).toEqual('2')
    })
    it('does not count private profiles in markers where number of private profiles < kAnonymity', function() {
      expect(londonMarker.googleMarker.label.text).toEqual('1')
    })
    it('adds the list of all public profiles in a location in its marker', function() {
      expect(klaipedaMarker.googleMarker.desc).toContain('klaipeda-1')
      expect(klaipedaMarker.googleMarker.desc).toContain('klaipeda-2')
    })
    it('does not add private profiles to list in markers', function() {
      console.log(londonMarker.googleMarker)
      expect(londonMarker.googleMarker.desc).not.toContain('<ul>')
    })
  })
})
