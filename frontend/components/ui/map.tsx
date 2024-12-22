import React, { useState, useCallback } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  Libraries,
} from '@react-google-maps/api';
import { CircularProgress, Box, Typography } from '@mui/material';

// Define the types for donation centers
interface DonationCenter {
  place_id: string;
  name: string;
  geometry: {
    location: google.maps.LatLng;
  };
  vicinity?: string;
  rating?: number;
  types?: string[];
}

// Define the props for the DonationMap component
interface DonationMapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  radius?: number; // in meters
  keyword?: string;
}

const libraries: Libraries = ["drawing", "geometry", "places", "visualization"];

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '600px',
};

const defaultCenter: google.maps.LatLngLiteral = {
  lat: 1.3722, // Latitude for SUTD Upper Changi
  lng: 103.9480, // Longitude for SUTD Upper Changi
};

const DonationMap: React.FC<DonationMapProps> = ({
  center = defaultCenter,
  zoom = 14,
  radius = 5000, // 5 kilometers
  keyword = 'donation center', // Keyword to search for donation centers
}) => {
  const [donationCenters, setDonationCenters] = useState<DonationCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(
    null
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    const service = new window.google.maps.places.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: center,
      radius,
      keyword,
    };

    service.nearbySearch(request, (results, status, pagination) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        const formattedResults: DonationCenter[] = results
            .filter((place) => place.geometry?.location)
            .map((place) => ({
                place_id: place.place_id!,
                name: place.name!,
                geometry: {
                location: place.geometry!.location!,
                },
                vicinity: place.vicinity ?? "Unknown location",
                rating: place.rating ?? 0,
                types: place.types ?? [],
            }));

        setDonationCenters(formattedResults);

        // Handle pagination if more results are available
        if (pagination && pagination.hasNextPage) {
          setTimeout(() => {
            pagination.nextPage();
          }, 2000);
        }
      } else {
        console.error(
          'PlacesService was not successful for the following reason: ' + status
        );
      }
    });
  }, [center, radius, keyword]);

  if (loadError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="600px">
        <Typography variant="h6" color="error">
          Error loading maps. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="600px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
      onLoad={onMapLoad}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
      }}
    >
      {/* Marker for SUTD Upper Changi */}
      <Marker
        position={center}
        label={{
          text: 'SUTD Upper Changi',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
        icon={{
          path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 5,
          fillColor: '#0000FF',
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#FFFFFF',
        }}
      />

      {/* Markers for Donation Centers */}
      {donationCenters.map((center) => (
        <Marker
          key={center.place_id}
          position={{
            lat: center.geometry.location.lat(),
            lng: center.geometry.location.lng(),
          }}
          title={center.name}
          onClick={() => {
            setSelectedCenter(center);
          }}
        />
      ))}

      {/* Info Window */}
      {selectedCenter && (
        <InfoWindow
          position={{
            lat: selectedCenter.geometry.location.lat(),
            lng: selectedCenter.geometry.location.lng(),
          }}
          onCloseClick={() => {
            setSelectedCenter(null);
          }}
        >
          <Box>
            <Typography variant="h6">{selectedCenter.name}</Typography>
            {selectedCenter.vicinity && (
              <Typography variant="body2">{selectedCenter.vicinity}</Typography>
            )}
            {selectedCenter.rating && (
              <Typography variant="body2">
                Rating: {selectedCenter.rating} / 5
              </Typography>
            )}
            {selectedCenter.types && (
              <Typography variant="body2">
                Types: {selectedCenter.types.join(', ')}
              </Typography>
            )}
          </Box>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default DonationMap;
