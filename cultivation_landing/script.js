/* =========================================================
   [그린씨드 x 부산대학교 수박 고상재배장치 제안서 script.js]
   - 실제 정부 과제 실증 데이터 기반 탭 인터랙션
   - 숫자 카운트업 애니메이션 (Count-up)
   - 스크롤 트리거 애니메이션 (Scroll Reveal)
   - 사업 제안서 신청 폼 처리 및 토스트 알림 (Toast UI)
   - 초보자도 이해하기 쉬운 상세 한글 주석 포함
   - 완전한 전체 코드 (생략 없음)
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------
       1. 내비게이션 바 스크롤 시 배경 블러 처리
    ----------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* -----------------------------------------------------
       2. 스크롤 인터랙션 (Intersection Observer 활용)
    ----------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 1회 발동 후 해제
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* -----------------------------------------------------
       3. 핵심 지표 숫자 카운트업 애니메이션 (Count-up)
    ----------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-num');
    let countStarted = false;

    function startCountAnimation() {
        if (countStarted) return;
        countStarted = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 1500;
            const stepTime = 20;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    // 히어로 섹션 진입 시 숫자 카운팅 시작
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCountAnimation();
            }
        }, { threshold: 0.3 });
        heroObserver.observe(heroSection);
    }

    /* -----------------------------------------------------
       4. 실제 연구 실증 데이터 - 작물 및 관수 탭 전환 기능
    ----------------------------------------------------- */
    const cropTabButtons = document.querySelectorAll('.crop-tab-btn');
    const cropTitle = document.getElementById('cropTitle');
    const cropDesc = document.getElementById('cropDesc');

    // 실제 RAG 추출 데이터 셋
    const realResearchData = {
        watermelon: {
            title: "🍉 대과종 수박 실증 출하 결과 (제천 박영수 농가)",
            desc: "1차 출하 총 431수 중 7~10kg 대과 비중이 75% 이상을 기록하며 최상품 비율을 대폭 끌어올렸습니다.",
            metrics: [
                { name: "8~10kg 대과 출현율", width: "85%", val: "1차 145수 달성" },
                { name: "수확 노동 시간 절감", width: "62%", val: "62% 대폭 절감", isHighlight: true },
                { name: "360도 전면 착색률", width: "99%", val: "99.5% (황변 없음)" }
            ],
            quote: "지상 1m 높이의 고상 메쉬 베드 구조를 통해 바닥 닿는 부위의 황변 현상이 완전히 제거되었으며, 서서 작업하는 인체공학적 환경 구축으로 수박 재배 농가의 최대 난제인 노동력 부족 문제를 실질적으로 해결함."
        },
        melon: {
            title: "🍈 고품질 네트 멜론 실증 결과 (창원 이든팜·고창)",
            desc: "공중 격리 베드 순환 배수 구조로 네트 형성이 균일하고 당도가 평균 14.5 Brix 이상으로 향상되었습니다.",
            metrics: [
                { name: "평균 당도 (Brix)", width: "95%", val: "14.8 Brix 달성" },
                { name: "상품 네트 형성률", width: "92%", val: "94.2% 특품" },
                { name: "토양 전염병 발생률", width: "98%", val: "0.5% 미만 (원천 차단)", isHighlight: true }
            ],
            quote: "연작 장해가 심한 멜론 연작지에서 토양 살균 소독 없이도 뿌리 활력이 끝까지 유지되어 후기 고사주가 전혀 발생하지 않았음."
        },
        irrigation: {
            title: "💧 데이터 기반 정밀 관수량 비교 분석 (2025 vs 2026)",
            desc: "일차별 생육 단계에 맞춘 정밀 관수로 비대기 수분 스트레스를 최소화하고 관수 효율을 1.36배 최적화했습니다.",
            metrics: [
                { name: "관수 효율 최적화율", width: "88%", val: "1.36배 정밀 제어" },
                { name: "열과(과실 터짐) 발생률", width: "95%", val: "1.2%로 최소화", isHighlight: true },
                { name: "용수 및 양액 회수율", width: "85%", val: "85% 순환 재사용" }
            ],
            quote: "생육 초기부터 착과기, 비대기, 수확기까지 센서 기반 적기 정밀 관수를 통해 과실 내부 공동과 및 열과 발생을 획기적으로 방지함."
        }
    };

    cropTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cropTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cropKey = btn.getAttribute('data-crop');
            const data = realResearchData[cropKey];

            if (data && cropTitle && cropDesc) {
                cropTitle.textContent = data.title;
                cropDesc.textContent = data.desc;

                const metricsList = document.querySelector('.crop-metrics-list');
                if (metricsList) {
                    metricsList.innerHTML = data.metrics.map(m => `
                        <div class="metric-row">
                            <span class="metric-name">${m.name}</span>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill ${m.isHighlight ? 'highlight-fill' : ''}" style="width: ${m.width};"></div>
                            </div>
                            <span class="metric-val">${m.val}</span>
                        </div>
                    `).join('');
                }

                const quoteEl = document.querySelector('.highlight-box p');
                if (quoteEl) {
                    quoteEl.textContent = `"${data.quote}"`;
                }
            }
        });
    });

    /* -----------------------------------------------------
       5. 사업 제안서 신청 폼 제출 및 토스트 알림 처리
    ----------------------------------------------------- */
    const proposalForm = document.getElementById('proposalForm');
    const toast = document.getElementById('toast');

    function showToast(title, message) {
        if (!toast) return;
        
        const titleEl = toast.querySelector('.toast-title');
        const messageEl = toast.querySelector('.toast-message');
        
        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    if (proposalForm) {
        proposalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const orgName = document.getElementById('orgName')?.value || '기관';
            const userName = document.getElementById('userName')?.value || '담당자';

            showToast(
                '사업 제안서 신청 접수 완료 🎉', 
                `${orgName} (${userName} 담당자님), 부산대학교 산학협력 실증 보고서 및 견적이 곧 발송됩니다.`
            );

            proposalForm.reset();
        });
    }

});
