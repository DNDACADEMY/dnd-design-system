# @dds/token

디자인 토큰 패키지 - Figma Token Studio와 연동하여 디자인 시스템의 색상, 간격, 타이포그래피 등을 관리합니다.

---

## 🎨 디자이너를 위한 가이드

### Token Studio란?

Token Studio는 Figma 플러그인으로, 디자인 토큰을 체계적으로 관리하고 개발팀과 동기화할 수 있게 해주는 도구입니다.

**디자이너가 할 수 있는 것:**

- ✅ Figma에서 직접 디자인 토큰 생성/수정
- ✅ 색상, 간격, 타이포그래피 등을 체계적으로 관리
- ✅ JSON 파일로 export하여 개발팀과 공유
- ✅ 디자인 변경사항을 빠르게 개발 코드에 반영

---

## 📚 목차

1. [Token Studio 설치](#1-token-studio-설치)
2. [토큰 생성하기](#2-토큰-생성하기)
3. [토큰 Export](#3-토큰-export)
4. [개발팀에 전달](#4-개발팀에-전달)
5. [자주 묻는 질문 (FAQ)](#5-자주-묻는-질문)

---

## 1. Token Studio 설치

### Figma 플러그인 설치

1. Figma 열기
2. **Plugins** → **Find more plugins**
3. 검색: **"Tokens Studio for Figma"**
4. **Install** 클릭

### 플러그인 실행

1. Figma 파일 열기
2. **Plugins** → **Tokens Studio for Figma**
3. 플러그인 창 열림 ✅

---

## 2. 토큰 생성하기

### 2-1. 첫 Token Set 만들기

1. Token Studio 플러그인에서 **"+ New Set"** 클릭
2. Set 이름 입력 (예: `core`)
3. ✅ 체크박스 켜서 Set 활성화

### 2-2. 색상(Color) 토큰

#### 색상 그룹 생성

1. **"+ Add new group"** 클릭
2. 그룹 이름: `Color`
3. 그룹 안에 색상 카테고리 생성

#### 색상 토큰 추가 예시

**Cyan 색상 팔레트:**

```
Color
  └─ Cyan
      ├─ 50   (#def7fd)
      ├─ 100  (#acecfa)
      ├─ 200  (#70dff7)
      ├─ 300  (#00d3f2)
      ├─ 400  (#00c8ee)
      ├─ 500  (#00bee8)  ← 기본 색상
      ├─ 600  (#00aed4)
      ├─ 700  (#0099b8)
      ├─ 800  (#00859f)
      └─ 900  (#006371)
```

**토큰 생성 단계:**

1. `Color` 그룹 옆 **+** 버튼
2. 토큰 이름: `Cyan`
3. `Cyan` 옆 **+** 버튼
4. 토큰 이름: `50`
5. 값: `#def7fd`
6. Type: `color`
7. 반복 (100, 200... 900)

#### 권장 색상 구조

```
Color
├─ Cyan (청록)
├─ Purple (보라)
├─ Gray (회색)
├─ Red (빨강)
├─ Orange (주황)
├─ Green (초록)
└─ Mono (흑백)
    ├─ 900 (#000000)
    └─ 000 (#ffffff)
```

### 2-3. 간격(Spacing) 토큰

**간격 시스템 예시:**

```
Number
├─ 0   (0)
├─ 1   (4)
├─ 2   (8)
├─ 3   (12)
├─ 4   (16)
├─ 5   (20)
├─ 6   (24)
├─ 8   (32)
└─ 10  (40)
```

**생성 방법:**

1. **"+ Add new group"** → `Number`
2. 토큰 추가: 이름 `1`, 값 `4`, Type `number`
3. 반복...

### 2-4. 네이밍 규칙

> [!IMPORTANT]
> **일관된 네이밍이 매우 중요합니다!**

**색상:**

```
✅ 올바른 예:
Color / Cyan / 500
Color / Purple / 500

❌ 잘못된 예:
color-cyan-500      (슬래시 대신 하이픈)
Colors / cyan / 500 (대소문자 불일치)
```

**간격:**

```
✅ 올바른 예:
Number / 4
Number / 8

❌ 잘못된 예:
spacing-4      (그룹 없음)
Number / 4px   (단위 포함)
```

---

## 3. 토큰 Export

### JSON 파일 다운로드

1. Token Studio 우측 상단 **⚙️ (Settings)**
2. **"Export"** 탭 선택
3. **"Export to file"** 또는 **"Download JSON"**
4. 파일명: `core.json` (Set 이름과 동일)
5. 저장 위치 기억하기

### 파일 확인

다운로드된 `core.json` 예시:

```json
{
  "Color": {
    "Cyan": {
      "50": {
        "$type": "color",
        "$value": "#def7fd"
      },
      "500": {
        "$type": "color",
        "$value": "#00bee8"
      }
    }
  },
  "Number": {
    "4": {
      "$type": "number",
      "$value": 16
    }
  }
}
```

> [!TIP]
> 위와 비슷한 구조면 정상입니다!

---

## 4. 개발팀에 전달

### 방법 1: Slack (추천)

```
@개발팀 디자인 토큰 업데이트했습니다!

변경사항:
- Cyan 500 색상 수정 (#00bee8 → #00c0ea)
- Purple 팔레트 추가

첨부: core.json
```

### 방법 2: GitHub 직접 업로드

1. GitHub 저장소 → [`packages/dds-token/tokens/`](https://github.com/DNDACADEMY/dnd-frontend/tree/main/packages/dds-token)
2. **"Add file"** → **"Upload files"**
3. `core.json` 드래그 & 드롭
4. Commit 메시지:

```
chore(token): 디자인 토큰 업데이트

- Cyan 500 수정
- Purple 팔레트 추가
```

5. **"Commit changes"**

### 방법 3: Notion

1. Notion 디자인 시스템 페이지로 이동
2. 파일 업로드 또는 링크 추가
3. 버전 기록 작성

---

## 5. 자주 묻는 질문

### Q1. 수정하면 바로 반영되나요?

**A.** 아니요. 다음 과정이 필요합니다:

1. 디자이너: Token Studio 수정 → JSON Export
2. 디자이너: 개발팀에 전달
3. 개발자: JSON 파일 추가
4. 개발자: 빌드 실행 (`npm run build:tokens`)
5. 개발자: 코드 적용

> [!NOTE]
> 보통 1-2일 소요. 급한 경우 Slack으로 알려주세요!

### Q2. 색상 변경 시 영향 범위는?

**A.** 해당 토큰을 사용하는 모든 곳에 영향

**예시:**

- `Color/Cyan/500` 변경 시
- 해당 색상 사용 모든 버튼, 링크, 아이콘 자동 변경

> [!CAUTION]
> 주요 색상 변경 전 개발팀과 상의 필수!

### Q3. 새 색상 추가 방법은?

**A.** 기존 팔레트 구조 따라 추가:

```
Color
└─ NewColor
    ├─ 50   (가장 밝음)
    ├─ 500  (기본)
    └─ 900  (가장 어두움)
```

> [!TIP]
> 도구 추천: [Coolors.co](https://coolors.co), [Material Palette](https://material.io/design/color/)

### Q4. 토큰 이름 수정하려면?

**A.** Token Studio에서 수정:

1. 토큰 선택
2. 이름 클릭하여 편집
3. 새 이름 입력
4. 다시 Export

> [!WARNING]
> 개발에서 사용 중인 토큰 이름 변경 시 코드 깨짐 주의!
> 변경 전 개발팀과 상의 필수!

### Q5. 토큰 삭제 방법은?

**A.** 주의사항 확인 후 삭제:

1. 토큰 선택
2. 우클릭 또는 **...** 메뉴
3. **Delete**

> [!CAUTION]
> **삭제 전 확인:**
>
> - Figma 디자인에서 사용 중?
> - 개발 코드에서 사용 중?
> - 개발팀과 상의했나?

### Q6. Token Studio가 느려요

**A.** 해결 방법:

- Figma 재시작
- 토큰을 여러 Set으로 분리 (`colors`, `spacing` 등)
- Settings에서 "Update on change" 끄기

### Q7. JSON 파일이 이상해요

**A.** 정상입니다! JSON은 기계가 읽는 형식:

```json
{
  "Color": {
    "Cyan": {
      "500": {
        "$type": "color",
        "$value": "#00bee8"
      }
    }
  }
}
```

개발자가 이를 코드로 변환합니다.

### 디자인 토큰

- [디자인 토큰이란?](https://spectrum.adobe.com/page/design-tokens/)

---

## ✅ 체크리스트

### 토큰 생성 시

- [ ] 네이밍 규칙 준수 (`Color/Cyan/500`)
- [ ] Type 올바르게 선택 (`color`, `number`)
- [ ] 중복 토큰 확인
- [ ] 팔레트 완성 (50~900)

### 개발팀 전달 시

- [ ] JSON 파일 첨부
- [ ] 변경사항 명확히 설명
- [ ] 급한 일정 언급
- [ ] Slack/GitHub/Notion 업로드

---

## 🎉 빠른 시작

1. [Token Studio 설치](#1-token-studio-설치)
2. [첫 토큰 만들기](#2-토큰-생성하기)
3. [개발팀에 전달](#4-개발팀에-전달)

**Last updated**: 2025-12-20
**Maintained by**: Design System Team
