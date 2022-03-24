import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { Button, Loader, Modal } from 'react-bulma-components';

const QRCodeModal: React.FC<QRCodeModalProps> = ({ servicePointId, onClose, name }) => {
  const [dataUrl, setDataUrl] = useState<string>();
  const url = `https://winkapp.me/r/${servicePointId}`;

  useEffect(() => {
    QRCode.toDataURL(url, {
      scale: 8,
      errorCorrectionLevel: 'high',
      color: {
        light: '#ffd3db',
        dark: '#4f3ceb',
      },
    }).then(setDataUrl);
  }, [url]);

  return (
    <Modal show onClose={onClose} closeOnEsc closeOnBlur>
      <Modal.Card>
        <Modal.Card.Header showClose={false}>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </Modal.Card.Header>
        <Modal.Card.Body className="has-text-centered">
          {dataUrl ? <img src={dataUrl} alt="qr code" /> : <Loader />}
        </Modal.Card.Body>
        <Modal.Card.Footer className="is-justify-content-flex-end">
          {dataUrl && (
            <Button renderAs="a" download={`${servicePointId}-${name}.png`} href={dataUrl}>
              Download (.png)
            </Button>
          )}
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
};

export default QRCodeModal;

interface QRCodeModalProps {
  servicePointId: string;
  name: string;
  onClose: () => void;
}
