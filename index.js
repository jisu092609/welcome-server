const express = require("express");
const Canvas = require("canvas");

const app = express();

Canvas.registerFont("./assets/SUIT-Bold.ttf", { family: "SUITB" });

app.get("/welcome", async (req, res) => {
  try {
    const username = req.query.username;
    const avatar = req.query.avatar;

    const canvas = Canvas.createCanvas(1600, 800);
    const ctx = canvas.getContext("2d");

    const bg = await Canvas.loadImage("./assets/background.png");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const avatarImg = await Canvas.loadImage(avatar);
    ctx.drawImage(avatarImg, 200, 200, 300, 300);

    ctx.font = "60px SUITB";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${username}님 환영합니다`, 600, 400);

    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());

  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

app.listen(3000, () => console.log("서버 실행됨"));