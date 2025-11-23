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
    const [res1, res2] = await Promise.all([
      fetch('PensiaKlali.xml').then(r => r.text()),
      fetch('PensiaKlaliM.xml').then(r => r.text())
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
      let colllen;
      let coll = [];
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
         
        const mozar = row.getElementsByTagName("SUG_KRN")[0]?.textContent ||  '';
        const shemkupa = row.getElementsByTagName("SHM_KRN")[0]?.textContent || '';
        const mas = getMaslulType(shemkupa,"",mozar) ||  '';
        const yitratnehasim = row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent || '';
        const divuach = row.getElementsByTagName("MATZAV_DIVUACH")[0]?.textContent ||  '';
        const mhkupa = row.getElementsByTagName("ID")[0]?.textContent ||  '';
        const tesuam = row.getElementsByTagName("TSUA_MITZTABERET_LETKUFA")[0]?.textContent ||  '';
        const tesuam36 = row.getElementsByTagName("TSUA_MITZTABERET_36_HODASHIM")[0]?.textContent ||  '';
        const tesuam60 = row.getElementsByTagName("TSUA_MITZTABERET_60_HODASHIM")[0]?.textContent ||  '';
        const tarsiyum = row.getElementsByTagName("TAARICH_SIUM_PEILUT")[0]?.textContent ||  '';
        const menahelet = row.getElementsByTagName("SHM_HEVRA_MENAHELET")[0]?.textContent ||  '';
        const stiya36 = row.getElementsByTagName("STIAT_TEKEN_36_HODASHIM")[0]?.textContent ||  '';  
        const stiya60 = row.getElementsByTagName("STIAT_TEKEN_60_HODASHIM")[0]?.textContent ||  '';
        const aktoari = row.getElementsByTagName("ODEF_GIRAON_ACTUARI_LETKUFA")[0]?.textContent ||  '';   
        const hafkadot= row.getElementsByTagName("HAFKADOT_LLO_HAAVAROT")[0]?.textContent ||  0;
        const meshichot= row.getElementsByTagName("MSHICHOT_LLO_HAAVAROT")[0]?.textContent ||  0;
        const niyudNeto= row.getElementsByTagName("HAAVAROT_BEIN_HAKRANOT")[0]?.textContent ||  0;
        const zviraNeto= row.getElementsByTagName("TZVIRA_NETO")[0]?.textContent ||  0;
        const yitratNechasim= row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent ||  0;
        const sharp= row.getElementsByTagName("SHARP_RIBIT_HASRAT_SIKUN")[0]?.textContent ||  0;
  
          if (
            divuach === "דווח" &&
            !tarsiyum &&
            Number(yitratnehasim) > 0
        ) {
          datanetunimKlaliX.push({
            mh: mhkupa, 
            shemkupa: shemkupa, 
            mas: mas,
            mozar: mozar, 
            tesuam: Number(tesuam), 
            yitra: yitratnehasim, 
            tesuam36: Number(tesuam36), 
            tesuam60: Number(tesuam60),
            menahelet: menahelet,
            stiya36: stiya36,
            stiya60: stiya60,
            aktoari: aktoari,
            hafkadot:hafkadot,
            meshichot:meshichot,
            niyudNeto:niyudNeto,
            zviraNeto:zviraNeto,
            yitratNechasim:yitratNechasim,
            sharp:sharp
          });

         
        }}
    
  } catch (error) {
    console.error("Error:", error);
  }




