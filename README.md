# CDRI Books — 박지훈

> Kakao Daum 도서 검색 API 기반 책 검색 / 찜하기 SPA. CDRI 프론트엔드 사전과제 제출용 저장소.

## 프로젝트 개요

Kakao 도서 검색 API를 기반으로 책을 검색하고, 관심 있는 책을 찜 목록에 담아 **브라우저를 완전히 종료했다 열어도 유지**되는 SPA(Single Page Application)입니다. 요구사항에 맞춰 **React · TypeScript · TanStack Query**를 필수 스택으로 사용했고, FSD(Feature-Sliced Design) 아키텍처 위에서 상태·뷰·도메인을 레이어로 분리했습니다.

주요 기능은 다음과 같습니다.

- 도서 검색 (키워드·상세 조건 검색, 최근 검색어 자동 저장)
- 검색 결과 리스트 + 무한 스크롤 페이지네이션
- 책 상세 정보 아코디언(접힘/펼침) UI
- 찜하기 토글 + 찜 페이지 + 빈 상태 UI
- 검색 상태 URL 동기화 (새로고침·뒤로가기·공유 보존)

## 실행 방법 및 환경 설정

```bash
git clone https://github.com/JiehoonPark/cdri-books-parkjihoon.git
cd cdri-books-parkjihoon
npm install

# 메일에 첨부된 .env 파일을 프로젝트 루트(cdri-books-parkjihoon/)에 배치
# 포함 내용: VITE_KAKAO_REST_API_KEY=...

npm run dev          # http://localhost:5173
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
```

- Node.js 18+ 필요
- 평가용 `.env` 파일은 메일에 별도 첨부드렸습니다. 프로젝트 루트에 배치해주시면 `VITE_KAKAO_REST_API_KEY`가 Vite 환경변수로 주입됩니다.

## 라이브러리 선택 이유

| 영역            | 선택                         | 선택 이유                                                                                                                                                                                                            |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 번들러          | **Vite 8**                   | HMR이 빠르고 설정이 경량합니다. 과제 규모(SPA · CSR)에서 Next.js의 SSR/RSC 가치를 증명할 지면이 부족하다고 판단해 Vite 쪽이 "필수 스택인 React.js" 문구와도 한 점 모호함 없이 맞닿는다고 생각했습니다.               |
| 언어            | **TypeScript 6 (strict)**    | `strict`, `noUnusedLocals`, `noUncheckedIndexedAccess` 수준까지 켜서 any를 전혀 사용하지 않았습니다. Kakao 응답 타입(`KakaoBook`, `KakaoSearchMeta`)은 `entities/book/types.ts`에 한 번만 정의하고 재사용합니다.     |
| 서버 상태       | **@tanstack/react-query v5** | 필수 스택입니다. "더보기" UI가 Figma에 없고 무한 스크롤이 자연스럽다고 판단해 `useInfiniteQuery`를 채택했고, `staleTime 5분`·`refetchOnWindowFocus: false`로 불필요한 재호출을 막았습니다.                           |
| 클라이언트 상태 | **Zustand + persist**        | JD에도 명시된 상태관리 중 하나였고, 찜 기능의 요구사항("브라우저 재시작 후에도 유지")을 `persist` 한 줄로 충족할 수 있다는 점이 결정적이었습니다. selector 단위 구독으로 개별 하트 버튼만 리렌더되도록 구성했습니다. |
| 라우팅          | **React Router v7**          | `/`, `/wishlist` 두 라우트만 필요했고, `useSearchParams`로 검색 상태(`?q=`, `?target=`)를 URL에 기록해 새로고침·뒤로가기에서도 상태가 보존되도록 했습니다.                                                           |
| 스타일          | **Tailwind CSS v4**          | `@theme` 디렉티브로 Figma에서 뽑아낸 컬러·타이포그래피 토큰을 한 파일(`src/app/index.css`)에 집중시켰습니다. 디자인이 바뀌면 이 파일만 고치면 됩니다.                                                                |
| HTTP            | **axios**                    | `Authorization: KakaoAK ${KEY}` 헤더를 request 인터셉터에서 주입하는 게 fetch보다 간결하다고 판단했습니다. 에러 객체의 일관성도 좋습니다.                                                                            |
| 유틸            | **clsx**                     | 조건부 className 조합 한 줄 유틸. `tailwind-merge`는 충돌 난 유틸 클래스가 없어 도입하지 않았습니다.                                                                                                                 |

