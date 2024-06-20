'use client';
import React, { useEffect, useRef } from 'react';

/**
 * 音频可视化配置接口
 * @property fftSize 快速傅里叶变换的大小
 * @property barWidthFactor 条形图宽度因子
 * @property gap 条形图之间的间隙
 * @property barColor 条形图的颜色
 * @property lineCapStyle 条形图端点样式
 * @property heightScalingFactor 高度缩放因子
 */
interface VisualizerConfig {
  fftSize: number;
  barWidthFactor: number;
  gap: number;
  barColor: string;
  lineCapStyle: CanvasLineCap;
  heightScalingFactor: number;
}

/**
 * 音频可视化组件的属性接口
 * @property audioContext 音频上下文
 * @property stream 媒体流
 * @property width 组件宽度，默认为400
 * @property height 组件高度，默认为60
 * @property config 可选的可视化配置
 */
interface AudioVisualizerProps {
  audioContext: AudioContext;
  stream: MediaStream;
  width?: number;
  height?: number;
  config?: VisualizerConfig;
}

/**
 * 默认的可视化配置对象
 */
const defaultConfig: VisualizerConfig = {
  fftSize: 256,
  barWidthFactor: 0.8,
  gap: 3,
  barColor: 'rgb(255, 255, 255)',
  lineCapStyle: 'square',
  heightScalingFactor: 256,
};

/**
 * 音频可视化组件
 * 使用Canvas绘制音频流的频谱图
 *
 * @param audioContext 音频上下文
 * @param stream 媒体流
 * @param width 组件宽度，默认为400
 * @param height 组件高度，默认为60
 * @param config 可视化配置，默认使用defaultConfig
 * @returns React的Canvas组件
 */
const AudioVisualizerComponent: React.FC<AudioVisualizerProps> = ({
  audioContext,
  stream,
  width = 500,
  height = 42,
  config = defaultConfig,
}) => {
  // 使用 useRef 获取Canvas元素的引用
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 使用 useEffect 设置音频分析器和绘图逻辑
  useEffect(() => {
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = config.fftSize;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // 定期更新Canvas绘图的函数
    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除之前的绘制内容
      const barWidth = (width / bufferLength) * config.barWidthFactor;
      const centerX = width / 2;
      let barHeight;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * (height / config.heightScalingFactor);
        ctx.fillStyle = config.barColor;
        if (i > 0) {
          ctx.fillRect(
            centerX + i * (barWidth + config.gap),
            height - barHeight,
            barWidth,
            barHeight,
          );
          ctx.fillRect(
            centerX - i * (barWidth + config.gap) - barWidth,
            height - barHeight,
            barWidth,
            barHeight,
          );
        }

        ctx.lineCap = config.lineCapStyle;
      }

      if (bufferLength > 0) {
        barHeight = dataArray[0] * (height / config.heightScalingFactor);
        ctx.fillRect(centerX - barWidth / 2, height - barHeight, barWidth, barHeight);
      }
    };

    draw();
  }, [audioContext, stream, width, height, config]);

  return <canvas ref={canvasRef} width={width - 40} height={height} />;
};

export default AudioVisualizerComponent;
