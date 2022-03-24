interface Place {
  place_id: string;
  business_status: string;
  geometry: {
    location: PlaceCoords;
    viewport: {
      northeast: PlaceCoords;
      southwest: PlaceCoords;
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    periods?: PlaceOpeningHoursPeriod[];
    weekday_text?: string[];
  };
  photos: PlacePhoto[];
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
}

interface PlaceDetailed extends Place {
  detailsFetchTs: number;
  formatted_phone_number?: string;
  international_phone_number?: string;
  reviews: unknown[];
  url: string;
  formatted_address: string;
  address_components: PlaceAddressComponent[];
  website?: string;
  adr_address: string;
  utc_offset: number;
}

interface PlaceCoords {
  lat: number;
  lng: number;
}

interface PlacePhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface PlaceOpeningHoursPeriod {
  open: { day: number; time: string };
  close: { day: number; time: string };
}

interface PlaceAddressComponent {
  short_name: string;
  long_name: string;
  types: string[];
}
