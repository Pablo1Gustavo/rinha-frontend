export function convertJsonToNodes(object)
{
    const nodes = [];
    const stack = [{ value: object, depth: -1, key: null }];

    let first = true;

    while (stack.length > 0)
    {
        const { value, depth, key } = stack.pop();

        const isObject = typeof value === 'object' && value !== null;

        if (!first || !isObject)
        {
            nodes.push({
                key_name: key,
                depth: depth,
                unit_value: isObject ? undefined : formatUnitValue(value)
            });
        }
        if (isObject)
        {
            const keys = Object.keys(value);
            for (let i = keys.length - 1; i >= 0; i--)
            {
                stack.push({
                    value: value[keys[i]],
                    depth: depth + 1,
                    key: keys[i],
                });
            }
        }

        first = false;
    }

    return nodes;
}

function formatUnitValue(value)
{
    return typeof value === 'string'
        ? '"' + value + '"'
        : value + ""
}