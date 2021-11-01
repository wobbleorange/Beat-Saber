import functools
import json
import math
import numpy as np
import shutil
from svg.path import parse_path, Line, CubicBezier
import xml.etree.ElementTree as ET


FILES = ["HardStandard"]

BPM = 120
BASE_HJ = 2
SNS = {"xmlns": "http://www.w3.org/2000/svg"}

#    SCALE, x, y, z,   [list(time, name)]
MODELS = [
    [8, 0, 1, 20, [(4, "rt"), (4.25, "non"),
                   (6, "rt"), (6.25, "non"),
                   (8, "rt"), (8.25, "non"),
                   (10, "rt"), (10.25, "non"),
                   (12, "rt"), (12.25, "non"),
                   (14, "rt"), (14.25, "non"),
                   (16, "rt"), (17, "non"),
                   (18, "rt"), (19, "non"),
                   (20, "rt"), (21, "non"),
                   (22, "rt"), (23, "non"),
                   (24, "rt"), (25, "non"),
                   (26, "rt"), (27, "non"),
                   (28, "rt"), (29, "non"),
                   (30, "rt"), (31, "non"),
                   (32, "rt"), (33, "non"),
                   (34, "rt"), (35, "non"),
                   (36, "rt"), (37, "non"),
                   (38, "rt"), (39, "non"),
                   (40, "rt"), (41, "non"),
                   (42, "rt"), (43, "non"),
                   (44, "rt"), (45, "non"),
                   (46, "rt"), (47, "non"),
                   (48, "rt"), (49, "non"),
                   (50, "rt"), (21, "non"),
                    (55, None)]]
]

# next ghost: 69


def trunc(obj, precision=4):
    if isinstance(obj, float):
        return round(obj, precision)
    elif isinstance(obj, dict):
        return dict((k, trunc(v)) for k, v in obj.items())
    elif isinstance(obj, (list, tuple)):
        return list(map(trunc, obj))
    return obj


def lerp(a, b, t):
    if t <= 0:
        return a
    elif t >= 1:
        return b
    else:
        return (1 - t) * a + t * b


def normalize(x, y, viewbox):
    """Normalize so that the origin is at the bottom center of the image,
    and the width and height of the image are 1
    """
    xi, yi, width, height = viewbox
    return (x - xi - width / 2) / width, (yi + height - y) / height


@functools.lru_cache(maxsize=None)
def load_image(filename, n_div=4):
    root = ET.parse("{}.svg".format(filename)).getroot()
    viewbox = tuple(map(float, root.attrib["viewBox"].split()))
    all_lines = []
    for line in root.findall("xmlns:line", SNS):
        x1 = float(line.attrib["x1"])
        y1 = float(line.attrib["y1"])
        x2 = float(line.attrib["x2"])
        y2 = float(line.attrib["y2"])
        sw = float(line.attrib["stroke-width"]
                   if "stroke-width" in line.attrib else 1)
        x1, y1 = normalize(x1, y1, viewbox)
        x2, y2 = normalize(x2, y2, viewbox)
        all_lines.append((x1, y1, x2, y2, sw))
    for polyline in root.findall("xmlns:polyline", SNS):
        points = [normalize(*map(float, pt.split(',')), viewbox)
                  for pt in polyline.attrib["points"].split()]
        x1, y1 = points[0]
        sw = float(polyline.attrib["stroke-width"]
                   if "stroke-width" in polyline.attrib else 1)
        for x2, y2 in points[1:]:
            all_lines.append((x1, y1, x2, y2, sw))
            x1, y1 = x2, y2
    for polygon in root.findall("xmlns:polygon", SNS):
        points = [normalize(*map(float, pt.split(',')), viewbox)
                  for pt in polygon.attrib["points"].split()]
        points.append(points[0])
        x1, y1 = points[0]
        sw = float(polygon.attrib["stroke-width"]
                   if "stroke-width" in polygon.attrib else 1)
        for x2, y2 in points[1:]:
            all_lines.append((x1, y1, x2, y2, sw))
            x1, y1 = x2, y2
    for path in root.findall("xmlns:path", SNS):
        path_spec = parse_path(path.attrib["d"])
        sw = float(path.attrib["stroke-width"]
                   if "stroke-width" in path.attrib else 1)
        for segment in path_spec:
            if type(segment) is Line:
                x1, y1 = normalize(segment.start.real,
                                   segment.start.imag, viewbox)
                x2, y2 = normalize(segment.end.real,
                                   segment.end.imag, viewbox)
                all_lines.append((x1, y1, x2, y2, sw))
            elif type(segment) is CubicBezier:
                points = []
                for i in range(n_div + 1):
                    t = i / n_div
                    c = segment.point(t)
                    x, y = normalize(c.real, c.imag, viewbox)
                    points.append((x, y))
                x1, y1 = points[0]
                for x2, y2 in points[1:]:
                    all_lines.append((x1, y1, x2, y2, sw))
                    x1, y1 = x2, y2

    return all_lines


