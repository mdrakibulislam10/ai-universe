// load ai tools data
const loadAiToolsData = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
        const data = await res.json();
        displayAiToolsData(data.data.tools);
    }
    catch (err) {
        console.log(err);
    }
};

