---
문서: 클로드 코드로 K Select Network 운영 플랫폼 개발 시작하기
대상: 비개발자도 따라할 수 있는 실행 가이드
---

# 0. 결정된 것

- 운영 플랫폼은 마케팅 사이트와 **별도 프로젝트**로 시작합니다.
- 주소는 **portal.kselectnetwork.com** 입니다.
- 로컬 폴더명 제안: `KSelectNetwork-Portal` (기존 `KBeautyWebsite` 폴더와 나란히 두는 형태)

```
Developement\Claude_Dev\
├─ KBeautyWebsite\          ← 기존 마케팅 사이트 (그대로 둠)
│    ├─ DESIGN.md
│    ├─ PRD\
│    └─ ...
└─ KSelectNetwork-Portal\   ← 새로 만들 운영 플랫폼 (이번에 시작)
```

---

# 1. 준비물 체크리스트

| 항목 | 필요한 이유 | 확인 방법 |
|---|---|---|
| Claude Pro/Max/Team 플랜 | Claude Code는 무료 claude.ai 플랜으로는 못 씁니다 | 이미 이 대화를 쓰고 계시면 대부분 해당 |
| GitHub 계정 | 코드를 저장하고 Vercel과 연결하는 곳 | 없으면 github.com에서 무료로 생성 |
| Vercel 계정 | 이미 마케팅 사이트가 배포되어 있으니 있으실 것 | www.kselectnetwork.com 배포에 쓰신 계정 그대로 사용 |

Node.js는 Claude Code를 **데스크톱 앱**으로 설치하면 필요 없습니다. 아래 2번에서 데스크톱 앱을 추천드리는 이유이기도 합니다.

---

# 2. Claude Code 설치 (Windows)

두 가지 방법이 있습니다. **개발자가 아니시니 데스크톱 앱을 추천**드립니다.

## 방법 A — 데스크톱 앱 (추천)

터미널(까만 화면) 없이 프로그램처럼 쓸 수 있습니다.

1. https://claude.com/download 에서 Windows용 설치 파일 다운로드
2. 설치 후 실행, 로그인(claude.ai 계정과 동일)
3. 프로젝트 폴더를 열어서 작업 시작

## 방법 B — 터미널 (PowerShell)

이미 터미널 사용이 익숙하시면 이쪽이 더 빠릅니다.

1. 시작 메뉴에서 "PowerShell" 검색해서 실행 (관리자 권한 필요 없음)
2. 아래 명령어를 그대로 복사해서 붙여넣고 Enter:
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
3. 설치가 끝나면 아래로 확인:
   ```powershell
   claude --version
   ```
   버전 번호가 뜨면 성공입니다.

> **참고**: Windows에 Git이 설치되어 있으면(`Git for Windows`) Claude Code가 더 안정적으로 파일 작업을 합니다. 없으시면 https://git-scm.com/downloads/win 에서 설치해두시는 것을 권장합니다 — 어차피 3번 단계(GitHub 연동)에서도 필요합니다.

---

# 3. 새 프로젝트 폴더 만들고 자료 옮기기

1. 아래 위치에 새 폴더를 만듭니다.
   ```
   C:\Users\ChaeHahm\OneDrive - Letusto Inc\Developement\Claude_Dev\KSelectNetwork-Portal
   ```
2. 그 안에 `PRD` 폴더를 만들고, 이번에 받으신 12개 기획서 파일(`00_INDEX.md` ~ `11_개발우선순위와개발명세서목록.md`)을 그대로 복사해 넣습니다.
3. 기존 `KBeautyWebsite\DESIGN.md` 파일도 하나 복사해 넣습니다 — 마케팅 사이트와 시각적 톤을 맞추기 위한 참고용입니다.

폴더 모양이 이렇게 되면 됩니다.

```
KSelectNetwork-Portal\
├─ PRD\
│    ├─ 00_INDEX.md
│    ├─ 01_PRD_개요.md
│    ├─ ... (12개 전부)
└─ DESIGN.md   (마케팅 사이트에서 복사)
```

