# Skill: rive-animation

## Purpose
Patterns and best practices for integrating custom Rive (.riv) animations into React components using @rive-app/react-canvas.

## Installation
```bash
npm install @rive-app/react-canvas
```

## Basic Usage
```jsx
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

function TopicIcon({ src, stateMachine = 'default' }) {
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  return (
    <div style={{ width: 48, height: 48 }}>
      <RiveComponent />
    </div>
  );
}
```

## Triggering Animations
```jsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

function AnimatedIcon({ src }) {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: 'main',
    autoplay: true,
  });

  const trigger = useStateMachineInput(rive, 'main', 'triggerName');

  const handleTap = () => {
    trigger?.fire();
  };

  return (
    <div onClick={handleTap} style={{ width: 48, height: 48 }}>
      <RiveComponent />
    </div>
  );
}
```

## Rules
- Always set explicit width and height on the container div
- Use Fit.Contain to prevent distortion
- Use state machines for triggered animations, not artboard timelines
- .riv files go in public/animations/
- Reference as src="/animations/topic-love.riv" (relative to public/)
- Handle loading state: Rive component renders blank until loaded
- Use placeholder SVG icons during build phase (Steps 2–5), swap for Rive in Step 6
- Keep .riv files under 100KB each for performance
- One state machine per icon: idle loop + triggered burst

## Placeholder Pattern (used until Step 6)
```jsx
function TopicIcon({ topic, size = 48 }) {
  // Placeholder — will be replaced with Rive in Step 6
  const icons = {
    love: '❤️',
    faith: '✝️',
    sin: '⚠️',
    theology: '📖',
    grace: '🕊️',
    prayer: '🙏',
    forgiveness: '🤝',
    hope: '🌅',
  };

  return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.6 }}>
      {icons[topic] || '📌'}
    </div>
  );
}
```
