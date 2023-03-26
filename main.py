import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap

# Load CSV file into a pandas dataframe
df = pd.read_csv("avatar_cities.csv")

# Create a globe projection using Basemap
fig = plt.figure(figsize=(8, 8))
m = Basemap(projection='robin', lon_0=0, resolution='l')
m.drawcoastlines()
m.drawmapboundary(fill_color='lightblue')
m.fillcontinents(color='lightgray', lake_color='lightblue')

# Plot the cities as red dots with labels
for i, row in df.iterrows():
    x, y = m(row["Longitude"], row["Latitude"])
    m.plot(x, y, 'ro', markersize=8, zorder=2)
    plt.annotate(row["City"], xy=(x, y), xytext=(5, 5),
                 textcoords="offset points", fontsize=5, zorder=3,
                 bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="none", lw=0))

# Set the title
plt.title("Negara Api", fontsize=16)

# Show the plot
plt.show()
