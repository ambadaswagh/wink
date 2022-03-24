import { useEffect, useState } from 'react';
import { Box, Button, Card, Heading, Section, Table } from 'react-bulma-components';

import { api, apiUri } from '../../services/api';
import { history } from '../../services/routes';

const PlacesDetails: React.FC<PlacesDetailsProps> = ({ placeId, onFetch }) => {
  const [error, setError] = useState<string>();
  const [place, setPlaceObject] = useState<PlaceDetailed>();

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get<ApiPostPlacesGetResponse>(apiUri('places/get', [placeId]));
      if (data.message !== 'OK') {
        setError(data.message || 'Network Error');
        return;
      }
      setPlaceObject(data.place);
      onFetch(placeId);
    };
    load();
  }, [placeId, onFetch]);

  if (error) {
    return (
      <Section>
        <Card>
          <Card.Content>
            <Heading>An error occurred</Heading>
            <p>The following error occurred when retrieving the place:</p>
            <p className="has-text-danger">{error}</p>
          </Card.Content>
        </Card>
      </Section>
    );
  }

  if (!place) {
    return (
      <Section style={{ textAlign: 'center' }}>
        Retrieving place...
        <div className="page-loader" />
      </Section>
    );
  }

  const naText: string = 'N/A';

  const formFields = [
    'place_id',
    'name',
    'reference',
    'business_status',
    'vicinity',
    'geometry',
    'photos',
    'price_level',
    'rating',
    'user_ratings_total',
    'types',
    'icon',
    'icon_background_color',
    'icon_mask_base_uri',
    'plus_code',
    'scope',
    'opening_hours',
    'detailsFetchTs',
    'formatted_phone_number',
    'international_phone_number',
    'reviews',
    'url',
    'formatted_address',
    'address_components',
    'website',
    'adr_address',
    'utc_offset',
  ];
  const additionalFields = Object.keys(place).filter((f) => !formFields.includes(f));

  return (
    <div>
      <Box style={{ margin: '30px 0' }}>
        <Heading size={2}>
          <img src={place.icon} alt="" style={{ height: '0.8em', marginRight: 10 }} />
          {place.name}
          <Button remove style={{ float: 'right' }} onClick={() => history.goBack()} />
        </Heading>

        <Table className="is-fullwidth is-striped is-hoverable" style={{ margin: 4 }}>
          <tbody>
            <tr>
              <td>Place ID</td>
              <td>{place.place_id}</td>
            </tr>
            {place.business_status !== 'OPERATIONAL' && (
              <tr>
                <td>Business Status</td>
                <td className="is-danger">{place.business_status || naText}</td>
              </tr>
            )}
            <tr>
              <td>Address</td>
              <td>{place.formatted_address || place.vicinity || naText}</td>
            </tr>
            <tr>
              <td>Map</td>
              <td>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat}-${place.geometry.location.lng}&query_place_id=${place.place_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fas fa-map-marker-alt" style={{ marginRight: 6 }} />
                  {place.geometry.location.lat},{place.geometry.location.lng}
                </a>
              </td>
            </tr>
            <tr>
              <td>Google Maps URL</td>
              <td>
                <a href={place.url} target="_blank" rel="noreferrer">
                  {place.url}
                </a>
              </td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>
                {place.formatted_phone_number ? (
                  <a href={`tel:${place.international_phone_number}`}>
                    {place.formatted_phone_number}
                  </a>
                ) : (
                  naText
                )}
              </td>
            </tr>
            <tr>
              <td>Website</td>
              <td>
                {place.website ? (
                  <a href={place.website} target="_blank" rel="noreferrer">
                    {place.website}
                  </a>
                ) : (
                  naText
                )}
              </td>
            </tr>
            <tr>
              <td>Price Level</td>
              <td>{place.price_level ? place.price_level : naText}</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>{place.rating ? place.rating : naText}</td>
            </tr>
            <tr>
              <td>Ratings Count</td>
              <td>{place.user_ratings_total ? place.user_ratings_total : naText}</td>
            </tr>
            <tr>
              <td>Types</td>
              <td>{place.types.map((t) => t.replaceAll('_', ' ')).join(' - ')}</td>
            </tr>
            <tr>
              <td>Details Date</td>
              <td>
                {place.detailsFetchTs
                  ? new Date(place.detailsFetchTs * 1000).toLocaleDateString()
                  : naText}
              </td>
            </tr>
            <tr>
              <td>Icon</td>
              <td>
                <img
                  src={place.icon}
                  alt="place icon"
                  style={{
                    height: '1.5em',
                    backgroundColor: place.icon_background_color,
                    padding: 3,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Viewport</td>
              <td>
                <p>
                  NE: {place.geometry.viewport.northeast.lat},
                  {place.geometry.viewport.northeast.lng}
                </p>
                <p>
                  SW: {place.geometry.viewport.southwest.lat},
                  {place.geometry.viewport.southwest.lng}
                </p>
              </td>
            </tr>
            <tr>
              <td>Photos</td>
              <td>{place.photos?.length || '0'}</td>
            </tr>
            <tr>
              <td>Plus code</td>
              <td>
                <p>Compound: {place.plus_code.compound_code}</p>
                <p>Global: {place.plus_code.global_code}</p>
              </td>
            </tr>
            <tr>
              <td>Scope</td>
              <td>{place.scope}</td>
            </tr>
            <tr>
              <td>Opening Hours</td>
              <td>
                {place.opening_hours?.weekday_text?.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </td>
            </tr>
            <tr>
              <td>Timezone</td>
              <td>
                {place.utc_offset
                  ? `UTC ${place.utc_offset > 0 ? '+' : '-'}${place.utc_offset / 60}`
                  : naText}
              </td>
            </tr>
            <tr>
              <td>
                Adr{' '}
                <a href="http://microformats.org/wiki/adr" target="_blank" rel="noreferrer">
                  <sup>
                    <i className="fas fa-info-circle" title="Adr Microformat" />
                  </sup>
                </a>
              </td>
              <td>
                <pre>{place.adr_address.replaceAll(' <s', '\n<s')}</pre>
              </td>
            </tr>
            {additionalFields.map((f) => (
              <tr key={f}>
                <td>{f}</td>
                <td>{JSON.stringify((place as unknown as Record<string, unknown>)[f])}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </div>
  );
};

export default PlacesDetails;

interface PlacesDetailsProps {
  placeId: string;
  onFetch: (placeId: string) => void;
}
