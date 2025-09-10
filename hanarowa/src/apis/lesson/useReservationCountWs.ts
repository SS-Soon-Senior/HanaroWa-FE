import { getAccessToken } from '@/utils/common/auth';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';

type ReservationCount = {
  lessonGisuId: number;
  reserved: number;
  capacity: number;
};

export function useReservationCountWS(lessonGisuId: number) {
  const [data, setData] = useState<ReservationCount | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!lessonGisuId) return;

    const httpBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const accessToken = getAccessToken();

    const client = new Client({
      webSocketFactory: () => new SockJS(`${httpBase}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      connectHeaders: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {},

      onConnect: () => {
        setIsConnected(true);

        client.subscribe(
          `/topic/lesson/${lessonGisuId}/count`,
          (msg: IMessage) => {
            try {
              const parsedData = JSON.parse(msg.body);
              const transformedData: ReservationCount = {
                lessonGisuId: parsedData.gisuId,
                reserved: parsedData.reservedCount,
                capacity: parsedData.capacity,
              };
              setData(transformedData);
            } catch (error) {
              console.warn('Error parsing WebSocket message:', error);
            }
          },
          accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
        );
      },

      onDisconnect: () => {
        setIsConnected(false);
      },

      onStompError: (frame) => {
        console.warn('WebSocket STOMP error:', frame.headers['message']);
        setIsConnected(false);
      },

      onWebSocketError: () => {
        setIsConnected(false);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        setIsConnected(false);
      }
    };
  }, [lessonGisuId]);

  return { data, isConnected };
}