## 폴더 구조 및 주요 코드 설명

### 프로젝트 구조 (FSD)

FSD(Feature-Sliced Design)를 선택한 이유는 세 가지입니다. 첫째, **도메인 중심 응집**입니다. 검색·찜·도서 같은 비즈니스 도메인 단위로 폴더를 나눠서 관련 UI·상태·API가 한곳에 모이고, 하나의 기능을 수정할 때 탐색 범위가 해당 slice 안에서 대부분 해결됩니다. 둘째, **단방향 의존성**으로 변경 영향 범위가 좁아집니다. `entities/book`을 수정해도 상위 `features/search`의 규약이 깨지지 않는 한 페이지·위젯 레이어에는 영향이 전파되지 않습니다. 셋째, **Public API(`index.ts`) 격리**로 slice 내부를 자유롭게 리팩토링해도 외부 import 경로가 바뀌지 않습니다.

과제 규모(2 페이지, 두 도메인)에는 다소 과하다고 볼 수도 있으나, 도메인 경계가 뚜렷한 문제라 레이어 분리의 이득이 즉시 드러났고, 실무로 확장될 때도 같은 규칙을 유지할 수 있어 선택했다고 판단했습니다.

```
src/
├── app/                  진입점, 전역 설정, 디자인 토큰
│   ├── App.tsx           ErrorBoundary + Suspense + Routes
│   ├── main.tsx
│   ├── providers.tsx     QueryClientProvider + BrowserRouter
│   └── index.css         Tailwind + @theme (컬러/타이포 토큰)
├── pages/                라우트 페이지
│   ├── SearchPage.tsx
│   └── WishlistPage.tsx  (React.lazy로 코드 스플리팅)
├── widgets/
│   └── AppHeader.tsx     로고 + 탭 내비
├── features/
│   ├── search/           검색 기능
│   │   ├── ui/           SearchBar, SearchResultCount, SearchResultList,
│   │   │                 BookListItemSkeleton, AdvancedSearchModal,
│   │   │                 RecentKeywordsDropdown
│   │   ├── model/        useBookSearch(useInfiniteQuery),
│   │   │                 useSearchQuery(URL 쿼리 동기화),
│   │   │                 useInfiniteScroll(IntersectionObserver),
│   │   │                 recentKeywordsStore(Zustand persist)
│   │   └── api/          searchBooks(Kakao 호출)
│   └── wishlist/         찜 기능
│       ├── ui/           WishButton, WishlistCount
│       └── model/        wishlistStore(Zustand persist)
├── entities/
│   └── book/             도메인: 도서
│       ├── types.ts      KakaoBook, KakaoSearchMeta, BookSearchTarget
│       ├── lib/          formatPrice, formatAuthors
│       └── ui/           BookRow(접힘/펼침 스위칭),
│                         BookListItem, BookExpanded,
│                         BookThumbnail, BookPrice
└── shared/               재사용 기반
    ├── ui/               Button, Skeleton, EmptyState, ErrorState,
    │                     ErrorBoundary, icons/
    ├── api/              kakaoClient (axios 인스턴스)
    ├── config/           env (환경변수 검증)
    ├── lib/              cn, openExternalLink
    └── routes/           paths (경로 상수)
```

각 slice는 `index.ts`를 public API로 노출해 내부 구현을 캡슐화했고, 상위 → 하위 단방향 의존성(app → pages → widgets → features → entities → shared)을 지켰습니다.

### 설계 의사결정

#### 1. 접힘 / 펼침 UI를 하나의 컴포넌트 vs 두 개의 컴포넌트

- **문제**: 디자인상 책 리스트 아이템이 접힌 상태(높이 100, 썸네일 48×68, 제목·저자·가격·버튼 한 줄)와 펼친 상태(높이 344, 표지 210×280, 책 소개·할인가·큰 구매하기 버튼)의 레이아웃이 완전히 다릅니다.
- **선택지**
  - **A) 한 컴포넌트 + `isExpanded && (...)` JSX 분기**
  - **B) `BookListItem` / `BookExpanded` 두 컴포넌트로 분리, `BookRow`가 스위칭**
