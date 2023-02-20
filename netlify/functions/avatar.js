import { identicon } from 'minidenticons';

const WHITE_LIST = process.env.WHITE_LIST || 'localhost:8888';
const MAX_AGE = process.env.MAX_AGE || '3600';

exports.handler = async function (event, context) {
    let
        whiteList = WHITE_LIST,
        referer = event.headers.referer || '';
    if (whiteList && referer) {
        let
            allowed = false,
            domains = whiteList.split(',');
        if (referer.startsWith('https://')) {
            referer = referer.substring(8);
        } else if (referer.startsWith('http://')) {
            referer = referer.substring(7);
        }
        for (let domain of domains) {
            if (referer.startsWith(domain + '/')) {
                allowed = true;
                break;
            }
        }
        if (!allowed) {
            return {
                statusCode: 403,
                body: 'Forbidden'
            };
        }
    }
    let name = (event.queryStringParameters.name || 'unnamed').trim();
    return {
        statusCode: 200,
        headers: {
            'cache-control': 'public, max-age=' + MAX_AGE,
            'content-type': 'image/svg+xml'
        },
        body: identicon(name)
    };
};