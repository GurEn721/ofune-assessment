'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した子要素のすべてを削除する
 * @param {HTMLElemnt} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { //子供の要素がある限り削除
     element.removeChild(element.firstChild);
    }
}

const cursed = 'https://うんたん'

assessmentButton.onclick = () => {
  const userName =  userNameInput.value;
  if (userName.length === 0) {
      return;//関数終了のガード句
  }
  
  
  //診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');//HTMLを足してく
  header.innerText = '診断結果';
  resultDivided.appendChild(header);//appendChildで子要素にする。この場合headerの下に新しく行を入れる感じ
  
  const paragraph = document.createElement('p');
  const result = assessment(userName);//診断結果取得
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  //TODOツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('お勧め開発ツリー')
    + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #開発ツリー診断メーカー';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};
const answers = [
'{userName}　あなたは白龍を開発すべきです。強力なAP爆弾で戦場をめちゃくちゃにしましょう。',
'{userName}　あなたは大和を開発すべきです。ゲーム内元最大口径のロマン砲を搭載。',
'{userName}　あなたは蔵王を開発すべきです。いつか強力なバフが来ることを信じてWGに貢ぎましょう',
'{userName}　あなたは島風を開発すべきです。おっそーい！',
'{userName}　あなたは春雲を開発すべきです。戦場に砲弾の虹をかけましょう。',
'{userName}　あなたはミッドウェイを開発すべきです。HEボンバーは強いぞ。',
'{userName}　あなたはモンタナを開発すべきです。もう時代の敗北者とは言わせない。',
'{userName}　あなたはデモインを開発すべきです。常に強艦。とりあえずこいつ作れ。',
'{userName}　あなたはウースターを開発すべきです。高レート連装砲6基で燃やし、敵空母の艦載機をことごとく粉砕しよう',
'{userName}　あなたはギアリングを開発すべきです。16km魚雷に雷速向上だよなぁ！',
'{userName}　あなたはクレムリンを開発すべきです。',
'{userName}　あなたはモスクワを開発すべきです。',
'{userName}　あなたはハバロフスクを開発すべきです。',
'{userName}　あなたはグロゾヴォイを開発すべきです。',
'{userName}　あなたはグローサーを開発すべきです。',
'{userName}　あなたはヒンデンブルグを開発すべきです。',
'{userName}　あなたはZ-52を開発すべきです。',
'{userName}　あなたはオーディシャスを開発すべきです。',
'{userName}　あなたはコンカラーを開発すべきです。',
'{userName}　あなたはマイノーターを開発すべきです。',
'{userName}　あなたはゴライアスを開発すべきです。',
'{userName}　あなたはデアリングを開発すべきです。',
'{userName}　あなたはハランドを開発すべきです。',
'{userName}　あなたは岳陽を開発すべきです。',
'{userName}　あなたはレピュブリクを開発すべきです。',
'{userName}　あなたはアンリ４世を開発すべきです。',
'{userName}　あなたはクレベールを開発すべきです。',
'{userName}　あなたはヴェネチアを開発すべきです。',
];


/**
 * nameの文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
  if (userName === "アレクサンドルネフスキー") {
    let result = cursed;
    return result;
} else {
  //全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  //文字のコード番号の合計を回答の数で割って添え字の数値を求める
  //日付を足すと一日ごとに違う結果が出るから今日の占いとかもできる
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{userName\}/g, userName);
  return result;
}
}


userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };
