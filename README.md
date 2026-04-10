# Auto Square (Figma Plugin)

![Cover](assets/cover.png)

> **Tagline:** Batch wrap selected layers into perfect 1:1 square frames.
> **Tags:** `resize`, `square`, `batch`, `gamedev`, `utility`, `automation`

## 📖 Description
A time-saver for game developers and UI designers. 
Select any uneven images or layers, run **Auto Square**, and they instantly become perfect 1:1 squares based on their maximum length, perfectly centered. 

Great for standardizing game assets, icons, and UI elements without squashing or wasting atlas space!

## ✨ Features
- **One-Click Magic:** Select 1 or 100 images, done in a millisecond.
- **Perfect 1:1 Ratio:** Automatically calculates the maximum edge (width or height) of each individual layer.
- **Absolute Centering:** Original layers are perfectly centered inside the new transparent frames.
- **Zero Configuration:** No UI, no pop-ups. Run it and get back to work.

## 🚀 How to Use
1. Select one or multiple layers (images, vectors, groups) in your Figma file.
2. Run `Auto Square` from your plugins menu.
3. Done! Export your perfectly squared assets.

## 🛠️ Local Development
If you want to tweak the code or build it locally:
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to watch and compile the TypeScript code.
4. In Figma, go to **Plugins > Development > Import plugin from manifest...** and select the `manifest.json` file.