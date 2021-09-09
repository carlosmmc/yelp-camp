mapboxgl.accessToken=mapToken
const map=new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-103.5917, 40.6699],
    zoom: 3
});

map.on('load', () => {
    map.addSource('campgrounds', {
        type: 'geojson',
        data: campgrounds,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#D397FA', 5,
                '#CC93F9', 10,
                '#C68FF7', 15,
                '#BF8BF6', 20,
                '#B886F4', 25,
                '#AB7EF1',

            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                12, 25,
                17, 50,
                20
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#7F77EF',
            'circle-radius': 7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features=map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId=features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    map.on('click', 'unclustered-point', (e) => {
        const { popUpMarkup }=e.features[0].properties
        const coordinates=e.features[0].geometry.coordinates.slice();

        while (Math.abs(e.lngLat.lng-coordinates[0])>180) {
            coordinates[0]+=e.lngLat.lng>coordinates[0]? 360:-360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor='pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor='';
    });
});