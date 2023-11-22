绘制矩形ctx.rect()
判断点在矩形内ctx.isPointInPath()

绘制圆形ctx.arc()
判断点在圆形内ctx.isPointInPath()

对复杂的图形，可以用射线法判断
```js
function isPointInPolygon() {
    let crossings = 0;
    const x = point.x, y = point.y;
    const n = polygon.length;

    for (let i = 0; i < n; i++) {
        const p1 = polygon[i];
        const p2 = polygon[(i + 1) % n];
        if (((p1.y <= y) && (p2.y > y)) || ((p1.y > y) && (p2.y <= y))) {
            const vt = (y - p1.y) / (p2.y - p1.y);
            const xCross = p1.x + vt * (p2.x - p1.x);
            if (x < xCross) {
                crossings++;
            }
        }
    }
    return (crossings % 2 !== 0)
}
```