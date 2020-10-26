import fetch from 'node-fetch'

const DINGROBOT = 'https://oapi.dingtalk.com/robot/send?access_token=c7a118add11486ec4e5f3032d8f221ba99aa4eca51d18fa65b6c924957e72964';

async function ding(title: string = '有情况', text: string = '??', isAtAll: boolean = false) {
    const res = await fetch(DINGROBOT, {
        method: 'POST',
        body: JSON.stringify({
            "msgtype": "markdown",
            "markdown": {
                "title": title,
                "text": text
            },
            "at": {
                "atMobiles": [
                    "13521141218"
                ],
                "isAtAll": isAtAll
            }
        }),
        headers: { 'content-type': 'application/json' }
    })
    return res;
}


export { ding }