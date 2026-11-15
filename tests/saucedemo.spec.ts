import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication & Cart Module', () => {
  test('TC-01: Valid user should login and add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Arrange: เปิดหน้าเว็บ
    await loginPage.goto();

    // 2. Act: ล็อกอินด้วยผู้ใช้ปกติ
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Assert: เช็กว่าเข้าหน้าสินค้าสำเร็จ
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Act & Assert ต่อเนื่อง: กดเพิ่มกระเป๋าลงตะกร้า แล้วเช็กว่าเลขตะกร้าเปลี่ยนเป็น 1
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('TC-02: Locked out user should see an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Assert: เช็กว่ากรอบแจ้งเตือนสีแดงแสดงข้อความถูกต้อง
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });
});

test.describe('Checkout & UI Integrity Module', () => {
  test('TC-03: Detect UI Bug - Problem user sees broken checkout behavior', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('problem_user', 'secret_sauce');

    // หยิบของใส่ตะกร้าและไปหน้ากรอกชื่อชำระเงิน
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    // ลองกรอกชื่อและนามสกุล
    await page.locator('[data-test="firstName"]').fill('Prapathomsit');
    await page.locator('[data-test="lastName"]').fill('Attapakkanon');

    // ในเว็บนี้ problem_user มีบั๊กคือช่องนามสกุลจะพิมพ์ไม่ติด! เราเขียนเทสจับจุดนี้ไว้โชว์กรรมการ
    const lastNameValue = await page.locator('[data-test="lastName"]').inputValue();
    expect(lastNameValue).toBe(''); // ยืนยันว่าเจอบั๊กช่องนามสกุลว่างเปล่าจริง
  });
});

test.describe('Performance & Load Module', () => {
  test('TC-04: Performance Glitch User timing check', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // 1. เริ่มจับเวลา (Start Timer)
    const startTime = Date.now();

    // 2. กด Login และรอจนกว่า "รายการสินค้า" ในหน้าถัดไปจะโหลดเสร็จสมบูรณ์
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    await page.locator('.inventory_list').waitFor({ state: 'visible' });

    // 3. หยุดจับเวลาและคำนวณเป็นวินาที
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(`⏱️ เวลาที่ใช้ในการโหลดของ performance_glitch_user: ${duration} วินาที`);

    // 4. เช็กว่าเวลาต้องมากกว่า 2 วินาทีขึ้นไป
    expect(duration).toBeGreaterThan(2);
  });
});
