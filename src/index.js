import app from './app.js';

const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send("Server is ready");
});
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})
