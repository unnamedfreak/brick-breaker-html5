import Brick from './brick.js'

export function buildLevel(game, level) {
    let bricks = [];

    level.forEach((row, rowIdx) => {
        row.forEach((brick, brickIdx) => {
            let position = {
                x: 80 * brickIdx,
                y: 20 + 24 * rowIdx
            }
            if(brick === 1) {
                // console.log(position.x, position.y)
                bricks.push(new Brick(game, position));
            }
        });
    });

    return bricks;
}