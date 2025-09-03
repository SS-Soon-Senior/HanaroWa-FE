import { client } from '@/apis/client';
import { useMutation } from '@tanstack/react-query';

interface CheckAvailabilityRequest {
  branchId: number;
  duration: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  availableRoomsCount: number;
}

interface CheckAvailabilityResponse {
  available: boolean;
  availableRoomsCount: number;
  timeSlots: TimeSlot[];
}

interface ApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: CheckAvailabilityResponse;
}

const useCheckAvailability = () => {
  return useMutation<ApiResponse, Error, CheckAvailabilityRequest>({
    mutationFn: async (data: CheckAvailabilityRequest) => {
      const response = await client.POST('/lesson/check/availability', {
        body: data,
      });

      if (response.error) {
        throw new Error('Failed to check availability');
      }

      return response.data as ApiResponse;
    },
  });
};

export default useCheckAvailability;
