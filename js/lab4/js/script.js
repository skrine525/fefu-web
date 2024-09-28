const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const endT = 6 * Math.PI;
const startT = 0;
const step = Math.PI / 10;
const r = 100;
const k = 5 / 3;
const theta = -Math.PI / 2;
const cosTheta = Math.cos(theta);
const sinTheta = Math.sin(theta);

let points = [];
for (let t = startT; t <= endT; t += step) {
    let x = r * (k - 1) * (Math.cos(t) + (Math.cos((k - 1) * t)) / (k - 1));
    let y = r * (k - 1) * (Math.sin(t) - (Math.sin((k - 1) * t)) / (k - 1));

    let xRotated = cosTheta * x - sinTheta * y;
    let yRotated = sinTheta * x + cosTheta * y;

    points.push({ x: xRotated + width / 2, y: yRotated + height / 2 });
}

function getPathData(points) {
    let pathData = `M${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        pathData += `L${points[i].x},${points[i].y}`;
    }

    return pathData;
}
function drawPlayer() {
    let player = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", 0.4)
        .style("display", "none");

    player.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 10)
        .style("fill", "red");

    player.append("line")
        .attr("x1", 0)
        .attr("y1", 10)
        .attr("x2", 0)
        .attr("y2", 30)
        .style("stroke", "black")
        .style("stroke-width", 1.5);

    player.append("circle")
        .attr("cx", -3)
        .attr("cy", -3)
        .attr("r", 3)
        .style("fill", "lightblue");

    return player;
}

function playerAnimation(path, pulsationEnabled, rotationEnabled, duration) {
    let totalLength = path.getTotalLength();

    return function () {
        return function (t) {
            let point = path.getPointAtLength(t * totalLength);

            let scale = pulsationEnabled ? 1 + 0.5 * Math.sin(5 * Math.PI * t) : 1;
            let rotation = rotationEnabled ? 360 * (t * duration / 1000) : 0;

            return `translate(${point.x},${point.y}) scale(${scale}) rotate(${rotation})`;
        };
    };
}

svg.append("path")
    .attr("d", getPathData(points))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

const player = drawPlayer();

function clear() {
    player.attr("transform", "").style("display", "none");
}

function start() {
    let duration = parseInt(document.getElementById("duration").value);
    let rotationEnabled = document.getElementById("rotation").checked;
    let pulsationEnabled = document.getElementById("pulsation").checked;
    let path = svg.select("path");

    player.style("display", null)
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrTween("transform", playerAnimation(path.node(), pulsationEnabled, rotationEnabled, duration))
        .on("end", () => { });
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("clear").addEventListener("click", clear);