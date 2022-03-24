import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Loader, Notification, Table } from 'react-bulma-components';
import { Link, RouteComponentProps } from 'react-router-dom';

import { api, apiUri } from '../../services/api';
import routes from '../../services/routes';
import PlacesDetails from './PlaceDetails';
import classes from './Places.module.scss';

const excludedTypes = ['restaurant', 'establishment', 'point_of_interest', 'food'];

const icons: Record<string, string> = {
  restaurant: 'fas fa-utensils',
  food: 'fas fa-fish',
  point_of_interest: 'fas fa-archway',
  establishment: 'fas fa-store-alt',
  gas_station: 'fas fa-gas-pump',
  book_store: 'fas fa-book',
  supermarket: 'fas fa-shopping-cart',
  grocery_or_supermarket: 'fas fa-shopping-basket',
  cafe: 'fas fa-coffee',
  store: 'fas fa-store',
  meal_takeaway: 'fas fa-pizza-slice',
  bakery: 'fas fa-bread-slice',
  bar: 'fas fa-cocktail',
  lodging: 'fas fa-bed',
  park: 'fas fa-tree',
  meal_delivery: 'fas fa-hamburger',
  liquor_store: 'fas fa-wine-bottle',
  night_club: 'fas fa-music',
  spa: 'fas fa-spa',
  health: 'fas fa-first-aid',
  parking: 'fas fa-parking',
  travel_agency: 'fas fa-plane',
  place_of_worship: 'fas fa-place-of-worship',
  furniture_store: 'fas fa-couch',
  home_goods_store: '',
  atm: 'fas fa-hand-holding-usd',
  car_wash: 'fas fa-car-side',
  convenience_store: 'fas fa-hotdog',
  finance: 'fas fa-comments-dollar',
  car_repair: 'fas fa-tools',
  gym: 'fas fa-dumbbell',
  school: 'fas fa-chalkboard-teacher',
  clothing_store: 'fas fa-socks',
  art_gallery: 'fas fa-palette',
  movie_theater: 'fas fa-film',
};

