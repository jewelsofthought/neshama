---
title: Projective Geometry
description: An overview of the basic definitions of Projective Geometry
date: 2023-10-07T00:31:21.600Z
tags:
  - reference
eleventyExcludeFromCollections: true
---
## Point, Straight Line & Plane (Pt, Sl, Pl)

**Point** can lie in a line
**Line** can lie in a plane
**Plane** can go through a line
Line can go through a point

## Concept of Mutual Belonging

- $p$ & $l$ **belong** (to each other)
	- Point $p$ lies in line $l$
	- Line $l$ goes through point $p$
- $p$ & $S$ **belong** (to each other)
	- Plane $S$ goes through point $p$
	- Point $p$ lies on plane $S$
- $l$ & $S$ **belong** (to each other)
	- Plane $S$ goes through line $l$
	- Line $l$ lies on plane $S$ 

**Point**: Each point has both lines and planes belonging to it.
**Line**: Each line has both points and planes belonging to it
		 - Points lying on it, planes going through it
**Plane**: Each plane has both points and lines belonging to it
		 - Points lying on it, lines lying on it
**Bundle**: Point with all its elements that belong to it. 
**Field**: Plane with all its elements.
**Plane**: Carrier of **Field**.
**Line**: Carrier of **Range** of points & **sheaf** of planes - points lying on it and planes passing through it. 

## Seven Forms


1: Bundle of planes: to each point, belong $\infty$ planes
2: Field of points:      "     "     plane,    "       $\infty$ points
3: Bundle of lines:     "     "     point,     "       $\infty$ lines
4: Field of lines:        "     "     plane,     "       $\infty$ lines
5: Sheaf of planes:   "     "     line,        "       $\infty$ planes
6: Range of points:   "     "     line,        "       $\infty$ points
7: Pencil of lines: if point and plane belong, $\infty$ lines belong to both, which go through the point and lie in the plane.

1 & 3: lines & planes => bundle (point)
2 & 4: points and lines => field (plane)
5 & 6: points and planes => line
Point on plane (carrier): $\infty$ lines on plane pass through point.
The essence of point and plane which belong, is to carry the line pencil Members are the lines that belong to the carrier.

## Three basic forms (1st degree)

Point:   range 
Line:    pencil
Plane:  sheaf

Field contains $\infty$ point ranges, and line pencils.
Bundle contains $\infty$ plane sheafs and line pencil.

All points lie on line. 
All lines in plane that pass through a points.
All planes that pass through line.

## Space

Point space, line space & plane space
Point space & plane space, 3rd degree forms
Line space is a 4th degree form.!
![](references/attachments/projective_geom_1.png)
Relationship: 2 points, 2 lines, 2 planes
	Point $\notin$ line, 

(8: missing)

9: 2 points have a unique line that connects them, and all the planes belonging to the line.
- 2 bundls have in common a unique line --- joining the carries of the bundles + all planes belonging to this line (Sheaf)
10: 2 planes have a unique line, that is the line of intersection, that joins them, and all the points belonging to the line in common.
11 & 12: 2 lines have in common 
- either exactly 1 point, called the point of intersection (which only touch/cross at 1 point) or
- exactly 1 plane (called the connecting plane)
- or no points and no plan
13: A point $\notin$ a line, have a unique plane (the connecting plane) in common => (Bundle & Sheaf)
14: A plane $\notin$ a line, have a unique point (the point of intersection) in common => (Field and Point range)
15: A point $\in$ a line, have all the planes of the line in common => (Bundle & Sheaf)
16: A plane $\in$ a line, have all points of the line in common (Field and Point range)
17: A plane and a point either have no lines in common,
18: or a pencil line in common. (2nd part 7&8)
## Intersecting and connecting

- To connect 2 points -> determine the line common to their bundles.
- To intersect 2 planes -> determine the line common to their fields.
- To connect a point and a line -> construct the plane common to the bundle and sheaf.
- To intersect a plane and a line -> construct the point common to the fields and the point range.

## No common basic elements

1st: 2 lines with no point in common and no plane in common (skew -> 11,12, 17,18)
2nd: A plane $\notin$ a point, confront each other, tension unresolved. Any additional element, whether a point, a line or a plane has something in common with at least 1 member 
- a point is connected to another point; 
- a plane intersects another plane; 
- a line connects to a point; 
- a line intersects with a plane.

Any number of pairwise skew lines.

<u>Essential difference</u> between point space and plane space and line space.

<u>Exceptions</u>: 
- Two planes, that have no common line => $\parallel$
- Lines on a common plane with no point of intersection => $\parallel$

19: A line and a plane have 2 distinct points in common => all the points  of the line belong on the plane. The line is an element of the field carried by the plane.

20: A line and a point have to distinct planes in common.

=> by 14:, a plane $\notin$ a line only have one point in common;
=> if two common points, then the line $\in$ the plane => 19:
=> by 16:, the line will have all its points in common with the plane => 20:.

21: 3 points (bundles) which $\notin$ some point range have a unique plane (the connecting plane) in common.

22: 3 planes (fields) which $\notin$ same plane sheaf, have a unique point (the point of intersection) in common.

=> if 2 of the 3 planes have 1 line in common, which does not contain the 3rd point => the point and the line determine a unique plane.
=> by 19:, this plane also contains a line common to the 1st & 3rd point, as well as $\in$ to 2nd and 3rd point.
=> by 22:, if 2 of the 3 planes have 1 line in common, $\notin$ to the 3rd plane => the plane and the line determine a unique point.

## 10 elementary forms of space

- point space
- line space
- plane space
- 3 1st degree forms
	- bundles and files
- 4 2nd degree forms

Point range
Line pencil
Plane sheaf

3rd degree: plane space and point space
4th degree: line space
