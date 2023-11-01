<template>
    <div
        v-if="!jsonLoaded"
        class="home"
    >
        <h1>JSON Tree Viewer</h1>
        <p>Simple JSON Viewer that runs completely on-client. No data exchange</p>

        <button @click="triggerFileInput">Load JSON</button>
        <input
            type="file"
            id="fileInput"
            @change="loadJSON"
            accept=".json"
            style="display: none;"
        />
    </div>
    <JsonTreeView
        v-else
        :nodes="jsonNodes"
        :file-name="jsonFileName"
    />
</template>

<script setup>
import { ref } from 'vue';
import JsonTreeView from './components/JsonTreeView.vue';
import { convertJsonToNodes } from './utils/json'

let jsonNodes = []
let jsonFileName = ''
let jsonLoaded = ref(false)

function triggerFileInput()
{
const fileInput = document.getElementById('fileInput');
fileInput.click();
}

function loadJSON(event)
{
const start = Date.now()
const file = event.target.files[0];
if (!file) return;

jsonLoaded.value = false

const reader = new FileReader()
reader.onload = function (event)
{
    jsonNodes = convertJsonToNodes(JSON.parse(event.target.result))
    jsonFileName = file.name
    jsonLoaded.value = true

    const end = Date.now()
    console.log(end - start, 'ms')
}

reader.readAsText(file)
}
</script>

<style>
.home {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
}
.home button {
    margin-top: .5rem;
    background: linear-gradient(180deg, #E4E4E4 0%, #F7F7F7 100%);
    border: 1px solid black;
    padding: 0.25rem .75rem;
    border-radius: .315rem;
}
</style>