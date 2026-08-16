const { useState, useRef, useEffect } = React;
const SUPABASE_URL = "https://eeawhmyohrhsddpahasq.supabase.co";
const SUPABASE_KEY = ״sb_publishable_GJj_3-bsUcZ0781jNHQGGg_pRmNUcns״;// ============ Design tokens ============
const T = {
  bg: "linear-gradient(165deg, #FFF1F5 0%, #FFE3ED 45%, #FBD9EC 100%)",
  surface: "rgba(255,255,255,0.92)",
  surfaceSolid: "#FFFFFF",
  ink: "#2B1220",
  inkSoft: "#8A6478",
  wine: "#FF3E7F",
  wineDark: "#D81B60",
  wineGrad: "linear-gradient(135deg, #FF3E7F 0%, #FF7CA3 100%)",
  rose: "#FFC3D9",
  roseSoft: "#FFE7F0",
  sage: "#25B57F",
  sageBg: "#E1F9EE",
  ochre: "#FF9A3D",
  ochreBg: "#FFF0DD",
  line: "rgba(255,62,127,0.16)",
  lilac: "#B57EE8",
  lilacBg: "#F2E8FC",
};
const displayFont = "'Frank Ruhl Libre', 'Times New Roman', serif";
const bodyFont = "'Rubik', 'Segoe UI', sans-serif";
const menuFont = displayFont;

const LANGS = ["he", "en"];
const LANG_LABELS = { he: "עברית", en: "English" };
const DIR = { he: "rtl", en: "ltr" };
function langName(l) {
  return { he: "Hebrew", en: "English" }[l];
}

