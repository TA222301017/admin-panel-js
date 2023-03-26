import pandas as pd
import numpy as np
from math import radians, sin, cos, sqrt, asin
import matplotlib.pyplot as plt


def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in kilometers

    # Convert latitude and longitude to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    distance = R * c

    return distance


def tsp_nearest_neighbor(cities):
    # Number of cities
    n = cities.shape[0]

    # Create a list to store the visited cities and the starting city
    path = [0]

    # Create a list to store the unvisited cities
    unvisited_cities = list(range(1, n))

    # Loop through the unvisited cities
    while unvisited_cities:
        # Get the last visited city
        current_city = path[-1]

        # Compute the distances from the current city to all the unvisited cities
        distances = [haversine_distance(cities.loc[current_city, 'Latitude'],
                                        cities.loc[current_city, 'Longitude'],
                                        cities.loc[unvisited_city, 'Latitude'],
                                        cities.loc[unvisited_city, 'Longitude'])
                     for unvisited_city in unvisited_cities]

        # Find the index of the nearest unvisited city
        nearest_city_idx = np.argmin(distances)

        # Add the nearest unvisited city to the path
        path.append(unvisited_cities[nearest_city_idx])

        # Remove the nearest unvisited city from the unvisited cities list
        unvisited_cities.pop(nearest_city_idx)

    # Add the starting city to the end of the path to complete the tour
    path.append(0)

    # Compute the total distance of the path
    total_distance = sum([haversine_distance(cities.loc[path[i], 'Latitude'],
                                             cities.loc[path[i], 'Longitude'],
                                             cities.loc[path[i+1], 'Latitude'],
                                             cities.loc[path[i+1], 'Longitude'])
                          for i in range(n)])

    return path, total_distance


# Read the cities data from the CSV file
cities_df = pd.read_csv('avatar_cities.csv')

n = len(cities_df)
dist_matrix = np.zeros((n, n))
for i in range(n):
    for j in range(i, n):
        dist = haversine_distance(cities_df['Latitude'][i], cities_df['Longitude'][i],
                                  cities_df['Latitude'][j], cities_df['Longitude'][j])
        dist_matrix[i, j] = dist
        dist_matrix[j, i] = dist

# Print distance matrix
print(dist_matrix)
print(np.percentile(dist_matrix, q=75))

# Compute the shortest path using the nearest neighbor TSP algorithm with haversine distance
path, distance = tsp_nearest_neighbor(cities_df)

# Print the path and its total distance
print(' -> '.join(cities_df.loc[path, 'City']))
print(f'Total distance: {distance:.2f} km')

fig, ax = plt.subplots(figsize=(10, 8))
ax.scatter(cities_df["Longitude"], cities_df["Latitude"], c='red')
ax.plot(cities_df.loc[path, 'Longitude'], cities_df.loc[path, 'Latitude'])
for (i, point) in enumerate(cities_df["Longitude"]):
    ax.text(cities_df["Longitude"][i], cities_df["Latitude"][i],
            cities_df["City"][i], fontsize=8)
    # ax.plot(convex_hull[i-1]["Latitude"],
    #         convex_hull[i-1]["Longitude"], c='red')
# for p, i in enumerate(convex_hull):
# for i in simplex:
#     ax.text(points[i, 1], points[i, 0], data.iloc[i]
#             ['City'], ha='center', va='center')

ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')
ax.set_title('Rute Pelayaran Optimal Negara Api')

plt.show()

print(path)