---

# 4. Claude Code 실행

## 데스크톱 앱을 쓰신다면
앱에서 "새 프로젝트 열기" 또는 "Open Folder"로 방금 만든 `KSelectNetwork-Portal` 폴더를 선택합니다.

## 터미널을 쓰신다면
PowerShell에서 아래처럼 폴더로 이동한 뒤 `claude`를 입력합니다.
```powershell
cd "C:\Users\ChaeHahm\OneDrive - Letusto Inc\Developement\Claude_Dev\KSelectNetwork-Portal"
claude
```
Claude Code가 대화형으로 시작됩니다.

---

# 5. 첫 프롬프트 — 그대로 복사해서 붙여넣기

`11_개발우선순위와개발명세서목록.md`의 "0단계 — 기반 공사"에 해당합니다. Claude Code 안에서 아래를 그대로 입력하세요.

```
이 폴더는 K Select Network의 B2B 운영 플랫폼을 새로 개발하는 프로젝트다.
PRD 폴더 안의 00_INDEX.md부터 11_개발우선순위와개발명세서목록.md까지 12개
파일을 전부 읽고 전체 맥락을 파악해라. DESIGN.md는 이미 배포된 마케팅
사이트(kselectnetwork.com)의 디자인 시스템이니, 색상·타이포 톤은 이걸
참고하되 로그인이 필요한 실무형 화면이므로 마케팅 사이트보다는 절제되고
기능 중심적인 느낌으로 가야 한다.

지금 할 일은 11_개발우선순위와개발명세서목록.md의 "명세서 00. 프로젝트
기반 설정"이다.

담을 내용:
- 인증(로그인) 체계의 기본 골격
- 외부 파트너 포털과 관리자 포털의 URL·코드 구조 분리
  (예: /portal 이하는 외부 파트너용, /admin 이하는 Letusto 내부 직원용)
- 데이터베이스 연결 기본 골격
- 환경변수 관리 방식

이 프로젝트는 https://portal.kselectnetwork.com 서브도메인으로 Vercel에
배포할 예정이다. 마케팅 사이트(kselectnetwork.com)와는 완전히 분리된
별도 Vercel 프로젝트다.

기술 스택(프레임워크, 데이터베이스 종류 등)은 아직 정하지 않았다.
Vercel 배포에 적합하고, 07_데이터모델.md에 정의된 엔터티 구조
(Company/Brand/Product/Application/ApplicationProduct 등 관계형 구조)를
잘 표현할 수 있는 조합을 2~3가지로 추천하고, 각각의 장단점을 개발자가
아닌 사람도 이해할 수 있게 설명해줘. 내가 하나를 고르면 그걸로 진행해라.

작업 전에 먼저 이 프로젝트 폴더에 git 저장소를 초기화할지, GitHub
저장소를 새로 만들지 확인하고 진행해라.

10_보안과권한요구사항.md의 1번(데이터 격리)과 2번(인증)을 처음부터
설계에 반영해라 — 이건 나중에 추가하기보다 처음부터 있어야 하는 것이다.
```

이 프롬프트를 받으면 Claude Code가 먼저 기술 스택 옵션을 제안할 것입니다(예: Next.js + PostgreSQL 계열 조합 등). 그 부분은 지금 저와 미리 정하지 않은 이유가 있습니다 — `01_PRD_개요.md`에 적었듯, 이 기획서 세트는 의도적으로 기술 스택 논의를 미뤄뒀습니다. 처음 코드를 만지는 이 시점에 Claude Code와 직접 논의하시는 게 맞고, 이해가 안 되는 용어가 나오면 그 자리에서 "쉬운 말로 설명해줘"라고 요청하시면 됩니다.

---

# 6. GitHub 연동

Claude Code가 git 저장소 초기화까지는 알아서 해줍니다. GitHub에 원격 저장소를 만드는 것도 Claude Code에게 시킬 수 있습니다(GitHub 계정 로그인이 되어 있어야 함). 안에서 이렇게 요청하면 됩니다.

