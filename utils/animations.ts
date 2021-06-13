import anime from 'animejs';
import { AnimeTarget } from './types';

function extractTargets(targets: AnimeTarget): string {
  if (typeof targets === 'string') return targets;

  const classes: string[] = [];
  targets.forEach(t => classes.push(t));
  return classes.reduce((acc: string, v: string) => `${acc}.${v}`,'');
}

export function animateUp(targets: AnimeTarget, opacity?: number): void {
  const _targets = extractTargets(targets);
  anime({
    targets: _targets,
    opacity: [0, opacity ?? 1],
    easing: 'easeInOutQuart',
    duration: 1250,
    translateY: ['25px', '0px'],
  });
}

export function animateOutUp(targets: AnimeTarget): void {
  const _targets = extractTargets(targets);
  anime({
    targets: _targets,
    opacity: 0,
    easing: 'easeInOutQuart',
    duration: 1000,
    translateY: ['0px', '-25px'],
  });
}

export function animateStroke(targets: AnimeTarget, isReverse = false): void {
  const _targets = extractTargets(targets);
  anime({
    targets: _targets,
    strokeDashoffset: isReverse
      ? [0, anime.setDashoffset]
      : [anime.setDashoffset, 0],
    easing: 'easeInOutQuart',
    duration: 750,
  });
}

export interface AnimeControls {
  play: () => void;
  pause: () => void;
  reverse?: () => void;
  restart?: () => void;
}

export function spin(targets: AnimeTarget, period = 5, autoplay = false, loop = true): AnimeControls {
  const _targets = extractTargets(targets);
  const animation = anime({
    targets: _targets,
    rotate: [0, 360],
    easing: 'linear',
    loop,
    autoplay,
    duration: period * 1000,
  });

  return {
    play: animation.play,
    pause: animation.pause,
    restart: animation.restart,
  };
}

export function moveRecordArm(targets: AnimeTarget): AnimeControls {
  const _targets = extractTargets(targets);
  const animation = anime.timeline({
    targets: _targets,
    autoplay: false,
  });

  animation.add({
    targets: _targets,
    rotate: 20,
    easing: 'linear',
    duration: 500,
  });

  return {
    play: animation.play,
    pause: animation.pause,
    reverse: animation.reverse,
    restart: animation.restart,
  };
}

export function pulseRecordArm(targets: AnimeTarget): AnimeControls {
  const _targets = extractTargets(targets);
  const animation = anime({
    targets: _targets,
    rotate: [20, 30],
    easing: 'linear',
    loop: true,
    autoplay: false,
    duration: 18000,
    direction: 'alternate',
  });

  return {
    play: animation.play,
    pause: animation.pause,
  };
}