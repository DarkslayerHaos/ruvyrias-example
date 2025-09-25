import('./structures/CustomClient').then(client => new client.CustomClient().connect());

process.on('unhandledRejection', error => { console.log(error); });