- **결정**: **B**
- **이유**: 두 상태가 공유하는 요소(썸네일·제목·저자) 외에는 props와 이벤트(`onExpand` vs `onCollapse`)가 달랐고, 한 파일에 섞으면 "함께 실행되지 않는 코드"가 엉켜 스캔이 어려워진다고 판단했습니다(Toss Frontend Fundamentals 원칙). 분리한 덕분에 각 컴포넌트를 개별로 `React.memo`로 감쌀 수 있었고, 메모이제이션 비교 범위도 명확해졌습니다.

#### 2. 찜 상태를 어디에 둘 것인가

- **문제**: 요구사항이 "찜 목록이 브라우저 재시작 후에도 유지"이고, 목록은 여러 컴포넌트(검색 리스트의 하트, 찜 페이지의 리스트, 개수 카운트)에서 동시에 참조됩니다.
- **선택지**
  - **A) Context API + `useEffect`로 localStorage 동기화**
  - **B) Zustand + `persist` 미들웨어**
  - **C) Redux Toolkit + redux-persist**
- **결정**: **B**
- **이유**: selector 기반 구독이라 100개 리스트에서 1개 토글해도 나머지 99개 하트가 리렌더되지 않습니다. Context는 value가 바뀌면 모든 소비자가 리렌더되어 이 구조에 불리했습니다. Redux Toolkit은 과제 규모에 비해 보일러플레이트가 컸고, JD에 명시된 "Zustand, Recoil, Redux, MobX" 중 가장 가볍고 번들 영향이 작았습니다(`zustand` 1.2KB gzip).

#### 3. 찜 페이로드 — isbn만 vs book 객체 전체

- **문제**: 찜 스토어에 `isbn`만 저장하고 렌더 시 API로 책 정보를 다시 받아올지, 아니면 클릭 시점의 `book` 객체를 통째로 저장할지.
- **결정**: **book 객체 전체 저장**
- **이유**: 과제 안내에 "찜하기 버튼 눌렀을 때 시점의 데이터를 가지고 있기 때문에 API 결과와 데이터가 상이할 수 있음"이라고 명시되어 있었습니다. 즉 API 재조회를 하지 **말라**는 의도로 읽혔고, 오프라인 / 키 미발급 상태에서도 찜 페이지가 동작해야 한다는 장점이 있었습니다.

#### 4. 페이지네이션 방식 — 더보기 버튼 vs 무한 스크롤

- **문제**: Kakao API 응답 `meta.is_end`, `pageable_count`를 어떻게 UI로 풀어줄지.
- **선택지**
  - **A) "더보기" 버튼 클릭 시 다음 페이지 fetch**
  - **B) IntersectionObserver 기반 무한 스크롤**
- **결정**: **B**
- **이유**: Figma 디자인에 "더보기" 버튼 요소가 없었고, 페이지 끝에 닿기 전(`rootMargin: 200px`)에 다음 페이지를 자연스럽게 받아오는 흐름이 요구사항("페이지 당 10개 아이템")과 가장 자연스럽게 맞물린다고 판단했습니다. 초기 구현에서는 A를 선택했다가 Figma 스펙을 재확인한 뒤 B로 교체했습니다.

#### 5. FSD 레이어 규칙을 지키면서 `WishButton`을 주입하는 법

- **문제**: `BookRow`는 `entities/book`에 두고 싶은데, 찜 버튼(`WishButton`)은 `features/wishlist` 소속입니다. `entities`에서 `features`를 import하면 FSD 의존성 방향(상위→하위)을 역행합니다.
- **선택지**
  - **A) `BookRow`를 `features` 레이어로 올린다**
  - **B) `wishSlot: ReactNode` 슬롯 prop**
  - **C) `renderWish: (size: number) => ReactNode` render prop**
- **결정**: **C**
- **이유**: 접힌 상태는 하트 16px, 펼친 상태는 24px로 크기가 달랐습니다. B(슬롯 prop)만 쓰면 두 슬롯을 각각 주입해야 해서 호출측(`SearchResultList`, `WishlistPage`)이 복잡해졌고, A는 `BookRow`의 본질이 "도서 행 스위칭"이라는 점을 흐렸습니다. render prop이 사이즈 분기를 `BookRow` 내부에서 책임지면서도 레이어 규칙은 지키는 최소 비용 해법이었습니다.

#### 6. 검색바와 최근 검색어를 하나의 pill 컨테이너로

