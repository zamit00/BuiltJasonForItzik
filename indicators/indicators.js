const fs = require('fs');
const path = require('path');
const { XMLParser } = require("fast-xml-parser");

;var dataIndicators = [];var dataIndicatorsSikon = [];
const pensia=[
    "מניות",
    "עד 50",
    "50-60", 
    "60 ומעלה",
    "עוקב מדד s&p 500",
    "כללי",
    "אשראי ואג\"ח",
    "כספי (שקלי)",
    "משולב סחיר",
    "עוקב מדדים - גמיש",
    "אג\"ח ממשלות",
    "הלכה יהודית",
    "מניות סחיר",
    "עוקב מדדי אג\"ח",
    "עוקב מדדי מניות",
    "אג\"ח סחיר",
    "עוקב מדדי אג\"ח עם מניות",
    "אג\"ח סחיר עם מניות"
    ];
  
  
  const hishtalmot=[
    "כללי",
    "עוקב מדד s&p 500",
    "מניות",
    "אשראי ואג\"ח",
    "אשראי ואג\"ח עם מניות",
    "כספי (שקלי)",
    "עוקב מדדים - גמיש",
    "אג\"ח ממשלות",
    "הלכה יהודית",
    "משולב סחיר",
    "עוקב מדדי אג\"ח",
    "עוקב מדדי מניות",
    "אג\"ח סחיר",
    "מניות סחיר","עוקב מדדי אג\"ח עם מניות","אג\"ח סחיר עם מניות",
    "אג\"ח ממשלתי סחיר"];
  
  const gemel=[
    "כללי",
    "מניות",
    "עוקב מדד s&p 500",
    "עד 50", 
    "50-60",
    "60 ומעלה",
    "אשראי ואג\"ח",
    "כספי (שקלי)",
    "משולב סחיר",
    "עוקב מדדים - גמיש",
    "אג\"ח ממשלות",
    "הלכה יהודית",
    "מניות סחיר",
    "עוקב מדדי אג\"ח",
    "עוקב מדדי מניות",
    "אג\"ח סחיר",
    "עוקב מדדי אג\"ח עם מניות",
    "אג\"ח סחיר עם מניות",
    "אג\"ח ממשלתי סחיר"
    ];
    
  const layeled=['סיכון מועט','סיכון בינוני','סיכון מוגבר','הלכה יהודית']
const mozAll = [
  'קרנות השתלמות', 'תגמולים ואישית לפיצויים', 'קופת גמל להשקעה',
  "קופת גמל להשקעה - חסכון לילד", "פוליסות חסכון","קרנות חדשות","קרנות כלליות","מרכזית לפיצויים"
];

const fieldsToAverage = [
  "tesuam", "tesuam36", "tesuam60",
    "stiya36", "stiya60", "yitratNechasim",
    "sharp", "tusaAharona", "tesuaMitchilatshana",
    "kvutzaAhuz4751", "kvutzaAhuz4761","dmeyNihul","dmeyNihulHafkad"     
];

