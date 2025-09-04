// src/hooks/useReservationCountWS.ts
'use client';

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';

// src/hooks/useReservationCountWS.ts

type ReservationCount = {
  gisuId: number;
  reserved: number;
  capacity: number;
  ts: number;
};

export default function useReservationCountWS(gisuId: number) {
  const [data, setData] = useState<ReservationCount | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!gisuId) return;

    const httpBase = process.env.NEXT_PUBLIC_API_BASE_URL; // 예: http://localhost:8080
    const client = new Client({
      // WebSocket 순수 사용: brokerURL: `${wsBase}/ws`
      // SockJS 사용(서버에서 withSockJS 켰다면 권장):
      webSocketFactory: () => new SockJS(`${httpBase}/ws`),

      reconnectDelay: 2000, // 재연결
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: () => {},

      // JWT 쓰면:
      // connectHeaders: { Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}` },
      onConnect: () => {
        const sub = client.subscribe(
          `/topic/lessons/${gisuId}/count`,
          (msg: IMessage) => setData(JSON.parse(msg.body))
        );
        // 필요시 초기 값을 REST로 먼저 가져오고 여기에 병합해도 OK
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
      clientRef.current = null;
    };
  }, [gisuId]);

  return data; // { reserved, capacity, ts }
}
