import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // 1. ชี้เป้าเก็บตำแหน่งปุ่มต่างๆ ของหน้า Login ไว้ที่เดียว (ถ้าเว็บเปลี่ยนชื่อปุ่ม มาแก้แค่ตรงนี้จุดเดียวจบ!)
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // 2. สร้างฟังก์ชันเปิดหน้าเว็บ
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // 3. สร้างฟังก์ชันการล็อกอิน (รับค่า username และ password เข้ามา)
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
