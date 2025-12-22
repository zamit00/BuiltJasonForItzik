let datanetunimKlaliXM=[];
const excludedKupaNames = ['ניהול אישי', 'IRA'];
const excludedOchlosiya = ['עובדי סקטור מסויים', 'עובדי מפעל/גוף מסויים'];
const excludedMozar = ['מטרה אחרת'];
const excludedMas = ['מבטיח תשואה'];

const maslulimData = {
  "50-60": {
    desc: `במסלול לבני 50 עד 60 המסלול מותאם גיל בעל רמת סיכון בינונית. דומה בהשקעותיו להשקעות במסלול כללי במוצרים האחרים.
מבוסס על ההנחה שהסיכון צריך להיות בינוני כיוון שקיים זמן מספק עד למועד הפרישה אבל הטווח הוא נמוך יותר ביחס למסלול עד 50.`,
    sikon: "בינונית"
  },

  "סיכון בינוני": {
    desc: `במסלול בסיכון בינוני שילוב של השקעות באג"ח (ממשלתיות וקונצרניות) ובמניות באחוזים נמוכים יחסית.
מתאים למי שמוכן לקבל תנודתיות מסוימת כדי לשפר את פוטנציאל התשואה.
יתרון: איזון בין יציבות ותשואה. חיסרון: סיכון מסוים להפסדים בתקופות של ירידות בשוק.`,
    sikon: "בינונית"
  },

  "אשראי ואג\"ח": {
    desc: `במסלול אשראי ואג"ח ההשקעה בעיקר באגרות חוב ממשלתיות וקונצרניות.
מתאים למי שמחפש תשואה סולידית יחסית ובטוחה לטווח הבינוני והקצר.
תלוי באיכות אגרות החוב (ממשלתיות לעומת קונצרניות).`,
    sikon: "נמוכה עד בינונית"
  },

  "כספי (שקלי)": {
    desc: `במסלול כספי (שקלי) ההשקעה בעיקר בנכסים שיקליים שאינם צמודים למדד (כגון פיקדונות שיקליים).
מתאים למשקיעים שמחפשים הגנה מפני אינפלציה ותשואה מינימלית.
מתאים למשקיעים סולידיים.`,
    sikon: "נמוכה מאוד"
  },

  "הלכה יהודית": {
    desc: `במסלול הלכה יהודית ההשקעה בהתאם לכללי ההלכה היהודית.
אינו כולל השקעה באגרות חוב ריביתיות או בחברות שאינן עומדות בכללים דתיים.`,
    sikon: "בינונית - תלוי בהרכב"
  },
   "הלכה איסלאמית": {
    desc: `במסלול הלכה איסלאמית ההשקעה בהתאם לכללי השריעה .
אינו כולל השקעה באגרות חוב ריביתיות או בחברות שאינן עומדות בכללים דתיים.`,
    sikon: "בינונית - תלוי בהרכב"
  },

  "כללי": {
    desc: `מסלול כללי מתאפיין במגוון אפיקי השקעה, כולל מניות, אגרות חוב, מזומן ונדל"ן.
המסלול מהווה את המסלול הנפוץ ביותר בישראל.
מתאים למשקיעים המעוניינים בגיוון השקעות ובסיכון בינוני.
חשוף לשוק המניות, אך ברמה נמוכה יותר ממסלול מניות.`,
    sikon: "בינונית"
  },

  "עוקב מדד s&p 500": {
    desc: `עוקב מדד SP 500 משקיע במדד מניות הנכללות במדד SP 500 האמריקאי.
זהו מסלול המושקע 100% במניות ורמת הסיכון בו גבוהה מאוד.
מתאים למשקיעים המעוניינים בפוטנציאל תשואה גבוה לטווח הארוך.
שואף למקסם רווחים בעיקר במצבי שוק חיוביים.`,
    sikon: "גבוהה"
  },

  "מניות": {
    desc: `במסלול מניות לפחות 75% מנכסי המסלול מושקעים במניות, בדרך כלל בארץ ובחו"ל.
המסלול מתאים למשקיעים המעוניינים בפוטנציאל תשואה גבוה לטווח הארוך.
שואף למקסם רווחים בעיקר במצבי שוק חיוביים.
המסלול חשוף לתנודתיות משמעותית בשוקי ההון.`,
    sikon: "גבוהה"
  },

  "עוקב מדדי מניות": {
    desc: `עוקב מדדי מניות משקיע בנכסים העוקבים אחרי מדדי מניות.
המסלול מנייתי לחלוטין.
מתאים למשקיעים המעוניינים בפוטנציאל תשואה גבוה לטווח הארוך.
שואף למקסם רווחים בעיקר במצבי שוק חיוביים.
המסלול חשוף לתנודתיות משמעותית בשוקי ההון.`,
    sikon: "גבוהה"
  },

  "אשראי ואג\"ח עם מניות": {
    desc: `מסלול המשלב השקעה באגרות חוב ממשלתיות וקונצרניות יחד עם רכיב מנייתי מוגבל.
מתאים למשקיעים המעוניינים בתשואה גבוהה מעט יותר ממסלול אג"ח רגיל,
תוך שמירה על רמת סיכון מבוקרת.`,
    sikon: "נמוכה עד בינונית"
  },

  "עוקב מדדים - גמיש": {
    desc: `עוקב מדדים – גמיש מאופיין בהשקעה מגוונת בנכסים העוקבים אחרי מדדי מניות ואג"ח.`,
    sikon: "בינונית עד גבוהה"
  },

  "אג\"ח סחיר": {
    desc: `אג"ח סחיר משקיע באגרות חוב סחירות בלבד.`,
    sikon: "נמוכה עד בינונית"
  },

  "60 ומעלה": {
    desc: `במסלול לבני 60 ומעלה המסלול מותאם גיל בעל רמת סיכון נמוכה יותר ביחס למסלולי הגיל האחרים.
מבוסס על ההנחה שהעמיתים קרובים לגיל הפרישה ולכן נדרש למזער את הסיכון ביחס לכספים המיועדים לגמלאות.`,
    sikon: "נמוכה"
  },

  "משולב סחיר": {
    desc: `משולב סחיר מאופיין בתמהיל של מניות ואג"ח סחירות בישראל ובשווקים בחו"ל.`,
    sikon: "בינונית"
  },

  "עד 50": {
    desc: `במסלול לבני 50 ומטה המסלול מותאם גיל בעל רמת סיכון גבוהה יותר ביחס למסלולי הגיל האחרים.
מבוסס על ההנחה שהסיכון יכול להיות גבוה יותר ככל שיש יותר זמן עד לפרישה.`,
    sikon: "גבוהה"
  },

  "מניות סחיר": {
    desc: `מניות סחיר משקיע במניות סחירות בלבד.
המסלול מתאים למשקיעים המעוניינים בפוטנציאל תשואה גבוה לטווח הארוך.
שואף למקסם רווחים בעיקר במצבי שוק חיוביים.
המסלול חשוף לתנודתיות משמעותית בשוקי ההון.`,
    sikon: "גבוהה"
  },

  "אג\"ח ממשלות": {
    desc: `אג"ח ממשלות מתמקד בהשקעה באגרות חוב של ממשלות,
בעיקר אגרות חוב שהונפקו על ידי מדינת ישראל.`,
    sikon: "נמוכה"
  },
  "עוקב מדדי אג\"ח": {
    desc: `עוקב מדדי אג"ח מאופיין בהשקעה בנכסים העוקבים אחרי מדדי אג"ח ממשלתיים וקונצרניים בארץ ובחו"ל.`,
    sikon: "נמוכה עד בינונית"
  }
};



 
  async function fetchAllNetunim(){
    await fetchkupotKlali();
    await fetchtsuaaHodshi();
    await fetchNechasim();
 }




