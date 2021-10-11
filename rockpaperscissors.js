// pilihan komputer
function getCompChoice() {
    const comp = Math.random();
    if (comp < (1 / 3)) return 'rock';
    if (comp >= (1 / 3) && comp < (2 / 3)) return 'paper';
    return 'scissor';
}

// aturan
let result = null;

function getResult(comp, player) {
    if (player == comp) return result = 'DRAW';
    if (player == 'rock') return (comp == 'scissor') ? result = 'PLAYER 1 WIN' : result = 'COM WIN';
    if (player == 'paper') return (comp == 'rock') ? result = 'PLAYER 1 WIN' : result = 'COM WIN';
    if (player == 'scissor') return (comp == 'paper') ? result = 'PLAYER 1 WIN' : result = 'COM WIN';
}

/* mulai permainan */
/* DOM Selector */
const versus = document.querySelector('.versus h1');
const resultClass = document.querySelector('.versus div div');
const textResult = document.querySelector('.versus h5');
const compBox = document.querySelectorAll('.greyBox.compImage');
const playerBox = document.querySelectorAll('.greyBox.playerImage');

/* Beri delay untuk membuat komputer seolah berpikir dahulu */

function wait() {
    const start = new Date().getTime();
    let i = 0;

    setInterval(function() {
        /* Jalankan fungsi dalam waktu 2s */
        if (new Date().getTime() - start >= 2000) {
            clearInterval;
            return;
        }

        /* greybox fungsi wait pada respon komputer */
        compBox[i++].style.backgroundColor = '#c4c4c4';
        if (i == compBox.length) i = 0;

        /* hilangkan kembali class result saat wait () */
        resultClass.classList.remove('result');

        /* tampilkan kembali tulisan VS saat wait () */
        versus.style.color = 'rgb(189,48,46)';

    }, 50);

    setTimeout(function() {
        setInterval(function() {
            if (new Date().getTime() - start >= 1200) {
                clearInterval;
                return;
            }

            /* menyamarkan greybox */
            compBox[i++].style.backgroundColor = '#9c835f';
            if (i == compBox.length) i = 0;
        }, 50);
    }, 50);
}


/* pilihan pemain */
const player = document.querySelectorAll('.contentImage .player');
player.forEach(function(choice) {
    choice.addEventListener('click', function() {
        /* menyamarkan greybox sisi pemain */
        for (let i = 0; i < playerBox.length; i++) {
            playerBox[i].style.backgroundColor = '#9c835f';
        }

        /* eventlistener pada kondisi null */
        if (result === null) {
            /* Tangkap pilihan komputer */
            const compChoice = getCompChoice();

            /* penangkapan pilihan pemain */
            const playerChoice = choice.className.substr(7, 7);

            /* rules permainan untuk mendapatkan hasil */
            result = getResult(compChoice, playerChoice);

            /* greybox pilihan pemain */
            if (playerChoice == 'rock') {
                playerBox[0].style.backgroundColor = '#c4c4c4';
            } else if (playerChoice == 'paper') {
                playerBox[1].style.backgroundColor = '#c4c4c4';
            } else {
                playerBox[2].style.backgroundColor = '#c4c4c4';
            }

            /* fungsi wait komputer */
            wait();

            /* perintah setelah fungsi wait selesai */
            setTimeout(function() {
                /* menyamarkan tulisan VS */
                versus.style.color = '#9c835f';

                /* tampilkan class result */
                resultClass.classList.add('result');

                /* tampilkan hasil dalam class result (kotak hijau) */
                textResult.innerHTML = result;
                if (result == "DRAW") {
                    textResult.style.backgroundColor = '#225c0e';
                } else {
                    textResult.style.backgroundColor = '#4c9654';
                }

                /* greybox pada pilihan komputer */
                if (compChoice == 'rock') {
                    compBox[0].style.backgroundColor = '#c4c4c4';
                } else if (compChoice == 'paper') {
                    compBox[1].style.backgroundColor = '#c4c4c4';
                } else {
                    compBox[2].style.backgroundColor = '#c4c4c4';
                }
            }, 1200);
        } else {
            alert('Silahkan tekan logo refresh terlebih dahulu!');
        }
    });
});

/* reset dengan tombol refresh */
const reset = document.querySelector('.refresh');
reset.addEventListener('click', function() {
    /* Hapus tulisan hasil dalam result */
    textResult.innerHTML = '';

    /* remove class result */
    resultClass.classList.remove('result');

    /* menghilangkan greybox */
    for (let i = 0; i < compBox.length; i++) {
        playerBox[i].style.backgroundColor = '#9c835f';
        compBox[i].style.backgroundColor = '#9c835f';
    }

    /* menampilkan tulisan VS lagi */
    versus.style.color = 'rgb(189,48,46)';

    /* reset ke null */
    result = null;
});