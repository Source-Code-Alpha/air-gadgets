from PIL import Image, ImageEnhance

img = Image.open(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\assets\logo.png").convert("RGBA")
pixels = img.load()
width, height = img.size

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        
        # White/very light background -> transparent
        if r > 210 and g > 210 and b > 210:
            pixels[x, y] = (0, 0, 0, 0)
        # Light gray background -> transparent
        elif r > 180 and g > 180 and b > 180 and abs(r - g) < 15 and abs(g - b) < 15:
            pixels[x, y] = (0, 0, 0, 0)
        # Dark gray elements -> make bright white/silver for visibility
        elif r < 120 and g < 120 and b < 120 and abs(r - g) < 25 and abs(g - b) < 25:
            # Scale up to white/silver
            brightness = max(r, g, b)
            factor = 255 / max(brightness, 1)
            new_val = min(int(brightness * factor * 0.85), 230)
            pixels[x, y] = (new_val, new_val, new_val, a)
        # Medium gray -> lighter
        elif r < 160 and g < 160 and b < 160 and abs(r - g) < 20 and abs(g - b) < 20:
            pixels[x, y] = (200, 200, 210, a)
        # Blue stays blue but slightly brighter
        elif b > r + 20:
            pixels[x, y] = (min(r + 30, 255), min(g + 30, 255), min(b + 40, 255), a)

# Save transparent version
img.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo-transparent.png")

# Also save dark bg version
dark_bg = Image.new("RGBA", (width, height), (10, 10, 10, 255))
dark_bg.paste(img, (0, 0), img)
dark_bg.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo-dark.png")
dark_bg.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo.png")

print("Done! Logo processed with enhanced contrast for dark backgrounds.")