async function fetchkupotKlali() {
  try {
    const response = await fetch('gemelKlali.xml');
    const xmlString = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const rows = xmlDoc.getElementsByTagName("Row");

    for (let i = 0; i < rows.length; i++) {

      const row = rows[i];
      const shemKovetz="dataJasonM.json";
      const apiName="gemel";
      const mozar = row.getElementsByTagName("SUG_KUPA")[0]?.textContent || '';
      let shemkupa = row.getElementsByTagName("SHM_KUPA")[0]?.textContent || '';

      if (shemkupa.includes('500') && shemkupa.includes('עוקב')) {
          const idx = shemkupa.indexOf("עוקב");
          const prefix = shemkupa.slice(0, idx).trim();
          shemkupa = prefix + " עוקב מדד s&p500";
      }

      const yitratnehasim = row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent || 0;
      const divuach = row.getElementsByTagName("MATZAV_DIVUACH")[0]?.textContent || '';
      const ochlosiyayaad = row.getElementsByTagName("UCHLUSIYAT_YAAD")[0]?.textContent || '';
      const mhkupa = row.getElementsByTagName("ID")[0]?.textContent || '';
      const masmishni = row.getElementsByTagName('HITMAHUT_MISHNIT')[0]?.textContent || '';
      
      const mas = getMaslulType(shemkupa, masmishni, mozar) || '';
      // *** כאן היה הבעיה — עכשיו זה חוקי ***
      const masOfi = maslulimData[mas]?.desc || "";
      const ramatsikon = maslulimData[mas]?.sikon || "";
      const tesuam = Number(row.getElementsByTagName("TSUA_MITZTABERET_LETKUFA")[0]?.textContent || 0);
      const tesuam36 = Number(row.getElementsByTagName("TSUA_MITZTABERET_36_HODASHIM")[0]?.textContent || 0);
      const tesuam60 = Number(row.getElementsByTagName("TSUA_MITZTABERET_60_HODASHIM")[0]?.textContent || 0);
      const tarsiyum = row.getElementsByTagName("TAARICH_SIUM_PEILUT")[0]?.textContent || '';
      const menahelet = row.getElementsByTagName("SHM_HEVRA_MENAHELET")[0]?.textContent || '';
      const stiya36 = row.getElementsByTagName("STIAT_TEKEN_36_HODASHIM")[0]?.textContent || '';
      const stiya60 = row.getElementsByTagName("STIAT_TEKEN_60_HODASHIM")[0]?.textContent || '';
      const hafkadot = row.getElementsByTagName("HAFKADOT_LLO_HAAVAROT")[0]?.textContent || 0;
      const meshichot = row.getElementsByTagName("MSHICHOT_LLO_HAAVAROT")[0]?.textContent || 0;
      const niyudNeto = row.getElementsByTagName("HAAVAROT_BEIN_HAKUPOT")[0]?.textContent || 0;
      const zviraNeto = row.getElementsByTagName("TZVIRA_NETO")[0]?.textContent || 0;
      const yitratNechasim2 = row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent || 0;
      const dmeyNihul = row.getElementsByTagName("SHIUR_DMEI_NIHUL_AHARON")[0]?.textContent || 0;
      const sharp = row.getElementsByTagName("SHARP_RIBIT_HASRAT_SIKUN")[0]?.textContent || 0;

      if (
        divuach === "דווח" &&
        !excludedKupaNames.some(name => shemkupa.includes(name)) &&
        !excludedMozar.includes(mozar) &&
        !excludedMas.includes(mas) &&
        !tarsiyum &&
        Number(yitratnehasim) > 0
      ) {
          datanetunimKlaliXM.push({
            shemKovetz: shemKovetz,
            apiName: apiName,
            mh: mhkupa,
            shemkupa,
            mozar,
            tesuam,
            mas,
            ramatsikon,
            masOfi,
            masmishni,
            yitra: yitratnehasim,
            tesuam36,
            tesuam60,
            menahelet,
            stiya36,
            stiya60,
            ochlosiyayaad,
            hafkadot,
            meshichot,
            niyudNeto,
            zviraNeto,
            yitratNechasim: yitratNechasim2,
            dmeyNihul,
            sharp
          });
      }
    }
    return datanetunimKlaliXM;

  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}




async function fetchtsuaaHodshi() {
    
    fetch('gemelHodshi.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");
            const rows = xmlDoc.getElementsByTagName("Row");
    
            // אובייקט לאחסון את התשואות המצטברות
            const idKupaMap = {};
    
            // 1. עבור כל איבר ב-datanetunimKlali
            datanetunimKlaliXM.forEach(item => {
                const idKupa = item.mh;  
    
                // 2. סינון השורות לפי ה-ID_KUPA הנוכחי
                const rowsForIdKupa = Array.from(rows).filter(row => {
                    return row.getElementsByTagName("ID_KUPA")[0].textContent === idKupa;
                });
    
                var lastRow = rowsForIdKupa[rowsForIdKupa.length - 1];
                var tsuaNominaliBfoal = lastRow.getElementsByTagName("TSUA_NOMINALI_BFOAL")[0].textContent;


                let cumulativeReturn = 1;
                let startOfYear = false; const target = datanetunimKlaliXM.find(itema => itema.mh === idKupa);let t=1;
    
                rowsForIdKupa.forEach(row => {
                    const tsuaNominaliBfoal = row.getElementsByTagName("TSUA_NOMINALI_BFOAL")[0]?.textContent;
                    const tkfDivuach = row.getElementsByTagName("TKF_DIVUACH")[0]?.textContent;
                    const schumkvutzaKey = `tesua${t}`;
                    target[schumkvutzaKey]=tsuaNominaliBfoal+"="+tkfDivuach;
                    t=t+1;
                    if (tsuaNominaliBfoal && tkfDivuach) {
                        const year = tkfDivuach.substring(0, 4);
                        const month = tkfDivuach.substring(4, 6);
    
                        // אם מדובר בתחילת שנה (ינואר)
                        if (month === "01" && !startOfYear) {
                            startOfYear = true;
                            cumulativeReturn = 1 + (parseFloat(tsuaNominaliBfoal) / 100);
                        } 
                        // אם לא בתחילת שנה, מחשבים את הצבירה
                        else if (startOfYear) {
                            cumulativeReturn *= 1 + (parseFloat(tsuaNominaliBfoal) / 100);
                        }
                    }
                });
    
               
                if (startOfYear) {
                    idKupaMap[idKupa] = cumulativeReturn;
                }
               
                target.tusaAharona = Number(tsuaNominaliBfoal);
                target.tesuaMitchilatshana = ((cumulativeReturn - 1) * 100).toFixed(2);
            });
   

           
            
        })
        .catch(error => console.error('Error parsing XML:', error));
    
  }

  async function fetchNechasim() {
    try {
        const response = await fetch('gemelNechasim.xml');
        if (!response.ok) {
            throw new Error(`שגיאה בטעינת הקובץ: ${response.status}`);
        }
        const nechsimstring = await response.text();
        const parser = new DOMParser();
        const xmlNechasim = parser.parseFromString(nechsimstring, "application/xml");

        const rows = xmlNechasim.getElementsByTagName("Row");
        datanetunimKlaliXM.forEach(item => {
            const idKupa = item.mh;

            for (const row of rows) {
                const mhkupa1 = row.querySelector("ID_KUPA")?.textContent || '';
                const sugneches = row.querySelector("ID_SUG_NECHES")?.textContent || '';
                const schumsugneches = row.querySelector("SCHUM_SUG_NECHES")?.textContent || '';
                const ahuzsugneches = row.querySelector("ACHUZ_SUG_NECHES")?.textContent || '';
                const shemsugneches = row.querySelector("SHM_SUG_NECHES")?.textContent || '';

                if (mhkupa1 && Number(mhkupa1) === Number(idKupa)) {
                    const target = datanetunimKlaliXM.find(item => item.mh === idKupa);

                    if (target) {
                        const schumkvutzaKey = `kvutzaSchum${sugneches}`;
                        const ahuzkvutzaKey = `kvutzaAhuz${sugneches}`;
                        const sugkvutzaKey = `kvutzaSug${sugneches}`;

                        target[schumkvutzaKey] = schumsugneches;
                        target[ahuzkvutzaKey] = ahuzsugneches;
                        target[sugkvutzaKey] = shemsugneches;

                        
                    }
                }
            }
        });

        
    } catch (error) {
        console.error("שגיאה בתהליך הטעינה:", error);
    }
}


