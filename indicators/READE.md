__________________________________________________________________________________
app.post('/api/getIndications', (req, res) => {
    let { mozar, mas } = req.body;
    mozar = normalize(mozar);
    mas   = normalize(mas);

    console.log(mozar, mas);

    try {
        const filePath = path.join(__dirname, "json", "dataIndicators.json");
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data = data.filter(item => normalize(item.mozar) === mozar && normalize(item.maslul) === mas);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to load file", details: err.message });
    }
});

____________________________________________________________________________________________
app.get('/api/ofihashkaa.xml', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'ofihashkaa.xml');
        const xml = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בטעינת הקובץ XML' });
    }
});
