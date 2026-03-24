const express = require("express");
const Canvas = require("canvas");

const app = express();

// 폰트 등록
Canvas.registerFont("./assets/SUIT-Bold.ttf", { family: "SUITB" });
Canvas.registerFont("./assets/SUIT-Regular.ttf", { family: "SUIT" });

app.get("/welcome", async (req, res) => {
  try {
    const username = req.query.username || "USER";
    const avatar = req.query.avatar || "";

    const canvas = Canvas.createCanvas(1600, 800);
    const ctx = canvas.getContext("2d");

    // 배경
    const bg = await Canvas.loadImage("./assets/Background.png");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    // 프레임
    const frame = await Canvas.loadImage("./assets/frame.png");
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    // 로고
    const logo = await Canvas.loadImage("./assets/logo.png");
    ctx.drawImage(logo, 600, 30, 400, 150);

    // 아바타
    const avatarImg = await Canvas.loadImage(avatar);

    ctx.save();
    ctx.beginPath();
    ctx.arc(350, 400, 120, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatarImg, 230, 280, 240, 240);
    ctx.restore();

    // 아바타 테두리
    ctx.beginPath();
    ctx.arc(350, 400, 130, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    ctx.stroke();

    // 텍스트
    ctx.fillStyle = "#ffffff";

    // 닉네임
    ctx.font = "bold 60px SUITB";
    ctx.fillText(`${username}님 안녕하세요!`, 600, 350);

    // 서브텍스트
    ctx.font = "40px SUIT";
    ctx.fillText("707 서버에 오신걸 환영합니다", 600, 420);

    // 정보 텍스트
    ctx.font = "30px SUIT";

    const userId = Math.floor(Math.random() * 999999999999999999); // 임시 (봇에서 넣어도됨)
    const today = new Date().toLocaleDateString();

    ctx.fillText(`ID : ${userId}`, 600, 500);
    ctx.fillText(`Discord 가입 : ${today}`, 600, 550);
    ctx.fillText(`서버 가입 : ${today}`, 600, 600);

    // 출력
    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());

  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

app.listen(3000, () => console.log("서버 실행됨"));
