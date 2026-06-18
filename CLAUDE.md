# korpark-website (korpark.com) — 작업 지침

## 정체 / 역할 분리
- 이 repo = korpark.com 허브(정적 HTML/CSS/JS, GitHub Pages 자동배포, master push→1~3분).
- 자매 사이트 korpark.app(repo: gamei, React/Vite)은 다른 도구에서 작업. 이 repo에서 app을 수정·커밋하지 말 것.

## 전략 단일원천(정본)
- 크로스사이트 전략/규칙 정본 = korpark.app repo의 `docs/korpark-handoff-2026-06.md` §4(자산)·§20(멀티-repo).
  (로컬 경로 예: E:\koreapark\gamei\docs\korpark-handoff-2026-06.md — 양쪽에 걸친 결정은 거기 반영 요청.)

## 불변 핵심 규칙(인라인 — 경로 못 읽어도 이건 지킴)
- 코드는 이 repo만. explicit path stage(add -A 금지)·force push 금지.
- 크로스도메인 canonical/hreflang 금지: com은 self 도메인만. app↔com은 일반 링크.
- FAQ·시나리오 정본 = korpark.app. 전문 복제 금지(요약+링크만).
- 브랜드 "KorPark" 통일 / 깔때기 learnkoreantv→korpark.app→korpark.com(coreantv는 가동 후).
- 운영주체 통일: 대표 홍석찬 · 사업자등록번호 203-10-99019 · ceo@korpark.com · 전화 미노출.
- com→app 링크 UTM: `?utm_source=korpark_com&utm_medium=referral&utm_campaign=<위치>`.
- 공식창구: com=1332·하이코리아 / app=1345·1350.
