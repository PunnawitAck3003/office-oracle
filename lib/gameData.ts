export const questions = [
  {
    id: 1,
    category: "Class Selection",
    question: "ในปาร์ตี้ออฟฟิศ คุณคือสายไหน?",
    options: [
      { label: "A. The Tank (สายถึก)", value: "A", desc: "รับดาเมจแทนเพื่อนได้หมด อึดถึกทน" },
      { label: "B. The Support (สายซัพ)", value: "B", desc: "คอยฮีลใจ ประสานงาน ช่วยแก้บั๊ก" },
      { label: "C. The Rogue (สายซุ่ม)", value: "C", desc: "ทำงานไว เงียบกริบ ปิดจ็อบแล้วแวบ" },
      { label: "D. The Wizard (สายเวท)", value: "D", desc: "สกิลเยอะ ไอเดียพุ่ง แก้ปัญหาพิสดาร" },
    ],
  },
  {
    id: 2,
    category: "Mana Potion",
    question: "ยาขวดไหนที่ดื่มแล้วมานาเด้งเต็มหลอด?",
    options: [
      { label: "A. Elixir of Caffeine", value: "A", desc: "กาแฟ/ชา แก้วโปรด" },
      { label: "B. Scroll of Completion", value: "B", desc: "การขีดฆ่า To-Do List ว่าเสร็จแล้ว" },
      { label: "C. Guild Chat", value: "C", desc: "เมาท์มอยหัวเราะกับเพื่อนร่วมงาน" },
      { label: "D. Silence Buff", value: "D", desc: "ใส่หูฟังแล้วโลกเงียบสงบ" },
    ],
  },
  {
    id: 3,
    category: "Monday Boss",
    question: "มอนสเตอร์ตัวไหนที่คุณไม่อยากเจอที่สุด?",
    options: [
      { label: "A. Meeting Hydra", value: "A", desc: "ประชุมที่ตัดหัวแล้วงอกใหม่ ไม่จบไม่สิ้น" },
      { label: "B. Sudden Slime", value: "B", desc: "งานงอกที่แทรกเข้ามาแบบเหนียวหนืด" },
      { label: "C. Drama Goblin", value: "C", desc: "ดราม่าจุกจิก กวนใจ ของคนในทีม" },
      { label: "D. Routine Golem", value: "D", desc: "งานซ้ำซาก จำเจ แข็งทื่อ น่าเบื่อ" },
    ],
  },
  {
    id: 4,
    category: "Legendary Loot",
    question: "นอกจากเหรียญทอง (เงินเดือน) อยากดรอปไอเทมอะไร?",
    options: [
      { label: "A. Badge of Honor", value: "A", desc: "คำชมและการยอมรับจากคนอื่น" },
      { label: "B. Shield of Peace", value: "B", desc: "ความสงบสุข เลิกงานแล้วไม่มีใครตาม" },
      { label: "C. XP Boost", value: "C", desc: "ความเก่งขึ้น ได้เรียนรู้อะไรใหม่ๆ" },
      { label: "D. Heart of Service", value: "D", desc: "ความรู้สึกดีที่ได้ช่วยเหลือคนอื่น" },
    ],
  },
];

// Logic การ Mapping ผลลัพธ์ (ตัวอย่างย่อ)
export const resultMapping: any = {
  classes: {
    A: {
      title: "The Ironclad Defender",
      str: "Unbreakable Will (ความรับผิดชอบดั่งขุนเขา)",
      realSelf: "เสาหลักที่พึ่งพาได้เสมอ รับแรงกดดันเก่ง",
    },
    B: {
      title: "The Soul Weaver",
      str: "Harmony Aura (ประสานรอยร้าวให้เป็นพลัง)",
      realSelf: "กาวใจของทีม ผู้ปิดทองหลังพระ",
    },
    C: {
      title: "The Shadow Striker",
      str: "Velocity Strike (ปิดงานไวก่อนเดดไลน์)",
      realSelf: "เน้นผลลัพธ์ รวดเร็ว ไม่ชอบพิธีรีตอง",
    },
    D: {
      title: "The Arcane Architect",
      str: "Creative Blast (ระเบิดไอเดียพลิกแพลง)",
      realSelf: "นักคิด นักแก้ปัญหาที่มองมุมต่าง",
    },
  },
  souls: {
    // Mapping แบบง่าย: ใช้คำตอบข้อ 2 เป็นหลัก
    A: "Caffeine Stream (พลังขับเคลื่อนด้วยรสขมอมหวาน)",
    B: "Achievement Hunter (ความสำเร็จที่จับต้องได้)",
    C: "Social Energy (พลังมิตรภาพและเสียงหัวเราะ)",
    D: "Inner Peace (ความสงบในโลกส่วนตัว)",
  },
  strategies: {
    A: "Hydra Slash: กำหนด Agenda ให้ชัด ตัดบทให้ไว อย่าให้มันงอก!",
    B: "Slime Shield: จัด Priority อันไหนไม่ด่วนปัดทิ้ง อย่าให้เกาะขา!",
    C: "Goblin Earplugs: ยิ้มรับแต่ไม่เก็บมาคิด ใส่หูฟังแล้วโฟกัสงาน!",
    D: "Golem Breaker: หา Challenge ใหม่ๆ ในงานเดิม เปลี่ยนท่านั่งก็ยังดี!",
  },
  realDesires: {
    // Mapping แบบง่าย: ใช้คำตอบข้อ 4 เป็นหลัก
    A: "การได้รับการมองเห็นคุณค่า (Validation)",
    B: "ความสมดุลและพื้นที่ส่วนตัว (Work-Life Balance)",
    C: "การเติบโตและไม่หยุดนิ่ง (Growth)",
    D: "การเป็นผู้ให้และมีความหมาย (Contribution)",
  },
  realAdvice: {
    // Mapping แบบง่าย: ใช้คำตอบข้อ 4 เป็นหลัก
    A: "วันจันทร์นี้ อย่าลืมชมตัวเองหน้ากระจก คุณทำดีที่สุดแล้ว!",
    B: "เลิกงานคือเลิกงาน ทิ้งดาบแล้วไปพักผ่อนซะ!",
    C: "ลองหาวิธีทำอะไรให้เร็วขึ้นสักนิด แล้วเอาเวลาไปเรียนรู้สิ่งที่ชอบ",
    D: "รอยยิ้มเล็กๆ ของคุณ ช่วยโลกให้น่าอยู่ขึ้นได้นะ",
  },
};
