const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

if (!KAKAO_REST_API_KEY) {
  throw new Error(
    'VITE_KAKAO_REST_API_KEY 환경변수가 설정되지 않았습니다. .env.local 파일에 키를 추가해주세요.',
  );
}

export const env = {
  KAKAO_REST_API_KEY,
} as const;
