import { useState } from 'react';
import { Button, Table } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import routes from '../../services/routes';
import QRCodeModal from '../QRCodeModal';

const ServicePointsTable: React.FC<ServicePointsTableProps> = ({
  serviceLocationId,
  servicePoints,
  denomination,
}) => {
  const [showQrCode, setShowQrCode] = useState<ServicePointRow>();

  return (
    <Table className="is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Reference</th>
          <th>QR</th>
        </tr>
      </thead>
      <tbody>
        {servicePoints.map((p) => (
          <tr key={p.servicePointId}>
            <td title={p.servicePointId}>…{p.servicePointId.substr(-8)}</td>
            <td
              className={
                servicePoints.filter((x) => x.name === p.name).length > 1
                  ? 'has-background-danger'
                  : undefined
              }
            >
              {p.name}
            </td>
            <td
              className={
                servicePoints.filter((x) => x.posReference === p.posReference).length > 1
                  ? 'has-background-danger'
                  : undefined
              }
            >
              {p.posReference}
            </td>
            <td onClick={() => setShowQrCode(p)} className="link">
              <i className="fas fa-qrcode" />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className="has-text-right">
            <Button
              renderAs={Link}
              to={
                routes.createServicePoints +
                '?' +
                new URLSearchParams({ serviceLocationId }).toString()
              }
            >
              + Add {denomination.plural}
            </Button>
            {showQrCode && (
              <QRCodeModal
                servicePointId={showQrCode.servicePointId}
                name={showQrCode.name}
                onClose={() => setShowQrCode(undefined)}
              />
            )}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default ServicePointsTable;

interface ServicePointsTableProps {
  serviceLocationId: string;
  servicePoints: ServicePointRow[];
  denomination: ServicePointDenomination;
}
