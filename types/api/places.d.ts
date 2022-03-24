interface ApiPostPlacesScan {
  filters: PlacesGetFilters;
  lastKey?: Record<string, unknown>;
}

interface PlacesGetFilters {
  name?: string;
  vicinity?: string;
}

interface ApiPostPlacesGetResponse extends ApiResponse {
  place: PlaceDetailed;
}

interface ApiPostPlacesScanResponse extends ApiResponse {
  placesRows: Place[];
  lastKey?: Record<string, unknown>;
}
