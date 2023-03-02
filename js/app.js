// load ai tools data
const loadAiToolsData = async (isTrue) => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
        const data = await res.json();
        displayAiToolsData(data.data.tools, isTrue);
    }
    catch (err) {
        console.log(err);
    }
};

// display ai tools data
const displayAiToolsData = (tools, isTrue) => {
    // console.log(tools);
    const toolsContainer = document.getElementById("tools-container");
    toolsContainer.innerHTML = "";

    const seeMoreBtn = document.getElementById("see-more-btn");
    if (!isTrue) { // isTrue === false;
        tools = tools.slice(0, 6);
        seeMoreBtn.classList.remove("d-none");
    }
    else {
        seeMoreBtn.classList.add("d-none");
    }

    tools.forEach(tool => {
        // console.log(tool);

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
                            <button onclick="loadAiToolDetails('${id}')" class="btn bg-danger-subtle rounded-circle text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
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
        displayAiToolDetails(data.data);
    }
    catch (err) {
        // console.log(err);
    }
};

// display ai tool details
const displayAiToolDetails = tool => {
    // console.log(tool);

    const { description, pricing, features, integrations, image_link, accuracy, input_output_examples } = tool;
    // console.log(features[1]);

    document.getElementById("tool-container").innerHTML = `
                        <div class="card w-100 rounded-4">
                            <div class="card-body bg-danger bg-opacity-10 border border-danger rounded-4">
                                <h5 class="card-title">${description}</h5>
                               <div class="d-flex flex-column flex-md-row justify-content-between gap-2 w-100 my-5">
                                 <div class="text-center p-2 bg-white rounded-3 text-success fw-semibold">
                                 <span class="">${pricing[0]?.price ? pricing[0]?.price : "Free of Cost/"}</span> <br />
                                 <span class="">${pricing[0]?.plan ? pricing[0]?.plan : "Basic"}</span>
                                 </div>
                                 <div class="text-center p-2 bg-white rounded-3 fw-semibold" style="color: #F28927;">
                                 <span class="">${pricing[1]?.price ? pricing[1]?.price : "Free Of Cost/"}</span> <br />
                                 <span class="">${pricing[1]?.plan ? pricing[1]?.plan : "Pro"}</span>
                                 </div>
                                 <div class="text-center p-2 bg-white rounded-3 text-danger fw-semibold">
                                 <span class="">${pricing[2]?.price ? (pricing[2]?.price).slice(0, 10) : "Free of Cost /"}</span> <br />
                                 <span class="">${pricing[2]?.plan ? pricing[2]?.plan : "Enterprise"}</span>
                                 </div>
                               </div>
                               <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
                                 <div>
                                   <h5>Features</h5>
                                   <ul class="text-secondary">
                                    <li>${features[1]?.feature_name}</li>
                                    <li>${features[2]?.feature_name}</li>
                                    <li>${features[3]?.feature_name}</li>
                                   </ul>
                                 </div>
                                 <div>
                                 <h5>Integrations</h5>
                                   <ul class="text-secondary">
                                    <li>${integrations[0]}</li>
                                    <li>${integrations[1]}</li>
                                    <li>${integrations[2]}</li>
                                   </ul>
                                 </div>
                               </div>
                            </div>
                        </div>

                        <div class="card w-100 rounded-4">
                            <p id="no-accuracy">${accuracy?.score ? accuracy?.score : document.getElementById("no-accuracy").innerHTML = ""}% accuracy</p>
                            <img src="${image_link[0] ? image_link[0] : "No Image Found"}" class="card-img-top rounded-5 p-3" alt="...">
                            <div class="card-body text-center">
                                <h5 class="card-title">${input_output_examples[0]?.input ? input_output_examples[0]?.input : "No Data Found"}</h4>
                                <p class="card-text text-secondary">${input_output_examples[0]?.output ? input_output_examples[0]?.output : "No! Not Yet! Take a break!!!"}</p>
                            </div>
                        </div>`;
};
