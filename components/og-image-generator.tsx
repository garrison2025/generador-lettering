"use client"

import { useEffect } from "react"

// This component is only used during development to generate OG images
export function OgImageGenerator() {
  useEffect(() => {
    // This code would typically run in a build script, not in the browser
    // It's included here for demonstration purposes
    console.log("In a real implementation, this would generate OG images with the logo")

    // The actual implementation would use a library like sharp or canvas to generate images
    // Example pseudo-code:
    //
    // import sharp from 'sharp';
    // import { createCanvas, loadImage } from 'canvas';
    //
    // async function generateOgImage() {
    //   const canvas = createCanvas(1200, 630);
    //   const ctx = canvas.getContext('2d');
    //
    //   // Draw background
    //   ctx.fillStyle = '#ffffff';
    //   ctx.fillRect(0, 0, 1200, 630);
    //
    //   // Draw gradient
    //   const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    //   gradient.addColorStop(0, '#f8f9fa');
    //   gradient.addColorStop(1, '#e9ecef');
    //   ctx.fillStyle = gradient;
    //   ctx.fillRect(0, 0, 1200, 630);
    //
    //   // Load and draw logo
    //   const logo = await loadImage('public/logo-light.png');
    //   ctx.drawImage(logo, 50, 50, 150, 150);
    //
    //   // Add text
    //   ctx.font = 'bold 60px Montserrat';
    //   ctx.fillStyle = '#5B4FBE';
    //   ctx.fillText('Generador de Lettering', 50, 300);
    //
    //   ctx.font = '40px Roboto';
    //   ctx.fillStyle = '#4A4A4A';
    //   ctx.fillText('Crea diseños tipográficos únicos', 50, 370);
    //
    //   // Save the image
    //   const buffer = canvas.toBuffer('image/png');  50, 370);
    //
    //   // Save the image
    //   const buffer = canvas.toBuffer('image/png');
    //   await sharp(buffer)
    //     .toFile('public/og-image.png');
    // }
    //
    // generateOgImage();
  }, [])

  return null
}
