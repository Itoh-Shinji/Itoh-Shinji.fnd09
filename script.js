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
    　　パネルの隣接判定を行い、対象のパネルをクリックする。
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
        　1~20回:　0.8
        　21~40回：　0.9
        　41回以降：　0.95
５．４．でどこかがクリックされたら、"Congratulations!!!""の表示と、
 "もう1回？"、"やめる？"の表示を行う。
    １）もう1回？、　やめる？　の2つのボタンを画像の上に重ねて表示させる。
    ２）もう1回？をクリックした場合は再度ゲームを実行する。
    ３）やめるをクリックした場合は
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
const alpha =colors.length
     + 0.2;//左数値が黒の出る確率。他色出現確率１に対する比率。

document.querySelectorAll(".panel").forEach(panel => {
    const initialRandomColorIndex =Math.floor(Math.random()* alpha );
    panel.style.backgroundColor = colors[initialRandomColorIndex];
    panel.addEventListener("click", function (){
        const randomColorIndex =Math.floor(Math.random()* alpha );
        this.style.backgroundColor = colors[randomColorIndex];
    });
});

