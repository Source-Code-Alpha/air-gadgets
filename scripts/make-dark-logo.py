from PIL import Image
import sys

# Open the original logo
img = Image.open(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\assets\logo.png").convert("RGBA")
pixels = img.load()

width, height = img.size

# Replace white/light background with transparent
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # If pixel is very light (near white/light gray background)
        if r > 200 and g > 200 and b > 200:
            pixels[x, y] = (0, 0, 0, 0)  # Make transparent
        # Make dark gray text/elements lighter for dark bg visibility
        elif r < 100 and g < 100 and b < 100 and not (0 < b - r > 30):
            # This is a dark gray element - make it light gray
            pixels[x, y] = (200, 200, 200, a)

# Save transparent version
img.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo-transparent.png")

# Also create a version with dark background
dark_bg = Image.new("RGBA", (width, height), (10, 10, 10, 255))
dark_bg.paste(img, (0, 0), img)
dark_bg.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo-dark.png")

print("Done! Created logo-transparent.png and logo-dark.png")
