import { useContext, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Heading,
  Notification,
  Section,
  Table,
  Tabs,
} from 'react-bulma-components';
import { Link, RouteComponentProps } from 'react-router-dom';

import { api, apiUri } from '../../services/api';
import { getApiConfig } from '../../services/auth';
import { fetchDashboardData, UserContext } from '../../services/contexts/user';
import routes from '../../services/routes';

const GenerateServicePoints: React.FC<RouteComponentProps> = ({ location, history }) => {
  const user = useContext(UserContext);
  const merchant = user?.merchant;
  const serviceLocationId = new URLSearchParams(location.search).get('serviceLocationId');

  const [tab, setTab] = useState('GENERATE');
  const [count, setCount] = useState('1');
  const [startReference, setStartReference] = useState('1');
  const [startName, setStartName] = useState('1');
  const [csv, setCsv] = useState('');
  const [names, setNames] = useState<string[]>(['1']);
  const [references, setReferences] = useState<string[]>(['1']);
  const [saving, setSaving] = useState(false);

  if (!serviceLocationId) {
    history.replace(routes.dashboard);
    return null;
  }
  if (!merchant) throw Error('Merchant not selected');

  const serviceLocation = merchant.serviceLocations.find(
    (l) => l.serviceLocationId === serviceLocationId
  );

  if (!serviceLocation) {
    return (
      <Section>
        <Card>
          <Card.Content>
            <Notification color="warning">
              Service Location {serviceLocationId} not found for merchant {merchant.name}
            </Notification>
          </Card.Content>
        </Card>
      </Section>
    );
  }

  const handleAddTables = async () => {
    setSaving(true);
    const ok = await api
      .post<ApiResponse>(
        apiUri('/servicePoints'),
        {
          serviceLocationId,
          servicePoints: references.map((posReference, i) => ({
            posReference,
            name: names[i],
          })),
        },
        getApiConfig()
      )
      .then((resp) => resp.data);
    if (ok.message !== 'OK') {
      setSaving(false);
      // TODO: display error properly
      alert(ok.message);
      return;
    }
    await fetchDashboardData();
    setSaving(false);
    history.push(routes.dashboard);
  };
  const handleGenerate = () => {
    const a = new Array(Number(count)).fill(0).map((_, i) => i);
    setNames(a.map((i) => getSequence(startName, i)));
    setReferences(a.map((i) => getSequence(startReference, i)));
  };
  const handlePaste: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const str = e.target.value;
    setCsv(str);
    const lines = str
      .split(/[\r\n]+/)
      .map((line) => line.split(/[,;|\t]/))
      .filter((l) => l.length >= 2);
    setReferences(lines.map((l) => l[0]));
    setNames(lines.map((l) => l[1]));
  };

  const { singular, plural } = serviceLocation.servicePointDenomination;

  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading>Create {plural}</Heading>
          <Tabs fullwidth>
            <Tabs.Tab active={tab === 'GENERATE'} onClick={() => setTab('GENERATE')}>
              Generate
            </Tabs.Tab>
            <Tabs.Tab active={tab === 'PASTE'} onClick={() => setTab('PASTE')}>
              Paste
            </Tabs.Tab>
            <Tabs.Tab active={tab === 'DISCOVER'} onClick={() => setTab('DISCOVER')}>
              Discover
            </Tabs.Tab>
          </Tabs>
          {tab === 'GENERATE' && (
            <>
              <Form.Field>
                <Form.Label>Number of {plural}</Form.Label>
                <Form.Input
                  type="number"
                  value={count}
                  color={!Number(count) || Number(count) < 1 ? 'danger' : undefined}
                  min={1}
                  max={300}
                  step={1}
                  maxLength={3}
                  onChange={(e) => setCount(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <Form.Label>Start Reference</Form.Label>
                <Form.Input
                  type="text"
                  value={startReference}
                  onChange={(e) => setStartReference(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <Form.Label>Start Display Text</Form.Label>
                <Form.Input
                  type="text"
                  value={startName}
                  onChange={(e) => setStartName(e.target.value)}
                />
              </Form.Field>
              <Button onClick={handleGenerate}>Generate</Button>
            </>
          )}
          <div style={{ margin: '20px 0 40px 0' }}>
            {tab === 'PASTE' && (
              <>
                <p>
                  Paste the information from Excel or any text editor. Format must be one {singular}{' '}
                  per line, and columns separated by one of these characters: comma (,), semi-comma
                  (;), tab (\t), pipe (|). First column is the POS reference, second column is the
                  text that will appear to users.
                </p>
                <Form.Field>
                  <Form.Textarea value={csv} onChange={handlePaste} />
                </Form.Field>
              </>
            )}
            {tab === 'DISCOVER' && (
              <p>The Discover function is not implemented for this POS brand.</p>
            )}
          </div>
          <Table>
            <thead>
              <tr>
                <th>POS Reference</th>
                <th>Display Text</th>
              </tr>
            </thead>
            <tbody>
              {references.map((_, i) => (
                <tr key={i}>
                  <td>
                    <Form.Input
                      type="text"
                      value={references[i]}
                      onChange={(e) =>
                        setReferences((a) => [...a.slice(0, i), e.target.value, ...a.slice(i + 1)])
                      }
                      color={
                        references.indexOf(references[i]) < i || !references[i]
                          ? 'danger'
                          : undefined
                      }
                      title={
                        references.indexOf(references[i]) < i ? 'Duplicate Reference ID' : undefined
                      }
                    />
                  </td>
                  <td>
                    <div className="is-flex is-flex-direction-row">
                      <span style={{ marginTop: 8, marginRight: 10 }}>{singular}</span>
                      <Form.Input
                        type="text"
                        value={names[i]}
                        onChange={(e) =>
                          setNames((a) => [...a.slice(0, i), e.target.value, ...a.slice(i + 1)])
                        }
                        color={names.indexOf(names[i]) < i || !names[i] ? 'danger' : undefined}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button renderAs={Link} to={routes.dashboard} style={{ marginRight: 20 }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddTables}
            disabled={!names.length || saving}
            loading={saving}
            color="primary"
          >
            Save
          </Button>
        </Card.Content>
      </Card>
    </Section>
  );
};

const endInNumber = new RegExp(/\d+$/);

const getSequence = (base: string, index: number): string => {
  if (Number(base)) return padNum(Number(base) + index, base.length);
  const match = base.match(endInNumber);
  if (match) {
    const numLen = match[0].length;
    return (
      base.substring(0, base.length - numLen) + padNum(Number(base.substr(-numLen)) + index, numLen)
    );
  }
  return base + (index + 1).toString();
};

const padNum = (num: number, len: number) => num.toString().padStart(len, '0');

export default GenerateServicePoints;
