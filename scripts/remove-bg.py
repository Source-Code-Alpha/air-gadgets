from PIL import Image

img = Image.open(r"C:\Users\Meena\clawd-soha_coding\2026-03-25-logo-final.png").convert("RGBA")
pixels = img.load()
width, height = img.size

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Remove black/near-black background
        if r < 25 and g < 25 and b < 25:
            pixels[x, y] = (0, 0, 0, 0)
        # Remove very dark pixels that are just background noise
        elif r < 15 and g < 15 and b < 20:
            pixels[x, y] = (0, 0, 0, 0)

img.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo-transparent.png")
img.save(r"C:\Users\Meena\clawd-soha_coding\air-gadgets\public\logo.png")
print("Done! Background removed.")