// ============ i18n ============
const STR_RAW = {
    he: {
    brand: "GirlSays",
    tagline: "שאלי. נחליט. את מתקדמת.",
    langTitle: "באיזו שפה נדבר?",
    intro: {
      title: "בואי נכיר אותך",
      body: "כמה שאלות קצרות כדי שנוכל לתת לך תשובות מדויקות באמת — על עור, תמונות, מוצרים וביגוד.",
      cta: "בואי נתחיל",
      skip: "נסי קודם בלי הרשמה",
    },
    nudge: {
      title: "מקבלת תשובות כלליות כרגע",
      body: "השלימי פרופיל קצר כדי שהתשובות יתאימו באמת אלייך.",
      cta: "להשלים פרופיל",
    },
    step: { back: "חזרה", continue: "המשך", finish: "סיימתי, קחי אותי לאפליקציה", skip: "דלג/י" },
    ob: {
      nameTitle: "איך קוראים לך?",
      namePh: "השם שלך",
      skinTitle: "מה סוג העור שלך?",
      skinHint: "אפשר לבחור יותר מאפשרות אחת — למשל יבש ושמן יחד (עור מעורב)",
      skinTypes: ["יבש", "שמן", "מעורב", "רגיש", "נורמלי", "נוטה לאקנה", "נוטה לאדמומיות", "נוטה ליובש בחורף"],
      sensTitle: "מה רמת הרגישות של העור שלך?",
      sensLevels: ["נמוכה", "בינונית", "גבוהה", "לא בטוחה"],
      goalsTitle: "מה הכי חשוב לך כרגע בטיפוח?",
      goals: ["טיפוח יומיומי", "טיפול באקנה", "אנטי אייג'ינג", "הבהרת כתמים", "הרגעת אדמומיות", "לא בטוחה"],
      allergyTitle: "רגישויות או אלרגיות ידועות?",
      allergyPh: "לדוגמה: רגישה לבשמים, אלרגית לרטינול... (אפשר להשאיר ריק)",
      budgetTitle: "טווח תקציב מועדף למוצרים",
      budgetOptions: ["נמוך", "בינוני", "גבוה", "לא משנה"],
    },
    hello: "שלום",
    tabs: { photo: "תמונות", product: "מוצרים", wellness: "פיטנס", calendar: "יומן" },
    photo: {
      eyebrow: "אזור תמונות",
      title: "איזו תמונה הכי טובה?",
      subtitle: "העלי תמונות למשבצות למטה ונבחר לך את המנצחת, עם הסבר.",
      contextPh: "להקשר מסוים? (לדוגמה: לדייטינג, ללינקדאין, לאינסטגרם)",
      slot: "תמונה",
      addSlot: "הוספת תמונה",
      analyze: "מי המנצחת?",
      analyzing: "בודקת...",
      winner: "מנצחת",
      tip: "טיפ לפעם הבאה",
    },
    product: {
      eyebrow: "בדיקת מוצר",
      title: "זה מתאים לי?",
      subtitle: "כתבי שאלה על מוצר, או צלמי אותו — ונבדוק מול הפרופיל שלך.",
      modeText: "שאלה בכתב",
      modePhoto: "צילום מוצר",
      questionPh: 'לדוגמה: "קרם לחות עם רטינול ב-70 ש״ח, מתאים לי?"',
      uploadLabel: "צילום/העלאת מוצר",
      moreDetails: "פרטים שיעזרו לדיוק התשובה (אופציונלי)",
      frequencyLabel: "כמה תדיר תשתמשי בזה?",
      frequencyOptions: ["יומיומי", "כמה פעמים בשבוע", "לעיתים רחוקות"],
      priceLabel: "מחיר (אופציונלי)",
      pricePh: "לדוגמה: 70 ש״ח",
      analyze: "בדקי לי",
      analyzing: "בודקת רכיבים...",
      error: "לא הצלחתי לנתח את זה כרגע. אפשר לנסות שוב?",
    },
    save: "שמירה",
    limit: {
      title: "הגעת למכסה החינמית להיום",
      body: "כדי לשמור על עלויות תחת שליטה בזמן שהאפליקציה עדיין בבדיקות, יש מגבלה יומית לבדיקות AI. נסי שוב מחר!",
    },
    wellness: {
      title: "פיטנס ובריאות",
      subtitle: "מעקב, תזונה, ותמיכה — הכל במקום אחד.",
      cardActivity: "יומן פעילות",
      cardActivityDesc: "רשמי אימונים וצעדים, קבלי הערכת קלוריות",
      cardFood: "יומן אוכל",
      cardFoodDesc: "צלמי מה שאכלת, קבלי הערכה",
      cardNutrition: "בניית תפריט",
      cardNutritionDesc: "תפריטים לפי מה שאת אוהבת ולא אוהבת",
      cardTalk: "מה לענות?",
      cardTalkDesc: "עזרה בתגובה לריב או הודעה שלא יודעות מה לעשות איתה",
      cardCycle: "מעקב מחזור",
      cardCycleDesc: "מתי הבא, ובאיזה יום את עכשיו",
      burnLabel: "קלוריות שנשרפו היום",
      kcalUnit: "קל'",
      back: "חזרה",
    },
    nutrition: {
      eyebrow: "תזונה",
      title: "איזה תפריט תרצי?",
      subtitle: "כתבי מה בא לך, ונבנה לך תפריט.",
      questionPh: 'לדוגמה: "תכיני לי תפריט קליל וללא גלוטן ליום" או "תפריט צמחוני לשבוע"',
      analyze: "קבלי תוכנית",
      analyzing: "בונה לך תוכנית...",
      disclaimerFixed: "זה לא תחליף לייעוץ תזונתי או רפואי מקצועי, במיוחד אם יש לך מצב רפואי או מטרה ספציפית.",
      error: "לא הצלחתי לבנות את זה כרגע. אפשר לנסות שוב?",
    },
    activity: {
      eyebrow: "יומן פעילות",
      title: "מה עשית היום?",
      subtitle: "רשמי פעילות ותקבלי הערכה כללית של קלוריות שנשרפו.",
      types: { walk: "הליכה", run: "ריצה", strength: "אימון כוח", cycle: "רכיבה", yoga: "יוגה/מתיחות", other: "אחר" },
      stepsPh: "כמה צעדים?",
      minutesPh: "כמה דקות?",
      steps: "צעדים",
      min: "דקות",
      kcal: "קלוריות",
      add: "הוספה",
      totalLabel: "הערכת קלוריות שנשרפו היום",
      disclaimer: "הערכה כללית וגסה בלבד, לא מדויקת מבחינה רפואית ואינה מותאמת אישית למשקל/גיל. לא מיועד למעקב קפדני.",
    },
    food: {
      eyebrow: "יומן אוכל",
      title: "מה אכלת?",
      subtitle: "צלמי את הארוחה ונוסיף אותה ליומן עם הערכה כללית.",
      uploadLabel: "צילום/העלאת ארוחה",
      analyze: "הוספה ליומן",
      analyzing: "מזהה...",
      kcal: "קלוריות",
      totalLabel: "סה״כ הערכה להיום",
      disclaimer: "הערכה כללית בלבד מתמונה, לא מדויקת מבחינה תזונתית. זה יומן למעקב אישי, לא כלי לספירת קלוריות קפדנית.",
      error: "לא הצלחתי לזהות את זה כרגע. אפשר לנסות שוב?",
    },
    calendarScreen: {
      eyebrow: "יומן",
      title: "מה בתוכנית?",
      subtitle: "הוסיפי אירועים ותזכורות במקום אחד.",
      addEvent: "הוספת אירוע",
      titlePh: "שם האירוע",
      save: "שמירה",
      cancel: "ביטול",
      empty: "אין עדיין אירועים. תוסיפי את הראשון!",
    },
    reply: {
      eyebrow: "מה לענות?",
      title: "תקועה עם התשובה?",
      subtitle: "תגידי לי מה כתבו לך ועל מה זה, ואני אעזור לך לנסח תגובה.",
      theirMessageLabel: "מה כתבו לך?",
      theirMessagePh: "הדביקי כאן את ההודעה או תארי מה נכתב...",
      contextLabel: "על מה זה? (אופציונלי)",
      contextPh: "לדוגמה: זה החבר שלי, רבנו על זה שהוא ביטל תוכניות בהודעה אחרונה...",
      analyze: "תגידי לי מה לענות",
      analyzing: "חושבת...",
      disclaimer: "התגובות שנוצרות הן הצעות מ-AI, לא ממקצוענית. במשבר או מצוקה אמיתית — פני לער\"ן ב-1201, זמינים תמיד.",
      error: "לא הצלחתי לענות כרגע. אפשר לנסות שוב?",
    },
    cycle: {
      eyebrow: "מעקב מחזור",
      title: "המחזור שלך",
      subtitle: "נתונים נשמרים רק אצלך במכשיר.",
      dayLabel: "יום",
      inCycle: "במחזור",
      nextPeriod: "המחזור הבא צפוי",
      days: "ימים עד אז",
      estimateNote: "הערכה ראשונית, תדייק ככל שתסמני עוד מחזורים",
      legendPeriod: "ימי מחזור שסימנת",
      legendPredicted: "תחזית",
      instruction: "הקישי על הימים שבהם היה לך דימום כדי לסמן אותם. ככל שתסמני יותר מחזורים, התחזית תהיה מדויקת יותר.",
    },
  },
    en: {
    brand: "GirlSays",
    tagline: "Ask. We'll decide. You move on.",
    langTitle: "Which language works for you?",
    intro: {
      title: "Let's get to know you",
      body: "A few quick questions so we can give you answers that actually fit — on skin, photos, products and clothing.",
      cta: "Let's start",
      skip: "Try it first, no signup",
    },
    nudge: {
      title: "You're getting general answers right now",
      body: "Fill in a quick profile so answers actually fit you.",
      cta: "Complete profile",
    },
    step: { back: "Back", continue: "Continue", finish: "Done, take me to the app", skip: "Skip" },
    ob: {
      nameTitle: "What's your name?",
      namePh: "Your name",
      skinTitle: "What's your skin type?",
      skinHint: "You can pick more than one — e.g. dry and oily together (combination skin)",
      skinTypes: ["Dry", "Oily", "Combination", "Sensitive", "Normal", "Acne-prone", "Redness-prone", "Dry in winter"],
      sensTitle: "How sensitive is your skin?",
      sensLevels: ["Low", "Medium", "High", "Not sure"],
      goalsTitle: "What matters most for your skincare right now?",
      goals: ["Daily care", "Acne treatment", "Anti-aging", "Brightening", "Calming redness", "Not sure"],
      allergyTitle: "Any known sensitivities or allergies?",
      allergyPh: "e.g. sensitive to fragrance, allergic to retinol... (can leave blank)",
      budgetTitle: "Preferred budget range for products",
      budgetOptions: ["Low", "Medium", "High", "Doesn't matter"],
    },
    hello: "Hi",
    tabs: { photo: "Photos", product: "Products", wellness: "Fitness", calendar: "Calendar" },
    photo: {
      eyebrow: "Photo area",
      title: "Which photo is best?",
      subtitle: "Upload photos into the slots below and we'll pick the winner, with a reason.",
      contextPh: "Any specific context? (e.g. dating profile, LinkedIn, Instagram)",
      slot: "Photo",
      addSlot: "Add photo",
      analyze: "Pick the winner",
      analyzing: "Checking...",
      winner: "Winner",
      tip: "Tip for next time",
    },
    product: {
      eyebrow: "Product check",
      title: "Is this right for me?",
      subtitle: "Ask about a product in writing, or take a photo — we'll check it against your profile.",
      modeText: "Written question",
      modePhoto: "Photo of product",
      questionPh: 'e.g. "A moisturizer with retinol for $20, is it right for me?"',
      uploadLabel: "Take/upload a photo of the product",
      moreDetails: "Details that help sharpen the answer (optional)",
      frequencyLabel: "How often will you use this?",
      frequencyOptions: ["Daily", "A few times a week", "Rarely"],
      priceLabel: "Price (optional)",
      pricePh: "e.g. $20",
      analyze: "Check it",
      analyzing: "Checking ingredients...",
      error: "Couldn't analyze that right now. Want to try again?",
    },
    save: "Save",
    limit: {
      title: "You've hit today's free limit",
      body: "To keep costs under control while the app is still in testing, there's a daily cap on AI checks. Try again tomorrow!",
    },
    wellness: {
      title: "Fitness & Health",
      subtitle: "Tracking, nutrition, and support — all in one place.",
      cardActivity: "Activity log",
      cardActivityDesc: "Log workouts and steps, get a calorie estimate",
      cardFood: "Food log",
      cardFoodDesc: "Snap what you ate, get an estimate",
      cardNutrition: "Build a menu",
      cardNutritionDesc: "Meal plans based on what you like and don't",
      cardTalk: "What should I reply?",
      cardTalkDesc: "Help replying to a fight or a message you're stuck on",
      cardCycle: "Cycle tracker",
      cardCycleDesc: "When's next, and what day you're on",
      burnLabel: "Calories burned today",
      kcalUnit: "kcal",
      back: "Back",
    },
    nutrition: {
      eyebrow: "Nutrition",
      title: "What menu do you want?",
      subtitle: "Tell us what you're in the mood for, and we'll build you a menu.",
      questionPh: 'e.g. "Make me a light gluten-free menu for a day" or "A vegetarian menu for the week"',
      analyze: "Get a plan",
      analyzing: "Building your plan...",
      disclaimerFixed: "Not a substitute for professional nutrition or medical advice, especially with a medical condition or specific goal.",
      error: "Couldn't build that right now. Want to try again?",
    },
    activity: {
      eyebrow: "Activity log",
      title: "What did you do today?",
      subtitle: "Log activity and get a rough calorie-burn estimate.",
      types: { walk: "Walking", run: "Running", strength: "Strength training", cycle: "Cycling", yoga: "Yoga/Stretching", other: "Other" },
      stepsPh: "How many steps?",
      minutesPh: "How many minutes?",
      steps: "steps",
      min: "min",
      kcal: "kcal",
      add: "Add",
      totalLabel: "Estimated calories burned today",
      disclaimer: "A rough general estimate only, not medically precise and not personalized to weight/age. Not meant for strict tracking.",
    },
    food: {
      eyebrow: "Food log",
      title: "What did you eat?",
      subtitle: "Snap your meal and we'll add it to your log with a general estimate.",
      uploadLabel: "Take/upload a photo of your meal",
      analyze: "Add to log",
      analyzing: "Identifying...",
      kcal: "kcal",
      totalLabel: "Estimated total today",
      disclaimer: "A general estimate from a photo only, not nutritionally precise. This is a personal log, not a strict calorie-counting tool.",
      error: "Couldn't identify that right now. Want to try again?",
    },
    calendarScreen: {
      eyebrow: "Calendar",
      title: "What's the plan?",
      subtitle: "Add events and reminders in one place.",
      addEvent: "Add event",
      titlePh: "Event title",
      save: "Save",
      cancel: "Cancel",
      empty: "No events yet. Add your first one!",
    },
    reply: {
      eyebrow: "What should I reply?",
      title: "Stuck on what to say?",
      subtitle: "Tell me what they wrote and what it's about, and I'll help you word a reply.",
      theirMessageLabel: "What did they write?",
      theirMessagePh: "Paste the message here or describe what was said...",
      contextLabel: "What's this about? (optional)",
      contextPh: "e.g. This is my boyfriend, we're fighting because he cancelled plans in his last message...",
      analyze: "Tell me what to reply",
      analyzing: "Thinking...",
      disclaimer: "These replies are AI suggestions, not from a professional. In a real crisis or distress — reach a real crisis line, they're always available.",
      error: "Couldn't respond right now. Want to try again?",
    },
    cycle: {
      eyebrow: "Cycle tracker",
      title: "Your cycle",
      subtitle: "Data stays only on your device.",
      dayLabel: "Day",
      inCycle: "in cycle",
      nextPeriod: "Next period expected",
      days: "days to go",
      estimateNote: "early estimate, gets more accurate as you log more cycles",
      legendPeriod: "Days you marked",
      legendPredicted: "Forecast",
      instruction: "Tap the days you had bleeding to mark them. The more cycles you log, the more accurate the forecast gets.",
    },
  },
};