- **문제**: Figma에서 포커스 시 검색 인풋 바로 아래에 검색 기록이 **같은 pill 컨테이너 안**에 이어 붙는 구조였는데, 단순 구현으로는 인풋 아래 결과 카운트·리스트까지 밀려 레이아웃 shift가 발생했습니다.
- **결정**: 외곽 wrapper에 `h-[50px]`를 고정하고, 내부 pill 컨테이너를 `absolute`로 띄운 뒤 검색어 기록이 있을 때만 그 아래로 증가시키는 구조로 풀었습니다.
- **이유**: 드롭다운이 펼쳐져도 하단 컨텐츠(결과 카운트·리스트)가 움직이지 않으면서도 Figma의 "한 덩어리처럼 보이는 pill" 시각을 해치지 않아야 했습니다. `position: fixed`는 스크롤에 따라 분리되는 느낌이 맞지 않아 `absolute`로 선택했고, 오버레이가 자연스럽게 아래 컨텐츠를 덮게 했습니다.

#### 7. 전체 검색과 상세 검색의 상호 배타

- **문제**: 과제 안내의 "상세검색 도중 전체 검색을 진행할 경우 상세검색 조건은 초기화"를 어디에서 제어할지.
- **결정**: `useSearchQuery.submit`이 호출될 때마다 URL `URLSearchParams`를 새로 생성해 기존 키를 통째로 덮어쓰도록 구성했고, `SearchBar`의 input 값은 `target`이 있을 때 빈 문자열로 표시되게 `useEffect`로 파생했습니다.
- **이유**: "상태 초기화"를 여러 곳에 흩뿌리면 조건 누락이 생기기 쉬워서, URL(단일 source of truth)에 기록하는 시점에 덮어쓰기 규약을 한 번만 지키면 끝나도록 했습니다. UI는 URL을 구독만 합니다.

#### 8. 아코디언 transition

- **문제**: 처음에는 `BookListItem` ↔ `BookExpanded` 컴포넌트 교체가 순간적으로 일어나 사용자가 "덜컥"하고 펼쳐지는 느낌을 받았습니다.
- **결정**: `BookRow`의 `<li>`에 `overflow-hidden` + `transition-[height] duration-300 ease-in-out`을 주고, `style={{ height: expanded ? 344 : 100 }}`로 높이만 부드럽게 변하게 했습니다. 내부 콘텐츠는 여전히 상태 전환 시 교체됩니다.
- **이유**: `max-height` 트릭은 transition 타이밍 예측이 어렵고, Figma 스펙상 두 상태 모두 **고정 높이**(100 / 344)였기 때문에 수치를 그대로 써도 됐습니다. 라이브러리(framer-motion) 없이 CSS만으로 의도를 드러내는 게 더 읽기 쉬웠습니다.

#### 9. 아이콘 — 라이브러리 vs Figma 직접 export

- **문제**: lucide-react 같은 아이콘 라이브러리를 쓸지, Figma에서 직접 뽑은 SVG를 컴포넌트화할지.
- **결정**: Figma export SVG를 `shared/ui/icons/`에 React 컴포넌트로 래핑.
- **이유**: 디자인 시스템에 필요한 아이콘이 6종(Heart outline/filled, Search, Close, Chevron up/down, Book)뿐이었습니다. `fill="currentColor"`로 Tailwind `text-*` 유틸이 그대로 색상을 제어하게 구성했습니다. 번들 경량화와 디자인 충실도를 둘 다 얻었습니다.

### 구현 내용

#### 검색창

- [x] placeholder "검색어 입력"
- [x] 검색어 입력 후 Enter → 검색 + 10개 결과
- [x] 검색 기록 저장 (최대 8개, 8개 초과 시 오래된 순 제거 · FIFO)
- [x] 브라우저 재시작 후에도 검색 기록 유지 (Zustand persist)
- [x] 개별 기록 삭제(X 버튼)
- [x] 기록 클릭 시 해당 키워드로 즉시 재검색

#### 결과 리스트

- [x] 검색 결과 10개 단위 노출 + 무한 스크롤(`IntersectionObserver`, `rootMargin 200px`)
- [x] 총 N건 카운트
- [x] 구매하기 버튼 클릭 시 새 탭으로 책 상세 페이지 이동(`window.open(book.url, '_blank', 'noopener,noreferrer')`)
- [x] 상세보기 토글 — 접힘/펼침 아코디언 transition (300ms ease-in-out)
- [x] 펼친 상태: 큰 표지 + 책 소개 + 원가(취소선) + 할인가 + 큰 구매하기 + 찜 하트
- [x] 빈 결과 / 에러 / 로딩 상태 UI

