/**
 * Google Apps Script - 통합 버전 (폼 데이터 + 챗봇 대화 저장)
 *
 * 사용 방법:
 * 1. Google Sheets에서 확장 프로그램 > Apps Script 클릭
 * 2. 기존 Code.gs 내용을 이 코드로 교체
 * 3. 배포 > 배포 관리 > 새 버전 배포
 * 4. 실행할 사용자: 본인, 액세스 권한: 모든 사용자
 *
 * Google Sheet ID: 1w2gPbD1wYlfJUD9RUgx6lZtV6b_tJ7j_9Gi2sbOsVuI
 */

const SHEET_ID = '1w2gPbD1wYlfJUD9RUgx6lZtV6b_tJ7j_9Gi2sbOsVuI';
const FORM_SHEET_NAME = 'DB'; // 폼 데이터 저장용 시트
const CHAT_SHEET_NAME = 'chat_bot'; // 챗봇 대화 저장용 시트

// POST 요청 처리 - 폼 데이터 또는 챗봇 대화 저장
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 요청 타입에 따라 분기 처리
    if (data.type === 'chat' || data.sessionId) {
      // 챗봇 대화 저장
      return saveChatMessage(data);
    } else {
      // 폼 데이터 저장 (기존 로직)
      return saveFormData(data);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 폼 데이터 저장 함수
function saveFormData(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(FORM_SHEET_NAME);

  // 첫 번째 행이 비어있으면 헤더 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['신청일시', '이름', '연락처', '이메일', '원본 타임스탬프']);
  }

  // 한국 시간으로 변환
  const koreaTime = Utilities.formatDate(
    new Date(),
    'Asia/Seoul',
    'yyyy-MM-dd HH:mm:ss'
  );

  // 데이터 추가
  sheet.appendRow([
    koreaTime,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.timestamp || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: '폼 데이터가 저장되었습니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 챗봇 대화 저장 함수
function saveChatMessage(data) {
  let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(CHAT_SHEET_NAME);

  // 시트가 없으면 생성
  if (!sheet) {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    sheet = spreadsheet.insertSheet(CHAT_SHEET_NAME);
    // 헤더 추가
    sheet.getRange(1, 1, 1, 5).setValues([['타임스탬프', '세션ID', '역할', '메시지', 'IP']]);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // 첫 번째 행이 비어있으면 헤더 추가
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 5).setValues([['타임스탬프', '세션ID', '역할', '메시지', 'IP']]);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // 한국 시간으로 변환
  const timestamp = Utilities.formatDate(
    new Date(),
    'Asia/Seoul',
    'yyyy-MM-dd HH:mm:ss'
  );

  const sessionId = data.sessionId || 'unknown';
  const role = data.role || 'unknown';
  const message = data.message || '';
  const ip = data.ip || 'unknown';

  sheet.appendRow([timestamp, sessionId, role, message, ip]);

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: '대화 내용이 저장되었습니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// GET 요청 처리
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'chat') {
      // 챗봇 대화 내역 조회
      return getChatHistory(e);
    } else {
      // 기본: 상태 확인
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Google Apps Script is running',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 챗봇 대화 내역 조회 함수
function getChatHistory(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(CHAT_SHEET_NAME);

  if (!sheet || sheet.getLastRow() <= 1) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: [],
        message: '저장된 대화가 없습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sessionId = e.parameter.sessionId;
  const data = sheet.getDataRange().getValues();
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
}

// 테스트 함수 - 폼 데이터
function testFormPost() {
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

// 테스트 함수 - 챗봇 대화
function testChatPost() {
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