function deepMerge(base, override) {
  if (Array.isArray(base)) return override !== undefined ? override : base;
  if (typeof base !== "object" || base === null) return override !== undefined ? override : base;
  const result = { ...base };
  for (const key in base) if (override && key in override) result[key] = deepMerge(base[key], override[key]);
  if (override) for (const key in override) if (!(key in result)) result[key] = override[key];
  return result;
}
const STR = {};
for (const l of Object.keys(STR_RAW)) STR[l] = l === "en" ? STR_RAW.en : deepMerge(STR_RAW.en, STR_RAW[l]);

const BACKEND_URL = "/api/claude";

function callClaude(messages, opts = {}, attempt = 1) {
  const endpoint = BACKEND_URL;

  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, messages, ...opts }),
  })
    .then(async (r) => {
      const data = await r.json();
      if (!r.ok || data.error) throw new Error(data.error?.message || `API error (${r.status})`);
      if (!data.content) throw new Error("No content in API response");
      return data;
    })
    .catch((e) => {
      const transient = /internal server error|timeout|network|fetch failed|50\d/i.test(e.message || "");
      if (transient && attempt < 3) {
        return new Promise((resolve) => setTimeout(resolve, attempt * 900)).then(() => callClaude(messages, opts, attempt + 1));
      }
      throw e;
    });
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result.split(",")[1]);
    r.onerror = () => reject(new Error("read failed"));
    r.readAsDataURL(file);
  });
}
function resizeImageFile(file, maxDim = 1100, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round(height * (maxDim / width));
            width = maxDim;
          } else {
            width = Math.round(width * (maxDim / height));
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({ base64: dataUrl.split(",")[1], mediaType: "image/jpeg", url: dataUrl });
      };
      img.onerror = () => reject(new Error("image load failed"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}
function extractJson(text) {
  const clean = (text || "").replace(/```json|```/g, "").trim();
  const m = clean.match(/\{[\s\S]*\}/);
  const candidates = [clean, m ? m[0] : null].filter(Boolean);
  for (const c of candidates) {
    try {
      return JSON.parse(c);
    } catch (e) {}
  }
  for (const c of candidates) {
    try {
      const normalized = c.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
      return JSON.parse(normalized);
    } catch (e) {}
  }
  throw new Error("Could not parse the response as JSON");
}
function toDataUrl(base64, mediaType) {
  return `data:${mediaType};base64,${base64}`;
}

const storage = {
  get: async (key) => {
    if (window.storage) return window.storage.get(key);
    const v = localStorage.getItem(key);
    return v !== null ? { key, value: v } : null;
  },
  set: async (key, value) => {
    if (window.storage) return window.storage.set(key, value);
    localStorage.setItem(key, value);
    return { key, value };
  },
  delete: async (key) => {
    if (window.storage) return window.storage.delete(key);
    localStorage.removeItem(key);
    return { key, deleted: true };
  },
};

const DAILY_AI_LIMIT = 15;
function aiUsageKey() {
  return `aiUsage:${new Date().toISOString().slice(0, 10)}`;
}
async function getAIUsageCount() {
  try {
    const r = await storage.get(aiUsageKey());
    return r?.value ? parseInt(r.value, 10) : 0;
  } catch (e) {
    return 0;
  }
}
async function incrementAIUsage() {
  const count = await getAIUsageCount();
  const next = count + 1;
  try {
    await storage.set(aiUsageKey(), String(next));
  } catch (e) {}
  return next;
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="press"
      style={{
        padding: "10px 17px",
        borderRadius: 22,
        border: active ? "none" : `1.5px solid ${T.line}`,
        background: active ? T.wineGrad : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(6px)",
        color: active ? "#fff" : T.ink,
        fontFamily: bodyFont,
        fontWeight: active ? 600 : 400,
        fontSize: 14,
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: active ? "0 4px 12px rgba(255,62,127,0.35), inset 0 1px 0 rgba(255,255,255,0.4)" : "none",
      }}
    >
      {children}
    </button>
  );
}
const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 14,
  border: `1.5px solid ${T.line}`,
  fontFamily: bodyFont,
  fontSize: 15,
  background: "rgba(255,255,255,0.7)",
  color: T.ink,
  outline: "none",
  boxSizing: "border-box",
};
const primaryBtn = {
  width: "100%",
  padding: "16px",
  borderRadius: 18,
  border: "none",
  background: T.wineGrad,
  color: "#fff",
  fontFamily: bodyFont,
  fontWeight: 700,
  fontSize: 15.5,
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(255,62,127,0.38), inset 0 1px 0 rgba(255,255,255,0.35)",
};
const ghostBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: 14,
  border: "none",
  background: "transparent",
  color: T.inkSoft,
  fontFamily: bodyFont,
  fontSize: 14,
  cursor: "pointer",
};
const uploadBox = {
  width: "100%",
  height: "100%",
  borderRadius: 20,
  border: `2px dashed ${T.rose}`,
  background: "rgba(255,231,240,0.55)",
  backdropFilter: "blur(4px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxSizing: "border-box",
};
const resultCard = { marginTop: 20, background: T.surface, backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: 22, padding: 18, boxShadow: "0 10px 32px rgba(255,62,127,0.14)" };
const card = { background: T.surface, backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: 22, padding: 18, boxShadow: "0 10px 32px rgba(255,62,127,0.14)" };

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: bodyFont, fontSize: 11.5, letterSpacing: "0.08em", color: T.wine, fontWeight: 700, marginBottom: 6 }}>{eyebrow}</div>
      <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 24, color: T.ink, marginBottom: 8 }}>{title}</div>
      <div style={{ width: 30, height: 3, background: T.wineGrad, borderRadius: 2, marginBottom: 10 }} />
      <div style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft }}>{subtitle}</div>
    </div>
  );
}
function VerdictStamp({ verdict, size = 60 }) {
  const cfg = {
    yes: { grad: `linear-gradient(145deg, ${T.sage}, #17925F)`, glow: "rgba(37,181,127,0.4)" },
    no: { grad: T.wineGrad, glow: "rgba(255,62,127,0.4)" },
    maybe: { grad: `linear-gradient(145deg, ${T.ochre}, #E8791F)`, glow: "rgba(255,154,61,0.4)" },
  }[verdict];
  const shortLabel = { yes: "✓", no: "✕", maybe: "?" }[verdict];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: cfg.grad,
        color: "#fff",
        fontFamily: displayFont,
        fontSize: size * 0.4,
        fontWeight: 800,
        boxShadow: `0 6px 16px ${cfg.glow}, inset 0 2px 3px rgba(255,255,255,0.4)`,
        animation: "stampIn 0.4s cubic-bezier(.2,1.4,.4,1)",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "10%", insetInlineStart: "18%", width: "38%", height: "30%", borderRadius: "50%", background: "rgba(255,255,255,0.45)", filter: "blur(2px)" }} />
      {shortLabel}
    </div>
  );
}

const Icon = {
  photo: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="11" r="2" />
      <path d="M3 17l5-5 4 4 3-3 6 6" />
    </svg>
  ),
  product: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <path d="M9 3h6l1 3H8l1-3z" />
      <path d="M7 6h10l1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L7 6z" />
    </svg>
  ),
  activity: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  ),
  food: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <path d="M6 3v7a2 2 0 0 0 2 2v9M6 3v7M9 3v9M15 3c-1.5 0-3 1.5-3 4s1.5 4 3 4v10" />
    </svg>
  ),
  calendar: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  wellness: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.5-8 11-8 11z" />
    </svg>
  ),
};

function LanguageScreen({ onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "50px 26px", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 32, color: T.wine, marginBottom: 6 }}>GirlSays <span style={{ fontSize: 20, color: T.rose }}>✦</span></div>
      <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, marginBottom: 40 }}>Ask. We'll decide. / תשאלי. נחליט.</div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {LANGS.map((l) => (
          <button key={l} className="press" onClick={() => onSelect(l)} style={{ ...primaryBtn, background: T.surface, color: T.wine, border: `1.5px solid ${T.wine}` }}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>
    </div>
  );
}

function Intro({ lang, onNext, onSkip }) {
  const s = STR[lang].intro;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "50px 26px", justifyContent: "center" }}>
      <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 26, color: T.ink, marginBottom: 14, lineHeight: 1.4 }}>{s.title}</div>
      <div style={{ fontFamily: bodyFont, fontSize: 14.5, color: T.inkSoft, lineHeight: 1.7, marginBottom: 34 }}>{s.body}</div>
      <button className="press" onClick={onNext} style={primaryBtn}>
        {s.cta}
      </button>
      <button className="press" onClick={onSkip} style={{ ...ghostBtn, marginTop: 10, color: T.wine }}>
        {s.skip}
      </button>
    </div>
  );
}

