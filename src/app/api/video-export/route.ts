import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  let browser = null;
  let tmpDir = "";

  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const dataStr = formData.get("data") as string;
    const data = JSON.parse(dataStr);

    const { duration, width, height, fps, layers } = data;

    const appRootDir = process.cwd();
    tmpDir = path.join(appRootDir, "temp");

    // Create temp directory
    await fs.mkdir(tmpDir, { recursive: true });

    // Save audio file
    const audioPath = path.join(tmpDir, "audio.mp3");
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    await writeFile(audioPath, audioBuffer);

    // Create frames directory
    const framesDir = path.join(tmpDir, "frames");
    await fs.mkdir(framesDir, { recursive: true });

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        `--window-size=${width},${height}`,
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    // Create HTML with local audio file
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; background: black; }
            .container { width: ${width}px; height: ${height}px; position: relative; display: flex; justify-content: center; align-items: center; }
            .visualization { width: 100%; height: 100%; position: relative; overflow: hidden; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="visualization"></div>
          </div>
          <audio id="audioElement" src="file://${audioPath}" crossorigin="anonymous"></audio>
        </body>
      </html>
    `);

    // Inject your layer rendering logic
    await page.evaluate((layerData) => {
      const container = document.querySelector(".visualization");
      if (!container) return;

      // Create audio context and analyzer for visualizations
      const audioElement = document.getElementById(
        "audioElement"
      ) as HTMLAudioElement;
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioElement);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);

      const sortedLayers = layerData.sort(
        (a: { zIndex: number }, b: { zIndex: number }) => b.zIndex - a.zIndex
      );

      function renderLayer(layer: any) {
        if (!layer.visible) return null;

        const element = document.createElement("div");
        element.style.position = "absolute";
        element.style.zIndex = layer.zIndex.toString();

        switch (layer.type) {
          case "text":
            element.style.fontFamily = layer.settings.font;
            element.style.fontSize = `${layer.settings.size}px`;
            element.style.fontStyle = layer.settings.isItalic
              ? "italic"
              : "normal";
            element.style.fontWeight = layer.settings.isBold
              ? "bold"
              : "normal";
            element.style.transform = `translate(${layer.settings.x}px, ${layer.settings.y}px) rotate(${layer.settings.rotation}deg)`;
            element.style.color = layer.settings.color;
            element.style.opacity = (layer.settings.opacity / 100).toString();
            element.textContent = layer.settings.text;
            break;

          case "image":
            element.style.inset = "0";
            element.style.transform = `rotate(${layer.settings.rotation}deg)`;
            element.style.backgroundImage = `url(${layer.settings.url})`;
            element.style.backgroundSize = `${
              (layer.settings.width * layer.settings.zoom) / 100
            }% ${(layer.settings.height * layer.settings.zoom) / 100}%`;
            element.style.backgroundPosition = `calc(50% + ${layer.settings.x}px) calc(50% + ${layer.settings.y}px)`;
            element.style.backgroundRepeat = "no-repeat";
            element.style.opacity = (layer.settings.opacity / 100).toString();
            break;

          case "barSpectrum": {
            const barContainer = document.createElement("div");
            barContainer.style.width = `${layer.settings.width}px`;
            barContainer.style.height = `${layer.settings.height}px`;
            barContainer.style.display = "flex";
            barContainer.style.alignItems = "flex-end";
            barContainer.style.justifyContent = "center";
            barContainer.style.gap = `${layer.settings.gap}px`;
            barContainer.style.transform = `translate(${layer.settings.x}px, ${layer.settings.y}px)`;
            barContainer.style.opacity = (
              layer.settings.opacity / 100
            ).toString();

            // Create frequency data array
            const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
            analyzer.getByteFrequencyData(frequencyData);

            // Create 64 bars
            for (let i = 0; i < 64; i++) {
              const bar = document.createElement("div");
              bar.style.width = `${layer.settings.barWidth}px`;
              const barHeight =
                (frequencyData[i] / 255) * layer.settings.height;
              bar.style.height = `${barHeight}px`;
              bar.style.backgroundColor = layer.settings.color;
              bar.style.borderRadius = `${layer.settings.roundness}px`;
              barContainer.appendChild(bar);
            }
            element.appendChild(barContainer);
            break;
          }

          case "wave": {
            const waveContainer = document.createElement("div");
            waveContainer.style.width = `${layer.settings.width}px`;
            waveContainer.style.height = `${layer.settings.height}px`;
            waveContainer.style.transform = `translate(${layer.settings.x}px, ${layer.settings.y}px)`;
            waveContainer.style.opacity = (
              layer.settings.opacity / 100
            ).toString();

            const canvas = document.createElement("canvas");
            canvas.width = layer.settings.width;
            canvas.height = layer.settings.height;
            canvas.style.display = "block";

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.strokeStyle = layer.settings.color;
              ctx.lineWidth = layer.settings.lineWidth;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";

              // Get time domain data
              const timeData = new Uint8Array(analyzer.frequencyBinCount);
              analyzer.getByteTimeDomainData(timeData);

              // Draw wave
              ctx.beginPath();
              const sliceWidth = canvas.width / timeData.length;
              let x = 0;

              for (let i = 0; i < timeData.length; i++) {
                const v = timeData[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }

                x += sliceWidth;
              }

              ctx.stroke();
            }

            waveContainer.appendChild(canvas);
            element.appendChild(waveContainer);
            break;
          }

          case "waveSpectrum": {
            const waveSpectrumContainer = document.createElement("div");
            waveSpectrumContainer.style.width = `${layer.settings.width}px`;
            waveSpectrumContainer.style.height = `${layer.settings.height}px`;
            waveSpectrumContainer.style.transform = `translate(${layer.settings.x}px, ${layer.settings.y}px)`;
            waveSpectrumContainer.style.opacity = (
              layer.settings.opacity / 100
            ).toString();

            const canvas = document.createElement("canvas");
            canvas.width = layer.settings.width;
            canvas.height = layer.settings.height;
            canvas.style.display = "block";

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.strokeStyle = layer.settings.color;
              ctx.lineWidth = layer.settings.lineWidth;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";

              // Get frequency data
              const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
              analyzer.getByteFrequencyData(frequencyData);

              // Draw spectrum
              ctx.beginPath();
              const sliceWidth = canvas.width / frequencyData.length;
              let x = 0;

              for (let i = 0; i < frequencyData.length; i++) {
                const v = frequencyData[i] / 255.0;
                const y = (1 - v) * canvas.height;

                if (i === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }

                x += sliceWidth;
              }

              ctx.stroke();
            }

            waveSpectrumContainer.appendChild(canvas);
            element.appendChild(waveSpectrumContainer);
            break;
          }
        }

        return element;
      }

      sortedLayers.forEach((layer: any) => {
        const renderedElement = renderLayer(layer);
        if (renderedElement) {
          container.appendChild(renderedElement);
        }
      });
    }, layers);

    // Capture frames
    const totalFrames = Math.ceil(duration * fps);
    for (let frame = 0; frame < totalFrames; frame++) {
      const timestamp = frame / fps;
      await page.evaluate((time) => {
        const audio = document.getElementById(
          "audioElement"
        ) as HTMLAudioElement;
        audio.currentTime = time;
        return new Promise((resolve) => requestAnimationFrame(resolve));
      }, timestamp);

      const framePath = path.join(
        framesDir,
        `frame-${String(frame).padStart(6, "0")}.png`
      );
      await page.screenshot({ path: framePath, type: "png" });
    }

    await browser.close();
    browser = null;

    // Generate video with FFmpeg
    const outputPath = path.join(tmpDir, "output.mp4");
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(path.join(framesDir, "frame-%06d.png"))
        .inputFPS(fps)
        .input(audioPath)
        .videoCodec("libx264")
        .audioCodec("aac")
        .size(`${width}x${height}`)
        .fps(fps)
        .outputOptions([
          "-pix_fmt yuv420p",
          "-movflags +faststart",
          "-preset medium",
          "-crf 23",
          "-shortest",
        ])
        .on("end", resolve)
        .on("error", reject)
        .save(outputPath);
    });

    const videoBuffer = await fs.readFile(outputPath);

    // Cleanup
    await fs.rm(tmpDir, { recursive: true, force: true });

    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="visualization.mp4"',
      },
    });
  } catch (error) {
    console.error("Video export error:", error);

    if (browser) {
      await browser.close().catch(console.error);
    }
    if (tmpDir) {
      await fs
        .rm(tmpDir, { recursive: true, force: true })
        .catch(console.error);
    }

    return NextResponse.json(
      {
        error: "Failed to generate video",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
