/**
 * Data Structures - Diamond Square
 * ===
 *
 * @module diamondSquare
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import noise from './noise';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Genetics
 * @class
 */
class DiamondSquare {

  //////////////////////////////////////////////////////////////////////////////
  // Static Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _grid;
  _size;
  _max;
  _frequency;
  _noise;


  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * DiamondSquare
   * @constructor
   */
  constructor() {
    this._noise = noise();
    this._noise.seed('diamond');
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  create(size) {
    const SEED = Math.random();

    this._frequency = 0;
    this._grid = [];
    this._size = Math.pow(2, size) + 1;
    this._max = this._size - 1;

    for (let idx = 0; idx < this._size; idx++) {
      this._grid[idx] = [];
    }

    this._setCoordinate(0, 0, SEED);
    this._setCoordinate(0, this._max, SEED);
    this._setCoordinate(this._max, 0, SEED);
    this._setCoordinate(this._max, this._max, SEED);

    this._divideGrid(this._max);

    return this._grid;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _getCoordinate(xPos, yPos) {
    const X_CONDITION = (xPos < 0 || xPos > this._max);
    const Y_CONDITION = (yPos < 0 || yPos > this._max);

    if (X_CONDITION || Y_CONDITION) return 1;
    return this._grid[xPos][yPos];
  }

  _setCoordinate(xPos, yPos, value) {
    this._grid[xPos][yPos] = value;
  }

  _divideGrid(size) {
    const ROUGHNESS = Math.random();
    const HALF = size / 2;

    this._frequency = 1 / ROUGHNESS * size * this._size;

    if (HALF < 1) return;
    for (let idx = HALF; idx < this._max; idx += size) {
      for (let jdx = HALF; jdx < this._max; jdx += size) {
        this._calculateSquare(idx, jdx, HALF);
      }
    }
    for (let idx = 0; idx <=this._max; idx+= HALF) {
      for (let jdx = (idx + HALF) % size; jdx <= this._max; jdx += size) {
        this._calculateDiamond(idx, jdx, HALF);
      }
    }
    this._divideGrid(HALF);
  }

  _calculateSquare(xPos, yPos, size) {
    const NOISE = this._calculateNoise(xPos, yPos);
    const AVERAGE = this._calculateAverage([
      this._getCoordinate(xPos - size, yPos - size),
      this._getCoordinate(xPos + size, yPos + size),
      this._getCoordinate(xPos + size, yPos - size),
      this._getCoordinate(xPos - size, yPos + size)
    ]);

    this._setCoordinate(xPos, yPos, AVERAGE + NOISE);
  }

  _calculateDiamond(xPos, yPos, size) {
    const NOISE = this._calculateNoise(xPos, yPos);
    const AVERAGE = this._calculateAverage([
      this._getCoordinate(xPos, yPos - size),
      this._getCoordinate(xPos + size, yPos),
      this._getCoordinate(xPos, yPos + size),
      this._getCoordinate(xPos - size, yPos)
    ]);

    this._setCoordinate(xPos, yPos, AVERAGE + NOISE);
  }

  _calculateAverage(values) {
    const VALID = values.filter((val) => { return val !== -1; });
    const TOTAL = VALID.reduce((sum, val) => { return sum + val; }, 0);

    return TOTAL / VALID.length;
  }

  _calculateNoise(xIn, yIn) {
    const X_MODIFIED = xIn / this._size - 0.5;
    const Y_MODIFIED = yIn / this._size - 0.5;

    let out = this._noise.perlin2(X_MODIFIED, Y_MODIFIED);

    out += 0.5 * this._noise.perlin2(2 * X_MODIFIED, 2 * Y_MODIFIED);
    out += 0.25 * this._noise.perlin2(4 * X_MODIFIED, 4 * Y_MODIFIED);

    // out += this._noise.simplex2(xIn * ((this._frequency * 125)), yIn * ((this._frequency * 125)));
    // out += this._noise.simplex2(xIn * (((this._frequency * this._max) / 2)), yIn * (((this._frequency * this._max)) / 2));
    // out += this._noise.simplex2(xIn * (this._frequency / 2), yIn * (this._frequency / 2));
    // out += this._noise.simplex2(xIn * (this._frequency / 4), yIn * (this._frequency / 4));
    // out += this._noise.simplex2(xIn * (this._frequency / 8), yIn * (this._frequency / 8));
    // out += this._noise.simplex2(xIn * (1 / (this._max / 4)), yIn * (1 / (this._max / 4)));
    // out += this._noise.simplex2(xIn * (1 / (this._max /8)), yIn * (1 / (this._max / 8)));
    // out += this._noise.perlin2(xIn * (1 / (this._max /16)), yIn * (1 / (this._max /16)));
    // out += this._noise.perlin2(xIn * (1 / (this._max /32)), yIn * (1 / (this._max /32)));
    // out /= 4;
    // out *= (1 / this._frequency)

    // out = (out < 0) ? -out : out;
    // out += .5 * NOISE.simplex2(2 * X_FREQUENCY, 2 * Y_FREQUENCY);
    // out += .25 * NOISE.simplex2(4 * X_FREQUENCY, 2 * Y_FREQUENCY);
    return out;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DiamondSquare;
