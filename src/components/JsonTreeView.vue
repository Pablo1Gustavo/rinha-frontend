<template>
    <div v-bind="containerProps" class="virtual-list-container">
        <h1 tabindex="0">{{ fileName }}</h1>

        <ul v-bind="wrapperProps">
            <li
                v-for="{ index, data } in virtualNodeList"
                class="virtual-list-item"
                :tabindex="index + 1"
                :key="index"
            >
                <span v-for="_ in data.depth" class="json-padding" />

                <span
                    v-if="!isArrayEndingAt(index)"
                    :class="isNaN(data.key_name) ? 'json-key' : 'json-list-index'"
                >
                    {{ data.key_name }}:&nbsp
                </span>

                <span v-if="isArrayStartingAt(index)" class="json-brace">
                    [
                </span>
                <span v-else-if="isArrayEndingAt(index)" class="json-brace">
                    ]
                </span>
                <span v-else>
                    {{ data.unit_value }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVirtualList } from '@vueuse/core'

const props = defineProps({
    fileName: { required: true },
    nodes: { required: true }
})

const { list: virtualNodeList, containerProps, wrapperProps } = useVirtualList(
    ref(props.nodes),
    { itemHeight: 30 }
)

function isArrayStartingAt(index) 
{
    return !isNaN(props.nodes[index + 1]?.key_name) && 
        props.nodes[index].depth < props.nodes[index + 1]?.depth
}

function isArrayEndingAt(index)
{
    return props.nodes[index].key_name == ']'
}
</script>

<style>
body {
    overflow-y: hidden;
    margin: 0;
    padding: 0;
}

.virtual-list-container {
    height: 100vh;
    flex-grow: 1;
    position: relative;
    padding-right: 1rem;
    padding-left: 4rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 28%;
    box-sizing: border-box;
}
.virtual-list-container ul {
    list-style-type: none;
    padding: 0;
}

.virtual-list-item {
    display: flex;
    height: 30px;
    white-space: nowrap;
}

.json-padding {
    width: 1rem;
    height: 30px;
    border-left: 1px solid #BFBFBF;
    display: inline-block;
    flex-shrink: 0;
}

.json-key {
    color: #4E9590;
}

.json-list-index {
    color: #BFBFBF;
}

.json-brace {
    color: #F2CAB8;
    font-weight: 700;
    margin-left: 5px;
}
</style>
  