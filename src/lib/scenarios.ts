import { Scenario } from '@/types/game';

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: '신입생 환영회 대참사',
    description: '신입생 환영회를 위해 예약한 펜션에서 갑자기 예약 취소 통보가 왔다! 환영회까지 3일밖에 안 남았는데...',
    weekRange: [1, 10],
    choices: [
      { id: '1a', text: '비싼 펜션으로 긴급 변경 (예산 투입)', effects: { satisfaction: 15, budget: -20, lgRelation: 0, academic: 0 } },
      { id: '1b', text: '학교 강당에서 간소하게 진행', effects: { satisfaction: -10, budget: 5, lgRelation: 0, academic: 5 } },
      { id: '1c', text: '환영회 취소하고 학과별 소모임으로 대체', effects: { satisfaction: -5, budget: 10, lgRelation: 0, academic: 10 } },
    ],
  },
  {
    id: 2,
    title: '급식 대란',
    description: '학교 식당 운영 업체가 갑자기 계약을 파기했다! 1,100명의 학생들이 당장 내일부터 먹을 곳이 없다.',
    weekRange: [1, 10],
    choices: [
      { id: '2a', text: '학생회 예산으로 임시 도시락 지원', effects: { satisfaction: 10, budget: -25, lgRelation: 0, academic: 0 } },
      { id: '2b', text: 'LG 측에 긴급 지원 요청', effects: { satisfaction: 5, budget: 0, lgRelation: -15, academic: 0 } },
      { id: '2c', text: '학생들에게 자율 해결 안내 (근처 식당 목록 공유)', effects: { satisfaction: -15, budget: 0, lgRelation: 0, academic: -5 } },
    ],
  },
  {
    id: 3,
    title: 'LG 임원 방문',
    description: 'LG전자 부사장이 갑작스럽게 학교를 방문한다! 실습실이 엉망인데 하루 만에 정비해야 한다.',
    weekRange: [1, 10],
    choices: [
      { id: '3a', text: '수업을 임시 중단하고 전체 학생 동원 대청소', effects: { satisfaction: -10, budget: -5, lgRelation: 20, academic: -10 } },
      { id: '3b', text: '가장 깨끗한 실습실만 선별 안내', effects: { satisfaction: 0, budget: 0, lgRelation: 5, academic: 0 } },
      { id: '3c', text: '솔직하게 현 상황 설명하고 지원 요청', effects: { satisfaction: 5, budget: 0, lgRelation: 10, academic: 5 } },
    ],
  },
  {
    id: 4,
    title: '학과 간 실습실 전쟁',
    description: '전기과와 전자과가 공용 실습실 사용 시간을 두고 대립 중이다. 양쪽 다 자격증 시험이 코앞이라 양보할 수 없다고 한다.',
    weekRange: [1, 10],
    choices: [
      { id: '4a', text: '야간 개방 시간을 늘려 양쪽 배정 (예산 투입)', effects: { satisfaction: 10, budget: -15, lgRelation: 0, academic: 15 } },
      { id: '4b', text: '추첨으로 공정하게 결정', effects: { satisfaction: -5, budget: 0, lgRelation: 0, academic: 5 } },
    ],
  },
  {
    id: 5,
    title: '자격증 시험 시즌',
    description: '자격증 시험 시즌이 다가오자 학생들이 스터디 공간을 요구하고 있다. 하지만 학교에 빈 강의실이 부족하다.',
    weekRange: [1, 10],
    choices: [
      { id: '5a', text: '도서관 야간 개방 + 스터디 카페 제휴 (예산 투입)', effects: { satisfaction: 10, budget: -15, lgRelation: 0, academic: 20 } },
      { id: '5b', text: '기존 시설로 시간표 조정만 진행', effects: { satisfaction: -5, budget: 0, lgRelation: 0, academic: 5 } },
      { id: '5c', text: 'LG에 실습실 추가 개방 요청', effects: { satisfaction: 5, budget: 0, lgRelation: -10, academic: 15 } },
    ],
  },
  {
    id: 6,
    title: 'MT 예산 논란',
    description: '5개 학과 MT 예산을 배분해야 하는데, 총 예산이 요청액의 절반밖에 안 된다. 학과장들이 들고 일어났다!',
    weekRange: [1, 10],
    choices: [
      { id: '6a', text: '인원 비례로 공정 배분', effects: { satisfaction: -5, budget: 5, lgRelation: 0, academic: 0 } },
      { id: '6b', text: '학생회 비상금 풀어서 전액 지원', effects: { satisfaction: 15, budget: -20, lgRelation: 0, academic: 5 } },
    ],
  },
  {
    id: 7,
    title: '기숙사 와이파이 전쟁',
    description: '기숙사 와이파이가 2주째 끊기고 있다. 학생들의 불만이 극에 달했고, 인터넷 없이 과제 제출도 못하는 상황이다.',
    weekRange: [1, 10],
    choices: [
      { id: '7a', text: '학생회 예산으로 임시 핫스팟 장비 대여', effects: { satisfaction: 10, budget: -15, lgRelation: 0, academic: 10 } },
      { id: '7b', text: 'LG U+에 후원 요청', effects: { satisfaction: 5, budget: 0, lgRelation: -10, academic: 5 } },
      { id: '7c', text: '학교 행정실에 강력 항의', effects: { satisfaction: 5, budget: 0, lgRelation: 5, academic: 5 } },
    ],
  },
  {
    id: 8,
    title: '축제 기획의 늪',
    description: '대동제 예산이 작년 대비 30% 삭감됐다. 학생들은 화려한 축제를 기대하고 있고, LG에서도 관심을 보이고 있다.',
    weekRange: [11, 20],
    choices: [
      { id: '8a', text: 'LG 협찬을 받아 대규모 축제 진행', effects: { satisfaction: 20, budget: 5, lgRelation: -10, academic: -10 } },
      { id: '8b', text: '소규모 알뜰 축제로 변경', effects: { satisfaction: -10, budget: 15, lgRelation: 0, academic: 5 } },
      { id: '8c', text: '학과별 부스 운영으로 자체 수익 창출', effects: { satisfaction: 5, budget: 10, lgRelation: 5, academic: 0 } },
    ],
  },
  {
    id: 9,
    title: '교수님의 분노',
    description: '전체 출석률이 60% 아래로 떨어졌다. 교수회의에서 학생회장에게 책임을 묻겠다는 이야기가 나왔다.',
    weekRange: [11, 20],
    choices: [
      { id: '9a', text: '출석 체크 캠페인 + 개근상 도입', effects: { satisfaction: -5, budget: -10, lgRelation: 5, academic: 20 } },
      { id: '9b', text: '교수님들과 간담회 개최 (절충안 모색)', effects: { satisfaction: 0, budget: -5, lgRelation: 5, academic: 10 } },
      { id: '9c', text: '학생들 편에서 수업 개선 요구', effects: { satisfaction: 15, budget: 0, lgRelation: -10, academic: -5 } },
    ],
  },
  {
    id: 10,
    title: '갑작스러운 감사',
    description: '학교 감사팀이 학생회 회계장부를 제출하라고 한다. 장부 정리가 안 되어 있어 문제가 될 수 있다!',
    weekRange: [11, 20],
    choices: [
      { id: '10a', text: '밤새 장부 정리 후 정직하게 제출', effects: { satisfaction: 0, budget: -5, lgRelation: 10, academic: 0 } },
      { id: '10b', text: '감사 연기 요청 (시간 벌기)', effects: { satisfaction: 0, budget: 0, lgRelation: -5, academic: 0 } },
    ],
  },
  {
    id: 11,
    title: '진주 홍수 경보',
    description: '진주에 폭우가 쏟아져 통학로가 침수됐다. 통학생 절반이 학교에 올 수 없는 상황이다.',
    weekRange: [11, 20],
    choices: [
      { id: '11a', text: '학생회 차량으로 긴급 셔틀 운행', effects: { satisfaction: 15, budget: -20, lgRelation: 0, academic: 5 } },
      { id: '11b', text: '온라인 수업 전환 요청', effects: { satisfaction: 5, budget: 0, lgRelation: 0, academic: -5 } },
      { id: '11c', text: '임시 휴강 건의', effects: { satisfaction: 10, budget: 0, lgRelation: -5, academic: -15 } },
    ],
  },
  {
    id: 12,
    title: '선배의 취업 SOS',
    description: '졸업을 앞둔 4학기 선배들이 취업 준비 지원을 요청했다. 이력서 첨삭, 면접 스터디 등을 학생회에서 운영해달라고 한다.',
    weekRange: [11, 20],
    choices: [
      { id: '12a', text: 'LG 현직자 멘토링 프로그램 요청', effects: { satisfaction: 10, budget: 0, lgRelation: -10, academic: 15 } },
      { id: '12b', text: '학생회 자체 취업 스터디 운영', effects: { satisfaction: 5, budget: -10, lgRelation: 0, academic: 10 } },
    ],
  },
  {
    id: 13,
    title: '동아리 예산 쟁탈전',
    description: '15개 동아리가 예산 신청을 했는데, 배정 가능한 금액은 신청액의 1/3이다. 인기 동아리와 소규모 동아리 간 갈등이 심화됐다.',
    weekRange: [11, 20],
    choices: [
      { id: '13a', text: '활동 실적 기반 차등 배분', effects: { satisfaction: -5, budget: 5, lgRelation: 0, academic: 5 } },
      { id: '13b', text: '균등 배분으로 공평하게', effects: { satisfaction: 0, budget: 0, lgRelation: 0, academic: 0 } },
      { id: '13c', text: 'LG 후원 연계 동아리에 우선 배분', effects: { satisfaction: -10, budget: 10, lgRelation: 10, academic: 5 } },
    ],
  },
  {
    id: 14,
    title: 'LG 인턴십 배분',
    description: 'LG전자에서 인턴 5자리를 배정해줬는데, 지원자가 30명이다. 선발 기준을 학생회에서 정해달라고 한다.',
    weekRange: [21, 35],
    choices: [
      { id: '14a', text: '성적순으로 공정하게 선발', effects: { satisfaction: -10, budget: 0, lgRelation: 10, academic: 15 } },
      { id: '14b', text: '포트폴리오 + 면접 종합 평가', effects: { satisfaction: 5, budget: -5, lgRelation: 5, academic: 10 } },
      { id: '14c', text: 'LG에 추가 인턴 자리 요청', effects: { satisfaction: 10, budget: 0, lgRelation: -15, academic: 5 } },
    ],
  },
  {
    id: 15,
    title: '학교 SNS 논란',
    description: '학생회 인스타에 올린 게시물이 논란이 되었다. 일부 학과를 비하하는 내용으로 해석될 수 있다는 지적이 쏟아지고 있다.',
    weekRange: [21, 35],
    choices: [
      { id: '15a', text: '즉시 삭제하고 공식 사과문 게시', effects: { satisfaction: 5, budget: 0, lgRelation: 0, academic: 0 } },
      { id: '15b', text: '해명 글 게시 (의도 설명)', effects: { satisfaction: -5, budget: 0, lgRelation: 0, academic: 0 } },
      { id: '15c', text: '무대응 (시간이 해결해줄 것)', effects: { satisfaction: -15, budget: 0, lgRelation: -5, academic: 0 } },
    ],
  },
  {
    id: 16,
    title: '자유전공학과의 반란',
    description: '2026년 신설된 자유전공학과 학생들이 기존 학과와 동등한 시설 사용권을 요구하고 있다. 기존 학과 학생들은 반발하고 있다.',
    weekRange: [21, 35],
    choices: [
      { id: '16a', text: '자유전공학과에 별도 실습 시간 배정', effects: { satisfaction: 0, budget: -10, lgRelation: 5, academic: 10 } },
      { id: '16b', text: '기존 학과 우선 원칙 유지', effects: { satisfaction: -5, budget: 0, lgRelation: 0, academic: -5 } },
      { id: '16c', text: '전체 학생 투표로 결정', effects: { satisfaction: 5, budget: -5, lgRelation: 0, academic: 0 } },
    ],
  },
  {
    id: 17,
    title: '에어컨 전쟁',
    description: '한여름인데 강의실 에어컨 절반이 고장났다. 학교는 예산 부족으로 수리가 어렵다고 한다. 학생들의 불만이 폭발 직전이다.',
    weekRange: [21, 35],
    choices: [
      { id: '17a', text: '학생회 예산으로 긴급 수리', effects: { satisfaction: 15, budget: -25, lgRelation: 0, academic: 10 } },
      { id: '17b', text: 'LG전자에 에어컨 기증 요청', effects: { satisfaction: 10, budget: 0, lgRelation: -15, academic: 5 } },
      { id: '17c', text: '선풍기 + 아이스크림 이벤트로 버티기', effects: { satisfaction: -5, budget: -10, lgRelation: 0, academic: -5 } },
    ],
  },
  {
    id: 18,
    title: '해커톤 대회 개최',
    description: 'LG에서 교내 해커톤 대회를 후원하겠다고 제안했다. 좋은 기회지만 준비에 많은 시간과 인력이 필요하다.',
    weekRange: [21, 35],
    choices: [
      { id: '18a', text: '대규모로 개최 (전 학과 참여)', effects: { satisfaction: 10, budget: -15, lgRelation: 20, academic: 15 } },
      { id: '18b', text: '소규모 파일럿으로 시작', effects: { satisfaction: 0, budget: -5, lgRelation: 10, academic: 10 } },
      { id: '18c', text: '시기상조라며 정중히 거절', effects: { satisfaction: 0, budget: 0, lgRelation: -20, academic: 0 } },
    ],
  },
  {
    id: 19,
    title: '졸업 작품 대란',
    description: '졸업 작품 전시회가 한 달 앞으로 다가왔는데, 절반의 팀이 재료비가 부족하다고 SOS를 보내왔다.',
    weekRange: [36, 52],
    choices: [
      { id: '19a', text: '학생회 예산에서 재료비 지원', effects: { satisfaction: 10, budget: -20, lgRelation: 0, academic: 15 } },
      { id: '19b', text: 'LG에 졸업 작품 후원 요청', effects: { satisfaction: 5, budget: 0, lgRelation: -10, academic: 10 } },
      { id: '19c', text: '자체 해결하도록 안내', effects: { satisfaction: -15, budget: 5, lgRelation: 0, academic: -10 } },
    ],
  },
  {
    id: 20,
    title: '취업률 위기',
    description: 'LG그룹이 올해 채용 규모를 40% 축소한다고 발표했다. 취업을 준비하던 학생들이 패닉에 빠졌다.',
    weekRange: [36, 52],
    choices: [
      { id: '20a', text: '다른 대기업 취업 설명회 유치', effects: { satisfaction: 10, budget: -15, lgRelation: -5, academic: 10 } },
      { id: '20b', text: 'LG 인사팀에 특별 채용 요청', effects: { satisfaction: 5, budget: 0, lgRelation: -20, academic: 5 } },
      { id: '20c', text: '창업 지원 프로그램으로 방향 전환', effects: { satisfaction: 0, budget: -10, lgRelation: 5, academic: 15 } },
    ],
  },
  {
    id: 21,
    title: '후배 학생회장 선거',
    description: '차기 학생회장 선거인데 후보가 아무도 없다! 학생들의 무관심이 심각한 상황이다.',
    weekRange: [36, 52],
    choices: [
      { id: '21a', text: '학생회장 혜택 패키지 만들어 홍보', effects: { satisfaction: 5, budget: -10, lgRelation: 0, academic: -5 } },
      { id: '21b', text: '직접 후배를 설득해서 출마시킴', effects: { satisfaction: 10, budget: 0, lgRelation: 0, academic: 0 } },
      { id: '21c', text: '선거 없이 학생회 해체 위기 방치', effects: { satisfaction: -20, budget: 0, lgRelation: -10, academic: -10 } },
    ],
  },
  {
    id: 22,
    title: '캡스톤 디자인 심사위원',
    description: '캡스톤 디자인 발표회에 LG 임원을 심사위원으로 초청했는데, 학생들의 프로젝트 완성도가 걱정된다.',
    weekRange: [36, 52],
    choices: [
      { id: '22a', text: '사전 리허설 + 멘토링 집중 지원', effects: { satisfaction: 5, budget: -10, lgRelation: 15, academic: 15 } },
      { id: '22b', text: '완성도 높은 팀만 선별 발표', effects: { satisfaction: -10, budget: 0, lgRelation: 10, academic: 5 } },
      { id: '22c', text: 'LG 심사위원 초청 취소', effects: { satisfaction: 0, budget: 0, lgRelation: -15, academic: 0 } },
    ],
  },
  {
    id: 23,
    title: '학교 근처 편의점 폐업',
    description: '학교 유일의 편의점이 폐업했다. 기숙사생들은 간식과 생필품을 구하기 어려워졌다.',
    weekRange: [36, 52],
    choices: [
      { id: '23a', text: '학생회 매점 임시 운영', effects: { satisfaction: 15, budget: -15, lgRelation: 0, academic: 0 } },
      { id: '23b', text: '편의점 유치 활동 (임대료 협상)', effects: { satisfaction: 5, budget: -5, lgRelation: 0, academic: 0 } },
    ],
  },
  {
    id: 24,
    title: '4년제 승격 논란',
    description: '학교가 4년제 승격을 추진한다는 소문이 돌고 있다. 학생들 사이에서 찬반 의견이 팽팽하게 갈리고 있다.',
    weekRange: [36, 52],
    choices: [
      { id: '24a', text: '학생 설문조사 실시 후 공식 입장 발표', effects: { satisfaction: 10, budget: -5, lgRelation: 5, academic: 5 } },
      { id: '24b', text: '4년제 승격 적극 찬성 입장 표명', effects: { satisfaction: -10, budget: 0, lgRelation: 15, academic: 10 } },
      { id: '24c', text: '중립 유지 (어느 쪽도 지지하지 않음)', effects: { satisfaction: -5, budget: 0, lgRelation: 0, academic: 0 } },
    ],
  },
  {
    id: 25,
    title: '졸업식 최후의 결전',
    description: '임기 마지막 주, 졸업식을 성공적으로 마무리해야 한다. 예산도 빠듯하고 LG에서 축사를 하겠다고 했다.',
    weekRange: [36, 52],
    choices: [
      { id: '25a', text: '호화 졸업식 (외부 장소 대여 + 풀 세팅)', effects: { satisfaction: 20, budget: -25, lgRelation: 10, academic: 5 } },
      { id: '25b', text: '감성 졸업식 (강당 + 영상 + 학생 공연)', effects: { satisfaction: 15, budget: -5, lgRelation: 5, academic: 10 } },
      { id: '25c', text: '간소한 졸업식 (절약 모드)', effects: { satisfaction: -5, budget: 10, lgRelation: -5, academic: 0 } },
    ],
  },
];
