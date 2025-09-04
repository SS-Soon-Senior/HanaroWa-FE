import { useEffect, useState } from 'react';
import getFacilities from './getFacilities';

interface FacilityImage {
  imageUrl?: string;
}

export interface Facility {
  facilityId?: number;
  facilityName?: string;
  facilityDescription?: string;
  mainImage?: FacilityImage;
}

interface FacilityListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    branchName: string;
    facilities: Facility[];
  };
}

export const useGetFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [branchName, setBranchName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await getFacilities();
        const data = res.data as unknown as FacilityListResponse;

        if (data?.isSuccess) {
          setFacilities(data.result.facilities ?? []);
          setBranchName(data.result.branchName ?? '');
        } else {
          console.error('API 실패:', data?.message);
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return { facilities, branchName, loading };
};