#### 상세검색 팝업

- [x] "상세검색" 버튼 클릭 시 버튼 중앙을 기준으로 하단에 팝업(popover)
- [x] 검색 조건(제목/저자명/출판사) 클릭 시 셀렉트 옵션 노출
- [x] "검색하기" 클릭 시 팝업 닫힘 + 상세검색 진행
- [x] ESC 키 / 외부 클릭 시 팝업 닫힘
- [x] 상세검색 진행 시 기본 검색어 초기화 (전체/상세 상호 배타)
- [x] 기본 검색 진행 시 상세검색 조건 초기화

#### 찜 기능

- [x] 하트 토글 — outline(미찜) ↔ filled red(찜됨)
- [x] 찜 페이지 (`/wishlist`) — 카운트 + 리스트
- [x] 빈 상태 UI ("찜한 책이 없습니다.")
- [x] 찜한 시점의 book 데이터 스냅샷 유지 (API 재호출 독립)

#### 기타 구현

- [x] URL 쿼리 동기화 — `?q=`, `?target=` (새로고침/공유 보존)
- [x] 전역 Error Boundary (`shared/ui/ErrorBoundary`)
- [x] `React.lazy`로 `WishlistPage` 코드 스플리팅
- [x] `React.memo(BookListItem)` / `React.memo(BookExpanded)`
- [x] 이미지 `loading="lazy"` + `onError` fallback (책 아이콘)

### 에러 / 엣지 케이스 처리

- **API 실패**: `useInfiniteQuery`의 `isError`를 감지해 `ErrorState` 컴포넌트(재시도 버튼 포함) 표시
- **빈 검색 결과**: `EmptyState` ("검색된 결과가 없습니다.") — 책 아이콘 + 메시지
- **빈 찜 목록**: `EmptyState` ("찜한 책이 없습니다.") — 같은 컴포넌트 재사용
- **초기 로딩**: `BookListItemSkeleton` 4개
- **다음 페이지 로딩**: 하단에 단일 `Skeleton` 행
- **이미지 로드 실패**: `BookThumbnail` 내부 `onError` → `BookIcon` 아이콘으로 대체
- **환경변수 누락**: `shared/config/env.ts`에서 `console.warn` + 검색 시 401 응답을 `ErrorState`로 전달
- **예기치 못한 런타임 오류**: 전역 `ErrorBoundary`가 받아서 안전망 + 새로고침 복구 UI

### 성능 / 최적화

#### 적용한 것

- **TanStack Query 캐시 정책** — 전역 `staleTime 5분`, `gcTime 10분`, `refetchOnWindowFocus: false`, `retry: 1`. 같은 검색어로 뒤로가기·재진입 시 네트워크 호출 생략, 탭 전환·포커스 복귀 시 불필요한 refetch 차단.
- **`useInfiniteQuery` + IntersectionObserver** — scroll 이벤트 구독 없이 브라우저 내부 최적화 활용. `rootMargin: 200px`로 sentinel이 뷰포트 200px 안쪽에 진입하면 선제 로딩해 사용자가 끝에 닿기 전에 다음 페이지 준비.
- **`React.memo(BookListItem)` / `React.memo(BookExpanded)`** — 새 페이지 append 시 기존 아이템 리렌더 차단. props가 불변이면 렌더 스킵.
- **`useMemo`로 페이지 평탄화 캐싱** — `data?.pages.flatMap(page => page.documents)` 결과를 메모이제이션해 배열 참조를 안정화. `React.memo` 비교가 매 리렌더마다 깨지지 않도록.
- **Zustand selector 기반 구독** — `useWishlistStore(s => s.isWished(book.isbn))` 식으로 필요한 최소 단위만 구독. 100개 리스트에서 한 개 하트 토글해도 나머지 99개는 리렌더 없음.
- **`React.lazy`로 `WishlistPage` 코드 스플리팅** — 메인 진입점(SearchPage)에 찜 페이지 번들이 포함되지 않도록. 진입 빈도 낮은 페이지부터 분리.
- **이미지 `loading="lazy"` + `decoding="async"` + onError fallback** — 뷰포트 밖 책 표지는 지연 로드, 실패 시 `BookIcon`으로 대체.
- **외부 링크 보안** — 구매하기 `window.open(url, '_blank', 'noopener,noreferrer')`로 opener 탈취·referrer 누출 방지.

