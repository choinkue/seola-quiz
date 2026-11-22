/* 조펭솜 공통 코드: 성장 단계 / 별 저장 / 펭귄 그림 / 세계여행 (홈·퀴즈 공용) */
const STAGES=[
 [0,"신비한 알","알 속에서 누가 자라고 있어! 문제를 맞히면 깨어나",""],
 [80,"아기 펭귄","알을 깨고 아기 펭귄이 태어났어!",""],
 [200,"꼬마 펭귄","뒤뚱뒤뚱 걷기 시작했어!",""],
 [380,"새싹 펭귄","머리에 해바라기 꽃잎이 돋아나기 시작했어!",""],
 [650,"해바라기 펭귄","해바라기 모자가 활짝 피었어!",""],
 [1000,"여행가 펭귄","별꽃 가방을 메고 공부 모험을 떠나!",""],
 [1400,"모험가 펭귄","따뜻한 목도리를 두르고 더 멀리 가 보자!",""],
 [1900,"박사 펭귄","동글 안경을 쓴 박사가 됐어! 🤓",""],
 [2450,"왕관 펭귄","공부 왕 펭귄이 됐어! 👑",""],
 [3100,"황금 해바라기 펭귄","전설의 황금 펭귄이 나타났어! ✨ 이제 펭귄 마을로 이사 가서 더 큰 꿈을 꿔 볼 거야 🏡",""],
 [3400,"마을 주민 조펭솜","펭귄 마을에 도착했어! 광장에서 낡은 세계 지도를 발견했어. 마을 친구가 말했어. '바다 건너 더 넓은 세상이 있대!' 🗺️","🗺️"],
 [3700,"짐 싸는 조펭솜","여행 가방을 장만했어! 튼튼한 가방에 뭘 넣을까? 🎒","🎒"],
 [4000,"여권 만드는 조펭솜","나만의 여행 수첩(여권)을 만들었어! 도장을 찍을 칸이 가득해 📘","📘"],
 [4300,"인사말 공부 조펭솜","나라마다 인사말이 달라! 안녕, 곤니치와, 니하오… 열심히 외우는 중 🗣️","🗣️"],
 [4600,"길잡이 조펭솜","나침반과 접는 지도를 챙겼어. 이제 길을 잃어도 괜찮아! 🧭","🧭"],
 [4900,"사진가 조펭솜","카메라와 여행 일기장을 준비했어. 멋진 순간을 모두 담을 거야 📷","📷"],
 [5200,"계획 세우는 조펭솜","세계 지도에 여행 경로를 쭉 그어 봤어. 첫 도착지는 일본! ✈️","✈️"],
 [5500,"송별 파티 조펭솜","마을 친구들이 송별 파티를 열어 줬어. 엽서 꼭 보낼게! 🎉","🎉"],
 [5800,"표 예약 조펭솜","드디어 배와 비행기 표를 예약했어! 두근두근 🎫","🎫"],
 [6100,"세계여행가 조펭솜","친구들의 배웅을 받으며 조펭솜이 세계여행을 떠나! 첫 도착지는 일본이야 ✈️🌍","🌍"]
];
const TRIP_START=6100, TRIP_STEP=60;   // 세계여행 출발 별 / 도시 하나당 별
const PETAL=[["#ffd84d","#f0bf2a"]];
const XPKEY="seola_penguin_xp", VERKEY="seola_xp_ver";
let memXP=0;
function migrateXP(v){   // 예전(1~3회차 초반) 기준 별을 새 기준으로 옮김: 레벨은 내려가지 않게
  const OLD=[0,30,80,150,250,380,540,730,950,1200];
  if(v>=1500) return Math.max(v,STAGES[9][0]);
  let s=0; for(let i=0;i<OLD.length;i++) if(v>=OLD[i]) s=i;
  return Math.max(v,STAGES[s][0]);
}
function getXP(){
  let v=memXP;
  try{
    const s=localStorage.getItem(XPKEY); if(s!==null) v=+s||0;
    if(localStorage.getItem(VERKEY)!=="2"){ v=migrateXP(v); localStorage.setItem(XPKEY,String(v)); localStorage.setItem(VERKEY,"2"); }
  }catch(e){}
  return v;
}
function setXP(v){memXP=v;try{localStorage.setItem(XPKEY,String(v))}catch(e){}}
function info(xp){
  let st=0; for(let i=0;i<STAGES.length;i++) if(xp>=STAGES[i][0]) st=i;
  const trip = st>=STAGES.length-1 ? Math.min(STOPS.length, Math.floor((xp-TRIP_START)/TRIP_STEP)) : -1;
  return {st, trip};
}
function stageOf(xp){return info(xp).st}
function addXP(n){
  const b=info(getXP()); setXP(getXP()+n); window.__gain=(window.__gain||0)+n; const a=info(getXP());
  if(a.st>b.st) window.__levelUp={st:a.st};
  else if(a.st===STAGES.length-1 && a.trip>b.trip && a.trip>=1) window.__levelUp={trip:a.trip-1};
  renderLv();
}
function escH(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

/* ===== 세계여행 데이터 (12개 나라 × 도시 3곳 = 36곳) ===== */
const TRIP=[
 {c:"일본",f:"🇯🇵",info:"수도는 도쿄, 말은 일본어, 돈은 엔(¥)이에요. 큰 섬 네 개(홋카이도·혼슈·시코쿠·규슈)와 수많은 작은 섬으로 이뤄진 섬나라예요. 가장 높은 산 후지산은 높이가 3,776m예요. 지진이 많아서 건물을 튼튼하게 짓고 대피 훈련을 자주 해요.",hello:"こんにちは (곤니치와)",cities:[
  {n:"도쿄",intro:"옛것과 첨단이 함께 있는 일본의 수도. 높은 빌딩 사이에 오래된 절이 있어요.",spots:["센소지(아사쿠사의 큰 절)","시부야 스크램블 교차로","도쿄 스카이트리(높이 634m)"],course:"아사쿠사 센소지 → 스카이트리 → 시부야 교차로 야경",food:"스시, 라멘"},
  {n:"오사카",intro:"맛있는 음식이 많아 '먹다가 망한다'는 말까지 있는 먹거리의 도시예요.",spots:["오사카성","도톤보리 거리","유니버설 스튜디오 재팬"],course:"오전 오사카성 → 점심·저녁은 도톤보리 먹거리 탐험",food:"타코야키, 오코노미야키"},
  {n:"교토",intro:"약 천 년 동안 일본의 수도였던 옛 도시. 전통 건물과 절이 아주 많아요.",spots:["후시미 이나리 신사(붉은 문이 줄지어 있는 길)","금각사(황금빛 절)","기요미즈데라(전망 좋은 절)"],course:"이른 아침 후시미 이나리 → 기요미즈데라 → 기온 거리 산책",food:"말차 디저트, 유도후(두부 요리)"}]},
 {c:"중국",f:"🇨🇳",info:"수도는 베이징, 말은 중국어(표준 중국어), 돈은 위안이에요. 땅이 아주 넓고 인구가 14억 명이 넘어요. 귀여운 판다는 중국의 쓰촨 지역 등에서 살아요.",hello:"你好 (니하오)",cities:[
  {n:"상하이",intro:"중국에서 가장 큰 도시 중 하나인 항구 도시. 옛 건물과 새 마천루가 강을 사이에 두고 마주 봐요.",spots:["와이탄(황푸강변 옛 건물 거리)","동방명주 탑(높이 468m)","예원(옛 정원)"],course:"예원 → 와이탄 산책 → 강 건너 푸둥 야경(동방명주)",food:"샤오롱바오(국물 있는 작은 만두), 셩지엔(군만두)"},
  {n:"베이징",intro:"중국의 수도. 600년 넘게 황제들이 살던 궁전이 도시 한가운데 있어요.",spots:["자금성(옛 황제의 궁전)","천안문 광장","만리장성(바다링 구간)"],course:"천안문 광장 → 자금성 → (다음 날) 만리장성",food:"베이징 오리구이(카오야), 탕후루"},
  {n:"시안",intro:"옛 이름은 장안. 중국의 오래된 수도로, 땅속에서 진짜 같은 흙 병사들이 나타난 곳이에요.",spots:["병마용(흙으로 만든 병사 군단)","시안 성벽(자전거로 한 바퀴)","대안탑"],course:"오전 병마용 → 오후 성벽 자전거 타기 → 저녁 회족 거리",food:"비앙비앙 면, 양고기 국물에 빵을 넣어 먹는 양러우파오모"}]},
 {c:"태국",f:"🇹🇭",info:"수도는 방콕, 말은 태국어, 돈은 바트예요. 불교 문화가 깊고 코끼리가 나라를 대표하는 동물이에요. 태국 사람들은 방콕을 '끄룽텝'이라고 불러요.",hello:"สวัสดี (사왓디)",cities:[
  {n:"방콕",intro:"황금빛 사원과 수상 시장, 시끌벅적한 길거리 음식이 가득한 수도예요.",spots:["왕궁과 왓 프라깨오(에메랄드 불상 사원)","왓 아룬(새벽 사원)","짜오프라야 강 보트"],course:"왕궁 → 왓포 → 보트 타고 왓 아룬에서 석양 보기",food:"팟타이, 똠얌꿍"},
  {n:"치앙마이",intro:"북쪽 산속의 옛 도시. 오래된 사원과 골목이 아기자기하고 시원해요.",spots:["올드시티의 사원들","왓 프라탓 도이수텝(산 위 사원)","나이트 바자(야시장)"],course:"올드시티 사원 둘러보기 → 도이수텝에서 전망 보기 → 야시장 구경",food:"카오소이(카레 국수)"},
  {n:"푸껫",intro:"태국에서 가장 큰 섬. 푸른 안다만 바다와 하얀 모래 해변이 유명해요.",spots:["빠똥 해변","빅 부다(산 위의 큰 불상)","올드타운의 알록달록한 건물들"],course:"빅 부다 전망 → 올드타운 산책 → 해변에서 일몰",food:"해산물 요리, 망고 찰밥"}]},
 {c:"베트남",f:"🇻🇳",info:"수도는 하노이, 말은 베트남어, 돈은 동이에요. 길쭉한 S자 모양의 나라이고, 전통 옷 아오자이가 유명해요. 커피를 세계에서 손꼽히게 많이 수출하는 나라예요.",hello:"Xin chào (씬 짜오)",cities:[
  {n:"하노이",intro:"천 년이 넘은 북부의 수도. 오토바이가 쌩쌩 달리는 골목과 호수가 어울려요.",spots:["호안끼엠 호수","구시가지 36거리","문묘(옛 학교)"],course:"호안끼엠 호수 → 구시가지 골목 → 문묘",food:"쌀국수(퍼), 분짜, 에그커피"},
  {n:"다낭",intro:"중부의 바닷가 도시. 해변이 넓고 근처에 볼거리가 많아요.",spots:["미케 해변","바나힐의 골든 브릿지(손 모양 다리)","오행산"],course:"바나힐 → 미케 해변 → 저녁 용 다리 구경",food:"미꽝(비빔 국수), 반미"},
  {n:"호찌민",intro:"남쪽의 가장 큰 도시. 옛 이름은 사이공이고 활기가 넘쳐요.",spots:["벤탄 시장","노트르담 대성당","통일궁"],course:"통일궁과 대성당 → 벤탄 시장 쇼핑 → 야경",food:"반미, 월남쌈(고이꾸온)"}]},
 {c:"인도",f:"🇮🇳",info:"수도는 뉴델리, 말은 힌디어와 영어 등 여러 가지, 돈은 루피예요. 땅이 넓고 언어와 문화가 아주 다양해요. 숫자 0의 개념이 발달한 나라로도 알려져 있어요.",hello:"नमस्ते (나마스테)",cities:[
  {n:"델리",intro:"오래된 시장과 큰 유적, 새로 지은 도로가 함께 있는 인도의 수도 지역이에요.",spots:["붉은 요새(레드 포트)","인도 문","후마윤 묘"],course:"붉은 요새 → 올드델리 시장 → 인도 문",food:"난과 커리, 라씨(요구르트 음료)"},
  {n:"아그라",intro:"하얀 대리석 무덤 타지마할이 있는 도시. 아름다운 건물로 세계적으로 유명해요.",spots:["타지마할","아그라 요새","이티마드 웃 다울라(작은 보석 상자 같은 무덤)"],course:"이른 아침 타지마할 → 아그라 요새",food:"페타(달콤한 과자), 커리"},
  {n:"자이푸르",intro:"건물을 분홍빛으로 칠해 '핑크 시티'라고 불리는 도시예요.",spots:["하와 마할(바람의 궁전)","암베르 요새","시티 팰리스"],course:"암베르 요새 → 시티 팰리스 → 하와 마할",food:"달 바티 추르마(지역 전통 요리)"}]},
 {c:"튀르키예",f:"🇹🇷",info:"수도는 앙카라, 말은 튀르키예어, 돈은 리라예요. 아시아와 유럽 두 대륙에 걸쳐 있어서 동서양 문화가 섞여 있어요.",hello:"Merhaba (메르하바)",cities:[
  {n:"이스탄불",intro:"바다(보스포루스 해협)를 사이에 두고 유럽과 아시아가 마주 보는 큰 도시예요.",spots:["아야 소피아","블루 모스크","그랜드 바자르(큰 시장)"],course:"아야 소피아 → 블루 모스크 → 그랜드 바자르 → 해협 유람선",food:"케밥, 바클라바(달콤한 과자), 고등어 샌드위치"},
  {n:"카파도키아",intro:"뾰족한 바위 기둥과 동굴 집이 있는 신비한 땅. 새벽에 열기구가 하늘을 가득 채워요.",spots:["열기구 투어","괴레메 야외 박물관","데린쿠유 지하도시"],course:"새벽 열기구 → 괴레메 야외 박물관 → 지하도시",food:"항아리 케밥"},
  {n:"안탈리아",intro:"푸른 지중해를 끼고 있는 휴양 도시. 옛 항구 마을이 아기자기해요.",spots:["칼레이치(옛 도시)","뒤덴 폭포","하드리아누스 문"],course:"칼레이치 구시가지와 항구 → 뒤덴 폭포 → 해변에서 쉬기",food:"돈두르마(쫀득한 아이스크림), 해산물"}]},
 {c:"이집트",f:"🇪🇬",info:"수도는 카이로, 말은 아랍어, 돈은 이집트 파운드예요. 나일강을 따라 고대 문명이 꽃핀 나라이고, 피라미드는 약 4,500년 전에 지어졌어요.",hello:"مرحبا (마르하반)",cities:[
  {n:"카이로",intro:"이집트의 수도. 도시 바로 옆 사막에 거대한 피라미드가 서 있어요.",spots:["기자의 피라미드와 스핑크스","이집트 박물관","칸 엘 칼릴리 시장"],course:"오전 피라미드와 스핑크스 → 오후 박물관 → 저녁 시장 구경",food:"코샤리(이집트식 비빔 음식), 팔라펠"},
  {n:"룩소르",intro:"고대 도시 테베가 있던 곳. 도시 전체가 야외 박물관 같아요.",spots:["카르나크 신전","왕가의 계곡","룩소르 신전"],course:"왕가의 계곡 → 카르나크 신전 → 저녁 룩소르 신전 야경",food:"훔무스, 이집트 빵 '아이시'"},
  {n:"아스완",intro:"나일강 남쪽의 조용한 도시. 돛단배 펠루카가 강 위를 떠다녀요.",spots:["아부심벨 신전(람세스 2세)","필레 신전","펠루카(돛단배) 타기"],course:"펠루카 타기 → 필레 신전 → 아부심벨 신전",food:"카르카데(붉은 꽃 차), 누비아 지역 요리"}]},
 {c:"이탈리아",f:"🇮🇹",info:"수도는 로마, 말은 이탈리아어, 돈은 유로(€)예요. 유네스코 세계유산이 가장 많은 나라 중 하나예요. 장화 모양의 땅으로 유명해요.",hello:"Ciao (차오)",cities:[
  {n:"로마",intro:"2천 년이 넘은 역사가 길거리마다 숨어 있는 수도예요.",spots:["콜로세움","트레비 분수","바티칸(성 베드로 대성당)"],course:"콜로세움 → 포로 로마노 → 트레비 분수에서 동전 던지기",food:"카르보나라, 젤라토"},
  {n:"피렌체",intro:"르네상스 예술이 꽃핀 도시. 도시 전체가 미술관 같아요.",spots:["두오모 대성당","우피치 미술관","베키오 다리"],course:"두오모 → 우피치 미술관 → 베키오 다리에서 노을 보기",food:"티본 스테이크(비스테카), 젤라토"},
  {n:"베네치아",intro:"작은 섬 100여 개가 다리로 이어진 물의 도시. 길이 물길이에요.",spots:["산마르코 광장","리알토 다리","곤돌라 타기"],course:"산마르코 광장 → 두칼레 궁전 → 곤돌라 → 리알토 다리",food:"오징어 먹물 파스타, 해산물 요리"}]},
 {c:"프랑스",f:"🇫🇷",info:"수도는 파리, 말은 프랑스어, 돈은 유로(€)예요. 예술과 요리로 유명하고, 에펠탑은 1889년 만국박람회 때 세워졌어요.",hello:"Bonjour (봉주르)",cities:[
  {n:"파리",intro:"예술과 패션의 도시. 센 강을 따라 걷기만 해도 멋진 건물이 줄줄이 나와요.",spots:["에펠탑","루브르 박물관(모나리자)","개선문과 샹젤리제 거리"],course:"에펠탑 → 센 강 산책 → 루브르 박물관 → 개선문",food:"크루아상, 마카롱"},
  {n:"니스",intro:"지중해 바닷가의 햇살 가득한 휴양 도시예요.",spots:["영국인 산책로(해안 산책길)","구시가지 꽃 시장","샤토 언덕 전망대"],course:"꽃 시장 → 샤토 언덕 전망 → 해안 산책",food:"니수아즈 샐러드"},
  {n:"리옹",intro:"프랑스에서 맛있는 음식으로 이름난 도시. 두 강이 만나는 곳에 있어요.",spots:["푸르비에르 언덕 대성당","비외 리옹(옛 거리)","론 강변 산책로"],course:"푸르비에르 언덕 → 비외 리옹 골목 → 론 강변",food:"리옹 전통 요리(전통 식당 '부숑')"}]},
 {c:"영국",f:"🇬🇧",info:"수도는 런던, 말은 영어, 돈은 파운드(£)예요. 잉글랜드·스코틀랜드·웨일스·북아일랜드 네 나라가 모인 연합 왕국이에요.",hello:"Hello (헬로)",cities:[
  {n:"런던",intro:"템스 강이 흐르는 영국의 수도. 옛 건물과 현대 건물이 어울려요.",spots:["빅벤과 국회의사당","타워 브리지","대영박물관"],course:"빅벤 → 버킹엄 궁전 → 템스 강변 → 타워 브리지",food:"피시 앤 칩스, 애프터눈 티"},
  {n:"에든버러",intro:"스코틀랜드의 수도. 언덕 위에 성이 있는 중세 분위기의 도시예요.",spots:["에든버러 성","로열 마일(성 아래 큰길)","아서스 시트(전망 언덕)"],course:"에든버러 성 → 로열 마일 산책 → 아서스 시트 오르기",food:"해기스(전통 요리), 쇼트브레드 과자"},
  {n:"옥스퍼드",intro:"영어권에서 가장 오래된 대학이 있는 대학 도시예요.",spots:["크라이스트 처치","보들리안 도서관","래드클리프 카메라(둥근 도서관)"],course:"크라이스트 처치 → 보들리안 도서관 → 강변 산책",food:"스콘과 영국식 홍차"}]},
 {c:"미국",f:"🇺🇸",info:"수도는 워싱턴 D.C., 말은 영어, 돈은 달러($)예요. 50개 주로 이뤄진 큰 나라예요.",hello:"Hello / Hi (헬로 / 하이)",cities:[
  {n:"뉴욕",intro:"높은 빌딩이 가득한 세계적인 큰 도시. 밤에도 불이 꺼지지 않아요.",spots:["자유의 여신상","센트럴 파크","타임스 스퀘어"],course:"페리로 자유의 여신상 → 브루클린 브리지 → 타임스 스퀘어 야경",food:"뉴욕 피자, 베이글"},
  {n:"샌프란시스코",intro:"언덕이 많고 안개가 자주 끼는 항구 도시. 붉은 금문교가 상징이에요.",spots:["금문교(골든게이트 브리지)","피셔맨스 워프(부둣가)","케이블카"],course:"금문교 → 피셔맨스 워프 → 케이블카 타기",food:"빵 그릇에 담은 클램 차우더(조개 수프)"},
  {n:"로스앤젤레스",intro:"영화 산업으로 유명한 서부의 큰 도시. 햇살과 바다가 가까워요.",spots:["할리우드 사인","산타모니카 해변","그리피스 천문대"],course:"그리피스 천문대 → 할리우드 → 산타모니카에서 석양",food:"타코, 햄버거"}]},
 {c:"호주",f:"🇦🇺",info:"수도는 캔버라(시드니가 아니에요!), 말은 영어, 돈은 호주 달러예요. 캥거루와 코알라가 사는 큰 섬나라예요.",hello:"G'day (그데이)",cities:[
  {n:"시드니",intro:"푸른 항구 위에 조개껍데기 같은 오페라 하우스가 있는 호주의 큰 도시예요.",spots:["오페라 하우스","하버 브리지","본다이 해변"],course:"오페라 하우스 → 왕립 식물원 산책 → 하버 브리지",food:"미트 파이, 래밍턴(코코넛 케이크)"},
  {n:"멜버른",intro:"커피와 예술, 골목 벽화로 유명한 도시예요.",spots:["플린더스 스트리트 역","골목 벽화 거리","퀸 빅토리아 마켓"],course:"벽화 골목 구경 → 퀸 빅토리아 마켓 → 야라 강변 산책",food:"플랫 화이트 커피, 브런치"},
  {n:"케언스",intro:"바다 속 세계 최대 산호초 '그레이트 배리어 리프'로 가는 관문 도시예요.",spots:["그레이트 배리어 리프","쿠란다 열대우림","케언스 라군(바닷가 수영장)"],course:"산호초 투어(스노클링) → 쿠란다 열대우림 스카이레일",food:"열대 과일, 바라문디(생선) 요리"}]}
];
const STOPS=[]; TRIP.forEach(co=>co.cities.forEach((ct,i)=>STOPS.push({co,ct,first:i===0,last:i===co.cities.length-1})));

function stopCardHTML(k){
  const S=STOPS[k], co=S.co, ct=S.ct;
  let h=`<div class="stopc"><div class="stoph">${co.f} ${escH(co.c)} · <b>${escH(ct.n)}</b></div>
  <div>${escH(ct.intro)}</div>
  <div class="sl">📍 꼭 가볼 곳</div><ul>${ct.spots.map(s=>`<li>${escH(s)}</li>`).join("")}</ul>
  <div class="sl">🗺️ 추천 코스</div><div>${escH(ct.course)}</div>
  <div class="sl">🍽️ 대표 음식</div><div>${escH(ct.food)}</div>
  <div class="sl">👋 인사말</div><div>${escH(co.hello)}</div>`;
  if(S.first) h+=`<div class="sl">🌏 ${escH(co.c)} 알아보기</div><div>${escH(co.info)}</div>`;
  if(S.last) h+=`<div class="stamp">${co.f} ${escH(co.c)} 도장 쾅! ✅</div>`;
  return h+`</div>`;
}
function tripBookHTML(){
  const I=info(getXP()); if(I.st<STAGES.length-1) return "";
  const n=Math.max(0,I.trip);
  const done = n>=STOPS.length;
  const list=STOPS.slice(0,n).map((S,k)=>`<details class="trd"><summary>${S.co.f} ${escH(S.co.c)} · ${escH(S.ct.n)}</summary>${stopCardHTML(k)}</details>`).join("");
  return `<div class="card"><b>🌍 조펭솜 여행 수첩</b> <span class="muted">${n} / ${STOPS.length}곳</span>
  ${done?'<div class="stamp">🏆 세계일주 완료! 조펭솜이 마을로 돌아가 엽서를 나눠 줬어</div>':""}
  ${n?list:'<div class="muted" style="margin-top:8px">아직 첫 도시에 도착하지 않았어. 별을 모으면 도착해!</div>'}</div>`;
}

function lvHTML(){
  const x=getXP(), I=info(x), S=STAGES[I.st], nx=STAGES[I.st+1];
  let right,pct,sub="";
  if(nx){ right=`다음 성장까지 ⭐${nx[0]-x}`; pct=Math.round((x-S[0])/(nx[0]-S[0])*100); }
  else if(I.trip>=STOPS.length){ right="세계일주 완료! 🏆"; pct=100; }
  else { const base=TRIP_START+I.trip*TRIP_STEP; pct=Math.round((x-base)/TRIP_STEP*100); right=`${STOPS[I.trip].ct.n}까지 ⭐${base+TRIP_STEP-x}`; }
  if(I.st>=STAGES.length-1){
    if(I.trip<=0) sub=`✈️ 첫 도착지 ${STOPS[0].co.f} ${STOPS[0].ct.n}로 가는 중`;
    else if(I.trip>=STOPS.length) sub="🌍 모든 도시를 다 돌았어!";
    else { const c=STOPS[I.trip-1]; sub=`📍 지금 ${c.co.f} ${c.co.c} ${c.ct.n} · 다음 ${STOPS[I.trip].co.f} ${STOPS[I.trip].ct.n}`; }
  } else if(I.st>=10){ sub=`🎒 준비물 ${STAGES.slice(10,I.st+1).map(s=>s[3]).join(" ")}`; }
  else if(I.st===9){ sub="🏡 곧 펭귄 마을로 이사해!"; }
  return `<div class="lv"><b>🐧 Lv.${I.st+1} ${S[1]}</b><span>${right}</span></div><div class="lvbar"><i style="width:${pct}%"></i></div>${sub?`<div class="muted" style="margin:-6px 0 8px">${sub}</div>`:""}`;
}
function renderLv(){document.querySelectorAll(".lvbox").forEach(e=>e.innerHTML=lvHTML());}
function showLevelUp(L,cb){
  const o=document.createElement("div");o.className="ov";
  if(L.trip!==undefined){
    o.innerHTML=`<div class="ovc big"><div class="lvtitle">✈️ ${escH(STOPS[L.trip].ct.n)} 도착!</div>${stopCardHTML(L.trip)}<button id="ovok">여행 수첩에 담기 📘</button></div>`;
  } else {
    const S=STAGES[L.st];
    const title = L.st===9 ? "🏡 펭귄 마을로 이사했어!" : L.st===STAGES.length-1 ? "🌍 세계여행 출발!" : L.st>=10 ? "🎒 여행 준비가 한 걸음!" : "🎉 펭귄이 자랐어!";
    o.innerHTML=`<div class="ovc"><div class="lvtitle">${title}</div><div class="pg big">${penguin("happy",L.st)}</div><div class="lvname">Lv.${L.st+1} ${escH(S[1])}</div><div class="muted" style="margin:6px 0 4px">${escH(S[2])}</div><button id="ovok">좋아! 계속하기</button></div>`;
  }
  document.body.appendChild(o);
  document.getElementById("ovok").onclick=()=>{o.remove();cb&&cb();};
}
function dexHTML(){
  const I=info(getXP());
  const dex=STAGES.map((s,i)=>`<div class="dx ${i>I.st?"lock":""}">${i<=I.st?penguin("normal",i):'<div class="q">?</div>'}<div>${i<=I.st?escH(s[1]):`⭐${s[0]}`}</div></div>`).join("");
  const vil = I.st>=9 ? `<div class="vil"><b>🏡 펭귄 마을</b> <span class="muted">조펭솜이 사는 곳${I.st>=STAGES.length-1?" · 지금은 세계여행 중!":""}</span></div>` : `<div class="muted" style="margin-top:10px">Lv.10이 되면 조펭솜이 🏡펭귄 마을로 이사 가고, Lv.20이 되면 🌍세계여행을 떠나!</div>`;
  return `<div class="card"><b>🌻 조펭솜 성장 도감</b><div class="dex">${dex}</div>${vil}</div>${tripBookHTML()}`;
}
function penguin(mood, st, gen){
  if(st===undefined){st=info(getXP()).st;}
  const prep = st>=10 ? STAGES[st][3] : ""; st=Math.min(st,9);
  const cls = mood==="happy"?"hop":mood==="sad"?"shake":"";
  const gold = st>=9;
  const [pf0,ps0]=PETAL[0];   // 설아가 좋아하는 노란 해바라기로 고정
  const pf = gold?"#ffc21a":pf0, ps = gold?"#e0a000":ps0;
  if(st===0){
    const face = mood==="happy" ? '<path d="M50 70 q4 -4 8 0 M62 70 q4 -4 8 0" stroke="#1f1f24" stroke-width="2.5" fill="none" stroke-linecap="round"/>' : mood==="sad" ? '<circle cx="54" cy="70" r="2.5" fill="#1f1f24"/><circle cx="66" cy="70" r="2.5" fill="#1f1f24"/>' : '<circle cx="54" cy="70" r="3" fill="#1f1f24"/><circle cx="66" cy="70" r="3" fill="#1f1f24"/>';
    return `<svg viewBox="0 0 120 130" class="${cls}"><ellipse cx="60" cy="125" rx="26" ry="3.5" fill="rgba(0,0,0,.08)"/>
    <path d="M60 22 C 30 22 22 72 26 96 C 30 118 90 118 94 96 C 98 72 90 22 60 22 z" fill="#fbf3e6" stroke="#e8dcc6" stroke-width="2"/>
    <circle cx="44" cy="48" r="5" fill="${pf}"/><circle cx="78" cy="88" r="6" fill="${pf}"/><circle cx="74" cy="44" r="3.5" fill="${pf}"/>
    <path d="M34 62 l10 6 l8 -7 l8 7 l8 -7 l8 7 l10 -6" stroke="#cdbb9e" stroke-width="2" fill="none"/>
    ${face}<circle cx="47" cy="78" r="3.5" fill="#ff9e9e" opacity=".6"/><circle cx="73" cy="78" r="3.5" fill="#ff9e9e" opacity=".6"/></svg>`;
  }
  const eyes = mood==="happy"
    ? '<path d="M44 55 q4 -5 8 0" stroke="#1f1f24" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M68 55 q4 -5 8 0" stroke="#1f1f24" stroke-width="3" fill="none" stroke-linecap="round"/>'
    : mood==="sad"
    ? '<circle cx="48" cy="55" r="3.8" fill="#1f1f24"/><circle cx="72" cy="55" r="3.8" fill="#1f1f24"/><path d="M43 48 l8 3 M77 48 l-8 3" stroke="#1f1f24" stroke-width="2.2" stroke-linecap="round"/><path d="M47 61 q-3 6 0 8 q3 -2 0 -8" fill="#7cc4ff"/>'
    : '<circle cx="48" cy="55" r="4.3" fill="#1f1f24"/><circle cx="72" cy="55" r="4.3" fill="#1f1f24"/><circle cx="49.4" cy="53.5" r="1.4" fill="#fff"/><circle cx="73.4" cy="53.5" r="1.4" fill="#fff"/>';
  const nose = mood==="sad" ? '<ellipse cx="60" cy="60" rx="6" ry="4" fill="#8a4a2a"/>' : '<ellipse cx="60" cy="59" rx="6.5" ry="4.5" fill="#8a4a2a"/><ellipse cx="58" cy="57.5" rx="2" ry="1" fill="#b06a45"/>';
  const mouth = mood==="happy" ? '<path d="M56 66 q4 4 8 0" stroke="#8a4a2a" stroke-width="2" fill="none" stroke-linecap="round"/>' : '';
  let petals="";
  const PR=[0,0,0,6,8,9.5,11,12,13,14][st];   // 단계별 해바라기 꽃잎 크기 (천천히 커짐)
  if(PR){ const off=22+PR*0.85; for(let i=0;i<10;i++){petals+=`<ellipse cx="60" cy="${52-off}" rx="${PR}" ry="${PR}" fill="${pf}" stroke="${ps}" stroke-width="1.2" transform="rotate(${i*36+18} 60 52)"/>`} }
  const scarf = st>=6 ? '<path d="M35 77 q25 11 50 0 l1 8 q-26 12 -52 0 z" fill="#e8574a"/><path d="M74 84 l7 17 l-9 -1 z" fill="#d94a3e"/>' : "";
  let bag="";
  if(st>=5){ let star=""; for(let i=0;i<5;i++){star+=`<ellipse cx="30" cy="85" rx="4.5" ry="6" fill="${pf}" stroke="${ps}" stroke-width="1" transform="rotate(${i*72} 30 92)"/>`}
    bag=`<path d="M84 82 L34 108" stroke="#2b2b30" stroke-width="3.2" stroke-linecap="round"/>${star}<circle cx="30" cy="92" r="4" fill="#e86a2e"/>`; }
  const glasses = st>=7 ? '<circle cx="48" cy="55" r="8.5" fill="none" stroke="#5a3b22" stroke-width="2.2"/><circle cx="72" cy="55" r="8.5" fill="none" stroke="#5a3b22" stroke-width="2.2"/><path d="M56.5 55 h7" stroke="#5a3b22" stroke-width="2.2"/>' : "";
  const crown = st>=8 ? `<path d="M46 26 l4 -14 l6 9 l4 -12 l4 12 l6 -9 l4 14 z" fill="#ffcf33" stroke="#d99a00" stroke-width="1.5" stroke-linejoin="round"/><circle cx="60" cy="20" r="2.4" fill="#ff6b8a"/>` : "";
  const glow = gold ? `<circle cx="60" cy="66" r="58" fill="url(#gl)"/><path d="M14 30 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z M104 70 l2.5 5 l5 2.5 l-5 2.5 l-2.5 5 l-2.5 -5 l-5 -2.5 l5 -2.5 z" fill="#ffd84d"/>` : "";
  const tuft = st===1 ? '<path d="M56 24 q2 -8 4 0 q2 -8 4 0" stroke="#5f5f66" stroke-width="3" fill="none" stroke-linecap="round"/>' : "";
  const shell = st===1 ? '<path d="M28 100 l8 -8 l7 8 l8 -8 l9 8 l9 -8 l8 8 l7 -8 l8 8 q0 26 -32 26 q-32 0 -32 -26 z" fill="#fbf3e6" stroke="#e8dcc6" stroke-width="2"/>' : "";
  const scale = [1,.7,.78,.84,.88,.92,.95,.98,1,1.02][st];   // 단계별 몸 크기 (천천히 커짐)
  return `<svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg" class="${cls}">
    <defs><radialGradient id="gl"><stop offset="0" stop-color="#fff2a8" stop-opacity=".9"/><stop offset="1" stop-color="#fff2a8" stop-opacity="0"/></radialGradient></defs>
    ${glow}
    <ellipse cx="60" cy="126" rx="28" ry="3.5" fill="rgba(0,0,0,.08)"/>
    <g transform="translate(60 128) scale(${scale}) translate(-60 -128)">
    <ellipse cx="49" cy="122" rx="8" ry="4" fill="#9d8f84"/><ellipse cx="71" cy="122" rx="8" ry="4" fill="#9d8f84"/>
    <path d="M30 78 q-12 10 -8 24" stroke="#d6c7b8" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M90 78 q12 10 8 24" stroke="#d6c7b8" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M32 74 q-6 48 28 47 q34 1 28 -47 z" fill="#b3a397"/>
    ${petals}${tuft}
    <circle cx="60" cy="52" r="29" fill="#5f5f66"/>
    <path d="M33 58 q0 -18 13 -22 q8 -2 14 6 q6 -8 14 -6 q13 4 13 22 q0 20 -27 20 q-27 0 -27 -20 z" fill="#fbf3e6"/>
    <circle cx="41" cy="64" r="4.5" fill="#ff9e9e" opacity=".75"/><circle cx="79" cy="64" r="4.5" fill="#ff9e9e" opacity=".75"/>
    ${eyes}${nose}${mouth}${glasses}${scarf}${bag}${crown}${shell}
    </g>
    ${prep?`<text x="96" y="26" font-size="22" text-anchor="middle">${prep}</text>`:""}
  </svg>`;
}

(function(){
  const s=document.createElement("style");
  s.textContent=`.stopc{text-align:left;font-size:18px;line-height:1.5}.stoph{font-size:22px;margin:4px 0 6px}.stopc .sl{font-weight:bold;color:#b9541f;margin-top:8px;font-size:16px}.stopc ul{margin:2px 0 0;padding-left:20px}.stamp{margin-top:10px;background:#e6f6ee;color:#2e9e6a;border-radius:12px;padding:8px 12px;font-weight:bold;text-align:center}.ovc.big{max-height:88vh;overflow:auto}details.trd{border-top:1px solid #efe6da;padding:8px 0}details.trd summary{cursor:pointer;font-weight:bold}.vil{margin-top:10px}`;
  document.head.appendChild(s);
})();
