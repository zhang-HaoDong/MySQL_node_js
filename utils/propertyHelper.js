exports.pick = function (obj, ...props) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    const newObj = {};
    for (const key in obj) {
        if (props.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}