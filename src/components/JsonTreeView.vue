<template v-once>
    <div :class="{ 'json-node': !first }">
        <div v-if="Array.isArray(node)">
            <div
                v-for="(value, index) in node"
                :key="index"
                class="json-item"
            >
                <span class="json-list-index">
                    {{ index }}:
                </span>

                <span v-if="isSimpleValeuNode(value)">
                    {{ formatSimpleValueNode(value) }}
                </span>
                <JsonTreeView v-else :node="value"/>
            </div>
        </div>

        <div v-else>
            <div
                v-for="(value, key) in node"
                :key="key"
                class="json-item"
            >
                <span class="json-key">
                    {{ key }}:
                </span>

                <span v-if="isSimpleValeuNode(value)">
                    {{ formatSimpleValueNode(value) }}
                </span>
                
                <template v-else-if="Array.isArray(value)">
                    <span class="json-brace">[</span>

                    <JsonTreeView :node="value"/>

                    <span class="json-brace">]</span>
                </template>
                <JsonTreeView v-else :node="value"/>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    node: {
        required: true
    },
    first: {
        default: false
    }
});

function isSimpleValeuNode(value)
{
    return typeof value !== 'object' || value === null
}

function formatSimpleValueNode(value)
{
    return typeof value === 'string'
        ? `"${value}"`
        : String(value)
}
</script>

<style>
.json-node {
    padding-left: 1rem;
    border-left: 1px solid #BFBFBF;
}

.json-key {
    color: #4E9590;
}

.json-brace {
    color: #F2CAB8;
    font-weight: 700;
}

.json-list-index {
    color: #BFBFBF;
}
</style>