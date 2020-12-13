import { Color, IColor } from '../../core/color/built-in/default/class/color-class';

function createDummyElement(): HTMLDivElement {
  const element: HTMLDivElement = document.createElement('div');
  element.style.width = '100px';
  element.style.height = '2px';
  return element;
}


async function debugColorParse() {
  [
    'invalid',
    'red',
    'rgb(255, 0, 0)',
    'rgba(255, 0, 0, 0.5)',
    'hsl(0, 100%, 50%)', // red
    'hsla(0, 100%, 50%, 0.5)', // red
  ].forEach((color: string) => {
    const _color = Color.parse(color);
    console.warn(color);
    if (_color === null) {
      console.log('null');
    } else {
      console.log(_color.toRGBA());
      console.log(_color.toHSLA());
      console.log(_color.toHex());
      console.log(_color.toHSLAObject());
    }
  });
}

async function debugColorMix() {
  const c1: IColor = Color.parse('red') as IColor;
  const c2: IColor = Color.parse('green') as IColor;

  for (let i = 0, l = 255; i <= l; i++) {
    const elt = createDummyElement();
    elt.style.backgroundColor = c1.mix(c2, i / l).invert(0.1).toRGBA();
    document.body.appendChild(elt);
  }
}

async function debugColorPerf1() {
  const color = Color.parse('#123456') as IColor;
  const color2 = Color.parse('#654321') as IColor;
  let j: number = 0;
  console.time('color-perf');
  for (let i = 0; i < 1e9; i++) {
    // j += color.getRed(); // 1e9 => 1069.245849609375 ms
    // j += color.toRGBA().length; // 1e9 => 1092.80615234375 ms
    // j += new Color(Math.random(), Math.random(), Math.random(), Math.random()).getRed(); // 1e7 => 3693.802978515625 ms
    // j += new Color(Math.random(), Math.random(), Math.random(), Math.random()).toRGBA().length; // 1e6 => 1149.926025390625 ms
    // j += color.mix(color2, 0.5).toRGBA().length; // 1e6 => 486.060791015625 ms
    // j += color.grayscale('average').toRGBA().length; // 1e6 => 475.908935546875 ms
    j += color.equals(color2) ? 1 : 2; // 1e9 => 5747.0341796875 ms
  }
  console.timeEnd('color-perf');
  console.log('j', j);
}

async function debugColorPerf2() {
  let j: number = 0;
  console.time('color-perf');
  for (let i = 0; i < 1e6; i++) {
    const colorA = new Color(Math.random(), Math.random(), Math.random(), Math.random());
    const colorB = new Color(Math.random(), Math.random(), Math.random(), Math.random());
    // j += colorA.getRed() + colorB.getRed(); // 1e6 => 773.213134765625 ms
    // j += colorA.toRGBA().length + colorB.toRGBA().length; // 1e6 => 2166.1171875 ms - 773 ms = 1393ms
    // j += colorA.mix(colorB, 0.5).getRed(); // 1e6 => 1057.98388671875 ms - 773 ms = 284ms
    j += colorA.toHSLAObject().h + colorB.toHSLAObject().s; // 1e6 => 896.68408203125 - 773 ms = 123ms
  }
  console.timeEnd('color-perf');
  console.log('j', j);
}

export async function debugColor1() {
  // const color = new Color(0.1, 0.2, 0.3, 0.4);
  const color = Color.parse('rgb(255, 0, 0)');
  console.log(color);
  (window as any).Color = Color;
  (window as any).color = color;
}

export async function debugColor() {
  // await debugColor1();
  // await debugColorParse();
  // await debugColorMix();
  // await debugColorPerf1();
  await debugColorPerf2();
}


