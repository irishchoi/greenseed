# 🌿 고장재배장치(GOJANG FARM) - GitHub 배포 가이드

이 프로젝트는 최첨단 스마트팜 기술이 집약된 **고장재배장치 정적 웹 랜딩페이지**입니다.  
초보자분들도 차근차근 따라 하실 수 있도록 **GitHub Pages 자동 배포** 안내서를 작성하였습니다.

---

## 📌 1. 현재 작업 상태 (Branch 격리 완료)

* **현재 브랜치**: `deploy/cultivation-landing` (격리된 전용 작업 브랜치)
* **주요 구성 요소**:
  * `cultivation_landing/index.html` : 웹사이트 메인 화면 구조
  * `cultivation_landing/style.css` : 웹사이트 스타일 및 디자인
  * `cultivation_landing/script.js` : 인터렉션 및 모션 스크립트
  * `.github/workflows/deploy-pages.yml` : GitHub 자동 배포 설정 파일

---

## 📌 2. GitHub 저장소에 올리고 배포하는 순서 (초보자용 4단계)

### [1단계] GitHub에서 새 저장소(Repository) 만들기
1. 웹 브라우저에서 [GitHub.com](https://github.com)에 로그인합니다.
2. 우측 상단의 **`+`** 버튼을 누르고 **`New repository`**를 선택합니다.
3. Repository name(저장소 이름)에 예: `cultivation-farm` 을 입력합니다.
4. **Public**(공개)으로 설정 후 **`Create repository`** 버튼을 클릭합니다.

---

### [2단계] 내 컴퓨터의 코드를 GitHub에 업로드(Push)하기
터미널(PowerShell)에서 아래 명령어를 순서대로 입력합니다:

```bash
# 1. GitHub 원격 저장소주소 연결 (your-username 및 repository-name은 본인 계정에 맞게 변경)
git remote add origin https://github.com/your-username/repository-name.git

# 2. 현재 격리된 브랜치를 GitHub에 업로드하기
git push -u origin deploy/cultivation-landing
```

---

### [3단계] GitHub Pages 자동 배포 활성화하기
1. GitHub 저장소 페이지 상단의 **`Settings`** (설정) 탭을 클릭합니다.
2. 좌측 메뉴에서 **`Pages`**를 클릭합니다.
3. **`Build and deployment`** 항목의 **Source** 옵션을 **`GitHub Actions`**로 변경합니다.

---

### [4단계] 배포 완료 확인 및 웹사이트 접속
* `Settings` -> `Pages` 설정이 `GitHub Actions`로 바뀌면, 몇 초 뒤 자동으로 배포가 시작됩니다.
* 저장소 상단 **`Actions`** 탭에서 초록색 체크표시(`✔`)가 뜨면 배포가 완료된 것입니다!
* 배포 완료 후 `https://<본인아이디>.github.io/<저장소이름>/` 주소로 접속하시면 인터넷상에서 본인의 웹사이트를 확인하실 수 있습니다.🎉
