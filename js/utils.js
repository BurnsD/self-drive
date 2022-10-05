// when t is 0 only A well be returned, when t is 1 you are left with B
function lerp(A, B, t) {
    return A + (B - A) * t;
  }
  