```
GitHub에 새 저장소를 만들어줘. 이름은 kselectnetwork-portal, private으로
설정하고, 지금까지 작업한 내용을 첫 커밋으로 올려줘.
```

---

# 7. Vercel 배포 + 서브도메인 연결

1. Vercel 대시보드(vercel.com)에 로그인 → "Add New Project" → 방금 만든 GitHub 저장소(`kselectnetwork-portal`) 선택 → 배포
2. 배포가 완료되면 Vercel 프로젝트 설정 → Domains → `portal.kselectnetwork.com` 추가
3. 이미 `kselectnetwork.com`을 관리하는 DNS(도메인 등록기관 또는 Vercel DNS)에 Vercel이 알려주는 값대로 CNAME 레코드 하나만 추가하면 됩니다. 이 과정도 막히면 Claude Code에게 "Vercel에 portal 서브도메인을 연결하려는데 DNS 설정을 어떻게 해야 하는지 알려줘"라고 물어보시면 단계별로 안내해줍니다.

---

# 8. 이후 진행 방식

`11_개발우선순위와개발명세서목록.md`에 적힌 순서(00 → 01 → 02 → … → 10)를 그대로 따라가시면 됩니다. 요령은 이렇습니다.

1. **한 번에 하나의 명세서만 진행합니다.** "01. 회사 회원가입·로그인" 프롬프트를 줄 때는, 5번처럼 PRD 문서의 해당 부분을 지목해서 요청하세요. 예: *"11번 문서의 '명세서 01'을 진행해줘. 대상은 08_주요화면과AC.md의 화면 1, 2번이야."*
2. **각 명세서가 끝나면 반드시 커밋합니다.** Claude Code에게 "지금까지 작업한 걸 커밋해줘"라고 요청하면 됩니다. 작업 단위가 깨끗하게 나뉘어 있어야, 나중에 문제가 생겼을 때 어느 지점까지 되돌릴지 판단하기 쉽습니다.
3. **⭐ 표시된 지점(명세서 03, 05)에서는 꼭 실제로 써보세요.** 05번까지 끝나면 신청서 제출부터 심사 결과까지 처음으로 완주하는 지점입니다. 여기서 실제로 회사 계정을 하나 만들어서 처음부터 끝까지 눌러보시길 권합니다. 이 경험이 Phase 2를 설계할 때 중요한 판단 근거가 됩니다.
4. **막히거나 이해가 안 되는 결정이 나오면 저에게 가져오셔도 됩니다.** Claude Code가 기술적인 선택지를 제시했는데 어떤 걸 골라야 할지 판단이 안 서면, 그 내용을 그대로 저에게 붙여넣어 주세요 — 기획 맥락을 알고 있으니 같이 판단해드리겠습니다.

---

# 9. 자주 헷갈릴 수 있는 것 — 미리 안내

- **Claude Code 세션은 대화가 길어지면 느려지거나 맥락을 놓칠 수 있습니다.** 명세서 하나가 끝나고 다음 명세서로 넘어갈 때는, 새 대화로 시작하면서 5번처럼 다시 PRD 문서를 참조시켜 주는 것이 안정적입니다.
- **DB 비밀번호 같은 민감한 값은 코드에 직접 쓰지 않습니다.** Claude Code가 "환경변수"라는 방식으로 분리해줄 텐데, 그 파일(`.env` 같은 이름)은 GitHub에 절대 올라가면 안 됩니다. Claude Code가 알아서 처리하지만, 커밋할 때 그 파일이 포함되지 않았는지 한 번씩 확인해달라고 요청하시면 안전합니다.
- **`00_INDEX.md`의 "미해결 항목"부터 먼저 정리하시면 개발이 더 매끄럽습니다.** 특히 미팅 예약 도구(Microsoft Bookings vs Google/Zoom) 충돌은 Phase 2 명세서를 쓰기 전에 확정해두시는 게 좋습니다.