#### 적용하지 않은 것 (이유와 함께)

| 항목                                    | 미적용 이유                                                                                                                                                                                                                                                                                                      |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 검색 입력 디바운스                      | 검색은 **Enter 제출 시점에만** URL 쿼리 업데이트를 통해 API 호출을 트리거합니다. 타이핑은 로컬 `useState`만 갱신하므로 디바운스할 대상 자체가 없고, 불필요한 추상화는 예측 가능성을 해친다고 판단해 생략했습니다.                                                                                                |
| scroll/resize 쓰로틀                    | scroll 이벤트를 직접 구독하지 않았습니다. `IntersectionObserver`는 브라우저 내부에서 이미 최적화 처리되기 때문에 추가 쓰로틀 훅이 중복이 됩니다.                                                                                                                                                                 |
| 가상 스크롤 (`@tanstack/react-virtual`) | Kakao API 상한이 50페이지 × 10 = 500개로 바운디드이고, 아이템 가변 높이(100 ↔ 344)와 아코디언 CSS transition이 virtualizer의 고정 높이 가정·scroll restoration 로직과 충돌할 위험이 있었습니다. 현재 `React.memo`로 이미 리렌더 최소화가 되어 있고 실측 체감 이슈가 없어 도입 비용 < 이득 구간으로 판단했습니다. |
| 낙관적 업데이트(optimistic)             | 검색은 read-only라 불필요하고, 찜 상태는 Zustand 관할이라 TanStack Query 범위 밖입니다. 로컬 토글은 이미 즉시 반영됩니다.                                                                                                                                                                                        |
| 최근 검색어 prefetch                    | 최근 검색어에 마우스를 올릴 때 `queryClient.prefetchQuery`로 선제 로딩하면 UX 개선 여지가 있으나, Kakao API 응답이 빠른 편이라 체감 이득이 작고 시간 제약상 보류했습니다.                                                                                                                                        |

### 진행 중 부딪힌 문제와 해결

#### 문제 1 — 최근 검색어 드롭다운 펼침 시 레이아웃 shift

검색 인풋에 포커스가 들어오면 아래 컨텐츠(결과 리스트·카운트)가 드롭다운 높이만큼 아래로 밀렸습니다. Figma 의도는 **오버레이처럼 얹히는** 형태였는데 초기 구현은 통합 pill을 flex 흐름 안에 두고 height가 늘어나도록 만들어서 발생한 문제였습니다.

외곽 wrapper를 `relative h-[50px]` 고정으로 두고, 내부 pill 컨테이너를 `absolute left-0 top-0 z-30`으로 띄운 뒤, 드롭다운이 나타날 때만 그 아래로 늘어나게 했습니다. 외부 높이가 고정이므로 드롭다운이 펼쳐져도 하단 레이아웃이 움직이지 않고, pill은 z-index 위에서 자연스럽게 덮어쓰는 식으로 풀었습니다.

#### 문제 2 — `<form>` 중첩 hydration warning

`SearchBar`의 form 안에 `AdvancedSearchModal`을 popover로 두었더니, 모달 내부 `<form>`이 바깥 form의 자손이 되어 React 경고가 떴습니다(`<form> cannot be a descendant of <form>`).

모달 쪽 form을 `<div>`로 변경하고, 제출은 "검색하기" 버튼의 `onClick`과 input의 `onKeyDown`(Enter) 두 경로로 처리했습니다. 바깥 form의 `onSubmit`은 그대로 두어 접근성(Enter 제출)을 유지했습니다.

#### 문제 3 — `BookRow`가 `WishButton`을 import하면 FSD 역방향

`entities/book/ui/BookRow.tsx`에서 `features/wishlist/ui/WishButton`을 직접 참조하면 FSD의 상위 → 하위 규칙을 어기게 됩니다. 처음에는 `wishSlot: ReactNode` 프롭으로 받아봤는데, 접힌 상태(하트 16px)와 펼친 상태(24px)의 사이즈가 다르다 보니 두 슬롯을 각각 주입해야 했고 호출측이 너저분해졌습니다.

`renderWish: (size: number) => ReactNode` render prop으로 바꿔, 사이즈 분기를 `BookRow` 내부에서 수행하되 실제 렌더는 `SearchResultList`/`WishlistPage`에서 주입하도록 inversion했습니다. 레이어 규칙은 지키면서 중복은 제거한 최소 비용 해법이었습니다.

