const moment = require('moment');
const validate = require('validate.js');

validate.extend(validate.validators.datetime, {
    parse(value, option) {
        let format = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
        if (option.dateOnly) {
            format = ["YYYY-MM-DD", "YYYY-M-D", "x"];
        }
        return + moment.utc(value, format, true);
    },
    format(value,option){
        let format = "YYYY-MM-DD";
        if(option.dateOnly){
            format+=" HH:mm:ss";
        }
        return moment.utc(value).format(format);
    }
});