# 부산 식당 목록 앱

## 📌 프로젝트 개요
부산광역시 공공데이터 포털에서 제공하는 데이터를 활용하여, 카카오 맵을 기반으로 부산 식당 목록을 출력하는 웹 애플리케이션.

## 🚀 기술 스택
- **프레임워크:** Next.js
- **스타일링:** Tailwind CSS
- **인증:** next-auth (구글, 네이버, 카카오 로그인 지원)
- **데이터베이스:** Supabase
- **ORM:** Prisma ORM (prisma migrate / seed 적용)
- **API 통신:** Axios
- **지도:** 카카오 맵 API
- **데이터 상태관리:** React Query (TanStack Query) - 무한 스크롤 구현
- **전역 상태 관리:** Recoil

## 🔗 API 및 데이터 출처
- **지도 API:** [카카오 맵](https://apis.map.kakao.com/)
- **데이터 출처:** [부산광역시 공공데이터 포털](https://data.busan.go.kr/)
- **아이콘 출처:** [Flaticon](https://www.flaticon.com/)

## 📂 주요 기능
- 카카오 맵을 활용한 부산광역시 식당 목록 출력 및 아이콘 마커 표시
- next-auth를 이용한 소셜 로그인 (구글, 네이버, 카카오)
- React Query를 활용한 데이터 페칭 및 상태 관리
- `/stores`: 무한 스크롤을 활용한 리스트
- `/stores_paging`: 페이지네이션 리스트

## 🛠️ 개발 환경 설정
### 1. 프로젝트 클론
```bash
git clone https://github.com/your-repository/busan-restaurant-map.git
cd busan-restaurant-map
```

### 2. 패키지 설치
```bash
npm install
# or
yarn install
```

### 3. 환경 변수 설정
`.env.local` 파일을 생성하고, 아래 내용을 추가.
```env
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000

# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgres://postgres.[your-supabase-project]:[password]@aws-0-[aws-region].pooler.supabase.com:6543/postgres?pgbouncer=true"
# Direct connection to the database. Used for migrations.
DIRECT_URL="postgres://postgres.[your-supabase-project]:[password]@aws-0-[aws-region].pooler.supabase.com:5432/postgres"

NEXT_AUTH_URL=http://localhost:3000
NEXT_AUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_provider_id
GOOGLE_CLIENT_SECRET=your_google_provider_secret

NAVER_CLIENT_ID=your_naver_provider_id
NAVER_CLIENT_SECRET=your_naver_provider_secret

KAKAO_CLIENT_ID=your_kakao_provider_id
KAKAO_CLIENT_SECRET=your_kakao_provider_secret
```

### 4. 데이터베이스 마이그레이션
```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. 개발 서버 실행
```bash
npm run dev
# or
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)로 접속하여 실행 결과를 확인.

## 🚀 배포
배포는 Vercel을 사용하여 쉽게 진행할 수 있음.
```bash
npm run build
vercel
```
[Next.js 배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)를 참고.

## 📚 참고 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-auth 공식 문서](https://next-auth.js.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [React Query](https://tanstack.com/query/v5/)
- [Next-Auth Google Provider](https://console.cloud.google.com/apis/credentials)
- [Next-Auth Naver Provider](https://developers.naver.com/main/)
- [Next-Auth kakao Provider](https://developers.kakao.com/)

🐞 이슈 및 해결 방법

⚠️ Next.js, React, Recoil 버전 충돌로 인한 버전 고정 설치 권장

🔧 다음 버전으로 설치 권장:

"next": "^14.1.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"recoil": "^0.7.7"

⚠️ Next.js 다운그레이드로 인한 Turbopack 사용 불가

🔧 Next.js를 낮춘 경우 Turbopack이 정상적으로 작동하지 않을 수 있음. Webpack을 기본 번들러로 사용.

⚠️ 'ReactCurrentDispatcher' 오류 (Turbopack 충돌 관련)

🔧 해당 오류가 발생하는 경우, Next.js 버전을 업그레이드하여 최신 패치 적용을 권장.

## 📝 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
