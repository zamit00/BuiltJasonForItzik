let datanetunimKlaliX=[];




  async function bringNetunimP() {  
    fetchAllNetunimP();
    //maslulim();
  }
  async function fetchAllNetunimP(){
    await fetchkupotKlaliP();
    await fetchtsuaaHodshiP();
    await fetchNechasimP();
 }




async function fetchkupotKlaliP() {
  try {
    // 1. בקשה מקבילה לשני הקבצים
    const [res1, res2] = await Promise.all([
      fetch('PensiaKlali.xml').then(r => r.text()),
      fetch('PensiaKlaliM.xml').then(r => r.text())
    ]);

    // 2. פרסור XML
    const parser = new DOMParser();
    const xmlDoc1 = parser.parseFromString(res1, "application/xml");
    const xmlDoc2 = parser.parseFromString(res2, "application/xml");

    // 3. איחוד XML למסמך אחד
    const mergedDoc = document.implementation.createDocument("", "MergedRoot", null);

    Array.from(xmlDoc1.documentElement.childNodes).forEach(node => {
      mergedDoc.documentElement.appendChild(mergedDoc.importNode(node, true));
    });

    Array.from(xmlDoc2.documentElement.childNodes).forEach(node => {
      mergedDoc.documentElement.appendChild(mergedDoc.importNode(node, true));
    });

    // 4. שליפת כל ה-ROWS
    const rows = mergedDoc.getElementsByTagName("ROW");

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const shemKovetz="dataJasonP.json";
      const apiName="pensia";
      const mozar = row.getElementsByTagName("SUG_KRN")[0]?.textContent || '';
      const shemkupa = row.getElementsByTagName("SHM_KRN")[0]?.textContent || '';
      const mas = getMaslulType(shemkupa, "", mozar) || '';

      const yitratnehasim = row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent || '';
      const divuach = row.getElementsByTagName("MATZAV_DIVUACH")[0]?.textContent || '';
      const mhkupa = row.getElementsByTagName("ID")[0]?.textContent || '';

      const tesuam = Number(row.getElementsByTagName("TSUA_MITZTABERET_LETKUFA")[0]?.textContent || 0);
      const tesuam36 = Number(row.getElementsByTagName("TSUA_MITZTABERET_36_HODASHIM")[0]?.textContent || 0);
      const tesuam60 = Number(row.getElementsByTagName("TSUA_MITZTABERET_60_HODASHIM")[0]?.textContent || 0);

      const tarsiyum = row.getElementsByTagName("TAARICH_SIUM_PEILUT")[0]?.textContent || '';
      const menahelet = row.getElementsByTagName("SHM_HEVRA_MENAHELET")[0]?.textContent || '';

      const stiya36 = row.getElementsByTagName("STIAT_TEKEN_36_HODASHIM")[0]?.textContent || '';
      const stiya60 = row.getElementsByTagName("STIAT_TEKEN_60_HODASHIM")[0]?.textContent || '';

      const aktoari = row.getElementsByTagName("ODEF_GIRAON_ACTUARI_LETKUFA")[0]?.textContent || '';

      const hafkadot = row.getElementsByTagName("HAFKADOT_LLO_HAAVAROT")[0]?.textContent || 0;
      const meshichot = row.getElementsByTagName("MSHICHOT_LLO_HAAVAROT")[0]?.textContent || 0;
      const niyudNeto = row.getElementsByTagName("HAAVAROT_BEIN_HAKRANOT")[0]?.textContent || 0;
      const zviraNeto = row.getElementsByTagName("TZVIRA_NETO")[0]?.textContent || 0;

      const yitratNechasimFull = row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent || 0;

      const sharp = row.getElementsByTagName("SHARP_RIBIT_HASRAT_SIKUN")[0]?.textContent || 0;

      // תנאי הסינון
      if (
        divuach === "דווח" &&
        !tarsiyum &&
        Number(yitratnehasim) > 0
      ) {
        datanetunimKlaliX.push({
          shemKovetz: shemKovetz,
          apiName: apiName,
          mh: mhkupa,
          shemkupa,
          mas,
          masOfi: await maslulOfi(mas),
          mozar,
          tesuam,
          yitra: yitratnehasim,
          tesuam36,
          tesuam60,
          menahelet,
          stiya36,
          stiya60,
          aktoari,
          hafkadot,
          meshichot,
          niyudNeto,
          zviraNeto,
          yitratNechasim: yitratNechasimFull,
          sharp
        });
      }
      
    }

    return datanetunimKlaliX;

  } catch (error) {
    console.error("Error in fetchkupotKlaliP:", error);
    return [];
  }
}




