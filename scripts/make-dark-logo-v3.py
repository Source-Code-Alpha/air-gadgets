from PIL import Image

img = Image.open(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\assets\logo.png").convert("RGBA")
pixels = img.load()
width, height = img.size

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        
        # White/light background -> transparent
        if r > 200 and g > 200 and b > 200:
            pixels[x, y] = (0, 0, 0, 0)
        # Light-ish gray background -> transparent  
        elif r > 170 and g > 170 and b > 170 and abs(r - g) < 15 and abs(g - b) < 15:
            pixels[x, y] = (0, 0, 0, 0)
        # Dark/medium gray elements -> pure white for maximum visibility
        elif abs(r - g) < 30 and abs(g - b) < 30 and r < 170:
            pixels[x, y] = (255, 255, 255, a)
        # Blue elements -> brighter blue
        elif b > r + 15:
            pixels[x, y] = (min(r + 50, 200), min(g + 50, 220), min(b + 60, 255), a)

# Save transparent version
img.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo-transparent.png")

# Also save dark bg versions
dark_bg = Image.new("RGBA", (width, height), (10, 10, 10, 255))
dark_bg.paste(img, (0, 0), img)
dark_bg.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo-dark.png")
dark_bg.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo.png")

print("Done! Logo with maximum contrast for dark backgrounds.")
