function newProject() : string {
    return `
        <div class="settingsPopup">
            <h3 class="">Image Size</h3>
            <div class="config-item margLeft15">
                <span class="label">Width</span>
                <input type="number" id="setWidth">
                <span>px</span>
            </div>
            <div class="config-item margLeft15">
                <span class="label">Height</span>
                <input type="number" id="setHeight">
                <span>px</span>
            </div>  
            <div class="popupBtns">
                <button id="createNewProject" class="btns">
                    Ready
                </button> 
                <button id="cancelNew" class="btns">
                    Cancel
                </button>               
            </div>      
        </div>  
    `;
}


interface IopenFileTemplateData {
    id : string;
}

function openFileTemplate(data : IopenFileTemplateData) : string {
    return `
        <div class="settingsPopup">
            <h3>Upload image</h3>
            <div class="config-item margLeft15">
                <input type="file" id="${data.id}">
            </div>
        </div>
    `;
};