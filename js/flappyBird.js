
// alert("按'Enter'開始!")

window.addEventListener('load', function () {
    // alert("OK!");
    let cvs = document.getElementById("myCanvas");
    let ctx = cvs.getContext("2d");

    // 載入圖檔

    let chick = new Image();
    let background = new Image();
    let foreground = new Image();
    let pipeNorth = new Image();
    let pipeSouth = new Image();

    chick.src = "./img/game/chick.png";
    background.src = "./img/game/background.jpg";
    foreground.src = "./img/game/foreground.jpg";
    pipeNorth.src = "./img/game/pipeNorth.png";
    pipeSouth.src = "./img/game/pipeSouth.png";


    // 載入音效

    let jumpSound = new Audio();
    let scoreSound = new Audio();
    let gameOverSound = new Audio();
    let BGM = new Audio();

    jumpSound.src = "./img/game/jumpSound.mp3";
    scoreSound.src = "./img/game/scoreSound.mp3";
    gameOverSound.src = "./img/game/gameOverSound.mp3";
    BGM.src = "./img/game/BGM.mp3";


    // 變數宣告
    let gap = 180;
    let space = pipeNorth.height + gap;

    let chick_X = 750;
    let chick_Y = 200;

    let score = 0;

    gravity = 1.5;

    // on key down
    document.addEventListener("keydown", moveUp);

    function moveUp(eventUp) {
        // alert("go up!")
        if (eventUp.key == " ") {
            chick_Y -= 40;
            jumpSound.play();
        }
    }

    // 存放水管的array
    let pipe = []; // 存放push後的pipe物件

    pipe[0] = { // 放入第一個pipe物件
        x: cvs.width,
        y: 0
    }

    // 按Enter開始遊戲
    document.addEventListener('keydown', (e) => {
        // Start the game if enter key is pressed
        if (e.key == "Enter") {
            gameStart();
        }
    });

    // draw images
    function gameStart() {
        BGM.loop = true; // 讓BGM重複撥放
        BGM.play();
        function draw() {

            ctx.drawImage(background, 0, 0);

            for (let i = 0; i < pipe.length; ++i) {

                // ctx.drawImage(pipeNorth, 750, -30);
                // ctx.drawImage(pipeSouth, 750, -30 + space);

                // ctx.drawImage(pipeNorth, 250, 0);
                // ctx.drawImage(pipeSouth, 250, 0 + space);

                // ctx.drawImage(pipeNorth, 500, -200);
                // ctx.drawImage(pipeSouth, 500, -200 + space);

                // ctx.drawImage(pipeNorth, 750, -255);
                // ctx.drawImage(pipeSouth, 750, -255 + space);     <<<<<<<<   測出管子的y座標必須介於 0 ~ -255 之間
                //                                                             用於random push的管子限制

                ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
                ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + space);

                // 讓x軸持續往左移動
                pipe[i].x -= 2;

                // 加入新的pipe物件到piep陣列中
                if (pipe[i].x == 1000) { // 第1個pipe移動到指定位置的時候，
                    pipe.push({ // 加入新的pipe object
                        x: cvs.width,
                        y: Math.random() * -255 // 管子的y座標必須介於 0 ~ -255 之間
                    });
                }

                // 偵測碰撞
                if (chick_X + chick.width >= pipe[i].x
                    && chick_X <= pipe[i].x + pipeNorth.width
                    && (chick_Y <= pipe[i].y + pipeNorth.height
                        || chick_Y + chick.height >= pipe[i].y + space)
                    || (chick_Y + chick.height >= cvs.height - foreground.height)) {
                    gameOverSound.play();
                    setTimeout(function () { location.reload() }, 200); // 重新載入
                    // ; 

                }

                // 計分
                if (pipe[i].x == 700) { // 當pipe移動到指定位置時，加1分
                    score++;
                    scoreSound.play();
                }
            }

            ctx.drawImage(foreground, 0, 560);
            // ctx.drawImage(foreground,0,cvs.height-foreground.height); 
            // this one is better, if figure size is optimization

            ctx.drawImage(chick, chick_X, chick_Y);

            // 小雞受重力影響
            chick_Y += gravity;

            ctx.fillStyle = "#272727";
            ctx.font = "25px verdana";
            ctx.fillText("Score : " + score, 10, 680);
            // e.g. ctx.fillText("Sample String", 10, 50);

            // 重複呼叫 draw function 
            requestAnimationFrame(draw);
        }

        draw();
    }

})

// 遊戲中按暫停
document.addEventListener("keydown", function (event) {
    if (event.key == "p") {
        alert("~~~ Pause ~~~");
    }
})