async function fetchtsuaaHodshiP() {
    try {
        const [res1, res2] = await Promise.all([
        fetch('PensiaHodshi.xml').then(r => r.text()),
        fetch('PensiaHodshiM.xml').then(r => r.text())
        ]);

        const parser = new DOMParser();
        const xmlDoc1 = parser.parseFromString(res1, "application/xml");
        const xmlDoc2 = parser.parseFromString(res2, "application/xml");

        const mergedDoc = document.implementation.createDocument("", "MergedRoot", null);

        Array.from(xmlDoc1.documentElement.childNodes).forEach(node => {
        mergedDoc.documentElement.appendChild(mergedDoc.importNode(node, true));
        });

        Array.from(xmlDoc2.documentElement.childNodes).forEach(node => {
        mergedDoc.documentElement.appendChild(mergedDoc.importNode(node, true));
        });
        const rows = mergedDoc.getElementsByTagName("ROW");
        const idKupaMap = {};
    
            // 1. עבור כל איבר ב-datanetunimKlali
            datanetunimKlaliX.forEach(item => {
                const idKupa = item.mh;  
                
                // 2. סינון השורות לפי ה-ID_KUPA הנוכחי
                const rowsForIdKupa = Array.from(rows).filter(row => {
                    return row.getElementsByTagName("ID_MASLUL_RISHUY")[0].textContent === idKupa;
                });
                var lastRow = rowsForIdKupa[rowsForIdKupa.length - 1];
                var tsuaNominaliBfoal = lastRow.getElementsByTagName("TSUA_NOMINALI_BFOAL")[0].textContent;
                var target = datanetunimKlaliX.find(itema => itema.mh === idKupa);

                let cumulativeReturn = 1;
                let startOfYear = false;let t=1
    
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
    }
    catch (error) {
    console.error("Error:", error);
  }
return;
}

    
    
    

  async function fetchNechasimP() {



  
    try {
        const [res1, res2] = await Promise.all([
            fetch('PensiaNechasim.xml').then(r => r.text()),
            fetch('PensiaNechasimM.xml').then(r => r.text())   
        ])
        const parser = new DOMParser();
        const xmlDoc1 = parser.parseFromString(res1, "application/xml");
        const xmlDoc2 = parser.parseFromString(res2, "application/xml");

        const mergedDoc = document.implementation.createDocument("", "MergedRoot", null);

        Array.from(xmlDoc1.documentElement.childNodes).forEach(node => {
        mergedDoc.documentElement.appendChild(mergedDoc.importNode(node, true));
        });

        Array.from(xmlDoc2.documentElement.childNodes).forEach(node => {
        mergedDoc.documentElement.appendChild(mergedDoc.importNode(node, true));
        });
        const rows = mergedDoc.getElementsByTagName("ROW");
        datanetunimKlaliX.forEach(item => {
            const idKupa = item.mh;

            for (const row of rows) {
                const mhkupa1 = row.querySelector("ID_MASLUL_RISHUY")?.textContent || '';
                const sugneches = row.querySelector("ID_SUG_NECHES")?.textContent || '';
                const schumsugneches = row.querySelector("SCHUM_SUG_NECHES")?.textContent || '';
                const ahuzsugneches = row.querySelector("ACHUZ_SUG_NECHES")?.textContent || '';
                const shemsugneches = row.querySelector("SHM_SUG_NECHES")?.textContent || '';

                if (mhkupa1 && Number(mhkupa1) === Number(idKupa)) {
                    const target = datanetunimKlaliX.find(item => item.mh === idKupa);

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



  
async function makejasonP() {
    

        // המרת הנתונים לפורמט JSON
        const json = JSON.stringify(datanetunimKlaliX, null, 2);

        // יצירת הקובץ
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'dataJasonP.json';
        link.click();

        console.log("הקובץ נוצר בהצלחה!");
        localStorage.setItem("downloadIndex", 3);

        return json;

    
}


    async function fetchdataJason() {
        try {
            const response = await fetch('dataJason.json'); // שליפת הקובץ
            if (!response.ok) {
                throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json(); 
            return data; 
        } catch (error) {
            console.error('שגיאה בשליפת הנתונים:', error);
        }
    }
    
        
            
         
        
      
        
       
        
 



  
