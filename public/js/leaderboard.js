const socket = io();

socket.on('scoreUpdated', (data) => {
    console.log('Score updated:', data);

    const query = new URLSearchParams(window.location.search);
    const region = query.get('region');
    const gameMode = query.get('gameMode');
    const limit = query.get('limit');

    const filterActive = region || gameMode || limit;

    if (filterActive) {
        const alertBox = document.getElementById('filter-alert');
        if (alertBox) {
            alertBox.style.display = 'block';


            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 6000);
        }
        return;
    }


    fetch('/v1/leaderboard/view/data')
        .then(res => res.json())
        .then(players => {
            const table = document.getElementById('leaderboard-body');
            table.innerHTML = '';
            players.forEach(player => {
                const row = `
          <tr>
            <td>${player.playerId}</td>
            <td>${player.name}</td>
            <td>${player.region}</td>
            <td>${player.gameMode}</td>
            <td>${player.score}</td>
          </tr>`;
                table.innerHTML += row;
            });
        });
});


document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-alert');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const alertBox = document.getElementById('filter-alert');
            if (alertBox) alertBox.style.display = 'none';
        });
    }
});
