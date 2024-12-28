"use client";
import React, { useEffect, useMemo } from "react";
import {
  Circle,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { LocateFixed, X } from "lucide-react";
import { toast } from "sonner";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 100px)",
};

const defaultCenter = {
  lat: -6.2193664,
  lng: 106.8171264,
};

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
];

const GoogleMapView = () => {
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [directions, setDirections] = React.useState<DirectionsResult | null>(
    null
  );
  const [clinics, setClinics] = React.useState<
    google.maps.places.PlaceResult[]
  >([]);

  const options = useMemo<MapOptions>(
    () => ({
      styles: mapStyles,
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    let watchId: number;

    if (navigator.geolocation) {
      // Memulai pemantauan lokasi
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error mendapatkan lokasi pengguna:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      console.warn("Geolocation tidak didukung oleh browser ini.");
    }

    // Membersihkan watchPosition saat komponen di-unmount
    return () => {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (map && userLocation) {
      map.panTo(userLocation);
    }
  }, [map, userLocation]);

  useEffect(() => {
    const fetchNearbyClinics = async (location: {
      lat: number;
      lng: number;
    }) => {
      const { lat, lng } = location;

      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: new window.google.maps.LatLng(lat, lng),
        radius: 10000,
        type: "veterinary_care",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setClinics(results as google.maps.places.PlaceResult[]);
        } else {
          console.error("Error mencari klinik:", status);
        }
      });
    };

    fetchNearbyClinics(userLocation || defaultCenter);
  }, [userLocation]);

  const fetchDirections = async (destination: LatLngLiteral) => {
    if (!map) return;
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: userLocation || defaultCenter,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirections(results);
  };

  return (
    <>
      <div className=" mb-2 flex items-center absolute top-2 right-1/2 translate-x-1/2 z-10">
        <button
          className="flex items-center gap-2 btn"
          onClick={() => {
            if (!userLocation) {
              toast.warning("Aktifkan lokasi di perangkat Anda");
              return;
            } else {
              map?.panTo(userLocation || defaultCenter);
              map?.setZoom(15);
            }
          }}
        >
          <LocateFixed size={18} strokeWidth={1.5} />
          <span className="text-sm">Lokasi Saya</span>
        </button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={13}
        options={options}
        onLoad={(map) => setMap(map)}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
            }}
          />
        )}
        {userLocation && (
          <>
            <Marker
              position={userLocation}
              icon={{
                url: "/marker-user.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              options={{
                clickable: false,
                visible: directions ? false : true,
              }}
            />
            <Circle
              center={userLocation}
              radius={10000}
              options={{
                strokeOpacity: 0.5,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                zIndex: 1,
                fillOpacity: 0.05,
                strokeColor: "#FBC02D",
                fillColor: "#FBC02D",
              }}
            />
          </>
        )}
        {clinics &&
          clinics?.map((clinic: google.maps.places.PlaceResult) => (
            <Marker
              key={clinic.place_id}
              title="Klinik"
              label={{
                text: clinic.name || "", // Nama klinik
                color: "#333", // Warna teks
                fontSize: "14px", // Ukuran font
                fontWeight: "500",
              }}
              icon={{
                url: "/marker-klinik.png",
                scaledSize: new window.google.maps.Size(40, 40),
                labelOrigin: new window.google.maps.Point(20, -10),
              }}
              position={{
                lat:
                  clinic.geometry && clinic.geometry.location
                    ? clinic.geometry.location.lat()
                    : 0,
                lng:
                  clinic.geometry && clinic.geometry.location
                    ? clinic.geometry.location.lng()
                    : 0,
              }}
              onClick={() =>
                fetchDirections({
                  lat:
                    clinic.geometry && clinic.geometry.location
                      ? clinic.geometry.location.lat()
                      : 0,
                  lng:
                    clinic.geometry && clinic.geometry.location
                      ? clinic.geometry.location.lng()
                      : 0,
                })
              }
            />
          ))}
        {directions && (
          <>
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                suppressInfoWindows: true,
                polylineOptions: {
                  strokeColor: "#4CAF50",
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                  clickable: false,
                },
              }}
            />
          </>
        )}
        {directions && (
          <OverlayView
            position={{
              lat: directions.routes[0].legs[0].end_location.lat(),
              lng: directions.routes[0].legs[0].end_location.lng(),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white rounded-md shadow-md w-max">
              <div className="flex items-center gap-2">
                <button onClick={() => setDirections(null)}>
                  <X size={18} strokeWidth={1.5} />
                </button>
                <h4 className="text-sm font-semibold">
                  {directions.routes[0].summary}
                </h4>
              </div>
              <p className="text-sm mt-2">
                Jarak :{" "}
                {directions.routes[0] &&
                  directions.routes[0].legs[0] &&
                  directions.routes[0].legs[0].distance &&
                  directions.routes[0].legs[0].distance.value / 1000}{" "}
                km
              </p>
              <p className="text-sm mt-2">
                Waktu :{" "}
                {directions.routes[0] &&
                  directions.routes[0].legs[0] &&
                  directions.routes[0].legs[0].duration &&
                  Math.ceil(
                    directions.routes[0].legs[0].duration.value / 60
                  )}{" "}
                menit
              </p>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </>
  );
};

export default GoogleMapView;
