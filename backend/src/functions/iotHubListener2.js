const { app } = require('@azure/functions');

app.eventHub('iotHubListener2', {
    connection: '',
    eventHubName: 'samples-workitems',
    cardinality: 'many',
    handler: (messages, context) => {
        if (Array.isArray(messages)) {
            context.log(`Event hub function processed ${messages.length} messages`);
            for (const message of messages) {
                context.log('Event hub message:', message);
            }
        } else {
            context.log('Event hub function processed message:', messages);
        }
    }
});
