'use strict'
// 1行目に記載している 'use strict' は削除しないでください

/*
仕様書 (Title: 6-Colors Goddness)
１．9枚のパネル（3×3で配置）を揃えるゲーム
    １）パネルサイズ：　100px角
２．各パネルはクリックされるたびに色
 （6色、赤、青、黄、緑、橙、白）+黒がランダムに変わる。
    １）色が変わるロジックは乱数を使用し、6＋αを掛けたものの
    　切り上げ処理をして色の番号を決定。
    　色番号は　1:赤、2:青、3:黄、4:黄緑、5:橙、6:白、7:黒とする。
    ２）各パネルはある確率で黒が出るようにする。
３．黒になると爆発の効果と共に、影響を受けて隣接するパネルの色がランダムに変わる。
    １）爆発の効果は画面が揺れるイメージ。
    ２）影響を受けて隣接するパネルの色を変える処理は、
    　　パネルの隣接判定を行い、対象のパネルの色をランダムに変える。
４．9枚のパネルの色が揃ったら、その色をテーマにした画像（女神）の表示
 （配置された9枚のサイズで1枚に置き換えるイメージ）、と
 　"Congratulations!!!""の表示とSCOREの表示を行う。
    １）テーマにした画像は生成AIで作成。
    　　パネルと画像を置き換えるので300px角で作成する
    　　各色に対して下記イメージで画像を作成させる
  　　  　赤:赤色の水着の衣装を着た情熱の女神（スペインのイメージ）
    　　　青:青色の水着の衣装を着た知的な女神（フランスのイメージ）
    　　　黄:黄色の水着の衣装を着たグラマラスな女神（ブラジルのイメージ）
    　　　緑:緑色の水着の衣装を着た牧歌的な女神（スコットランドのイメージ）
    　　　橙:橙色の水着の衣装を着た陽気ではっちゃけた感じの女神（オランダのイメージ）
    　　　白:白色の水着の衣装を着たミステリアスな女神（日本のイメージ）
    ２）"Congratulations!!!"の表示とSCOREの表示は
    　9枚のパネルの下側に2段で"Congratulations!!!"とSCOREを表示する。
    ３）SCOREは以下のロジックで算出する。
        持ち点　1,000,000から1回クリックするたびにある比率で減らしていく。
        SCORE表示は整数化（切り上げ）したものを表示する。
        減らしていく割合
        　1~10回:　0.95
        　11~30回：　0.99
        　31回以降：　0.999
５．４．でどこかがクリックされたら、"Congratulations!!!""の表示と、
 "もう1回？"、"やめる？"の表示を行う。
    １）"Congratulations!!!""の表示はSCOREの下に表示させる
    ２）もう1回？、　やめる？　の2つのボタンを画像の上に重ねて表示させる。
    ３）もう1回？をクリックした場合は再度ゲームを実行する。
    ４）やめるをクリックした場合は
    　　表示した画像の下に
    　　　赤:　¡Buen día!
    　　　青:　Merci pour votre travail !
    　　　黄:　Obrigado pelo seu trabalho!
    　　　緑:　Guid job!
    　　　橙:　Goed gedaan!
    　　　白:　おつかれさま。
    　　を表示させる。（ここで処理終了）
*/


//２．の１）、２）の機能
const colors = [
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "white",
    "black"
];

const alpha =colors.length - 1
    + 0.3  ;//左数値が黒の出る確率。他色出現確率１に対する比率。

//３．２）の機能用↓↓↓↓↓↓↓↓
const contactJudgeTable = {
    "panel1": [2,4,5],
    "panel2": [1,3,4,5,6],
    "panel3": [2,5,6],
    "panel4": [1,2,5,7,8],
    "panel5": [1,2,3,4,6,7,8,9],
    "panel6": [2,3,5,7,8],
    "panel7": [4,5,8],
    "panel8": [4,5,6,7,9],
    "panel9": [5,6,8]
};
//３．２）の機能用↑↑↑↑↑↑↑↑

//４．の機能
let judgeArry = [];

