import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class GoogleSheetsReporter implements Reporter {
  private results: any[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.push({
      suite: test.parent.title || 'E2E Suite',
      title: test.title,
      browser: test.parent.project()?.name || 'chromium',
      status: result.status,
      duration: (result.duration / 1000).toFixed(2),
    });
  }

  async onEnd() {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;
    if (!webhookUrl) {
      console.log('⚠️ ข้ามการส่งข้อมูลเข้า Google Sheets (ไม่พบ GOOGLE_SHEETS_WEBHOOK)');
      return;
    }

    const runUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : 'Local Run';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ runUrl, results: this.results }),
      });
      console.log('✅ ส่งผลลัพธ์เข้า Google Sheets สำเร็จ:', await response.text());
    } catch (error) {
      console.error('❌ ส่งผลลัพธ์เข้า Google Sheets ไม่สำเร็จ:', error);
    }
  }
}

export default GoogleSheetsReporter;
