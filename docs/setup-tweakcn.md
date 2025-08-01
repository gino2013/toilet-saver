# Tweakcn Integration Setup

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Clone Tweakcn repository:**
   ```bash
   git clone https://github.com/jnsahaj/tweakcn.git tweakcn-editor
   cd tweakcn-editor
   npm install
   npm run dev
   ```

3. **Access Tweakcn:**
   - Open http://localhost:3000 (or the port shown in terminal)
   - Upload your `tailwind.config.js` file
   - Use the visual editor to customize themes

## Using Tweakcn with Your Project

### Step 1: Generate Custom Theme
1. In Tweakcn, select "New Project"
2. Choose the base theme that matches your green color scheme
3. Customize colors, spacing, and components visually
4. Export the generated CSS variables

### Step 2: Apply Custom Theme
1. Copy the generated CSS variables to `src/styles/globals.css`
2. Update your component classes to use the new theme
3. Test the changes in your Toilet Saver app

### Step 3: Fine-tune Components
Use Tweakcn to adjust:
- Button styles and hover effects
- Card backgrounds and borders
- Input field appearances
- Badge colors and variants
- Modal and overlay styles

## Available Tweakcn Features for Your Project

### Color Customization
- Primary/secondary color schemes
- Glassmorphism effect variations
- Gradient adjustments
- Transparency levels

### Component Styling
- Button variants and animations
- Card layouts and shadows
- Input field styling
- Badge and tag appearances

### Layout Adjustments
- Spacing and padding
- Border radius variations
- Shadow depths
- Animation timings

## Benefits of Using Tweakcn

1. **Visual Design**: No need to manually edit CSS
2. **Consistency**: Maintains design system coherence
3. **Theme Variants**: Easy A/B testing of different looks
4. **Export Options**: Generate production-ready CSS
5. **Live Preview**: See changes in real-time

## Next Steps

1. Run the setup commands above
2. Open Tweakcn in your browser
3. Import your current `tailwind.config.js`
4. Start customizing your theme visually
5. Export and apply the changes to your project