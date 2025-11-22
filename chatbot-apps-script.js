/**
 * 챗봇 대화 내용 저장용 Google Apps Script
 *
 * 설정 방법:
 * 1. Google Sheets에서 확장 프로그램 > Apps Script 클릭
 * 2. 이 코드를 복사하여 붙여넣기
 * 3. 배포 > 새 배포 > 웹 앱 선택
 * 4. 실행할 사용자: 본인, 액세스 권한: 모든 사용자
 * 5. 배포 후 생성된 URL을 .env.local의 NEXT_PUBLIC_CHATBOT_SCRIPT_URL에 입력
 *
 * Google Sheet ID: 1w2gPbD1wYlfJUD9RUgx6lZtV6b_tJ7j_9Gi2sbOsVuI
 */

const SHEET_ID = '1w2gPbD1wYlfJUD9RUgx6lZtV6b_tJ7j_9Gi2sbOsVuI';
const SHEET_NAME = 'chat_bot'; // 챗봇 대화 저장용 시트 이름

// POST 요청 처리 - 대화 내용 저장
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // 시트가 없으면 생성
    if (!sheet) {
      const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      // 헤더 추가
      newSheet.getRange(1, 1, 1, 5).setValues([['타임스탬프', '세션ID', '역할', '메시지', 'IP']]);
      newSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      newSheet.setFrozenRows(1);
    }

    const activeSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // 첫 번째 행이 비어있으면 헤더 추가
    if (activeSheet.getLastRow() === 0) {
      activeSheet.getRange(1, 1, 1, 5).setValues([['타임스탬프', '세션ID', '역할', '메시지', 'IP']]);
      activeSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      activeSheet.setFrozenRows(1);
    }

    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 데이터 추가
    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const sessionId = data.sessionId || 'unknown';
    const role = data.role || 'unknown'; // 'user' 또는 'model'
    const message = data.message || '';
    const ip = data.ip || 'unknown';

    activeSheet.appendRow([timestamp, sessionId, role, message, ip]);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '대화 내용이 저장되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 - 대화 내역 조회 (선택사항)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          data: [],
          message: '저장된 대화가 없습니다.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 세션ID로 필터링 (선택사항)
    const sessionId = e.parameter.sessionId;

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    let result = rows.map(row => ({
      timestamp: row[0],
      sessionId: row[1],
      role: row[2],
      message: row[3],
      ip: row[4]
    }));

    // 세션ID로 필터링
    if (sessionId) {
      result = result.filter(item => item.sessionId === sessionId);
    }

    // 최근 100개만 반환
    result = result.slice(-100);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: result,
        count: result.length
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS 처리
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// 테스트 함수
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        sessionId: 'test-session-123',
        role: 'user',
        message: '안녕하세요, 특강에 대해 알고 싶어요.',
        ip: '127.0.0.1'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