#### 문제 4 — Figma export SVG의 viewBox 해석

Kakao 검색 인풋의 돋보기 아이콘 스펙이 Dev Mode상 "30 × 30"으로 표기되어 있었는데, 원본 SVG export는 `viewBox="0 0 20 20"`이었습니다. 초기에는 size 30으로 스케일 업해서 넣었는데 실제 렌더가 Figma 대비 너무 커 보였습니다.

Dev Mode에 표기된 "30 × 30"은 프레임 내 배치 박스 크기였고, 실제 경로 좌표는 20 × 20 viewBox에 맞춰 그려져 있었습니다. size를 20으로 복원하고, 외곽 pill의 좌우 padding으로 여백을 맞췄습니다. 이후부터는 **viewBox 수치가 진짜 기준**이라는 감으로 모든 아이콘을 20 혹은 24로 정렬했습니다.

#### 문제 5 — 저자가 많은 책의 타이틀 오버플로

검색 결과 중 저자가 4명 이상인 책에서 저자 목록이 가격·버튼 영역을 침범했습니다. `flex-1 min-w-0 truncate`로 제목을 줄이도록 했지만, 저자는 `shrink-0`이라 길이 그대로 뻗어 나가는 문제였습니다.

`entities/book/lib/formatAuthors.ts`를 만들어 3명 이상일 때 `저자A, 저자B 외 N명` 포맷으로 제한하고, 저자 span에도 `max-w-[40%] truncate`를 주어 이중 방어했습니다. 도메인 포매터를 lib로 분리한 덕분에 접힌 상태와 펼친 상태가 같은 포매팅을 쓰도록 자연스럽게 공유할 수 있었습니다.

## 강조하고 싶은 기능

### 1. URL 쿼리 동기화 — 새로고침·뒤로가기·공유에서도 보존

검색어(`?q=`)와 상세검색 타겟(`?target=`)을 `useSearchParams`로 URL에 기록합니다. 새로고침해도, 브라우저 뒤로가기를 눌러도, 검색 결과 링크를 그대로 동료에게 공유해도 **같은 검색 화면이 재현**됩니다. `submit` 시점에 `URLSearchParams`를 매번 새로 생성해서 전체 검색과 상세 검색의 상호 배타성까지 URL 하나로 지키며, UI는 URL을 "구독만" 하기 때문에 상태 초기화 누락이 발생하기 어려운 구조라고 판단했습니다. "상태를 어디에 둘 것인가"에 대한 답을 **URL이라는 단일 source of truth**로 정리했습니다.

### 2. 브라우저 재시작 후에도 유지되는 찜 목록

Zustand `persist` 미들웨어로 `localStorage`에 자동 동기화됩니다. 브라우저를 완전히 종료했다 다시 열어도 찜 목록이 그대로 복구되고, 네트워크 없이도 찜 페이지가 동작합니다. 대안이었던 Context API + `useEffect` 수동 동기화와 비교해 결정적이었던 건 **selector 기반 구독**입니다. `useWishlistStore(s => s.isWished(book.isbn))` 식으로 구독하면 **100개 리스트에서 하나의 하트를 토글해도 나머지 99개는 리렌더되지 않습니다.** Context는 value 전체가 바뀌면 모든 소비자가 리렌더되어 이 구조에서는 리렌더 비용이 기하급수로 늘어날 거라고 판단해서 후보에서 제외했습니다.

### 3. 레이아웃 shift 없는 최근 검색어 드롭다운

검색 인풋 포커스 시 아래에 이어 붙는 검색 기록이 하단 컨텐츠(결과 카운트·리스트)를 **밀지 않도록**, 외곽 wrapper에 `relative h-[50px]` 고정 + 내부 pill 컨테이너를 `absolute z-30`로 오버레이했습니다. 드롭다운이 펼쳐지면 pill 내부만 아래로 확장될 뿐 외부 높이는 고정이라 **결과 리스트가 단 1px도 움직이지 않습니다.** 시각적으로는 Figma의 "한 덩어리 pill" 인상을 그대로 유지하면서 Cumulative Layout Shift(CLS) 관점에서도 안전하다고 판단했습니다. `position: fixed`는 스크롤 시 분리되는 느낌이 맞지 않아 `absolute`로 선택했습니다.