async function indications(){ 
  
    for(let r=0;r<=6;r++){
      const sugmuzar=mozAll[r]
      
    var typamas;
    if(r===0 || r===2 || r===4){typamas=hishtalmot}
    else if(r===1){typamas=gemel}
    else if(r===3){typamas=layeled}
    else if(r===5){typamas=pensia}  
    
    let type;
    if(r<4){type='gemel'}
    else if(r===4){type='bituach'}  
    else if(r===5 || r===6){type='pensia'}  
    
    for (let i = 0; i < typamas.length; i++) {
        const mas=typamas[i];const mozar=sugmuzar;
       
       const response = await fetch("http://localhost:3000/api/getData", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ "type":type, "mas":mas, "mozar":mozar  })   // gemel / pensia / bituach
    });

    const dataY = await response.json(); 
       if (dataY.length === 0) continue;
    
      const result = {
        mozar: sugmuzar,
        maslul: typamas[i]
      };
      
      for (const field of fieldsToAverage) {
        const validItems = dataY.filter(obj =>
          obj[field] !== undefined &&
          obj[field] !== null &&
          obj[field] !== '' &&
          !isNaN(obj[field]) &&
          parseFloat(obj[field]) !== 0  // לא לספור אפסים - מי שאין לו נתון לא משתתף בממוצע
        );
        const total = validItems.reduce((sum, obj) => sum + parseFloat(obj[field]), 0);
        const avg = validItems.length > 0 ? total / validItems.length : 0;
        result[field] = avg.toFixed(2); 
      }
        
      // חישוב דמי ניהול משוקלל
      if(result['dmeyNihulHafkad'] && result['dmeyNihul']){
          result['dmeyNihulMeshuklal'] = (Number(result['dmeyNihulHafkad'])/10 + Number(result['dmeyNihul'])).toFixed(2);
      }
      
      // חישוב יחסי תשואה לסטייה
      if (result["tesuam36"] && result["stiya36"]) {
      result["tesuaLestiya36"] = parseFloat(result["tesuam36"] / result["stiya36"]).toFixed(2);
    }
    
    if (result["tesuam60"] && result["stiya60"]) {
      result["tesuaLestiya60"] = parseFloat(result["tesuam60"] / result["stiya60"]).toFixed(2);
      }
      
      // בדיקה שלא קיים כבר שילוב של mozar+maslul זהה
      const isDuplicate = dataIndicators.some(item => 
          item.mozar === result.mozar && item.maslul === result.maslul
      );
      
      if (!isDuplicate) {
          dataIndicators.push(result);
      }
  
      
      
      
    } 
    
    // חישוב ממוצע סטיות ברמת מוצר (ממוצע הממוצעים)
    const resultSikon = {
      mozar: sugmuzar
    };
    
    // סינון כל המסלולים של המוצר הנוכחי מ-dataIndicators
    const productPathways = dataIndicators.filter(item => item.mozar === sugmuzar);
    
    // חישוב ממוצע של הסטיות מכל המסלולים
    
      const validItemsStiya36 = productPathways.filter(item => 
        item["stiya36"] !== undefined &&
        item["stiya36"] !== null &&
        item["stiya36"] !== '' &&
        !isNaN(item["stiya36"]) &&
        parseFloat(item["stiya36"]) !== 0
      );
      
      const total36 = validItemsStiya36.reduce((sum, item) => sum + parseFloat(item["stiya36"]), 0);
      const avg36 = validItemsStiya36.length > 0 ? total36 / validItemsStiya36.length : 0;
      let stiya36Avg = avg36.toFixed(2);
      let stiya36Min = Math.min(...validItemsStiya36.map(item=>Number(item['stiya36']))).toFixed(2);
      let stiya36Max = Math.max(...validItemsStiya36.map(item=>Number(item['stiya36']))).toFixed(2);
       
      const validItemsStiya60 = productPathways.filter(item => 
        item["stiya60"] !== undefined &&
        item["stiya60"] !== null &&
        item["stiya60"] !== '' &&
        !isNaN(item["stiya60"]) &&
        parseFloat(item["stiya60"]) !== 0
      );
      
      const total60 = validItemsStiya60.reduce((sum, item) => sum + parseFloat(item["stiya60"]), 0);
      const avg60 = validItemsStiya60.length > 0 ? total60 / validItemsStiya60.length : 0;
      let stiya60Avg = avg60.toFixed(2);
      let stiya60Min = Math.min(...validItemsStiya60.map(item=>Number(item['stiya60']))).toFixed(2);
      let stiya60Max = Math.max(...validItemsStiya36.map(item=>Number(item['stiya60']))).toFixed(2);
    
      const lowCombined=Number(stiya36Min*0.6)+Number(stiya60Min)*0.4;
      const highCombined=Number(stiya36Max*0.6)+Number(stiya60Max)*0.4;
      const avgCombined=Number(stiya36Avg*0.6)+Number(stiya60Avg)*0.4;
      resultSikon["stiyaCombinedMin"]=(Number(lowCombined)+Number((avgCombined-lowCombined)*0.66)).toFixed(2);
      resultSikon["stiyaCombinedMax"]=(Number(highCombined)-Number((highCombined-avgCombined)*0.66)).toFixed(2);
      resultSikon["lowCombined"]=lowCombined.toFixed(2);
      resultSikon["highCombined"]=highCombined.toFixed(2);
      resultSikon["avgCombined"]=avgCombined.toFixed(2);
  
      // בדיקה שלא קיים כבר מוצר זהה
      const isSikonDuplicate = dataIndicatorsSikon.some(item => item.mozar === resultSikon.mozar);
      
      if (!isSikonDuplicate) {
          dataIndicatorsSikon.push(resultSikon);
      }
      
      }
      
      // שמירת הקבצים בתיקיית json
      try {
          const indicatorsPath = path.join(__dirname, "json", "dataIndicators.json");
          const sikonPath = path.join(__dirname, "json", "dataIndicatorsSikon.json");
          
          fs.writeFileSync(indicatorsPath, JSON.stringify(dataIndicators, null, 2), 'utf8');
          console.log("✅ dataIndicators.json נשמר בהצלחה");
          
          fs.writeFileSync(sikonPath, JSON.stringify(dataIndicatorsSikon, null, 2), 'utf8');
          console.log("✅ dataIndicatorsSikon.json נשמר בהצלחה");
      } catch (error) {
          console.error("❌ שגיאה בשמירת הקבצים:", error.message);
      }
      
      console.log("📊 סיכום נתונים:");
      console.log("dataIndicators:", dataIndicators.length, "רשומות");
      console.log("dataIndicatorsSikon:", dataIndicatorsSikon.length, "רשומות");
    }
    

indications();







