module.exports = {
    showDate: function() {
        var d = new Date();
        var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        var month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
        var year = d.getFullYear();
        var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        var msg = 'Time: ' + Date.now() + '\n';
        msg += 'Date: ' + day+'/'+month+'/'+year + '\n';
        msg += 'Hour: ' + hours+':'+minutes+':'+seconds + '\n';
        return msg;
    }
};