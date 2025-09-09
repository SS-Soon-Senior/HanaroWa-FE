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
      webSocketFactory: () => {
        // 기본 SockJS 연결 (인증은 STOMP 레벨에서 처리)
        const sockJS = new SockJS(`${httpBase}/ws`);

        // SockJS 연결 이벤트 리스너 추가
        sockJS.addEventListener('open', () => {
          console.log('SockJS connection opened');
        });

        sockJS.addEventListener('message', (event) => {
          console.log('SockJS message received:', event.data);
        });

        sockJS.addEventListener('close', (event) => {
          console.log('SockJS connection closed:', event.code, event.reason);
        });

        sockJS.addEventListener('error', (error) => {
          console.error('SockJS error:', error);
        });

        return sockJS;
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      connectHeaders: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
      onConnect: (frame) => {
        console.log('Connection frame:', frame);
        setIsConnected(true);

        try {
          const subscription = client.subscribe(
            `/topic/lesson/${lessonGisuId}/count`,
            (msg: IMessage) => {
              try {
                const parsedData = JSON.parse(msg.body);
                console.log('Received reservation count:', parsedData);

                // 서버에서 온 데이터 구조를 클라이언트 타입에 맞게 변환
                const transformedData: ReservationCount = {
                  lessonGisuId: parsedData.gisuId,
                  reserved: parsedData.reservedCount,
                  capacity: parsedData.capacity,
                };

                setData(transformedData);
              } catch (error) {
                console.error('Error parsing WebSocket message:', error);
              }
            },
            {
              // 구독 헤더에도 인증 정보 추가
              Authorization: `Bearer ${accessToken}`,
            }
          );
          console.log(subscription);
          console.log('Subscribed to:', `/topic/lesson/${lessonGisuId}/count`);
        } catch (error) {
          console.error('Error subscribing to WebSocket topic:', error);
        }
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected for lesson:', lessonGisuId);
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error(
          'WebSocket STOMP error:',
          frame.headers['message'],
          frame.body
        );
        setIsConnected(false);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket connection error:', error);
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
