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

// display ai tools data
const displayAiToolsData = tools => {
    // console.log(tools);
    const toolsContainer = document.getElementById("tools-container");

    tools.forEach(tool => {
        // console.log(tool);
        // destructuring
        const { image, features, name, published_in, id } = tool;

        const cardParent = document.createElement("div");
        cardParent.classList.add("col");

        cardParent.innerHTML = `
                <div class="card h-100 rounded-4">
                    <img src="${image ? image : "No Image Found"}" class="card-img-top p-3 pb-0 rounded-5 h-50" alt="...">
                    <div class="card-body">
                        <h5 class="card-title my-3">Features</h5>
                        <div class="text-secondary">
                          <p>1. <span>${features[0] ? features[0] : "No Data Found"}</span></p>
                          <p>2. <span>${features[1] ? features[1] : "No Data Found"}</span></p>
                          <p>3. <span>${features[2] ? features[2] : "No Data Found"}</span></p>
                        </div>
                         <hr />
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <h5>${name ? name : "No Name Found"}</h5>
                            <p><i class="fa-solid fa-calendar-days"></i> ${published_in ? published_in : "No Date Found"}</p>
                          </div>
                          <div>
                            <button onclick="loadAiToolDetails('${id}')" class="btn bg-danger-subtle rounded-circle text-danger"><i class="fa-solid fa-arrow-right"></i></button>
                          </div>
                        </div>
                    </div>
                </div>`;

        toolsContainer.appendChild(cardParent);
    });
};

// load ai tool details
const loadAiToolDetails = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
        const data = await res.json();
        console.log(data.data);
    }
    catch (err) {
        // console.log(err);
    }
};

