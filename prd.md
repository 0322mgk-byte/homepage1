# PRD: 돈 버는 글쓰기 & AI 스토리텔링 랜딩페이지

## 1. 프로젝트 개요 (Project Overview)
*   **프로젝트명:** AI 활용 수익형 글쓰기 무료 특강 신청 페이지 (AI Storytelling Masterclass)
*   **목표:** 잠재 고객(Lead)의 이름, 연락처, 이메일 확보 및 무료 특강 신청 전환율 극대화
*   **타깃 유저:** 글쓰기로 수익을 내고 싶은 직장인, 1인 창업자, 크리에이터, N잡러
*   **핵심 가치:** 글쓰기 재능 없이 AI와 공식만으로 수익화가 가능하다는 점을 소구

## 2. 디자인 시스템 (Design System)
*   **테마:** 다크 모드 (Dark Mode) - 전문성, 신뢰감, 몰입감 형성
*   **컬러 팔레트:**
    *   **Background:** Black (#000000), Dark Gray (#1a1a1a)
    *   **Text:** White (#FFFFFF), Light Gray (#9CA3AF for descriptions)
    *   **Primary (Brand):** Purple (#6B46C1) - 창의성, 미래지향적 AI 이미지
    *   **Accent (Profit):** Gold (#FFD700) - 수익, 성공 강조
    *   **Status:** Green (Success), Red (Error/Pain points)
*   **타이포그래피:** Pretendard (가독성 및 모바일 최적화)
*   **아이콘:** Lucide React Icons

## 3. 상세 기능 및 섹션 명세 (Specifications)

### 3.1. Global Navigation (GNB)
*   **구성:** 로고 (AI MONEY), CTA 버튼 (지금 신청하기)
*   **동작:** 스크롤 시 상단 고정 (Sticky), 배경 블러 처리 (Backdrop-blur)
*   **기능:** 로고 클릭 시 최상단 이동, 버튼 클릭 시 신청 폼으로 부드러운 스크롤 이동

### 3.2. Hero Section (상단)
*   **카피라이팅:**
    *   메인: "글쓰기 재능? 필요 없습니다. AI와 스토리텔링이면 충분합니다."
    *   서브: "하루 30분 투자로 월급 외 수익 만들기"
*   **UI 요소:**
    *   배경: Purple/Gold 그라디언트 블러 효과 (Atmosphere)
    *   소셜 프루프: "선착순 100명 진행 중" (Pulse 효과), 누적 수강생 12,000명, 평점 4.9
    *   CTA: 신청 폼으로 이동하는 대형 버튼
*   **애니메이션:** 텍스트 페이드인, 배경 그라디언트 효과

### 3.3. Story Section (설득)
*   **목표:** 공감 형성 및 권위 입증
*   **내용:** 평범한 직장인의 수익화 성공 사례 (0원 → 월 500만 원)
*   **데이터 시각화 (Chart):**
    *   라이브러리: Recharts
    *   형태: 우상향 선형 그래프 (Line Chart)
    *   데이터: 1월(0원) ~ 6월(510만원) 수익 추이 시각화
    *   인터랙션: 툴팁 제공
*   **문제 제기:** 기존 방식의 실패 원인 3가지 (완벽주의, 주제 선정 실패, 단순 AI 검색)

### 3.4. Curriculum Section (커리큘럼)
*   **구성:** 3개의 핵심 모듈 카드 UI
*   **내용:**
    1.  **팔리는 구조 공식:** 심리학 기반 템플릿 (Icon: Zap)
    2.  **AI 프롬프트 엔지니어링:** 인간적인 글쓰기 프롬프트 (Icon: PenTool)
    3.  **원소스 멀티유즈 전략:** 블로그/인스타/유튜브 확장 (Icon: Layers)
*   **인터랙션:** 카드 호버 시 배경색 변경 및 아이콘 확대 효과

### 3.5. Sign Up Form (신청 폼)
*   **위치:** 페이지 하단 (스크롤 이동 타겟)
*   **입력 필드:**
    *   이름 (Text)
    *   연락처 (Tel) - 카카오톡 알림용
    *   이메일 (Email) - 강의 자료 발송용
*   **기능:**
    *   유효성 검사 (HTML5 standard)
    *   **API 연동 (Simulated):** Google Apps Script 연동을 가정한 Mock Service
    *   **상태 관리:** Idle → Loading (Spinner) → Success (Overlay Message) / Error
*   **피드백:**
    *   성공 시: "신청이 완료되었습니다" 메시지 및 체크 아이콘 표시

### 3.6. Footer
*   **내용:** 이용약관, 개인정보처리방침 링크
*   **정보:** 회사명, 대표자, 사업자번호, Copyright

### 3.7. 편의 기능
*   **Scroll to Top:** 일정 스크롤 이상 내려가면 우측 하단에 '위로 가기' 플로팅 버튼 노출

## 4. 기술 스택 (Technical Stack)
*   **Framework:** React 18+ (Create React App / Vite 구조 호환)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v3.x
*   **Components:** Modularized (ui/Button, ui/Input, Hero, Story, etc.)
*   **Charts:** Recharts
*   **Icons:** Lucide-react
*   **Deployment Target:** Vercel / Netlify / Static Hosting

## 5. 데이터 흐름 (Data Flow)
1.  사용자가 폼 데이터 입력 (Name, Phone, Email)
2.  `submitToGoogleSheet` 서비스 호출
3.  (현재) 1.5초 지연 후 성공 응답 반환 (Mocking)
4.  (실제 구현 시) `fetch` API를 통해 Google Apps Script Web App URL로 POST 요청
5.  UI 상태 업데이트 (Loading → Success)

## 6. 향후 개선 사항 (To-Do)
*   실제 Google Apps Script 배포 URL 연동 (`services/googleSheetService.ts` 수정 필요)
*   개인정보 수집 이용 동의 체크박스 추가
*   SEO 메타 태그 최적화 (OG Tag 등)
