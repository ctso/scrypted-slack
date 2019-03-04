import "core-js/modules/es6.promise";
import axios from 'axios';
import qs from 'qs';
import slack from 'slack';

const token = scriptSettings.getString('token');
const channel = (scriptSettings.getString('channel') || '').split(',').map(s => s.trim()).filter(s => s.length);

function alertAndThrow(msg) {
    log.a(msg);
    throw new Error(msg);
}

if (!token || !token.length) {
    alertAndThrow('No Slack token is configured. Enter a value for "token" in the Script Settings.');
}
log.clearAlerts();

if (!channel || !channel.length) {
    alertAndThrow('No Slack channel is configured. Enter a value for "channel" in the Script Settings.');
}
log.clearAlerts();

function SlackChannel(channel) {
    this.channel = channel;
}

// implementation of Notifier

SlackChannel.prototype.sendNotification = function (title, body, media, mimeType) {
    console.log('sendNotification (media) was called!');
}

function Slack() {
    setImmediate(() => {
        var devices = channel.map(ch => ({
            name: ch,
            id: ch,
            type: 'Notifier',
            interfaces: ['Notifier'],
        }));

        console.log(devices);

        deviceManager.onDevicesChanged({
            devices,
        });
    });
}

export default new Slack();