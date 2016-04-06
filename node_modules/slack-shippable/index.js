var cp = require('child_process'),
    Slack = require('node-slack');

if(!process.env.SLACK_HOOK_URL) {
    throw new Error('Missing slack hook url!');
}

var slack = new Slack(process.env.SLACK_HOOK_URL);

function getCommitDetails(hash) {
    var command = 'git log ' + hash + ' --format="%cN|||%cD|||%s|||%b"',
        output = cp.execSync(command).toString().split('|||');

    return {
        author: output[0],
        date: output[1],
        title: output[2],
        message: output[3]
    }
}

var status = process.argv[2] || false,
    statusText = status ? 'succeeded' : 'failed',
    channel = process.env.SLACK_CHANNEL || '#general',
    color = status ? 'good' : 'danger',
    buildUrl = process.env.BUILD_URL || 'http://BUILD_URL',
    buildNumber = process.env.BUILD_NUMBER || 0,
    compareUrl = process.env.COMPARE_URL || 'http://COMPARE_URL',
    project = process.env.PROJECT || process.env.REPO_NAME || 'PROJECT_NAME',
    branch = process.env.BRANCH || 'BRANCH_NAME',
    hash = process.env.COMMIT || 'f1f716d4d76ee8f0ebcdaa9875c62a3d4d1c0aed',
    text = '<' + buildUrl + '|Build #' + buildNumber + '> ' + statusText + ' for project ' + project + ' on branch <' + compareUrl + '|' + branch + '>',
    commit = getCommitDetails(hash);

var message = {
    'username': 'Shippable',
    'fallback': text,
    'color': color,
    'fields': [
        {
            'title': commit.author,
            'value': commit.date
        },
        {
            'title': commit.title,
            'value': commit.message
        }
    ]
};

slack.send({
    text: text,
    channel: channel,
    username: 'Shippable',
    attachments: [message]
});
