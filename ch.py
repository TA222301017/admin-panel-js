from math import radians, cos, sin, asin, sqrt
from scipy.spatial import ConvexHull
import matplotlib.pyplot as plt
import pandas as pd
import math

# Haversine distance formula
MAX_DIST = 2500


def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # radius of the earth in km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    lat1 = math.radians(lat1)
    lat2 = math.radians(lat2)

    a = math.sin(dLat/2)**2 + math.sin(dLon/2)**2 * \
        math.cos(lat1) * math.cos(lat2)
    c = 2 * math.asin(math.sqrt(a))

    distance = R * c
    return distance


# Load data from CSV file
data = pd.read_csv('avatar_cities.csv')

# Calculate distance matrix
n = len(data)
distance_matrix = [[0] * n for i in range(n)]
for i in range(n):
    for j in range(i, n):
        distance_matrix[i][j] = haversine_distance(data.iloc[i]['Latitude'], data.iloc[i]['Longitude'],
                                                   data.iloc[j]['Latitude'], data.iloc[j]['Longitude'])
        distance_matrix[j][i] = distance_matrix[i][j]

# Sort the points by latitude
sorted_data = data.sort_values(by='Latitude')
sorted_data2 = data.sort_values(by='Latitude', ascending=False)

# Initialize the convex hull with the two points with lowest latitude
convex_hull = [sorted_data.iloc[0], sorted_data.iloc[1]]
convex_hull_r = [sorted_data2.iloc[0], sorted_data2.iloc[1]]

# Iterate through the remaining points and add them to the convex hull
for i in range(2, n):
    while len(convex_hull) >= 2:
        last_point = convex_hull[-1]
        second_last_point = convex_hull[-2]
        # if d > 1000:
        #     break
        # Calculate the cross product to determine if the last two points make a right turn
        cross_product = (last_point['Longitude'] - second_last_point['Longitude']) * (sorted_data.iloc[i]['Latitude'] - second_last_point['Latitude']) - \
                        (last_point['Latitude'] - second_last_point['Latitude']) * \
            (sorted_data.iloc[i]['Longitude'] - second_last_point['Longitude'])
        if cross_product >= 0:
            # The last two points make a right turn, so remove the last point
            convex_hull.pop()
        else:
            # The last two points make a left turn, so stop removing points from the hull
            break

    d = haversine_distance(sorted_data.iloc[i]['Latitude'], sorted_data.iloc[i]['Longitude'],
                           convex_hull_r[-1]['Latitude'], convex_hull_r[-1]['Longitude'])
    if d > MAX_DIST:
        continue

    convex_hull.append(sorted_data.iloc[i])

for i in range(2, n):
    while len(convex_hull_r) >= 2:
        last_point = convex_hull_r[-1]
        second_last_point = convex_hull_r[-2]
        # if d > 1000:
        #     break
        # Calculate the cross product to determine if the last two points make a right turn
        cross_product = (last_point['Longitude'] - second_last_point['Longitude']) * (sorted_data2.iloc[i]['Latitude'] - second_last_point['Latitude']) - \
                        (last_point['Latitude'] - second_last_point['Latitude']) * \
            (sorted_data2.iloc[i]['Longitude'] -
             second_last_point['Longitude'])
        if cross_product >= 0:
            # The last two points make a right turn, so remove the last point
            convex_hull_r.pop()
        else:
            break
            # The last two points make a left turn, so stop removing points from the hull

    d = haversine_distance(sorted_data2.iloc[i]['Latitude'], sorted_data2.iloc[i]['Longitude'],
                           convex_hull_r[-1]['Latitude'], convex_hull_r[-1]['Longitude'])
    if d > MAX_DIST:
        continue

    convex_hull_r.append(sorted_data2.iloc[i])

# Add the first point again to close the hull
# convex_hull.append(sorted_data.iloc[0])
convex_hull = convex_hull + convex_hull_r
# print(convex_hull_r)

# Calculate the perimeter of the convex hull
perimeter = 0
for i in range(len(convex_hull) - 1):
    print(haversine_distance(convex_hull[i]['Latitude'], convex_hull[i]['Longitude'],
                             convex_hull[i+1]['Latitude'], convex_hull[i+1]['Longitude']))
    perimeter += haversine_distance(convex_hull[i]['Latitude'], convex_hull[i]['Longitude'],
                                    convex_hull[i+1]['Latitude'], convex_hull[i+1]['Longitude'])

print("Convex Hull:")
for (i, point) in enumerate(convex_hull):
    print(point['City'], point['Latitude'], point['Longitude'], haversine_distance(convex_hull[i-1]['Latitude'], convex_hull[i-1]['Longitude'],
                                                                                   convex_hull[i]['Latitude'], convex_hull[i]['Longitude']))

print("Perimeter:", perimeter)
la = [p["Latitude"] for p in convex_hull]
lo = [p["Longitude"] for p in convex_hull]
# Plot the convex hull
fig, ax = plt.subplots(figsize=(10, 8))
# ax.scatter(lo, la, c='red')
ax.plot(lo, la, c='red')
for (i, point) in enumerate(data["Longitude"]):
    ax.text(data["Longitude"][i], data["Latitude"][i],
            data["City"][i], fontsize=8)
    # ax.plot(convex_hull[i-1]["Latitude"],
    #         convex_hull[i-1]["Longitude"], c='red')
# for p, i in enumerate(convex_hull):
# for i in simplex:
#     ax.text(points[i, 1], points[i, 0], data.iloc[i]
#             ['City'], ha='center', va='center')

ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')
ax.set_title('Perbatasan Efektif Negara Api')

ax.scatter(data['Longitude'], data['Latitude'], c='red')
plt.show()

# Load data from csv file
# data = pd.read_csv('avatar_cities.csv')

# # Convert latitude and longitude from degrees to radians
# data['Latitude'] = data['Latitude'].apply(radians)
# data['Longitude'] = data['Longitude'].apply(radians)

# # Calculate convex hull
# points = data[['Latitude', 'Longitude']].values
# hull = ConvexHull(points)

# # Calculate perimeter of convex hull using haversine formula
# perimeter = 0
# for i in range(len(hull.vertices)):
#     start = hull.vertices[i]
#     end = hull.vertices[(i + 1) % len(hull.vertices)]
#     start_lat, start_lon = data.iloc[start]['Latitude'], data.iloc[start]['Longitude']
#     end_lat, end_lon = data.iloc[end]['Latitude'], data.iloc[end]['Longitude']
#     distance = haversine_distance(start_lat, start_lon, end_lat, end_lon)
#     perimeter += distance

# # Plot the convex hull
# fig, ax = plt.subplots(figsize=(10, 8))
# for simplex in hull.simplices:
#     ax.plot(points[simplex, 1], points[simplex, 0], 'k-')
#     for i in simplex:
#         ax.text(points[i, 1], points[i, 0], data.iloc[i]
#                 ['City'], ha='center', va='center')

# ax.set_xlabel('Longitude')
# ax.set_ylabel('Latitude')
# ax.set_title('Perbatasan Negara Api')

# ax.scatter(data['Longitude'], data['Latitude'], c='red')
# plt.show()