return;
    
  fetch('PensiaKlali.xml')
  .then(response => response.text()) // מקבל את תוכן הקובץ כטקסט
  .then(xmlString => {
      const parser = new DOMParser(); 
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");
      const rows = xmlDoc.getElementsByTagName("ROW");
      let colllen;
      let coll = [];
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
         
        const mozar = row.getElementsByTagName("SUG_KRN")[0]?.textContent ||  '';
        const shemkupa = row.getElementsByTagName("SHM_KRN")[0]?.textContent || '';
        const mas = getMaslulType(shemkupa,"",mozar) ||  '';
        const yitratnehasim = row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent || '';
        const divuach = row.getElementsByTagName("MATZAV_DIVUACH")[0]?.textContent ||  '';
        const mhkupa = row.getElementsByTagName("ID")[0]?.textContent ||  '';
        const tesuam = row.getElementsByTagName("TSUA_MITZTABERET_LETKUFA")[0]?.textContent ||  '';
        const tesuam36 = row.getElementsByTagName("TSUA_MITZTABERET_36_HODASHIM")[0]?.textContent ||  '';
        const tesuam60 = row.getElementsByTagName("TSUA_MITZTABERET_60_HODASHIM")[0]?.textContent ||  '';
        const tarsiyum = row.getElementsByTagName("TAARICH_SIUM_PEILUT")[0]?.textContent ||  '';
        const menahelet = row.getElementsByTagName("SHM_HEVRA_MENAHELET")[0]?.textContent ||  '';
        const stiya36 = row.getElementsByTagName("STIAT_TEKEN_36_HODASHIM")[0]?.textContent ||  '';  
        const stiya60 = row.getElementsByTagName("STIAT_TEKEN_60_HODASHIM")[0]?.textContent ||  '';
        const aktoari = row.getElementsByTagName("ODEF_GIRAON_ACTUARI_LETKUFA")[0]?.textContent ||  '';   
        const hafkadot= row.getElementsByTagName("HAFKADOT_LLO_HAAVAROT")[0]?.textContent ||  0;
        const meshichot= row.getElementsByTagName("MSHICHOT_LLO_HAAVAROT")[0]?.textContent ||  0;
        const niyudNeto= row.getElementsByTagName("HAAVAROT_BEIN_HAKRANOT")[0]?.textContent ||  0;
        const zviraNeto= row.getElementsByTagName("TZVIRA_NETO")[0]?.textContent ||  0;
        const yitratNechasim= row.getElementsByTagName("YITRAT_NCHASIM_LSOF_TKUFA")[0]?.textContent ||  0;
        const sharp= row.getElementsByTagName("SHARP_RIBIT_HASRAT_SIKUN")[0]?.textContent ||  0;
  
          if (
            divuach === "דווח" &&
            !tarsiyum &&
            Number(yitratnehasim) > 0
        ) {
          datanetunimKlaliX.push({
            mh: mhkupa, 
            shemkupa: shemkupa, 
            mozar: mozar, 
            tesuam: Number(tesuam), 
            yitra: yitratnehasim, 
            tesuam36: Number(tesuam36), 
            tesuam60: Number(tesuam60),
            menahelet: menahelet,
            stiya36: stiya36,
            stiya60: stiya60,
            aktoari: aktoari,
            hafkadot:hafkadot,
            meshichot:meshichot,
            niyudNeto:niyudNeto,
            zviraNeto:zviraNeto,
            yitratNechasim:yitratNechasim,
            sharp:sharp
          });

         
      }
      
      
      }
      
      
    
  })
  .catch(error => {
      console.error('Error:', error);
      return [];  // מחזירים מערך ריק במקרה של שגיאה
  });
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

                        if (Number(sugneches) === 4751) {
                            const shiurMenayut = Number(ahuzsugneches);
                            target.ramatsikon = calculateRiskLevel(shiurMenayut);
                        }
                    }
                }
            }
        });

        
    } catch (error) {
        console.error("שגיאה בתהליך הטעינה:", error);
    }
}



  function calculateRiskLevel(shiurMenayut) {
    if (shiurMenayut < 30) return 'נמוכה';
    if (shiurMenayut >= 30 && shiurMenayut < 55) return 'בינונית';
    if (shiurMenayut >= 55 && shiurMenayut < 75) return 'בינונית-גבוה';
    return 'גבוהה';
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
    
        
            
         
        
      
        
       
        
 



  