def add_image(walls, image_data):
    scale, x, y, z, times = image_data
    thickness = 0.01

    model0 = load_image(times[0][1])
    ti = times[0][0]
    tf = times[-1][0]

    for i in range(len(model0)):
        start = ti - 1 + i / len(model0)
        end = tf + i / len(model0)

        positions = []
        rotations = []
        scales = []

        for j in range(len(times) - 1):
            tt, name = times[j]
            ttn = times[j + 1][0]

            model = load_image(name)
            line = model[i]
            x1, y1, x2, y2, _ = line
            if y1 > y2:
                x1, y1, x2, y2 = x2, y2, x1, y1
            x1, y1 = x + scale * x1, y + scale * y1
            x2, y2 = x + scale * x2, y + scale * y2

            pos = [x1, y1, z]
            rot = [0, 0, math.degrees(math.atan2(y2 - y1, x2 - x1)) - 90]
            scl = [0.5, math.sqrt((x2 - x1)**2 + (y2 - y1) ** 2), 0.5]

            ttr = (tt - start) / (end - start)
            ttnr = (ttn - start) / (end - start)
            positions.append([*pos, ttr])
            rotations.append([*rot, ttr],)
            scales.append([*scl, ttr])
            positions.append([*pos, ttnr])
            rotations.append([*rot, ttnr],)
            scales.append([*scl, ttnr])

            # TODO: avoid redundancy! (three consecutive identical values)

        nj_offset = (end - start) / 2 - BASE_HJ
        walls.append({
            "_time": start + BASE_HJ + nj_offset,
            "_duration": 0,
            "_lineIndex": 0,
            "_type": 0,
            "_width": 0,
            "_customData": {
                "_interactable": False,
                "_noteJumpStartBeatOffset": nj_offset,
                "_position": [0, 0],
                "_color": [1, 1, 1, 0],
                "_scale": [thickness * 2, 1, thickness * 2],
                "_animation": {
                    "_definitePosition": positions,
                    "_localRotation": rotations,
                    "_scale": scales,
                    "_dissolve": [
                        [0, (ti - start) / (end - start)],
                        [1, (ti - start) / (end - start)],
                        [1, (tf - start) / (end - start)],
                        [0, (tf - start) / (end - start)],
                    ],
                }
            }
        })


def add_main_title(walls):
    scale = 15
    y = 5
    z1, z2 = 50, 30
    thickness = 0.005
    t0, t1, t2, t3 = 16.75, 17, 18, 18.25
    v_angle = 5

    model = load_image("title")

    for i in range(len(model)):
        start = t0 - 1 + i / len(model)
        end = t3 + i / len(model)

        line = model[i]
        x1, y1, x2, y2, _ = line
        if y1 > y2:
            x1, y1, x2, y2 = x2, y2, x1, y1
        x1, y1 = scale * x1, y + scale * y1
        x2, y2 = scale * x2, y + scale * y2

        pos = [x1, y1]

        nj_offset = (end - start) / 2 - BASE_HJ
        walls.append({
            "_time": start + BASE_HJ + nj_offset,
            "_duration": 0,
            "_lineIndex": 0,
            "_type": 0,
            "_width": 0,
            "_customData": {
                "_interactable": False,
                "_noteJumpStartBeatOffset": nj_offset,
                "_position": [0, 0],
                "_color": [1, 1, 1, 0],
                "_rotation": [-v_angle, 0, 0],
                "_localRotation": [0, 0, math.degrees(math.atan2(y2 - y1, x2 - x1)) - 90],
                "_scale": [thickness, math.sqrt((x2 - x1)**2 + (y2 - y1) ** 2), thickness],
                "_animation": {
                    "_definitePosition": [
                        [*pos, z1, (t0 - start) / (end - start)],
                        [*pos, z2, (t1 - start) / (end - start)],
                        [*pos, z2, (t2 - start) / (end - start)],
                        [*pos, z1, (t3 - start) / (end - start)],
                    ],
                    "_dissolve": [
                        [0, (t0 - start) / (end - start)],
                        [1, (t1 - start) / (end - start)],
                        [1, (t2 - start) / (end - start)],
                        [0, (t3 - start) / (end - start)],
                    ],
                }
            }
        })


def add_end_title(walls):
    scale = 5
    y, z = 0, 20
    thickness = 0.005
    t0, t1, t2, t3 = 97, 97.2, 99, 100.5

    model = load_image("end")

    for i in range(len(model)):
        start = t0 - 1 + i / len(model)
        end = t3 + i / len(model)

        line = model[i]
        x1, y1, x2, y2, _ = line
        if y1 > y2:
            x1, y1, x2, y2 = x2, y2, x1, y1
        x1, y1 = scale * x1, y + scale * y1
        x2, y2 = scale * x2, y + scale * y2

        nj_offset = (end - start) / 2 - BASE_HJ
        walls.append({
            "_time": start + BASE_HJ + nj_offset,
            "_duration": 0,
            "_lineIndex": 0,
            "_type": 0,
            "_width": 0,
            "_customData": {
                "_interactable": False,
                "_noteJumpStartBeatOffset": nj_offset,
                "_position": [0, 0],
                "_color": [1, 1, 1, 0],
                "_localRotation": [0, 0, math.degrees(math.atan2(y2 - y1, x2 - x1)) - 90],
                "_scale": [thickness, math.sqrt((x2 - x1)**2 + (y2 - y1) ** 2), thickness],
                "_animation": {
                    "_definitePosition": [
                        [x1, y1, z, 0],
                    ],
                    "_dissolve": [
                        [0, (t0 - start) / (end - start)],
                        [1, (t1 - start) / (end - start)],
                        [1, (t2 - start) / (end - start)],
                        [0, (t3 - start) / (end - start)],
                    ],
                }
            }
        })



def main():
    # NO Lights off
    events = [{"_time": 0, "_type": i, "_value": 0} for i in range(5)]

    walls = []
    for model in MODELS:
        add_image(walls, model)

    add_main_title(walls)
    add_end_title(walls)

    walls.sort(key=lambda x: x["_time"])

    # Prevent MM from overwriting info.dat
    shutil.copyfile("info.json", "info.dat")

    for filename in FILES:
        with open("{}.dat".format(filename), "r") as json_file:
            song_json = json.load(json_file)

        song_json["_obstacles"] = walls
        song_json["_events"] = events
        #process_notes(song_json["_notes"])

        song_json = trunc(song_json)

        with open("{}.dat".format(filename), "w") as json_file:
            json.dump(song_json, json_file)


main()
