/* 
Wait form DOM content
*/
    document.addEventListener('DOMContentLoaded', () => {
    
    // Get Socket.io active
    const socket = io();

    // Get message from the server 
    const getServerMessage = topic => {
        socket.on(topic, value => {
            document.querySelector('#response ul').innerHTML += `
                <li>
                    ${new Date().toLocaleTimeString('fr-FR')}: ${JSON.stringify(value)}
                </li>
            `
        });
    }

    getServerMessage('new-message');
    getServerMessage('new-client');
});