function Onboarding({ lang, onDone }) {
  const s = STR[lang];
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", skinTypes: [], sensitivity: "", goals: [], allergies: "", budget: "" });
  const toggle = (key, val) => setData((d) => ({ ...d, [key]: d[key].includes(val) ? d[key].filter((x) => x !== val) : [...d[key], val] }));

  const steps = [
    { title: s.ob.nameTitle, body: <input autoFocus value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder={s.ob.namePh} style={inputStyle} />, valid: data.name.trim().length > 0 },
    {
      title: s.ob.skinTitle,
      hint: s.ob.skinHint,
      body: (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
            {s.ob.skinTypes.map((t) => (
              <Chip key={t} active={data.skinTypes.includes(t)} onClick={() => toggle("skinTypes", t)}>
                {t}
              </Chip>
            ))}
          </div>
          <div style={{ fontFamily: bodyFont, fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 10 }}>{s.ob.sensTitle}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {s.ob.sensLevels.map((t) => (
              <Chip key={t} active={data.sensitivity === t} onClick={() => setData({ ...data, sensitivity: t })}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      ),
      valid: data.skinTypes.length > 0 && !!data.sensitivity,
    },
    {
      title: s.ob.goalsTitle,
      body: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {s.ob.goals.map((t) => (
            <Chip key={t} active={data.goals.includes(t)} onClick={() => toggle("goals", t)}>
              {t}
            </Chip>
          ))}
        </div>
      ),
      valid: data.goals.length > 0,
    },
    { title: s.ob.allergyTitle, body: <textarea value={data.allergies} onChange={(e) => setData({ ...data, allergies: e.target.value })} placeholder={s.ob.allergyPh} style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} />, valid: true },
    {
      title: s.ob.budgetTitle,
      body: (
        <div style={{ display: "flex", gap: 10 }}>
          {s.ob.budgetOptions.map((b) => (
            <Chip key={b} active={data.budget === b} onClick={() => setData({ ...data, budget: b })}>
              {b}
            </Chip>
          ))}
        </div>
      ),
      valid: true,
    },
  ];

  const cur = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "28px 22px" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 30 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? T.wine : T.line, transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ flex:1, overflowY: "auto" }}>
        <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 22, color: T.ink, marginBottom: cur.hint ? 6 : 20, lineHeight: 1.4 }}>{cur.title}</div>
        {cur.hint && <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkSoft, marginBottom: 18 }}>{cur.hint}</div>}
        {cur.body}
      </div>
      <button className="press" disabled={!cur.valid} onClick={() => (isLast ? onDone(data) : setStep(step + 1))} style={{ ...primaryBtn, opacity: cur.valid ? 1 : 0.4, marginTop: 20 }}>
        {isLast ? s.step.finish : s.step.continue}
      </button>
      {step > 0 && (
        <button className="press" onClick={() => setStep(step - 1)} style={{ ...ghostBtn, marginTop: 8 }}>
          {s.step.back}
        </button>
      )}
    </div>
  );
}

function PhotoCompare({ profile, lang }) {
  const s = STR[lang].photo;
  const [slots, setSlots] = useState([null, null]);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRefs = useRef([]);

  async function handleSlotFile(i, file) {
    if (!file) return;
    const item = await resizeImageFile(file);
    setSlots((prev) => {
      const next = [...prev];
      next[i] = item;
      return next;
    });
    setResult(null);
  }

  const filled = slots.map((v, i) => (v ? { ...v, index: i } : null)).filter(Boolean);

  async function analyze() {
    if (filled.length < 2) return;
    const usage = await getAIUsageCount();
    if (usage >= DAILY_AI_LIMIT) {
      setResult({ limitReached: true });
      return;
    }
    await incrementAIUsage();
    setLoading(true);
    setResult(null);
    try {
      const content = [
        {
          type: "text",
          text: `You are a personal styling assistant. Below are ${filled.length} numbered photos of the same woman, labeled by slot number (${filled
            .map((f) => f.index + 1)
            .join(", ")}). ${context ? "Context for the choice: " + context + ". " : ""}Pick which photo number is best for this context and give one short concrete reason (lighting, angle, expression, background). Reply in ${langName(
            lang
          )} only. Respond ONLY with valid JSON: {"best_index": <one of ${filled.map((f) => f.index + 1).join(",")}>, "reason": "short sentence", "tips": ["one or two short tips for next time"]}`,
        },
        ...filled.map((img) => ({ type: "image", source: { type: "base64", media_type: img.mediaType, data: img.base64 } })),
      ];
      const data = await callClaude([{ role: "user", content }]);
      const text = data.content.find((c) => c.type === "text")?.text || "{}";
      setResult(extractJson(text));
    } catch (e) {
      setResult({ error: true, message: e?.message || String(e) });
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: "20px 18px 110px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
      <input placeholder={s.contextPh} value={context} onChange={(e) => setContext(e.target.value)} style={{ ...inputStyle, marginBottom: 16 }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {slots.map((slot, i) => (
          <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 20, overflow: "hidden" }}>
            <input ref={(el) => (fileRefs.current[i] = el)} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleSlotFile(i, e.target.files[0])} />
            {slot ? (
              <>
                <img
                  src={slot.url}
                  onClick={() => fileRefs.current[i].click()}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    display: "block",
                    border: result && !result.error && result.best_index === i + 1 ? `3px solid ${T.sage}` : "1px solid rgba(255,255,255,0.6)",
                    boxShadow: result && !result.error && result.best_index === i + 1 ? "0 6px 20px rgba(37,181,127,0.4)" : "0 4px 14px rgba(216,27,96,0.12)",
                    borderRadius: 20,
                    boxSizing: "border-box",
                  }}
                />
                {result && !result.error && result.best_index === i + 1 && (
                  <div style={{ position: "absolute", bottom: 8, insetInlineStart: 8, background: `linear-gradient(135deg, ${T.sage}, #17925F)`, color: "#fff", fontFamily: bodyFont, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, boxShadow: "0 4px 10px rgba(37,181,127,0.4)" }}>
                    ★ {s.winner}
                  </div>
                )}
              </>
            ) : (
              <button className="press" onClick={() => fileRefs.current[i].click()} style={uploadBox}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>+</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkSoft }}>
                  {s.slot} {i + 1}
                </div>
              </button>
            )}
            <div style={{ position: "absolute", top: 8, insetInlineEnd: 8, width: 22, height: 22, borderRadius: "50%", background: "rgba(51,22,31,0.65)", color: "#fff", fontSize: 11.5, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: bodyFont }}>
              {i + 1}
            </div>
          </div>
        ))}
        {slots.length < 4 && (
          <button className="press" onClick={() => setSlots((p) => [...p, null])} style={{ ...uploadBox, aspectRatio: "1", background: "transparent", border: `2px dashed ${T.line}` }}>
            <div style={{ fontSize: 20, color: T.inkSoft }}>+</div>
            <div style={{ fontFamily: bodyFont, fontSize: 11.5, color: T.inkSoft }}>{s.addSlot}</div>
          </button>
        )}
      </div>

      <button className="press" onClick={analyze} disabled={filled.length < 2 || loading} style={{ ...primaryBtn, opacity: filled.length < 2 || loading ? 0.5 : 1 }}>
        {loading ? s.analyzing : s.analyze}
      </button>

      {result && !result.error && (
        <div style={resultCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <VerdictStamp verdict="yes" />
            <div>
              <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 16.5, color: T.ink }}>
                {s.slot} {result.best_index} — {s.winner}
              </div>
              <div style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft, marginTop: 3 }}>{result.reason}</div>
            </div>
          </div>
          {result.tips?.length > 0 && (
            <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 10 }}>
              <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.wine, fontWeight: 600, marginBottom: 4 }}>{s.tip}</div>
              {result.tips.map((t, i) => (
                <div key={i} style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft }}>
                  · {t}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {result?.limitReached && <LimitNote lang={lang} />}
      {result?.error && <ErrorNote lang={lang} message={result.message} />}
    </div>
  );
}

