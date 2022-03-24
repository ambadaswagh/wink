import net from 'net';

const networkTimeout = 30 * 1000; // connect + send message + receive all responses

export const sendVectronMessage = (socket: net.Socket, message: unknown): void => {
  const payload = JSON.stringify(message);
  const size = payload.length;
  const buf = Buffer.allocUnsafe(4);
  buf.writeUInt32LE(size, 0);
  socket.write(buf);
  socket.write(payload, 'latin1');
};

export const receiveVectronMessage = async (socket: net.Socket): Promise<string[]> => {
  let messageLength: number | undefined;
  let messageBuffer: Buffer | undefined;
  let messageOffset = 0;

  return new Promise<string[]>((resolve) => {
    const messages: string[] = [];
    // set a timeout for the whole operation (connect + send command + wait for all data)
    const timeout = setTimeout(() => {
      try {
        socket.destroy();
        socket.unref();
      } catch (e) {
        /* */
      }
      resolve(messages);
    }, networkTimeout);
    socket.on('data', (d) => {
      let offset = 0;
      if (messageLength === undefined) {
        messageLength = d.readInt32LE(0);
        messageBuffer = Buffer.allocUnsafe(messageLength);
        offset += 4;
      }
      if (messageBuffer && d.length > offset) {
        d.copy(messageBuffer, messageOffset, offset);
        messageOffset += d.length - offset;
        if (messageOffset >= messageLength) {
          messages.push(messageBuffer.toString('latin1'));
          messageLength = undefined;
          messageBuffer = undefined;
          messageOffset = 0;
        }
      }
    });
    socket.on('close', () => {
      clearTimeout(timeout);
      resolve(messages);
    });
  });
};

export const vectronCommand = async (
  conn: VectronConnection,
  message: unknown
): Promise<string[]> => {
  const socket = net.createConnection(conn);
  socket.on('connect', () => sendVectronMessage(socket, message));
  socket.on('error', (e) => console.error('Vectron: network error: ' + e.message));
  return receiveVectronMessage(socket);
};

export interface VectronConnection {
  host: string;
  port: number;
}