//４．３）の機能
let scoreValue = 1000000;
document.getElementById("score").innerText = scoreValue;
let clickCount = 1;

//５．４）の機能
const endrollMessage = {
    "red": "¡Buen día!" ,
    "blue": "Merci pour votre travail !" ,
    "yellow": "Obrigado pelo seu trabalho!" ,
    "green": "Guid job!" ,
    "orange": "Goed gedaan!" ,
    "white": "おつかれさま。"
};

//５．の機能
function createButtons(colorName){
    const existingButtons = document.querySelectorAll(".stopButton , .restartButton");
    existingButtons.forEach(button => button.remove());

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const stopButton = document.createElement("button");
    stopButton.className = "stopButton";
    stopButton.innerText ="やめる？";
    stopButton.addEventListener("click", function(){
        document.getElementById("message-box").innerText = endrollMessage[colorName];
        const existingButtons = document.querySelectorAll(".stopButton , .restartButton");
        existingButtons.forEach(button => button.remove());
    })

    const restartButton = document.createElement("button");
    restartButton.className = "restartButton";
    restartButton.innerText = "もう１回？";
    restartButton.addEventListener("click", function(){
        document.querySelectorAll(".panel").forEach(panel => {
            const initialRandomColorIndex = Math.floor(Math.random() *6);
            panel.style.backgroundColor = colors[initialRandomColorIndex];
        });
        scoreValue = 1000000;
        clickCount = 1;
        document.getElementById("score").innerText = scoreValue;

        const existingButtons = document.querySelectorAll(".stopButton , .restartButton");
        existingButtons.forEach(button => button.remove());

        const existingImg = document.querySelector(".overlay-image");
        if (existingImg) {
            existingImg.remove();
        }
        document.getElementById("message-box").innerText = "";
    })
    buttonContainer.appendChild(stopButton);
    buttonContainer.appendChild(restartButton);

    const frame = document.querySelector(".frame");
    frame.appendChild(buttonContainer);
}


//２．の１）、２）の機能
document.querySelectorAll(".panel").forEach(panel => {
    const initialRandomColorIndex =Math.floor(Math.random()*6);
    panel.style.backgroundColor = colors[initialRandomColorIndex];
    panel.addEventListener("click", function (){
        const randomColorIndex =Math.floor(Math.random()* alpha );
        this.style.backgroundColor = colors[randomColorIndex];

//４．の機能
        judgeArry = Array.from(document.querySelectorAll(".panel")).map( p => p.style.backgroundColor);
        if (judgeArry.every( color => color === judgeArry[0])){
            const matchingColor = judgeArry[0];
            const colorName = colors.find(color => color === matchingColor);
            const img = document.createElement("img");
            img.src = `images/${colorName}.png`;
            img.className = "overlay-image";
            document.querySelector(".frame").appendChild(img);
            document.getElementById("message-box").innerText = "Congraturations!!!";

//５．の機能
            createButtons(colorName);
        }

//４．３）の機能
        clickCount += 1;
        if (clickCount <= 10){
            scoreValue = Math.floor(scoreValue*(0.95 ** clickCount));    
        } else if (clickCount <= 30){
            scoreValue = Math.floor(scoreValue*(0.99 ** clickCount));    
        } else if (scoreValue > 0){
            scoreValue = Math.floor(scoreValue*(0.999 ** clickCount));
        } else {
            scoreValue = 5963;//頑張っても揃えられない方への救済措置「ご苦労さん」
        }
        document.getElementById("score").innerText = scoreValue;

//３．２）の機能
        if (colors[randomColorIndex] === "black") {
            const panelId = parseInt(this.id);
            const adjacentPanels = contactJudgeTable[`panel${panelId}`];//テンプレートリテラルはバッククォート
            adjacentPanels.forEach(adjId => {
                const adjacentPanel = document.getElementById(adjId);
                const randomAdjacentColorIndex = Math.floor(Math.random()* 6);
                adjacentPanel.style.backgroundColor = colors[randomAdjacentColorIndex];
            });
        }
    });
});