function ProductCheck({ profile, lang }) {
  const s = STR[lang].product;
  const [mode, setMode] = useState("text");
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [frequency, setFrequency] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setImage(await resizeImageFile(file));
  }

  async function analyze() {
    if (mode === "text" && !question.trim()) return;
    if (mode === "photo" && !image) return;
    const usage = await getAIUsageCount();
    if (usage >= DAILY_AI_LIMIT) {
      setResult({ limitReached: true });
      return;
    }
    await incrementAIUsage();
    setLoading(true);
    setResult(null);
    try {
      const profileText = `User profile: skin type(s) ${profile.skinTypes?.join(", ")}, sensitivity level: ${profile.sensitivity}, goals: ${profile.goals?.join(", ")}, known allergies: ${
        profile.allergies || "none stated"
      }, preferred budget: ${profile.budget}.`;
      const extraText = `${frequency ? ` Planned usage frequency: ${frequency}.` : ""}${price ? ` Price: ${price}.` : ""}`;
      const instructions = `${profileText} Your task: decide whether the following product/question suits her.${extraText} ${
        mode === "photo" ? "The image shows a cosmetic product/ingredient list — identify the product and its known ingredients." : "Her question: " + question
      } Reply in ${langName(lang)} only. Respond ONLY with valid JSON, with any quote marks inside string values properly escaped: {"verdict": "yes"|"no"|"maybe", "headline": "short clear sentence", "reasoning": "2-3 sentences referencing ingredients, her profile, and usage frequency/price if given", "disclaimer": "short sentence noting this isn't medical advice and to consult a dermatologist if there's a known sensitivity"}`;
      const content =
        mode === "photo"
          ? [
              { type: "text", text: instructions },
              { type: "image", source: { type: "base64", media_type: image.mediaType, data: image.base64 } },
            ]
          : [{ type: "text", text: instructions }];
      const data = await callClaude([{ role: "user", content }]);
      const text = data.content.filter((c) => c.type === "text").map((c) => c.text).join("\n");
      setResult(extractJson(text));
    } catch (e) {
      setResult({ error: true, message: e?.message || String(e) });
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: "20px 18px 110px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Chip active={mode === "text"} onClick={() => setMode("text")}>
          {s.modeText}
        </Chip>
        <Chip active={mode === "photo"} onClick={() => setMode("photo")}>
          {s.modePhoto}
        </Chip>
      </div>

      {mode === "text" ? (
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={s.questionPh} style={{ ...inputStyle, minHeight: 90, resize: "vertical", marginBottom: 16 }} />
      ) : (
        <>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
          {!image ? (
            <button className="press" onClick={() => inputRef.current.click()} style={{ ...uploadBox, height: 140, marginBottom: 16 }}>
              {Icon.product(T.wine)}
              <div style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft, marginTop: 8 }}>{s.uploadLabel}</div>
            </button>
          ) : (
            <div style={{ marginBottom: 16 }}>
              <img src={image.url} style={{ width: 110, height: 110, objectFit: "cover", borderRadius: 12, border: `2px solid ${T.line}`, display: "block" }} />
            </div>
          )}
        </>
      )}

      <div style={{ ...card, marginBottom: 16, padding: 14 }}>
        <div style={{ fontFamily: bodyFont, fontSize: 11.5, color: T.wine, fontWeight: 700, marginBottom: 10 }}>{s.moreDetails}</div>
        <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkSoft, marginBottom: 6 }}>{s.frequencyLabel}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {s.frequencyOptions.map((f) => (
            <Chip key={f} active={frequency === f} onClick={() => setFrequency(frequency === f ? "" : f)}>
              {f}
            </Chip>
          ))}
        </div>
        <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkSoft, marginBottom: 6 }}>{s.priceLabel}</div>
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder={s.pricePh} style={inputStyle} />
      </div>

      <button className="press" onClick={analyze} disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.6 : 1 }}>
        {loading ? s.analyzing : s.analyze}
      </button>

      {result && !result.error && (
        <div style={resultCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
            <VerdictStamp verdict={result.verdict} />
            <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 16.5, color: T.ink }}>{result.headline}</div>
          </div>
          <div style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft, lineHeight: 1.6, marginBottom: 10 }}>{result.reasoning}</div>
          <div style={{ fontFamily: bodyFont, fontSize: 11.5, color: T.ochre, borderTop: `1px solid ${T.line}`, paddingTop: 8 }}>⚠ {result.disclaimer}</div>
        </div>
      )}
      {result?.limitReached && <LimitNote lang={lang} />}
      {result?.error && <ErrorNote lang={lang} message={result.message} />}
    </div>
  );
}

function ErrorNote({ lang, message }) {
  return (
    <div style={{ ...resultCard, color: T.wine, fontFamily: bodyFont, fontSize: 13.5 }}>
      {STR[lang].product.error}
      {message && <div style={{ marginTop: 8, fontSize: 11, color: T.inkSoft, direction: "ltr", textAlign: "start" }}>Debug: {message}</div>}
    </div>
  );
}
function LimitNote({ lang }) {
  const s = STR[lang].limit;
  return (
    <div style={{ ...resultCard, background: T.lilacBg, border: "none" }}>
      <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 15, color: T.ink, marginBottom: 6 }}>{s.title}</div>
      <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, lineHeight: 1.6 }}>{s.body}</div>
    </div>
  );
}

function Nutrition({ profile, lang }) {
  const s = STR[lang].nutrition;
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function analyze() {
    if (!question.trim()) return;
    const usage = await getAIUsageCount();
    if (usage >= DAILY_AI_LIMIT) {
      setResult({ limitReached: true });
      return;
    }
    await incrementAIUsage();
    setLoading(true);
    setResult(null);
    try {
      const profileText = `User profile: goals: ${profile.goals?.join(", ") || "none stated"}, preferred budget: ${profile.budget || "not stated"}.`;
      const instructions = `You are a friendly nutrition assistant inside a lifestyle app. ${profileText} Her request: "${question}". Build her a helpful, balanced meal plan or menu as requested. Keep it general and safe: no specific calorie counts or numeric weight-loss targets, no extreme or restrictive diets, no medical claims. If her request implies a medical condition, note she should check with a doctor or registered dietitian. Reply in ${langName(
        lang
      )} only. Respond ONLY with valid JSON: {"heading": "short title for the plan", "items": ["step or menu item 1", "step or menu item 2", "..."], "note": "one short encouraging or practical closing note"}`;
      const data = await callClaude([{ role: "user", content: [{ type: "text", text: instructions }] }]);
      const text = data.content.find((c) => c.type === "text")?.text || "{}";
      setResult(extractJson(text));
    } catch (e) {
      setResult({ error: true, message: e?.message || String(e) });
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: "20px 18px 130px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={s.questionPh} style={{ ...inputStyle, minHeight: 100, resize: "vertical", marginBottom: 16 }} />
      <button className="press" onClick={analyze} disabled={loading || !question.trim()} style={{ ...primaryBtn, opacity: loading || !question.trim() ? 0.5 : 1 }}>
        {loading ? s.analyzing : s.analyze}
      </button>

      {result && !result.error && (
        <div style={{ ...resultCard, padding: 22 }}>
          <div style={{ fontFamily: menuFont, fontWeight: 700, fontSize: 20, color: T.ink, marginBottom: 4 }}>{result.heading}</div>
          <div style={{ width: 36, height: 2, background: T.wineGrad, borderRadius: 2, marginBottom: 16 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
            {result.items?.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: T.roseSoft,
                    color: T.wine,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: bodyFont,
                    fontWeight: 700,
                    fontSize: 11,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontFamily: menuFont, fontSize: 14.5, color: T.ink, lineHeight: 1.6 }}>{it}</span>
              </div>
            ))}
          </div>
          {result.note && <div style={{ fontFamily: menuFont, fontStyle: "italic", fontSize: 13, color: T.inkSoft, marginBottom: 12 }}>{result.note}</div>}
          <div style={{ fontFamily: bodyFont, fontSize: 11, color: T.ochre, borderTop: `1px solid ${T.line}`, paddingTop: 8 }}>⚠ {s.disclaimerFixed}</div>
        </div>
      )}
      {result?.limitReached && <LimitNote lang={lang} />}
      {result?.error && <ErrorNote lang={lang} message={result.message} />}
    </div>
  );
}

function ReplyHelper({ lang }) {
  const s = STR[lang].reply;
  const [theirMessage, setTheirMessage] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const SYSTEM_PROMPT = `You're helping a young woman figure out what to text back to someone she knows (friend, partner, family member) in a real WhatsApp conversation — an argument, a fight, or just a message she doesn't know how to respond to. She'll give you what the other person wrote and some context about the situation. Write reply suggestions in her own texting voice: natural, warm, casual — exactly like a real text a friend would send, never stiff, formal, or "AI-sounding". Give short, real, directly usable replies, not essays. Aim for healthy communication — de-escalating, honest, or boundary-setting depending on what fits — never cruel, manipulative, or aimed at "winning" the fight. If what she describes sounds like it could involve abuse or a genuinely unsafe situation, gently note that alongside the suggestions and encourage her to talk to someone she trusts, rather than just producing casual reply text. Reply only in ${langName(lang)}. Respond ONLY with valid JSON, with any quote marks inside string values properly escaped with a backslash: {"suggestions": [{"label": "short 2-3 word style label", "text": "the actual suggested reply"}, {"label": "short 2-3 word style label", "text": "a second, different-toned reply"}], "note": "one short supportive sentence, or a gentle safety note if relevant — otherwise omit"}`;

  async function analyze() {
    if (!theirMessage.trim()) return;
    const usage = await getAIUsageCount();
    if (usage >= DAILY_AI_LIMIT) {
      setResult({ limitReached: true });
      return;
    }
    await incrementAIUsage();
    setLoading(true);
    setResult(null);
    try {
      const userText = `What they wrote: "${theirMessage}"${context.trim() ? `\nContext: ${context}` : ""}`;
      const data = await callClaude([{ role: "user", content: [{ type: "text", text: userText }] }], { system: SYSTEM_PROMPT });
      const text = data.content.find((c) => c.type === "text")?.text || "{}";
      setResult(extractJson(text));
    } catch (e) {
      setResult({ error: true, message: e?.message || String(e) });
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: "20px 18px 130px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkSoft, marginBottom: 6 }}>{s.theirMessageLabel}</div>
      <textarea value={theirMessage} onChange={(e) => setTheirMessage(e.target.value)} placeholder={s.theirMessagePh} style={{ ...inputStyle, minHeight: 80, resize: "vertical", marginBottom: 14 }} />

      <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkSoft, marginBottom: 6 }}>{s.contextLabel}</div>
      <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder={s.contextPh} style={{ ...inputStyle, minHeight: 60, resize: "vertical", marginBottom: 16 }} />

      <button className="press" onClick={analyze} disabled={loading || !theirMessage.trim()} style={{ ...primaryBtn, opacity: loading || !theirMessage.trim() ? 0.5 : 1 }}>
        {loading ? s.analyzing : s.analyze}
      </button>

      {result && !result.error && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
          {result.suggestions?.map((sug, i) => (
            <div key={i} style={resultCard}>
              <div style={{ fontFamily: bodyFont, fontSize: 11, fontWeight: 700, color: T.wine, letterSpacing: "0.05em", marginBottom: 8 }}>{sug.label?.toUpperCase()}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 14.5, color: T.ink, lineHeight: 1.6 }}>{sug.text}</div>
            </div>
          ))}
          {result.note && (
            <div style={{ ...card, background: T.lilacBg, border: "none" }}>
              <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.ink, lineHeight: 1.6 }}>{result.note}</div>
            </div>
          )}
        </div>
      )}
      {result?.limitReached && <LimitNote lang={lang} />}
      {result?.error && <ErrorNote lang={lang} message={result.message} />}

      <div style={{ fontFamily: bodyFont, fontSize: 11, color: T.inkSoft, marginTop: 16, lineHeight: 1.6 }}>{s.disclaimer}</div>
    </div>
  );
}