### 4. FSD 레이어 규칙을 지키면서 하트를 주입하는 render prop 슬롯

`BookRow`는 "도서 행"이라는 도메인이라 `entities/book`에 있어야 하고, `WishButton`은 "찜 토글 액션"이라 `features/wishlist` 소속입니다. 전자가 후자를 직접 import하면 FSD의 단방향 의존성(상위 → 하위)을 어기게 됩니다. `renderWish: (size: number) => ReactNode` render prop을 받아 **사이즈 분기(접힘 16px / 펼침 24px)는 `BookRow` 내부에서 책임**지되 실제 렌더는 호출측(`SearchPage`·`WishlistPage`)이 주입하도록 inversion했습니다. 슬롯 prop을 두 개(`collapsedWishSlot`, `expandedWishSlot`)로 받는 대안도 있었지만, 호출측이 너저분해지고 사이즈 분기 로직이 호출측으로 새어나가는 게 싫어서 render prop으로 단일화했습니다. **"규칙을 어기지 않되 호출측 복잡도를 더하지 않는" 최소 비용 해법**이라고 판단했습니다.

### 5. 가변 높이 아코디언 transition — CSS only

책 리스트 아이템의 접힘(100px) ↔ 펼침(344px) 전환을 framer-motion 같은 라이브러리 없이 `transition-[height] duration-300 ease-in-out` + `style={{ height }}`만으로 구현했습니다. Figma 스펙이 두 상태 모두 **고정 높이**라는 점을 활용해 `max-height: 9999px` 트릭(실제 값과의 괴리로 타이밍이 이상해짐) 없이도 정확한 300ms 전환이 나옵니다. **번들 크기를 framer-motion 약 44KB만큼 늘리지 않고** 디자인 의도를 그대로 살린 선택이었고, "라이브러리를 써야만 풀 수 있다"고 여겨지는 UX 요소도 제약 조건을 잘 읽으면 CSS만으로 충분할 수 있다는 사례이기도 합니다.

## 기타

### 향후 개선 여지

시간 제약으로 보류한 항목입니다.

- **반응형 레이아웃**: 현재 데스크톱 고정(`body { min-width: 1200px }`)으로 제출했습니다. 추후 Tailwind의 `sm:` · `md:` · `lg:` 브레이크포인트를 기준으로 헤더 레이아웃, 검색바 폭, 결과 리스트(1단/2단), 상세 펼침 뷰를 각각 재구성해 모바일·타블렛을 지원할 예정입니다.

### AI 도구 활용 방식

- **아키텍처 결정 검증**: FSD 레이어 구조·상태관리(Zustand + persist) 선택·슬롯 패턴 적용에 대해 Claude Code에 "이 선택의 맹점이 있는지"를 물어 검증·대안 제시를 받았습니다.
- **최적화 트레이드오프 페어링**: 디바운스·쓰로틀·가상 스크롤의 적용 여부는 각 옵션의 비용/이득 정리를 AI에 요청하고, 본 과제의 제약(API 상한 500개·아이템 가변 높이·아코디언 transition)에 비추어 채택/배제를 판단했습니다. 위 "성능 / 최적화" 섹션이 그 결과물입니다.
- **Figma 스펙 추출**: Figma Dev Mode MCP로 디자인 파일에서 컬러/타이포/여백 수치를 직접 뽑아 `@theme` 토큰에 반영했습니다. 눈대중으로 추정한 수치를 실제 스펙으로 한 번 교체하는 과정에서 여러 간격/아이콘 크기 오차를 발견해 바로잡았습니다.
- **렌더 결과 계측 검증**: Playwright MCP로 개발 서버에 접속해 DOM의 computed style(font-size·font-weight·line-height·padding·간격)을 Figma 스펙과 직접 대조했습니다. 눈대중으로는 놓치기 쉬운 수치 차이를 개발 루프 안에서 바로 바로잡을 수 있었습니다.
- **반복 구현**: 반복적인 컴포넌트 골격(예: Button variants, EmptyState)은 AI의 초안을 받아 읽은 뒤 본 프로젝트의 디자인 토큰·이름 규칙에 맞추어 다듬었습니다.
- **기각한 제안**: "Context + useEffect로 persist 구현", "상세검색 모달을 중앙 정렬 full-screen 모달로 변경" 같은 제안은 요구사항·디자인과 맞지 않아 채택하지 않았습니다.
