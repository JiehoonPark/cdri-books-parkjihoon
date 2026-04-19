const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY ?? '';

if (!KAKAO_REST_API_KEY) {
  console.warn(
    '[env] VITE_KAKAO_REST_API_KEY가 설정되지 않았습니다. .env.local 파일에 Kakao REST API Key를 추가해주세요. 검색 API 호출은 실패합니다.',
  );
}

export const env = {
  KAKAO_REST_API_KEY,
} as const;
