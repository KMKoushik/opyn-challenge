export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomFloat = () => {
  return parseFloat((Math.random() / 10).toFixed(2));
};

export const truncate = (string: string, length: number) => {
  if (string.length < length) return string;
  return `${string.substr(0, length)}...`;
};

export const callData = [
  {
    key: '1',
    iv: `${getRandomInt(700, 800)}%`,
    size: `${getRandomInt(100, 200)}/${getRandomInt(30, 50)}`,
    bid: getRandomInt(590, 630),
    ask: getRandomInt(800, 940),
    strike: 680,
  },
  {
    key: '2',
    iv: `${getRandomInt(400, 600)}%`,
    size: `${getRandomInt(60, 100)}/${getRandomInt(10, 40)}`,
    bid: getRandomInt(700, 780),
    ask: getRandomInt(800, 940),
    strike: 800,
  },
  {
    key: '3',
    iv: `${getRandomInt(200, 300)}%`,
    size: `${getRandomInt(60, 100)}/${getRandomInt(10, 40)}`,
    bid: getRandomInt(400, 500),
    ask: getRandomInt(500, 640),
    strike: 1280,
  },
  {
    key: '4',
    iv: `${getRandomInt(100, 200)}%`,
    size: `${getRandomInt(60, 100)}/${getRandomInt(10, 40)}`,
    bid: getRandomInt(30, 100),
    ask: getRandomInt(100, 240),
    strike: 1600,
  },
  {
    key: '5',
    iv: `${getRandomInt(100, 200)}%`,
    size: `${getRandomInt(0, 0)}/${getRandomInt(10, 40)}`,
    bid: getRandomInt(0, 0),
    ask: getRandomInt(10, 20),
    strike: 1920,
  },
];

export const putData = [
  {
    key: '1',
    iv: `${getRandomInt(400, 600)}%`,
    size: `${getRandomInt(60, 100)}/${getRandomInt(10, 40)}`,
    bid: getRandomInt(700, 780),
    ask: getRandomInt(800, 940),
    strike: 800,
  },
  {
    key: '2',
    iv: `${getRandomInt(200, 300)}%`,
    size: `${getRandomInt(60, 100)}/${getRandomInt(10, 40)}`,
    bid: getRandomInt(400, 500),
    ask: getRandomInt(500, 640),
    strike: 1280,
  },
  {
    key: '3',
    iv: `${getRandomInt(100, 200)}%`,
    size: `${getRandomInt(60, 100)}/${getRandomInt(10, 40)}`,
    bid: getRandomInt(30, 100),
    ask: getRandomInt(100, 240),
    strike: 1600,
  },
];
