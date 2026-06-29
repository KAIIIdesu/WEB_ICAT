import os
import sys

# Ensure Pillow is installed
try:
    from PIL import Image
except ImportError:
    print("Pillow is not installed. Installing Pillow...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

def flood_fill_background(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    
    # Create a mask for pixels to make transparent
    # We will perform BFS flood fill from the four corners to find the white background
    visited = set()
    to_visit = [(0, 0), (0, height - 1), (width - 1, 0), (width - 1, height - 1)]
    pixels = img.load()
    
    # We define background color as white (threshold > 240 for R, G, B)
    def is_white(pos):
        x, y = pos
        r, g, b, a = pixels[x, y]
        return r > 240 and g > 240 and b > 240

    background_mask = [[False for _ in range(height)] for _ in range(width)]
    
    queue = []
    for corner in to_visit:
        if is_white(corner):
            queue.append(corner)
            visited.add(corner)
            background_mask[corner[0]][corner[1]] = True
            
    while queue:
        cx, cy = queue.pop(0)
        # Check 4-neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    if is_white((nx, ny)):
                        visited.add((nx, ny))
                        background_mask[nx][ny] = True
                        queue.append((nx, ny))
                    else:
                        # Add to visited so we don't check again, but don't add to queue
                        visited.add((nx, ny))
                        
    # Modify pixels based on the flood fill mask
    for x in range(width):
        for y in range(height):
            if background_mask[x][y]:
                pixels[x, y] = (255, 255, 255, 0) # Make transparent
                
    # Crop the image to the bounding box of non-transparent pixels
    # Image.getbbox() returns bounding box of non-zero pixels (non-transparent)
    bbox = img.getbbox()
    if bbox:
        # Pad the bounding box slightly to avoid clipping text edges
        pad = 4
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(width, bbox[2] + pad)
        bottom = min(height, bbox[3] + pad)
        img = img.crop((left, top, right, bottom))
        
    img.save(output_path, "PNG")
    print(f"Successfully processed logo and saved as transparent '{output_path}'")

if __name__ == "__main__":
    src_file = "logo.jpg"
    dest_file = "logo.png"
    if os.path.exists(src_file):
        flood_fill_background(src_file, dest_file)
    else:
        print(f"Error: {src_file} not found in the directory.")