function localeFor(lang) {
  return { he: "he-IL", en: "en-US" }[lang] || "en-US";
}
function ymd(d) {
  return d.toISOString().slice(0, 10);
}
function computeCycleStats(periodDays) {
  if (periodDays.length === 0) return null;
  const sorted = [...periodDays].sort();
  const starts = [];
  let prev = null;
  for (const d of sorted) {
    const cur = new Date(d + "T00:00:00");
    if (prev === null || (cur - prev) / 86400000 > 1) starts.push(d);
    prev = cur;
  }
  const lastStart = new Date(starts[starts.length - 1] + "T00:00:00");
  let avgCycle = 28;
  if (starts.length >= 2) {
    const gaps = [];
    for (let i = 1; i < starts.length; i++) {
      gaps.push((new Date(starts[i] + "T00:00:00") - new Date(starts[i - 1] + "T00:00:00")) / 86400000);
    }
    avgCycle = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  }
  const today = new Date(ymd(new Date()) + "T00:00:00");
  const daysSinceStart = Math.round((today - lastStart) / 86400000);
  const dayInCycle = ((daysSinceStart % avgCycle) + avgCycle) % avgCycle + 1;
  const nextStart = new Date(lastStart.getTime() + avgCycle * 86400000 * Math.ceil((daysSinceStart + 1) / avgCycle));
  const daysUntilNext = Math.round((nextStart - today) / 86400000);
  return { lastStart, avgCycle, dayInCycle, nextStart, daysUntilNext, hasHistory: starts.length >= 2 };
}

function CycleTracker({ lang }) {
  const s = STR[lang].cycle;
  const [periodDays, setPeriodDays] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get("periodDays");
        if (r?.value) setPeriodDays(JSON.parse(r.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  async function persist(next) {
    setPeriodDays(next);
    try {
      await storage.set("periodDays", JSON.stringify(next));
    } catch (e) {}
  }

  function toggleDay(dateStr) {
    const next = periodDays.includes(dateStr) ? periodDays.filter((d) => d !== dateStr) : [...periodDays, dateStr];
    persist(next);
  }

  const stats = computeCycleStats(periodDays);
  const locale = localeFor(lang);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(locale, { month: "long", year: "numeric" });
  const weekdayLabels = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + i).toLocaleDateString(locale, { weekday: "narrow" }));

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayStr = ymd(new Date());

  const predictedSet = new Set();
  if (stats) {
    for (let i = 0; i < 5; i++) {
      predictedSet.add(ymd(new Date(stats.nextStart.getTime() + i * 86400000)));
    }
  }

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function changeMonth(delta) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  }

  return (
    <div style={{ padding: "20px 18px 130px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      {loaded && stats && (
        <div style={{ ...card, textAlign: "center", padding: 22, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            <div>
              <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 30, color: T.wine }}>{stats.dayInCycle}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 11, color: T.inkSoft }}>
                {s.dayLabel} {s.inCycle}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 30, color: T.wine }}>{stats.daysUntilNext}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 11, color: T.inkSoft }}>{s.days}</div>
            </div>
          </div>
          <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.ink, marginTop: 12 }}>
            {s.nextPeriod}: {stats.nextStart.toLocaleDateString(locale)}
            {!stats.hasHistory && ` (${s.estimateNote})`}
          </div>
        </div>
      )}

      <div style={{ ...card, padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button className="press" onClick={() => changeMonth(-1)} style={{ background: "none", border: "none", color: T.wine, fontSize: 18, cursor: "pointer", padding: "4px 10px" }}>
            ‹
          </button>
          <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 15, color: T.ink }}>{monthLabel}</div>
          <button className="press" onClick={() => changeMonth(1)} style={{ background: "none", border: "none", color: T.wine, fontSize: 18, cursor: "pointer", padding: "4px 10px" }}>
            ›
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
          {weekdayLabels.map((w, i) => (
            <div key={i} style={{ textAlign: "center", fontFamily: bodyFont, fontSize: 10.5, color: T.inkSoft, fontWeight: 600 }}>
              {w}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const dateStr = ymd(new Date(viewYear, viewMonth, d));
            const isPeriod = periodDays.includes(dateStr);
            const isPredicted = !isPeriod && predictedSet.has(dateStr);
            const isToday = dateStr === todayStr;
            return (
              <button
                key={i}
                className="press"
                onClick={() => toggleDay(dateStr)}
                style={{
                  aspectRatio: "1",
                  border: isToday ? `1.5px solid ${T.wine}` : "1px solid transparent",
                  borderRadius: "50%",
                  background: isPeriod ? T.wineGrad : isPredicted ? T.roseSoft : "transparent",
                  color: isPeriod ? "#fff" : T.ink,
                  fontFamily: bodyFont,
                  fontSize: 12.5,
                  fontWeight: isToday ? 700 : 400,
                  cursor: "pointer",
                  boxShadow: isPeriod ? "0 3px 8px rgba(255,62,127,0.4)" : "none",
                }}
              >
                {d}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 14, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.wineGrad }} />
            <span style={{ fontFamily: bodyFont, fontSize: 10.5, color: T.inkSoft }}>{s.legendPeriod}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.roseSoft }} />
            <span style={{ fontFamily: bodyFont, fontSize: 10.5, color: T.inkSoft }}>{s.legendPredicted}</span>
          </div>
        </div>
      </div>

      <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkSoft, marginTop: 14, lineHeight: 1.6, textAlign: "center" }}>{s.instruction}</div>
    </div>
  );
}

const ACTIVITY_TYPES = [
  { id: "walk", metric: "steps", kcalPer: 0.04 },
  { id: "run", metric: "min", kcalPer: 10 },
  { id: "strength", metric: "min", kcalPer: 6 },
  { id: "cycle", metric: "min", kcalPer: 7 },
  { id: "yoga", metric: "min", kcalPer: 3 },
  { id: "other", metric: "min", kcalPer: 5 },
];
function todayKey(prefix) {
  return `${prefix}:${new Date().toISOString().slice(0, 10)}`;
}
function ActivityLog({ lang }) {
  const s = STR[lang].activity;
  const [entries, setEntries] = useState([]);
  const [type, setType] = useState("walk");
  const [amount, setAmount] = useState("");
  const [loaded, setLoaded] = useState(false);
  const storageKey = todayKey("activity");

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get(storageKey);
        if (r?.value) setEntries(JSON.parse(r.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  async function persist(next) {
    setEntries(next);
    try {
      await storage.set(storageKey, JSON.stringify(next));
    } catch (e) {}
  }

  function addEntry() {
    const n = parseFloat(amount);
    if (!n || n <= 0) return;
    const t = ACTIVITY_TYPES.find((a) => a.id === type);
    const kcal = Math.round(n * t.kcalPer);
    persist([...entries, { id: Date.now(), type, amount: n, kcal }]);
    setAmount("");
  }
  function removeEntry(id) {
    persist(entries.filter((e) => e.id !== id));
  }

  const total = entries.reduce((sum, e) => sum + e.kcal, 0);
  const t = ACTIVITY_TYPES.find((a) => a.id === type);

  return (
    <div style={{ padding: "20px 18px 130px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {ACTIVITY_TYPES.map((a) => (
            <Chip key={a.id} active={type === a.id} onClick={() => setType(a.id)}>
              {s.types[a.id]}
            </Chip>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="number" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t.metric === "steps" ? s.stepsPh : s.minutesPh} style={{ ...inputStyle, flex: 1 }} />
          <button className="press" onClick={addEntry} disabled={!amount} style={{ ...primaryBtn, width: "auto", padding: "0 20px", opacity: !amount ? 0.5 : 1 }}>
            {s.add}
          </button>
        </div>
      </div>

      {loaded && entries.length > 0 && (
        <>
          <div style={{ ...card, textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 30, color: T.wine }}>{total}</div>
            <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkSoft }}>{s.totalLabel}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {entries.map((e) => (
              <div key={e.id} style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12 }}>
                <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.ink }}>
                  {s.types[e.type]} — {e.amount} {ACTIVITY_TYPES.find((a) => a.id === e.type).metric === "steps" ? s.steps : s.min}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 13, color: T.wine }}>{e.kcal} {s.kcal}</div>
                  <button className="press" onClick={() => removeEntry(e.id)} style={{ background: "none", border: "none", color: T.inkSoft, cursor: "pointer", fontSize: 16, padding: 0 }}>
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ fontFamily: bodyFont, fontSize: 11, color: T.inkSoft, marginTop: 16, lineHeight: 1.6 }}>{s.disclaimer}</div>
    </div>
  );
}