async function makejason() {
    

        // המרת הנתונים לפורמט JSON
        const json = JSON.stringify(datanetunimKlaliXM, null, 2);

        // יצירת הקובץ
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'dataJasonM.json';
        link.click();

        console.log("הקובץ נוצר בהצלחה!");
        localStorage.setItem("downloadIndex", 1);
}

          
function getMaslulType(shemkupa,mishni,moz) {
        if (!shemkupa) return 'לא ידוע';           
        const name = String(shemkupa).trim();

        // כללי - בדיקה ראשונה
        if (mishni==='כללי' && !name.includes('ילד')) {
            return 'כללי';
        }
        if (mishni==='קיימות') {
            return 'קיימות';
        }
        
        // S&P 500
        if (name.includes('500')) {
            return 'עוקב מדד s&p 500';
        }
        
        // מניות (ללא מדד/עוקב/סחיר/משולב/25/אג"ח/פאסיבי)
        if (name.includes('מניות') && 
            !name.includes('מדד') && 
            !name.includes('עוקב') && 
            !name.includes('סחיר') && 
            !name.includes('משולב') && 
            !name.includes('25') && 
            !name.includes('אג"ח') && 
            !name.includes('פאסיבי')) {
            return 'מניות';
        }
        
        // אשראי ואג"ח (ללא מניות/עוקב/סחיר)
        if (name.includes('אשראי') && 
            !name.includes('מניות') && 
            !name.includes('עוקב') && 
            !name.includes('סחיר')) {
            return 'אשראי ואג"ח';
        }
        
        // אשראי ואג"ח עם מניות (עם 25)
        if ((name.includes('אשראי') || (name.includes('אג"ח') || name.includes('אגח')) ||name.includes('אגח')) && name.includes('25')
        && !name.includes('סחיר') && !name.includes('עוקב')) {
            return 'אשראי ואג"ח עם מניות';
        }
        
        // כספי שקלי
        if (name.includes('כספי') && (name.includes('שקלי') || name.includes('שיקל'))) {
            return 'כספי (שקלי)';
        }
        
        // עוקב מדדים - גמיש
        if (name.includes('עוקב') && name.includes('גמיש')) {
            return 'עוקב מדדים - גמיש';
        }
        
        // אג"ח ממשלות
        if (name.includes('ממשלות')) {
            return 'אג"ח ממשלות';
        }
        
        // הלכה יהודית
        if (name.includes('הלכה') || name.includes('יהודי') || name.includes('הלכתי')) {
            return 'הלכה יהודית';
        }
        // הלכה איסלאמית
        if (name.includes('הלכה') || name.includes('שריעה') || name.includes('הלכתי')) {
            return 'הלכה איסלאמית';
        }
        // משולב סחיר
        if (name.includes('משולב סחיר')) {
            return 'משולב סחיר';
        }
        
        // עוקב מדדי אג"ח (ללא מניות)
        if ((name.includes('עוקב') || mishni .includes('עוקב')) && (name.includes('אג"ח') || name.includes('אגח')) && !name.includes('מניות')) {
            return 'עוקב מדדי אג"ח';
        }
        
        // עוקב מדדי מניות (ללא אג"ח ו-25)
        if (name.includes('מניות') && 
            !name.includes('אג"ח') && 
            (name.includes('עוקב') || name.includes('מדד')) && 
            !name.includes('25')) {
            return 'עוקב מדדי מניות';
        }
        
        // מניות סחיר (ללא 25)
        if (name.includes('מניות') && name.includes('סחיר') && !name.includes('25')) {
            return 'מניות סחיר';
        }
        
        // אג"ח סחיר (ללא מניות ולא ממשלתי)
        if (name.includes('סחיר') && 
            (name.includes('אג"ח') || name.includes('אגח')) && 
            !name.includes('מניות') && 
            !name.includes('ממשלתי')) {
            return 'אג"ח סחיר';
        }
        
        // אג"ח ממשלתי סחיר
        if (name.includes('סחיר') && name.includes('אג"ח') && name.includes('ממשלתי')) {
            return 'אג"ח ממשלתי סחיר';
        }
        
        // אג"ח סחיר עם מניות
        if (name.includes('סחיר') && (name.includes('אג"ח') || name.includes('אגח')) && name.includes('מניות')) {
            return 'אג"ח סחיר עם מניות';
        }
        
        // עוקב מדדי אג"ח עם מניות
        if (!name.includes('סחיר') && 
        (name.includes('אג"ח') || name.includes('אגח')) && 
            name.includes('מניות') && 
            name.includes('עוקב')) {
            return 'עוקב מדדי אג"ח עם מניות';
        }
        if (name.includes('יעד לפרישה')) {
            let hasNumber = name.match(/\d+(\.\d+)?/g);
            if (hasNumber) {
                const currentYear = new Date().getFullYear();
                
                hasNumber = 67-hasNumber+currentYear;
                if (hasNumber <= 50) {
                    return 'עד 50';
                } else if (hasNumber >= 60) {
                    return '60 ומעלה';
                } else {
                     return '50-60';}
            }
        }
        // 50-60 (כולל ווריאציות: "לבני 50 עד 60", "בני 50-60", "50 עד 60")
        if ((name.includes('50') && name.includes('60')) || 
            name.includes('50-60')) {
            return '50-60';
        }
        
        // עד 50 (ללא עוקב ו-60) (כולל ווריאציות: "עד גיל 50", "עד 50")
        if ((name.includes('50') && !name.includes('עוקב') && !name.includes('60')) ||
            name.includes('עד גיל 50') ||
            name.includes('עד 50')) {
            return 'עד 50';
        }
        
        // 60 ומעלה (ללא 50) (כולל ווריאציות: "מגיל 60", "בני 60")
        if ((!name.includes('50') && name.includes('60')) ||
            name.includes('מגיל 60') ||
            name.includes('בני 60 ומעלה')) {
            return '60 ומעלה';
        }
        
        // סיכון מוגבר
        if (name.includes('מוגבר')) {
            return 'סיכון מוגבר';
        }
        
        // סיכון מועט
        if (name.includes('מועט')) {
            return 'סיכון מועט';
        }
        
        // סיכון בינוני
        if ((name.includes('בינוני') || name.includes('בנוני'))  && name.includes('סיכון')) {
            return 'סיכון בינוני';
        }
        if (moz.includes('פוליס') || moz.includes('קרנות')) {
            return 'כללי';
        }
        return ""
        // אם לא התאים לשום קטגוריה - מחזיר "כללי"
       
    }

  
