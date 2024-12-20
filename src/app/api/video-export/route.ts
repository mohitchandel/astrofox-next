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

    console.log(layers);

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
        "--disable-web-security",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              background: black; 
              width: ${width}px;
              height: ${height}px;
              overflow: hidden;
            }
            .main-content {
              width: ${width}px;
              height: ${height}px;
              position: relative;
              background: black;
            }
            .layer {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
            .bar-spectrum {
              display: flex;
              align-items: flex-end;
              justify-content: center;
              gap: 2px;
              height: 100%;
              width: 100%;
            }
            .wave-container {
              position: absolute;
            }
            .wave-spectrum-container {
              position: absolute;
            }
          </style>
        </head>
        <body>
          <div class="main-content" id="mainContent"></div>
          <script>
            // Mock Audio Analysis Implementation
            class MockAnalyzer {
              constructor() {
                this.frequencyBinCount = 1024;
                this.smoothingTimeConstant = 0.8;
                this.fftSize = 2048;
              }

              getByteFrequencyData(array) {
                for (let i = 0; i < array.length; i++) {
                  // Create a more realistic frequency distribution
                  const frequency = Math.sin((i / array.length) * Math.PI) * 255;
                  array[i] = Math.floor(Math.abs(frequency) * Math.random());
                }
              }

              getByteTimeDomainData(array) {
                for (let i = 0; i < array.length; i++) {
                  // Create a smoother wave pattern
                  const wave = Math.sin((i / array.length) * Math.PI * 2);
                  array[i] = Math.floor(128 + wave * 64);
                }
              }
            }

            // Initialize the analyzer globally
            const analyzer = new MockAnalyzer();
            const layers = ${JSON.stringify(layers)};
            const container = document.getElementById('mainContent');
            
            function getScaledSize(baseSize, zoom) {
              return (baseSize * zoom) / 100;
            }

            function renderLayer(layer) {
              if (!layer.visible) return null;
              
              const element = document.createElement('div');
              element.className = 'layer';
              element.style.zIndex = layer.zIndex;
              
              switch(layer.type) {
                case 'text':
                  element.style.fontFamily = layer.settings.font;
                  element.style.fontSize = \`\${layer.settings.size}px\`;
                  element.style.color = layer.settings.color;
                  element.style.fontStyle = layer.settings.isItalic ? 'italic' : 'normal';
                  element.style.fontWeight = layer.settings.isBold ? 'bold' : 'normal';
                  element.style.transform = \`translate(\${layer.settings.x}px, \${layer.settings.y}px) rotate(\${layer.settings.rotation}deg)\`;
                  element.style.opacity = layer.settings.opacity / 100;
                  element.textContent = layer.settings.text;
                  break;

                case 'image':
                  element.style.inset = "0";
                  element.style.transform = \`rotate(\${layer.settings.rotation}deg)\`;
                  element.style.backgroundImage = \`url('\${layer.settings.url}')\`;
                  element.style.backgroundSize = \`\${getScaledSize(layer.settings.width, layer.settings.zoom)}% \${getScaledSize(layer.settings.height, layer.settings.zoom)}%\`;
                  element.style.backgroundPosition = \`calc(50% + \${layer.settings.x}px) calc(50% + \${layer.settings.y}px)\`;
                  element.style.backgroundRepeat = "no-repeat";
                  element.style.opacity = layer.settings.opacity / 100;
                  break;

                case 'barSpectrum': {
                  const barContainer = document.createElement('div');
                  barContainer.style.width = \`\${layer.settings.width}px\`;
                  barContainer.style.height = \`\${layer.settings.height}px\`;
                  barContainer.style.display = 'flex';
                  barContainer.style.alignItems = 'flex-end';
                  barContainer.style.justifyContent = 'center';
                  barContainer.style.gap = \`\${layer.settings.gap}px\`;
                  barContainer.style.transform = \`translate(\${layer.settings.x}px, \${layer.settings.y}px)\`;
                  barContainer.style.opacity = layer.settings.opacity / 100;

                  const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
                  analyzer.getByteFrequencyData(frequencyData);

                  for (let i = 0; i < 64; i++) {
                    const bar = document.createElement('div');
                    bar.style.width = \`\${layer.settings.barWidth}px\`;
                    const barHeight = (frequencyData[i] / 255) * layer.settings.height;
                    bar.style.height = \`\${barHeight}px\`;
                    bar.style.backgroundColor = layer.settings.color;
                    bar.style.borderRadius = \`\${layer.settings.roundness}px\`;
                    barContainer.appendChild(bar);
                  }
                  element.appendChild(barContainer);
                  break;
                }

                case 'wave': {
                  const waveContainer = document.createElement('div');
                  waveContainer.className = 'wave-container';
                  waveContainer.style.width = \`\${layer.settings.width}px\`;
                  waveContainer.style.height = \`\${layer.settings.height}px\`;
                  waveContainer.style.transform = \`translate(\${layer.settings.x}px, \${layer.settings.y}px)\`;
                  waveContainer.style.opacity = layer.settings.opacity / 100;

                  const canvas = document.createElement('canvas');
                  canvas.width = layer.settings.width;
                  canvas.height = layer.settings.height;
                  canvas.style.display = 'block';

                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.strokeStyle = layer.settings.color;
                    ctx.lineWidth = layer.settings.lineWidth;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';

                    const timeData = new Uint8Array(analyzer.frequencyBinCount);
                    analyzer.getByteTimeDomainData(timeData);

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

                case 'waveSpectrum': {
                  const container = document.createElement('div');
                  container.className = 'wave-spectrum-container';
                  container.style.width = \`\${layer.settings.width}px\`;
                  container.style.height = \`\${layer.settings.height}px\`;
                  container.style.transform = \`translate(\${layer.settings.x}px, \${layer.settings.y}px)\`;
                  container.style.opacity = layer.settings.opacity / 100;

                  const canvas = document.createElement('canvas');
                  canvas.width = layer.settings.width;
                  canvas.height = layer.settings.height;

                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
                    analyzer.getByteFrequencyData(frequencyData);

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height);

                    const sliceWidth = canvas.width / frequencyData.length;
                    let x = 0;

                    for (let i = 0; i < frequencyData.length; i++) {
                      const percent = frequencyData[i] / 255;
                      const y = (1 - percent) * canvas.height;

                      if (i === 0) {
                        ctx.moveTo(x, y);
                      } else {
                        ctx.lineTo(x, y);
                      }

                      x += sliceWidth;
                    }

                    ctx.lineTo(canvas.width, canvas.height);
                    ctx.closePath();

                    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                    gradient.addColorStop(0, layer.settings.color);
                    gradient.addColorStop(1, layer.settings.color + '00');

                    ctx.fillStyle = gradient;
                    ctx.fill();
                  }

                  container.appendChild(canvas);
                  element.appendChild(container);
                  break;
                }
              }
              
              return element;
            }

            window.updateVisualization = function() {
              container.innerHTML = '';
              const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);
              
              sortedLayers.forEach(layer => {
                const renderedLayer = renderLayer(layer);
                if (renderedLayer) {
                  container.appendChild(renderedLayer);
                }
              });
            }

            // Initial render
            updateVisualization();
          </script>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);

    // Wait for any images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              })
          )
      );
    });

    // Capture frames
    const totalFrames = Math.ceil(duration * fps);
    for (let frame = 0; frame < totalFrames; frame++) {
      await page.evaluate(() => {
        (window as any).updateVisualization();
      });

      const framePath = path.join(
        framesDir,
        `frame-${String(frame).padStart(6, "0")}.png`
      );
      await page.screenshot({
        path: framePath,
        type: "png",
        clip: { x: 0, y: 0, width, height },
      });
    }

    await browser.close();
    browser = null;

    // Generate video
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
          "-preset ultrafast",
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