function FoodLog({ lang }) {
  const s = STR[lang].food;
  const [entries, setEntries] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef(null);
  const storageKey = todayKey("food");

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get(storageKey);
        if (r?.value) setEntries(JSON.parse(r.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  async function persist(next) {
    setEntries(next);
    try {
      await storage.set(storageKey, JSON.stringify(next));
    } catch (e) {}
  }

  async function handleFile(file) {
    if (!file) return;
    setImage(await resizeImageFile(file));
  }

  async function analyze() {
    if (!image) return;
    const usage = await getAIUsageCount();
    if (usage >= DAILY_AI_LIMIT) {
      setLimitReached(true);
      return;
    }
    await incrementAIUsage();
    setLimitReached(false);
    setLoading(true);
    setErrMsg(null);
    try {
      const instructions = `Identify the food/meal in this photo. Give a short name and a rough estimated calorie count. Be a reasonable general estimate, not falsely precise. Reply in ${langName(
        lang
      )} only. Respond ONLY with valid JSON: {"name": "short food name", "kcal": <number, rough estimate>}`;
      const content = [
        { type: "text", text: instructions },
        { type: "image", source: { type: "base64", media_type: image.mediaType, data: image.base64 } },
      ];
      const data = await callClaude([{ role: "user", content }]);
      const text = data.content.find((c) => c.type === "text")?.text || "{}";
      const result = extractJson(text);
      persist([...entries, { id: Date.now(), name: result.name, kcal: result.kcal, url: image.url }]);
      setImage(null);
    } catch (e) {
      setErrMsg(e?.message || String(e));
    }
    setLoading(false);
  }
  function removeEntry(id) {
    persist(entries.filter((e) => e.id !== id));
  }

  const total = entries.reduce((sum, e) => sum + (e.kcal || 0), 0);

  return (
    <div style={{ padding: "20px 18px 130px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
      {!image ? (
        <button className="press" onClick={() => inputRef.current.click()} style={{ ...uploadBox, height: 140, marginBottom: 16 }}>
          {Icon.food(T.wine)}
          <div style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft, marginTop: 8 }}>{s.uploadLabel}</div>
        </button>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <img src={image.url} style={{ width: 110, height: 110, objectFit: "cover", borderRadius: 12, border: `1px solid rgba(255,255,255,0.6)`, display: "block", marginBottom: 10 }} />
          <button className="press" onClick={analyze} disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.6 : 1 }}>
            {loading ? s.analyzing : s.analyze}
          </button>
        </div>
      )}
      {limitReached && <LimitNote lang={lang} />}
      {errMsg && <ErrorNote lang={lang} message={errMsg} />}

      {loaded && entries.length > 0 && (
        <>
          <div style={{ ...card, textAlign: "center", marginBottom: 14, marginTop: 6 }}>
            <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 30, color: T.wine }}>{total}</div>
            <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkSoft }}>{s.totalLabel}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {entries.map((e) => (
              <div key={e.id} style={{ ...card, display: "flex", alignItems: "center", gap: 10, padding: 12 }}>
                {e.url && <img src={e.url} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 10 }} />}
                <div style={{ flex: 1, fontFamily: bodyFont, fontSize: 13, color: T.ink }}>{e.name}</div>
                <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 13, color: T.wine }}>{e.kcal} {s.kcal}</div>
                <button className="press" onClick={() => removeEntry(e.id)} style={{ background: "none", border: "none", color: T.inkSoft, cursor: "pointer", fontSize: 16, padding: 0 }}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ fontFamily: bodyFont, fontSize: 11, color: T.inkSoft, marginTop: 16, lineHeight: 1.6 }}>{s.disclaimer}</div>
    </div>
  );
}

