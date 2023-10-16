<template>
    <div>
        <h1>JSON Tree Viewer</h1>
        <p>Simple JSON Viewer that runs completely on-client. No data exchange</p>

        <button @click="triggerFileInput">Load JSON</button>
        <input type="file" id="fileInput" @change="loadJSON" accept=".json" style="display: none;" />

        <pre v-if="jsonLoaded">{{ Math.random() }}</pre>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let jsonContent = ''
let jsonLoaded = ref(false)

function triggerFileInput()
{
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function loadJSON(event)
{
    const file = event.target.files[0];
    if (!file) return;

    jsonLoaded.value = false

    const reader = new FileReader()
    reader.onload = function (event)
    {
        jsonContent = JSON.parse(event.target.result)
        jsonLoaded.value = true
    }

    reader.readAsText(file)
}
</script>
