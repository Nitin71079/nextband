// IELTS Reading Band

export function getIELTSBand(score) {
  const bands = {
    40: 9,
    39: 8.5,
    38: 8,
    37: 8,
    36: 8,
    35: 8,
    34: 7.5,
    33: 7.5,
    32: 7.5,
    31: 7.5,
    30: 7,
    29: 7,
    28: 6.5,
    27: 6.5,
    26: 6.5,
    25: 6,
    24: 6,
    23: 6,
    22: 5.5,
    21: 5.5,
    20: 5.5,
    19: 5,
    18: 5,
    17: 5,
    16: 4.5,
    15: 4.5,
  };

  return bands[score] || 4;
}

// IELTS Listening Band

export function getIELTSListeningBand(score) {
  const bands = {
    40: 9,
    39: 8.5,
    38: 8.5,
    37: 8,
    36: 8,
    35: 7.5,
    34: 7.5,
    33: 7,
    32: 7,
    31: 7,
    30: 6.5,
    29: 6.5,
    28: 6.5,
    27: 6,
    26: 6,
    25: 5.5,
    24: 5.5,
    23: 5.5,
    22: 5,
    21: 5,
    20: 5,
  };

  return bands[score] || 4;
}