function Wellness({ profile, lang, onUpdate }) {
  const s = STR[lang].wellness;
  const [view, setView] = useState(null);
  const [todayBurn, setTodayBurn] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get(todayKey("activity"));
        if (r?.value) {
          const entries = JSON.parse(r.value);
          setTodayBurn(entries.reduce((sum, e) => sum + e.kcal, 0));
        } else {
          setTodayBurn(0);
        }
      } catch (e) {
        setTodayBurn(0);
      }
    })();
  }, [view]);

  if (view === "activity") return <BackWrap onBack={() => setView(null)} label={s.back}><ActivityLog lang={lang} /></BackWrap>;
  if (view === "food") return <BackWrap onBack={() => setView(null)} label={s.back}><FoodLog lang={lang} /></BackWrap>;
  if (view === "nutrition") return <BackWrap onBack={() => setView(null)} label={s.back}><Nutrition profile={profile} lang={lang} /></BackWrap>;
  if (view === "talk") return <BackWrap onBack={() => setView(null)} label={s.back}><ReplyHelper lang={lang} /></BackWrap>;
  if (view === "cycle") return <BackWrap onBack={() => setView(null)} label={s.back}><CycleTracker lang={lang} /></BackWrap>;

  const cards = [
    { id: "activity", title: s.cardActivity, desc: s.cardActivityDesc, icon: Icon.activity, accent: "wine" },
    { id: "food", title: s.cardFood, desc: s.cardFoodDesc, icon: Icon.food, accent: "lilac" },
    { id: "nutrition", title: s.cardNutrition, desc: s.cardNutritionDesc, icon: Icon.calendar, accent: "lilac" },
    { id: "talk", title: s.cardTalk, desc: s.cardTalkDesc, icon: Icon.wellness, accent: "wine" },
    { id: "cycle", title: s.cardCycle, desc: s.cardCycleDesc, icon: Icon.product, accent: "wine" },
  ];

  return (
    <div style={{ padding: "20px 18px 130px" }}>
      <SectionHeader eyebrow={STR[lang].brand} title={s.title} subtitle={s.subtitle} />

      <button className="press" onClick={() => setView("activity")} style={{ width: "100%", border: "none", cursor: "pointer", background: T.wineGrad, borderRadius: 22, padding: 20, marginBottom: 16, boxShadow: "0 10px 26px rgba(255,62,127,0.32)", textAlign: "start" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: bodyFont, fontSize: 11.5, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{s.burnLabel}</div>
            <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 34, color: "#fff" }}>
              {todayBurn === null ? "–" : todayBurn} <span style={{ fontSize: 15, fontWeight: 500 }}>{s.kcalUnit}</span>
            </div>
          </div>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>{Icon.activity("#fff")}</div>
        </div>
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {cards.map((c) => (
          <button key={c.id} className="press" onClick={() => setView(c.id)} style={{ ...card, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, textAlign: "start", cursor: "pointer", width: "100%", padding: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: c.accent === "lilac" ? `linear-gradient(135deg, ${T.lilac}, #9560C9)` : T.wineGrad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: c.accent === "lilac" ? "0 4px 10px rgba(181,126,232,0.35)" : "0 4px 10px rgba(255,62,127,0.3)",
              }}
            >
              {c.icon("#fff")}
            </div>
            <div>
              <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 15, color: T.ink, lineHeight: 1.3 }}>{c.title}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 11.5, color: T.inkSoft, marginTop: 3, lineHeight: 1.4 }}>{c.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function BackWrap({ onBack, label, children }) {
  return (
    <div>
      <div style={{ padding: "16px 18px 0" }}>
        <button className="press" onClick={onBack} style={{ background: "none", border: "none", color: T.wine, fontFamily: bodyFont, fontSize: 13.5, fontWeight: 600, cursor: "pointer", padding: 0 }}>
          ← {label}
        </button>
      </div>
      {children}
    </div>
  );
}

function CalendarPlanner({ lang }) {
  const s = STR[lang].calendarScreen;
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get("calendarEvents");
        if (r?.value) setEvents(JSON.parse(r.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  async function persist(next) {
    setEvents(next);
    try {
      await storage.set("calendarEvents", JSON.stringify(next));
    } catch (e) {}
  }

  function addEvent() {
    if (!title.trim() || !date) return;
    const next = [...events, { id: Date.now(), title: title.trim(), date, time }].sort((a, b) => (a.date + (a.time || "00:00")).localeCompare(b.date + (b.time || "00:00")));
    persist(next);
    setTitle("");
    setDate("");
    setTime("");
    setAdding(false);
  }
  function removeEvent(id) {
    persist(events.filter((e) => e.id !== id));
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= todayStr);
  const past = events.filter((e) => e.date < todayStr);

  function fmtDate(d) {
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  }

  return (
    <div style={{ padding: "20px 18px 130px" }}>
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      {adding ? (
        <div style={{ ...card, marginBottom: 16 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={s.titlePh} style={{ ...inputStyle, marginBottom: 10 }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
          </div>
          <button className="press" onClick={addEvent} disabled={!title.trim() || !date} style={{ ...primaryBtn, opacity: !title.trim() || !date ? 0.5 : 1 }}>
            {s.save}
          </button>
          <button className="press" onClick={() => setAdding(false)} style={{ ...ghostBtn, marginTop: 6 }}>
            {s.cancel}
          </button>
        </div>
      ) : (
        <button className="press" onClick={() => setAdding(true)} style={{ ...primaryBtn, marginBottom: 16 }}>
          + {s.addEvent}
        </button>
      )}

      {loaded && upcoming.length === 0 && past.length === 0 && <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, textAlign: "center", marginTop: 20 }}>{s.empty}</div>}

      {upcoming.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.map((e) => (
            <div key={e.id} style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 14 }}>
              <div>
                <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 14, color: T.ink }}>{e.title}</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkSoft }}>
                  {fmtDate(e.date)}
                  {e.time ? ` · ${e.time}` : ""}
                </div>
              </div>
              <button className="press" onClick={() => removeEvent(e.id)} style={{ background: "none", border: "none", color: T.inkSoft, cursor: "pointer", fontSize: 18, padding: 0 }}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [lang, setLang] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [completingProfile, setCompletingProfile] = useState(false);
  const [tab, setTab] = useState("photo");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const l = await storage.get("lang");
        if (l?.value) setLang(l.value);
      } catch (e) {}
      try {
        const p = await storage.get("profile");
        if (p?.value) setProfile(JSON.parse(p.value));
      } catch (e) {}
      setReady(true);
    })();
  }, []);

  async function chooseLang(l) {
    setLang(l);
    try {
      await storage.set("lang", l);
    } catch (e) {}
  }
  async function finishOnboarding(data) {
    setProfile(data);
    try {
      await storage.set("profile", JSON.stringify(data));
    } catch (e) {}
  }
  async function skipToGuest() {
    const guestProfile = { guest: true, name: "", skinTypes: [], sensitivity: "", goals: [], allergies: "", budget: "" };
    setProfile(guestProfile);
    try {
      await storage.set("profile", JSON.stringify(guestProfile));
    } catch (e) {}
  }
  async function completeProfile(data) {
    const next = { ...data, guest: false };
    setProfile(next);
    setCompletingProfile(false);
    try {
      await storage.set("profile", JSON.stringify(next));
    } catch (e) {}
  }
  async function updateProfile(patch) {
    const next = { ...profile, ...patch };
    setProfile(next);
    try {
      await storage.set("profile", JSON.stringify(next));
    } catch (e) {}
  }

  const fontLink = <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&family=Frank+Ruhl+Libre:wght@500;700;900&display=swap" rel="stylesheet" />;
  const dir = lang ? DIR[lang] : "rtl";
  const shell = { maxWidth: 420, margin: "0 auto", height: "100vh", background: T.bg, fontFamily: bodyFont, display: "flex", flexDirection: "column", position: "relative", direction: dir, overflow: "hidden" };

  const globalStyle = (
    <style>{`
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      html, body { background: #FFE3ED; }
      textarea, input { font-family: inherit; }
      textarea:focus, input:focus { border-color: ${T.wine} !important; }
      ::-webkit-scrollbar { display: none; }
      .press:active { transform: scale(0.96); }
      .press { transition: transform 0.1s ease; }
      @keyframes stampIn { 0% { transform: scale(0.4) rotate(-8deg); opacity: 0; } 100% { transform: scale(1) rotate(-8deg); opacity: 1; } }
      @keyframes fadeSlide { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
      .tabpane { animation: fadeSlide 0.22s ease; position: relative; z-index: 1; }
      .app-shell { position: relative; overflow: hidden; }
      .app-shell::before, .app-shell::after { content: ''; position: absolute; border-radius: 50%; filter: blur(30px); pointer-events: none; z-index: 0; }
      .app-shell::before { width: 220px; height: 220px; top: -70px; inset-inline-end: -60px; background: radial-gradient(circle, rgba(255,124,163,0.5), transparent 70%); }
      .app-shell::after { width: 260px; height: 260px; bottom: 60px; inset-inline-start: -90px; background: radial-gradient(circle, rgba(181,126,232,0.35), transparent 70%); }
      .bg-blob-3 { position: absolute; width: 200px; height: 200px; border-radius: 50%; filter: blur(34px); pointer-events: none; z-index: 0; top: 42%; inset-inline-end: -70px; background: radial-gradient(circle, rgba(255,180,120,0.28), transparent 70%); }
      .bg-dots { position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.5; background-image: radial-gradient(rgba(255,62,127,0.14) 1px, transparent 1.5px); background-size: 22px 22px; -webkit-mask-image: linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent); mask-image: linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent); }
    `}</style>
  );

  if (!ready) {
    return (
      <div className="app-shell" style={{ ...shell, alignItems: "center", justifyContent: "center" }}>
        {fontLink}
        {globalStyle}
        <div style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 22, color: T.wine }}>GirlSays</div>
      </div>
    );
  }
  if (!lang) {
    return (
      <div className="app-shell" style={shell}>
        {fontLink}
        {globalStyle}
        <LanguageScreen onSelect={chooseLang} />
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="app-shell" style={shell}>
        {fontLink}
        {globalStyle}
        {showIntro ? <Intro lang={lang} onNext={() => setShowIntro(false)} onSkip={skipToGuest} /> : <Onboarding lang={lang} onDone={finishOnboarding} />}
      </div>
    );
  }

  const s = STR[lang];
  const tabs = [
    { id: "photo", label: s.tabs.photo, icon: Icon.photo },
    { id: "product", label: s.tabs.product, icon: Icon.product },
    { id: "wellness", label: s.tabs.wellness, icon: Icon.wellness },
    { id: "calendar", label: s.tabs.calendar, icon: Icon.calendar },
  ];
  const initials = profile.name?.trim()?.[0]?.toUpperCase() || "?";

  if (completingProfile) {
    return (
      <div className="app-shell" style={shell}>
        {fontLink}
        {globalStyle}
        <Onboarding lang={lang} onDone={completeProfile} />
      </div>
    );
  }

  return (
    <div className="app-shell" style={shell}>
      {fontLink}
      {globalStyle}
      <div className="bg-dots" />
      <div className="bg-blob-3" />

      <div style={{ padding: "18px 18px 8px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <div style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 19, color: T.wine }}>{s.brand}</div>
          <span style={{ fontSize: 13, color: T.rose }}>✦</span>
        </div>
        {!profile.guest && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkSoft }}>
              {s.hello}, {profile.name}
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.wineGrad, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: displayFont, fontWeight: 700, fontSize: 13, boxShadow: "0 4px 10px rgba(255,62,127,0.35)" }}>{initials}</div>
          </div>
        )}
      </div>

      {profile.guest && (
        <div style={{ margin: "0 18px 4px", position: "relative", zIndex: 1, background: T.wineGrad, borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, boxShadow: "0 6px 16px rgba(255,62,127,0.3)" }}>
          <div>
            <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 12.5, color: "#fff" }}>{s.nudge.title}</div>
            <div style={{ fontFamily: bodyFont, fontSize: 11, color: "rgba(255,255,255,0.85)" }}>{s.nudge.body}</div>
          </div>
          <button className="press" onClick={() => setCompletingProfile(true)} style={{ background: "#fff", color: T.wine, border: "none", borderRadius: 12, padding: "8px 12px", fontFamily: bodyFont, fontWeight: 700, fontSize: 11.5, cursor: "pointer", whiteSpace: "nowrap" }}>
            {s.nudge.cta}
          </button>
        </div>
      )}

      <div key={tab} className="tabpane" style={{ flex: 1, overflowY: "auto" }}>
        {tab === "photo" && <PhotoCompare profile={profile} lang={lang} />}
        {tab === "product" && <ProductCheck profile={profile} lang={lang} />}
        {tab === "wellness" && <Wellness profile={profile} lang={lang} onUpdate={updateProfile} />}
        {tab === "calendar" && <CalendarPlanner lang={lang} />}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "calc(12px + env(safe-area-inset-bottom))",
          left: 14,
          right: 14,
          display: "flex",
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(216,27,96,0.22)",
          padding: "8px",
          zIndex: 1,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            className="press"
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              background: tab === t.id ? T.wineGrad : "none",
              border: "none",
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              cursor: "pointer",
              color: tab === t.id ? "#fff" : T.inkSoft,
              fontFamily: bodyFont,
              fontSize: 10.5,
              fontWeight: tab === t.id ? 700 : 500,
              padding: "8px 4px",
              boxShadow: tab === t.id ? "0 6px 14px rgba(255,62,127,0.4)" : "none",
              transition: "all 0.2s",
            }}
          >
            {t.icon(tab === t.id ? "#fff" : T.inkSoft)}
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
