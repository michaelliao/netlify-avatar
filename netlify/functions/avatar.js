exports.handler = function (event, context) {
    let whiteList = process.env.WHITE_LIST || '';
    if (whiteList) {
        let
            allowed = false,
            domains = whiteList.split(',');
    }
    return {
        statusCode: 200,
        event: JSON.stringify(event),
        body: JSON.stringify({ message: "Hello World" }),
    };
};