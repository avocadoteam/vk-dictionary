import io from 'socket.io-client';
import { initCallbacks } from './callbacks';

const ns = '/exampleNamespace';

let selectedListConnected = false;

let socket: SocketIOClient.Socket;

export const connectListSocket = (query: string) => {
  console.debug('list connecting');
  if (selectedListConnected) return;
  socket = io(ns, { query: query.replace(/\?vk_/g, 'vk_') });

  socket.on('connect', () => {
    console.debug('list ws connected');
    initCallbacks(socket);
    selectedListConnected = true;
    // const state = store.getState();

    // const { listguid } = selectedBoardListInfo(state);
    // const userId = getUserId(state);
    // joinRoom(userId, listguid);
  });
  socket.on('disconnect', () => {
    console.debug('list ws disconnected');
    selectedListConnected = false;
  });
};

export const joinRoom = (userId: number, listGUID?: string) => {
  socket.emit('joinRoom', { listGUID, userId });
};
export const leaveRoom = (userId: number, listGUID?: string) => {
  socket.emit('leaveRoom', { listGUID, userId });
};
