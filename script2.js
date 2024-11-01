const taskTitle = document.querySelector(".taskTitle");
const taskDesc = document.querySelector(".taskDesc");
const work = document.querySelector(".work");
const items = document.querySelector(".menu-items");
const icon = document.querySelector(".icon");
const menu = document.querySelector(".menu");

function toggleIcon(){
  if(menu.id === "open") {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>`;
  } else {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>`;
  }
}

icon.addEventListener("click", () => {
  toggleIcon();
  if(menu.id === "open") {
    menu.id = "close";
    menu.style.left = "-20%";
  } else {
    menu.id = "open";
    menu.style.left = "0";
  }
});

taskTitle.innerHTML = jsonData.tasks[0].task_title;
taskDesc.innerHTML = jsonData.tasks[0].task_description;

jsonData.tasks[0].assets.forEach((asset) => {
  let item = document.createElement("li");
  item.textContent = asset.asset_title;
  item.setAttribute("data-asset", asset.asset_id);
  items.appendChild(item);
});

jsonData.tasks[0].assets.forEach((asset) => {
  let content = "";

  if (asset.asset_type === "display_asset") {
    content = handleDisplayAsset(asset);
  } else if (asset.asset_type === "input_asset") {
    content = handleInputAsset(asset);
  }

  work.innerHTML += createCard(asset, content);
});

function handleDisplayAsset(asset) {
  let content = "";

  if (asset.asset_content_type === "video") {
    content = `
      <iframe 
        width="560" 
        height="315" 
        src="${asset.asset_content}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>`;
  } else if (asset.asset_content_type === "article") {
    content = `<iframe
      src="https://dtthon.deepthought.education/sharer?id=01aa3cff-db8e-8d9d-afc0-1671715937878"
      width="600"
      height="400"
      frameborder="0"
      allowfullscreen
    ></iframe>`;
  }

  return content;
}

function handleInputAsset(asset) {
  if (asset.asset_content_type === "threadbuilder") {
    return `
      <div class="container">
        <div class="thread">
          <div class="thread-title" onclick="toggleThread('threadA')">
            <span>Thread</span>
            <span class="arrow">&#9660;</span>
          </div>
          <div id="threadA" class="thread-content">
            <div class="input-box">
              <label for="sub-thread-1">Sub thread</label>
              <textarea id="sub-thread-1" rows="3" placeholder="Enter Text here"></textarea>
            </div>
            <div class="input-box">
              <label for="sub-interpretation-1">Sub Interpretation</label>
              <textarea id="sub-interpretation-1" rows="3" placeholder="Enter Text here"></textarea>
            </div>
            <div class="input-box">
              <label for="summary-thread-a">Summary of this Thread</label>
              <textarea id="summary-thread-a" rows="3" placeholder="Enter Text here"></textarea>
            </div>
          </div>
        </div>
      </div>`;
  } else if (asset.asset_content_type === "article") {
    return `
      <div class="article-form">
        <div class="input-group">
          <label for="article-title">Title</label>
          <input type="text" id="article-title" class="title-input" placeholder="Enter the article title" required>
        </div>
        <div class="input-group">
          <label for="article-content">Content</label>
          <textarea id="article-content" class="content-textarea" rows="10" placeholder="Write your article here..." required></textarea>
        </div>
      </div>`;
  }
}

function createCard(asset, content) {
  return `
    <div class="card">
      <div class="cardTitle">${asset.asset_title}</div>
      <div class="cardDesc">
        <span class="h">Description: </span>
        ${asset.asset_description}
      </div>
      <div class="cardContent">${content}</div>
    </div>`;
}
