const express = require("express");
const Canvas = require("canvas");

const app = express();

Canvas.registerFont("./assets/SUIT-Regular.ttf", { family: "SUIT" });
Canvas.registerFont("./assets/SUIT-Bold.ttf", { family: "SUITB" });

app.get("/welcome", async (req, res) => {
  try {
    const username = req.query.username || "USER";
    const avatarUrl = req.query.avatar;

    // 🔥 추가 (실제 데이터 받기)
    const userId = req.query.id || "UNKNOWN";
    const createdAt = req.query.created || "UNKNOWN";
    const joinedAt = req.query.joined || "UNKNOWN";

    const canvas = Canvas.createCanvas(1600, 800);
    const ctx = canvas.getContext("2d");

    // 배경
    const background = await Canvas.loadImage("./assets/Background.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // 프레임
    const frame = await Canvas.loadImage("./assets/frame.png");

    const frameWidth = 1500;
    const frameHeight = 650;

    const frameX = (canvas.width - frameWidth) / 2;
    const frameY = (canvas.height - frameHeight) / 2 + 40;

    ctx.drawImage(frame, frameX, frameY, frameWidth, frameHeight);

    // 로고
    const logo = await Canvas.loadImage("./assets/logo.png");

    ctx.drawImage(
      logo,
      canvas.width / 2 - 180,
      frameY - 110,
      360,
      180
    );

    // 아바타
    const avatar = await Canvas.loadImage(avatarUrl);

    const avatarSize = 230;
    const avatarX = frameX + 340;
    const avatarY = frameY + frameHeight / 2;

    // 네온 테두리
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarSize / 2 + 8, 0, Math.PI * 2);
    ctx.strokeStyle = "#9c6cff";
    ctx.lineWidth = 6;
    ctx.shadowColor = "#9c6cff";
    ctx.shadowBlur = 20;
    ctx.stroke();

    // 아바타
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      avatar,
      avatarX - avatarSize / 2,
      avatarY - avatarSize / 2,
      avatarSize,
      avatarSize
    );

    ctx.restore();

    // 텍스트 효과
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 3;

    const textX = avatarX + 250;
    const textY = avatarY - 100;

    // 닉네임
    ctx.font = "56px SUITB";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.lineWidth = 2;

    ctx.strokeText(`${username}님 안녕하세요!`, textX, textY);
    ctx.fillText(`${username}님 안녕하세요!`, textX, textY);

    // 서브텍스트
    ctx.font = "40px SUITB";
    ctx.strokeText("707 서버에 오신걸 환영합니다", textX, textY + 70);
    ctx.fillText("707 서버에 오신걸 환영합니다", textX, textY + 70);

    // 정보 텍스트
    ctx.font = "30px SUITB";
    ctx.fillStyle = "#f5f5ff";

    ctx.fillText(`ID : ${userId}`, textX, textY + 150);
    ctx.fillText(`Discord 가입 : ${createdAt}`, textX, textY + 190);
    ctx.fillText(`서버 가입 : ${joinedAt}`, textX, textY + 230);

    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());

  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

app.listen(3000, () => console.log("서버 실행됨"));
