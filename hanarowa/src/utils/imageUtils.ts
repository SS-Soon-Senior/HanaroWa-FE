// 기본 이미지 URL
export const DEFAULT_IMAGE_URL =
  'https://hanarowa-upload.s3.ap-northeast-2.amazonaws.com/uploads/hanabank.png';

/**
 * URL이 유효한지 검사하는 함수
 * @param url 검사할 URL 문자열
 * @returns 유효한 URL이면 true, 그렇지 않으면 false
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 이미지 URL을 검증하고 유효하지 않으면 기본 이미지 URL을 반환하는 함수
 * @param imageUrl 검증할 이미지 URL
 * @param defaultUrl 기본 이미지 URL (선택사항, 기본값: DEFAULT_IMAGE_URL)
 * @returns 유효한 이미지 URL 또는 기본 이미지 URL
 */
export const getValidImageUrl = (
  imageUrl: string | null | undefined,
  defaultUrl: string = DEFAULT_IMAGE_URL
): string => {
  if (!imageUrl || !isValidUrl(imageUrl)) {
    return defaultUrl;
  }
  return imageUrl;
};

/**
 * 이미지 URL 배열을 검증하고 유효한 URL만 필터링하는 함수
 * @param imageUrls 검증할 이미지 URL 배열
 * @param defaultUrl 기본 이미지 URL (선택사항, 기본값: DEFAULT_IMAGE_URL)
 * @returns 유효한 이미지 URL 배열
 */
export const getValidImageUrls = (
  imageUrls: (string | null | undefined)[],
  defaultUrl: string = DEFAULT_IMAGE_URL
): string[] => {
  return imageUrls
    .map((url) => getValidImageUrl(url, defaultUrl))
    .filter((url) => url !== defaultUrl || imageUrls.length === 0);
};