const PlacesList: React.FC<RouteComponentProps<PlaceDetailsParams>> = ({ match }) => {
  const placeId = match.params.id;

  const [filterState, setFilterState] = useState<PlacesGetFilters>({
    name: '',
    vicinity: '',
  });
  const [lastKey, setLastKey] = useState<unknown>();
  const [placesRows, setPlacesRows] = useState<Place[]>();
  const [tableSortConfig, setTableSortConfig] = useState({
    key: '',
    ascending: true,
  });
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const changeFilterState: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    setFilterState({
      ...filterState,
      [name]: value,
    });
    setLastKey(undefined);
  };

  const submitFilter = useCallback(
    async (e?: React.BaseSyntheticEvent) => {
      if (e) e.preventDefault();
      if (!lastKey) setPlacesRows(undefined);
      setError(undefined);
      setLoading(true);
      const res = await api
        .post<ApiPostPlacesScanResponse>(apiUri('places/scan'), {
          filters: filterState,
          lastKey,
        })
        .then((resp) => resp.data);
      if (res.message === 'ok') {
        setPlacesRows((places) => (places ? places.concat(res.placesRows) : res.placesRows));
        setLastKey(res.lastKey);
      } else {
        setError(res.message || 'Network Error');
      }
      setLoading(false);
    },
    [filterState, lastKey]
  );

  // we want to run this only once when the page opens, with empty filters
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void submitFilter(), []);

  const sortedPlaces = useMemo(() => {
    if (!placesRows || !tableSortConfig.key) return placesRows;

    const order = tableSortConfig.ascending ? 1 : -1;
    const key = tableSortConfig.key;
    return placesRows
      .concat()
      .sort(
        (a, b) =>
          order *
          (a as unknown as Record<string, string>)[key].localeCompare?.(
            (b as unknown as Record<string, string>)[key]
          )
      );
  }, [placesRows, tableSortConfig]);

  const requestTableSort = useCallback((key: string) => {
    setTableSortConfig((tableSortConfig) => ({
      key,
      ascending: tableSortConfig.key === key ? !tableSortConfig.ascending : true,
    }));
  }, []);

  const markFetch = useCallback((placeId) => {
    setPlacesRows(
      (places) =>
        places &&
        places.map((p) =>
          p.place_id === placeId && !('detailsFetchTs' in p)
            ? Object.assign(p, { detailsFetchTs: Date.now() / 1000 })
            : p
        )
    );
  }, []);

  if (placeId) {
    return <PlacesDetails placeId={placeId} onFetch={markFetch} />;
  }

  return (
    <div className="mt-4">
      <div style={{ marginBottom: 20 }}>
        <form className="is-flex is-flex-direction-row" onSubmit={submitFilter}>
          <Form.Input
            type="text"
            placeholder="Name"
            name="name"
            value={filterState.name}
            onChange={changeFilterState}
            style={{ marginRight: 20 }}
          />
          <Form.Input
            type="text"
            placeholder="Vicinity"
            name="vicinity"
            value={filterState.vicinity}
            onChange={changeFilterState}
            style={{ marginRight: 20 }}
          />
          <Button>Filter</Button>
        </form>
      </div>
      {error ? (
        <Notification color="danger">{error}</Notification>
      ) : sortedPlaces ? (
        sortedPlaces.length ? (
          <Table className="is-fullwidth is-hoverable is-striped mt-3" style={{ marginBottom: 20 }}>
            <thead>
              <tr>
                <th
                  onClick={() => requestTableSort('place_id')}
                  className="is-clickable is-unselectable"
                >
                  ID&nbsp;
                  {tableSortConfig.key === 'place_id' && tableSortConfig.ascending && (
                    <i className="fas fa-sort-up is-vcentered"></i>
                  )}
                  {tableSortConfig.key === 'place_id' && !tableSortConfig.ascending && (
                    <i className="fas fa-sort-down is-vcentered"></i>
                  )}
                </th>
                <th
                  onClick={() => requestTableSort('name')}
                  className="is-clickable is-unselectable"
                >
                  Name&nbsp;
                  {tableSortConfig.key === 'name' && tableSortConfig.ascending && (
                    <i className="fas fa-sort-up is-vcentered"></i>
                  )}
                  {tableSortConfig.key === 'name' && !tableSortConfig.ascending && (
                    <i className="fas fa-sort-down is-vcentered"></i>
                  )}
                </th>
                <th
                  onClick={() => requestTableSort('vicinity')}
                  className="is-clickable is-unselectable"
                >
                  Vicinity&nbsp;
                  {tableSortConfig.key === 'vicinity' && tableSortConfig.ascending && (
                    <i className="fas fa-sort-up is-vcentered"></i>
                  )}
                  {tableSortConfig.key === 'vicinity' && !tableSortConfig.ascending && (
                    <i className="fas fa-sort-down is-vcentered"></i>
                  )}
                </th>
                <th colSpan={4}>Features</th>
              </tr>
            </thead>

            <tbody style={{ fontSize: 'small' }}>
              {sortedPlaces.map((place: Place) => (
                <tr key={place.place_id}>
                  <td title={place.place_id} style={{ whiteSpace: 'nowrap' }}>
                    …{place.place_id.substr(-6)}
                  </td>
                  <td className={classes.textCell} title={place.name}>
                    <img src={place.icon} alt="icon" style={{ height: '1em', marginRight: 3 }} />
                    <Link to={`${routes.places}/${place.place_id}`}>{place.name}</Link>
                  </td>
                  <td className={classes.textCell} title={place.vicinity}>
                    <a
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat}-${place.geometry.location.lng}&query_place_id=${place.place_id}`}
                      rel="noreferrer"
                    >
                      <i className="fas fa-map-marker-alt"></i>
                    </a>
                    &nbsp;
                    {place.vicinity.replace(/, Berlin$/, '')}
                  </td>
                  <td
                    className={classes.ratingsCell}
                    title={place.rating ? `${place.rating}-star rating` : undefined}
                  >
                    {place.rating >= 1 &&
                      new Array(Math.floor(place.rating))
                        .fill(null)
                        .map((_, idx) => <i key={idx} className="fas fa-star" />)}
                    {place.rating - Math.floor(place.rating) >= 0.5 && (
                      <i className="fas fa-star-half" />
                    )}
                  </td>
                  <td className={classes.priceCell}>
                    {place.price_level &&
                      new Array(place.price_level)
                        .fill(null)
                        .map(() => '$')
                        .join('')}
                  </td>
                  <td className={classes.typesCell}>
                    {place.types
                      ?.filter((t) => !excludedTypes.includes(t))
                      .map((t) => (
                        <i
                          key={t}
                          className={icons[t] || 'fas fa-info'}
                          title={t.replaceAll('_', ' ')}
                        />
                      ))}
                  </td>
                  <td>{'detailsFetchTs' in place && <i className="fas fa-eye" />}</td>
                </tr>
              ))}
            </tbody>
            {lastKey && (
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    <Button onClick={submitFilter} loading={loading}>
                      Load more...
                    </Button>
                  </td>
                  <td colSpan={4} className="has-text-right">
                    {placesRows?.length || 0} places shown
                  </td>
                </tr>
              </tfoot>
            )}
          </Table>
        ) : (
          <div>No results for the selected filters</div>
        )
      ) : (
        <div className="is-flex is-justify-content-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PlacesList;

interface PlaceDetailsParams {
  id: string;
}
