# อยู่ร่วมกันอย่างดี — มารยาทในการใช้พื้นที่สาธารณะ

เว็บไซต์แบบ Static ใช้ HTML, CSS และ JavaScript ล้วน ไม่มี PHP, ฐานข้อมูล หรือเซิร์ฟเวอร์ฝั่งหลังบ้าน

## โครงสร้างไฟล์
- `index.html` — เนื้อหาเว็บไซต์
- `style.css` — รูปแบบและ Responsive layout
- `script.js` — เมนูมือถือ แบบทดสอบ และปุ่มคำมั่น
- `assets/favicon.svg` — ไอคอนเว็บไซต์

## เปิดทดสอบในเครื่อง
1. แตกไฟล์ ZIP
2. เปิดโฟลเดอร์ `public-space-etiquette`
3. ดับเบิลคลิก `index.html` เพื่อเปิดในเบราว์เซอร์
4. หรือใช้ VS Code + ส่วนขยาย Live Server แล้วกด Open with Live Server

## เผยแพร่ด้วย GitHub Pages
1. สร้าง repository ใหม่บน GitHub
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดในโฟลเดอร์นี้ โดยให้ `index.html` อยู่ที่ root ของ repository
3. ไปที่ **Settings → Pages**
4. ใน **Build and deployment** เลือก **Deploy from a branch**
5. เลือก branch `main` และ folder `/ (root)` แล้วกด **Save**
6. รอ GitHub ประมวลผล แล้วเปิด URL ที่แสดงในหน้า Pages

## หมายเหตุ
- แบบทดสอบตรวจคำตอบและคำนวณคะแนนภายในเบราว์เซอร์
- ไม่มีการส่งหรือจัดเก็บคำตอบบนเซิร์ฟเวอร์
- ฟอนต์ Google Fonts จะโหลดเมื่อเชื่อมต่ออินเทอร์เน็ต หากออฟไลน์จะใช้ฟอนต์สำรอง
