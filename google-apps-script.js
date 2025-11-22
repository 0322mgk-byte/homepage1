/**
 * Google Apps Script - 랜딩페이지 폼 데이터 저장
 *
 * 사용 방법:
 * 1. Google Sheets에서 확장 프로그램 > Apps Script 클릭
 * 2. 아래 코드를 붙여넣기
 * 3. 배포 > 새 배포 > 웹 앱 선택
 * 4. 실행할 사용자: 본인, 액세스 권한: 모든 사용자
 * 5. 배포 후 생성된 URL을 .env.local의 NEXT_PUBLIC_GOOGLE_SCRIPT_URL에 입력
 *
 * Google Sheet ID: 1w2gPbD1wYlfJUD9RUgx6lZtV6b_tJ7j_9Gi2sbOsVuI
 */

const SHEET_ID = '1w2gPbD1wYlfJUD9RUgx6lZtV6b_tJ7j_9Gi2sbOsVuI';
const SHEET_NAME = 'DB'; // 시트 이름

// POST 요청 처리
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // 첫 번째 행이 비어있으면 헤더 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['신청일시', '이름', '연락처', '이메일', '원본 타임스탬프']);
    }

    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 한국 시간으로 변환
    const koreaTime = Utilities.formatDate(
      new Date(),
      'Asia/Seoul',
      'yyyy-MM-dd HH:mm:ss'
    );

    // 데이터 저장
    sheet.appendRow([
      koreaTime,           // 신청일시 (한국시간)
      data.name || '',     // 이름
      data.phone || '',    // 연락처
      data.email || '',    // 이메일
      data.timestamp || '' // 원본 타임스탬프
    ]);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '데이터가 저장되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script가 정상적으로 작동 중입니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 테스트 함수 - Apps Script 에디터에서 실행하여 테스트
function testAppendRow() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: '테스트',
        phone: '010-1234-5678',
        email: 'test@example.com',
        timestamp: new Date().toISOString()
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
